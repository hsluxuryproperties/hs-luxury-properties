import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      message,
      property_code,
      property_title,
      preferred_time,
    } = body

    // ── 1. Save to Supabase ─────────────────────────────────────────────────
    const supabase = await createClient()
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        phone,
        message,
        property_ref: property_code ?? null,
      })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 })
    }

    // ── 2. Send email via Resend ────────────────────────────────────────────
    const subject = property_code
      ? `New Enquiry: ${property_code} — ${name}`
      : `New Contact: ${name}`

    const { error: emailError } = await resend.emails.send({
      // Change to: 'HS Luxury Properties <noreply@hsluxuryproperties.com>'
      // once you verify your domain in Resend dashboard
      from:    'HS Luxury Properties <onboarding@resend.dev>',
      to:      'hsluxuryproperties@gmail.com',
      replyTo: email,
      subject,
      html: buildEmail({ name, email, phone, message, property_code, property_title, preferred_time }),
    })

    if (emailError) {
      // Don't fail — submission is already saved in Supabase
      console.error('Resend error:', emailError)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// ── Email HTML builder ────────────────────────────────────────────────────────
function buildEmail(p: {
  name: string
  email: string
  phone: string
  message: string
  property_code?: string
  property_title?: string
  preferred_time?: string
}) {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0f0f0f;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 20px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#111111;border:1px solid #2a2a2a;border-radius:8px;overflow:hidden;max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="padding:28px 32px 24px;border-bottom:2px solid #F0C040;">
            <p style="margin:0;font-family:Georgia,serif;font-size:22px;color:#F0C040;letter-spacing:2px;">HS LUXURY PROPERTIES</p>
            <p style="margin:6px 0 0;font-family:Arial,sans-serif;font-size:12px;color:#666;letter-spacing:1px;text-transform:uppercase;">New Contact Form Submission</p>
          </td>
        </tr>

        ${p.property_code ? `
        <!-- Property badge -->
        <tr>
          <td style="padding:20px 32px 0;">
            <table cellpadding="0" cellspacing="0" style="background:#1a1a1a;border:1px solid rgba(240,192,64,0.3);border-radius:4px;padding:14px 18px;width:100%;">
              <tr>
                <td>
                  <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:10px;color:#F0C040;letter-spacing:2px;text-transform:uppercase;">Property Enquiry</p>
                  <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:#F5F0E8;font-weight:bold;">${p.property_code}${p.property_title ? ` &mdash; ${p.property_title}` : ''}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        ` : ''}

        <!-- Details table -->
        <tr>
          <td style="padding:24px 32px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:11px 0;border-bottom:1px solid #1e1e1e;font-family:Arial,sans-serif;font-size:11px;color:#666;text-transform:uppercase;letter-spacing:1px;width:130px;">Name</td>
                <td style="padding:11px 0;border-bottom:1px solid #1e1e1e;font-family:Arial,sans-serif;font-size:13px;color:#F5F0E8;font-weight:bold;">${p.name}</td>
              </tr>
              <tr>
                <td style="padding:11px 0;border-bottom:1px solid #1e1e1e;font-family:Arial,sans-serif;font-size:11px;color:#666;text-transform:uppercase;letter-spacing:1px;">Email</td>
                <td style="padding:11px 0;border-bottom:1px solid #1e1e1e;font-family:Arial,sans-serif;font-size:13px;"><a href="mailto:${p.email}" style="color:#F0C040;text-decoration:none;">${p.email}</a></td>
              </tr>
              <tr>
                <td style="padding:11px 0;border-bottom:1px solid #1e1e1e;font-family:Arial,sans-serif;font-size:11px;color:#666;text-transform:uppercase;letter-spacing:1px;">Phone</td>
                <td style="padding:11px 0;border-bottom:1px solid #1e1e1e;font-family:Arial,sans-serif;font-size:13px;color:#F5F0E8;">${p.phone || '&mdash;'}</td>
              </tr>
              ${p.preferred_time ? `
              <tr>
                <td style="padding:11px 0;border-bottom:1px solid #1e1e1e;font-family:Arial,sans-serif;font-size:11px;color:#666;text-transform:uppercase;letter-spacing:1px;">Call Hours</td>
                <td style="padding:11px 0;border-bottom:1px solid #1e1e1e;font-family:Arial,sans-serif;font-size:13px;color:#F5F0E8;">${p.preferred_time}</td>
              </tr>
              ` : ''}
            </table>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="padding:24px 32px;">
            <p style="margin:0 0 10px;font-family:Arial,sans-serif;font-size:10px;color:#666;text-transform:uppercase;letter-spacing:2px;">Message</p>
            <div style="background:#1a1a1a;border-radius:4px;padding:18px;font-family:Arial,sans-serif;font-size:13px;color:#CCCCCC;line-height:1.8;white-space:pre-wrap;">${p.message}</div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:18px 32px;border-top:1px solid #1e1e1e;">
            <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#333;">
              Submitted via hsluxuryproperties.com &nbsp;&bull;&nbsp; Hit reply to respond directly to ${p.name}
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>
  `.trim()
}
