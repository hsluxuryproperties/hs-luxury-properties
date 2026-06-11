'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const gold = '#F0C040'
const darkGold = '#D4A017'
const black = '#0A0A0A'
const dark = '#111111'
const muted = '#888888'
const cream = '#F5F0E8'
const surface = '#161616'

type Locale = 'en' | 'gr'

function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>('en')

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)hs_locale=([^;]+)/)
    setLocale((match?.[1] as Locale) ?? 'en')
  }, [])

  return locale
}

const T = {
  en: {
    eyebrow: 'Support & Guidance',
    title: 'Frequently Asked Questions',
    intro:
      "Everything you need to know about buying, selling, and investing with HS Luxury Properties. Can't find what you're looking for? Speak with our team below.",
    stillHaveQuestions: 'Still Have Questions?',
    speakWithTeam: 'Speak With Our Team',
    speakWithTeamDesc:
      'Our advisers are available to answer any questions about our properties, services, or investment opportunities.',
    messageReceived: 'Message Received',
    messageReceivedDesc:
      'Thank you for reaching out. A member of our team will be in touch shortly.',
    fullName: 'Full Name *',
    emailAddress: 'Email Address *',
    phoneNumber: 'Phone Number',
    yourQuestion: 'Your Question *',
    sendMessage: 'Send Message',
    sending: 'Sending…',
    emailError: 'Please enter a valid email address.',
    phoneError: 'Please enter a valid phone number.',
    faqs: [
      {
        category: 'Buying a Property',
        icon: '⌂',
        questions: [
          {
            q: 'What types of properties does HS Luxury Properties offer?',
            a: 'We specialise in premium residential and investment properties — from bespoke villas and penthouses to curated apartment developments and high-yield investor portfolios. Every listing is personally vetted to meet our luxury standards.',
          },
          {
            q: 'Do I need to be physically present to purchase a property?',
            a: 'Not necessarily. We regularly assist international and overseas buyers through virtual tours, video consultations, and remote contract processes. Our team handles all coordination on your behalf, keeping you fully informed at every stage.',
          },
          {
            q: 'What additional costs should I expect when buying?',
            a: 'Beyond the purchase price, buyers typically account for stamp duty (SDLT), solicitor fees, survey costs, and mortgage arrangement fees if applicable. For investment properties, we provide a full cost breakdown before you commit to anything.',
          },
          {
            q: 'Can HS Luxury Properties help me find properties not publicly listed?',
            a: 'Yes. A significant portion of our inventory is off-market — available exclusively to our registered clients. Contact us directly to access our private listings and be first to know about new acquisitions.',
          },
          {
            q: 'How do I arrange a viewing?',
            a: 'Use the contact form on any individual property page to request a viewing, or reach us directly via phone or email. We offer in-person, private, and virtual viewing options, scheduled at your convenience.',
          },
        ],
      },
      {
        category: 'Selling a Property',
        icon: '◈',
        questions: [
          {
            q: 'How does HS Luxury Properties market my home?',
            a: 'We combine professional photography, immersive virtual tours, targeted digital campaigns, and our curated network of high-net-worth buyers. Your property is presented to the right audience — not just listed on a portal and forgotten.',
          },
          {
            q: 'How do you determine the asking price?',
            a: 'We conduct a comprehensive market appraisal, analysing recent comparable sales, current demand, and the unique attributes of your property. You receive a detailed valuation report with a recommended pricing strategy tailored to your goals.',
          },
          {
            q: 'How long does it typically take to sell a luxury property?',
            a: 'Timescales vary depending on the property type, price bracket, and market conditions. With the right pricing and presentation, many of our properties find qualified buyers within 4–12 weeks. We keep you updated throughout.',
          },
          {
            q: 'What fees do you charge for selling?',
            a: 'Our commission structure is transparent and agreed upfront before any marketing begins. We offer competitive rates commensurate with the premium, personalised service we provide. Contact us for a no-obligation conversation.',
          },
        ],
      },
      {
        category: 'The Process',
        icon: '◎',
        questions: [
          {
            q: 'What happens after I submit an offer?',
            a: 'Once an offer is accepted, both parties instruct solicitors and the legal process begins. This includes title searches, contract exchange, and ultimately completion. Our team liaises closely with all parties to keep the process moving efficiently.',
          },
          {
            q: 'How long does the buying process take from offer to completion?',
            a: 'For a straightforward purchase, the legal process typically takes 8–16 weeks. This can be shorter for cash buyers or longer for complex chains. We proactively manage timelines and flag any potential delays early.',
          },
          {
            q: 'Do you work with solicitors and mortgage brokers?',
            a: 'Yes. We have established relationships with specialist property solicitors and independent mortgage advisers who understand the luxury market. We can make introductions, though you are always free to use your own professionals.',
          },
          {
            q: 'What is the reservation process for new-build or off-plan properties?',
            a: 'Off-plan purchases typically require a reservation fee to secure your unit, followed by a formal exchange of contracts within a set period. We walk you through each milestone and ensure you fully understand your obligations before signing anything.',
          },
        ],
      },
      {
        category: 'Investment & Finance',
        icon: '◇',
        questions: [
          {
            q: 'Are the properties on your site suitable for buy-to-let investment?',
            a: 'Many of our listings are positioned specifically as investment opportunities, with projected rental yields, occupancy data, and area growth analysis included in the property details. Look for properties tagged as "Investor" in our listings.',
          },
          {
            q: 'Can overseas buyers access UK mortgages?',
            a: 'Yes, though the options are more limited than for UK residents. We work with specialist international mortgage advisers who can assess your situation and identify lenders comfortable with overseas applicants.',
          },
          {
            q: 'What rental yields can I expect from a luxury property?',
            a: 'Yields vary by location, property type, and management model. Prime central locations typically offer lower but highly stable yields (3–5%), while commuter belt and regional city properties can deliver 5–8%+. We provide realistic, evidence-based projections for each listing.',
          },
          {
            q: 'Do you offer property management services after purchase?',
            a: 'We can connect you with trusted, vetted property management partners for lettings, maintenance, and tenant relations. Our role does not end at completion — we aim to be a long-term partner in your property journey.',
          },
        ],
      },
      {
        category: 'Working With Us',
        icon: '◉',
        questions: [
          {
            q: 'Is HS Luxury Properties regulated?',
            a: 'Yes. We operate in full compliance with UK property regulations, including Anti-Money Laundering (AML) requirements. We are registered with the relevant authorities and adhere to a strict code of professional conduct.',
          },
          {
            q: 'What areas do you cover?',
            a: 'Our primary focus is the UK market, with particular strength in London and the Home Counties. We also have connections across key European markets. If you have a specific location in mind, contact us — we will tell you honestly whether we can help.',
          },
          {
            q: 'How do I register as a client?',
            a: 'Simply reach out via the contact form below or call us directly. We will arrange an initial consultation — no obligation, no pressure — to understand your requirements and explain how we can assist.',
          },
          {
            q: 'Is my personal information kept confidential?',
            a: 'Absolutely. Client confidentiality is fundamental to how we operate. We never share your details with third parties without explicit consent, and all data is handled in accordance with UK GDPR legislation.',
          },
        ],
      },
    ],
  },
  gr: {
    eyebrow: 'Υποστήριξη & Καθοδήγηση',
    title: 'Συχνές Ερωτήσεις',
    intro:
      'Όλα όσα χρειάζεται να γνωρίζετε για την αγορά, την πώληση και τις επενδύσεις με την HS Luxury Properties. Δεν βρίσκετε αυτό που ψάχνετε; Επικοινωνήστε με την ομάδα μας παρακάτω.',
    stillHaveQuestions: 'Έχετε Ακόμα Ερωτήσεις;',
    speakWithTeam: 'Μιλήστε με την Ομάδα μας',
    speakWithTeamDesc:
      'Οι σύμβουλοί μας είναι διαθέσιμοι να απαντήσουν σε οποιαδήποτε ερώτηση σχετικά με τα ακίνητα, τις υπηρεσίες ή τις επενδυτικές ευκαιρίες μας.',
    messageReceived: 'Το Μήνυμά σας Ελήφθη',
    messageReceivedDesc:
      'Σας ευχαριστούμε για την επικοινωνία. Ένα μέλος της ομάδας μας θα επικοινωνήσει σύντομα μαζί σας.',
    fullName: 'Ονοματεπώνυμο *',
    emailAddress: 'Διεύθυνση Email *',
    phoneNumber: 'Τηλέφωνο',
    yourQuestion: 'Η Ερώτησή σας *',
    sendMessage: 'Αποστολή Μηνύματος',
    sending: 'Αποστολή…',
    emailError: 'Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email.',
    phoneError: 'Παρακαλώ εισάγετε έναν έγκυρο αριθμό τηλεφώνου.',
    faqs: [
      {
        category: 'Αγορά Ακινήτου',
        icon: '⌂',
        questions: [
          {
            q: 'Τι είδους ακίνητα προσφέρει η HS Luxury Properties;',
            a: 'Ειδικευόμαστε σε κορυφαία κατοικημένα και επενδυτικά ακίνητα — από εξατομικευμένες βίλες και ρετιρέ μέχρι επιλεγμένα συγκροτήματα διαμερισμάτων και χαρτοφυλάκια επενδυτών υψηλής απόδοσης. Κάθε καταχώρηση ελέγχεται προσωπικά ώστε να πληροί τα πρότυπα πολυτέλειάς μας.',
          },
          {
            q: 'Χρειάζεται να είμαι φυσικά παρών/παρούσα για να αγοράσω ένα ακίνητο;',
            a: 'Όχι απαραίτητα. Βοηθάμε τακτικά διεθνείς και αλλοδαπούς αγοραστές μέσω εικονικών περιηγήσεων, βιντεοκλήσεων και απομακρυσμένων διαδικασιών σύμβασης. Η ομάδα μας αναλαμβάνει όλο τον συντονισμό εκ μέρους σας, κρατώντας σας πλήρως ενήμερους σε κάθε στάδιο.',
          },
          {
            q: 'Ποια επιπλέον έξοδα πρέπει να αναμένω κατά την αγορά;',
            a: 'Πέρα από την τιμή αγοράς, οι αγοραστές συνήθως υπολογίζουν φόρο μεταβίβασης (SDLT), αμοιβές δικηγόρου, κόστη πραγματογνωμοσύνης και έξοδα διαχείρισης στεγαστικού δανείου, εφόσον ισχύει. Για επενδυτικά ακίνητα, παρέχουμε πλήρη ανάλυση κόστους πριν δεσμευτείτε σε οτιδήποτε.',
          },
          {
            q: 'Μπορεί η HS Luxury Properties να με βοηθήσει να βρω ακίνητα που δεν είναι δημοσίως καταχωρημένα;',
            a: 'Ναι. Σημαντικό μέρος του χαρτοφυλακίου μας είναι εκτός αγοράς — διαθέσιμο αποκλειστικά στους εγγεγραμμένους πελάτες μας. Επικοινωνήστε απευθείας μαζί μας για πρόσβαση στις ιδιωτικές μας καταχωρήσεις και να είστε οι πρώτοι που θα ενημερώνεστε για νέες αποκτήσεις.',
          },
          {
            q: 'Πώς μπορώ να κανονίσω μια επίσκεψη;',
            a: 'Χρησιμοποιήστε τη φόρμα επικοινωνίας σε οποιαδήποτε σελίδα ακινήτου για να ζητήσετε επίσκεψη, ή επικοινωνήστε απευθείας μαζί μας τηλεφωνικά ή μέσω email. Προσφέρουμε επιλογές προσωπικής, ιδιωτικής και εικονικής επίσκεψης, προγραμματισμένες κατά τη δική σας βολή.',
          },
        ],
      },
      {
        category: 'Πώληση Ακινήτου',
        icon: '◈',
        questions: [
          {
            q: 'Πώς προωθεί η HS Luxury Properties το ακίνητό μου;',
            a: 'Συνδυάζουμε επαγγελματική φωτογράφιση, καθηλωτικές εικονικές περιηγήσεις, στοχευμένες ψηφιακές καμπάνιες και το επιλεγμένο μας δίκτυο αγοραστών υψηλής περιουσίας. Το ακίνητό σας παρουσιάζεται στο κατάλληλο κοινό — όχι απλώς να αναρτηθεί σε μια πλατφόρμα και να ξεχαστεί.',
          },
          {
            q: 'Πώς καθορίζετε την τιμή πώλησης;',
            a: 'Διενεργούμε ολοκληρωμένη εκτίμηση αγοράς, αναλύοντας πρόσφατες συγκρίσιμες πωλήσεις, την τρέχουσα ζήτηση και τα μοναδικά χαρακτηριστικά του ακινήτου σας. Λαμβάνετε μια αναλυτική έκθεση εκτίμησης με προτεινόμενη στρατηγική τιμολόγησης προσαρμοσμένη στους στόχους σας.',
          },
          {
            q: 'Πόσος χρόνος χρειάζεται συνήθως για την πώληση ενός ακινήτου πολυτελείας;',
            a: "Οι χρόνοι ποικίλλουν ανάλογα με τον τύπο του ακινήτου, το εύρος τιμής και τις συνθήκες της αγοράς. Με τη σωστή τιμολόγηση και παρουσίαση, πολλά από τα ακίνητά μας βρίσκουν κατάλληλους αγοραστές εντός 4–12 εβδομάδων. Σας ενημερώνουμε καθ' όλη τη διάρκεια της διαδικασίας.",
          },
          {
            q: 'Ποιες χρεώσεις ισχύουν για την πώληση;',
            a: 'Η δομή προμηθειών μας είναι διαφανής και συμφωνείται εκ των προτέρων πριν ξεκινήσει οποιαδήποτε προώθηση. Προσφέρουμε ανταγωνιστικά ποσοστά ανάλογα με την κορυφαία, εξατομικευμένη υπηρεσία που παρέχουμε. Επικοινωνήστε μαζί μας για μια συζήτηση χωρίς δέσμευση.',
          },
        ],
      },
      {
        category: 'Η Διαδικασία',
        icon: '◎',
        questions: [
          {
            q: 'Τι συμβαίνει αφού υποβάλω μια προσφορά;',
            a: 'Μόλις γίνει αποδεκτή μια προσφορά, και τα δύο μέρη αναθέτουν την υπόθεση σε δικηγόρους και ξεκινά η νομική διαδικασία. Αυτή περιλαμβάνει έλεγχο τίτλων ιδιοκτησίας, ανταλλαγή συμβολαίων και, τελικά, ολοκλήρωση. Η ομάδα μας συνεργάζεται στενά με όλα τα μέρη ώστε η διαδικασία να προχωρά αποτελεσματικά.',
          },
          {
            q: 'Πόσο διαρκεί η διαδικασία αγοράς από την προσφορά μέχρι την ολοκλήρωση;',
            a: 'Για μια απλή αγορά, η νομική διαδικασία διαρκεί συνήθως 8–16 εβδομάδες. Αυτό μπορεί να είναι συντομότερο για αγοραστές με μετρητά ή μεγαλύτερο σε περίπλοκες αλυσίδες συναλλαγών. Διαχειριζόμαστε προληπτικά τα χρονοδιαγράμματα και επισημαίνουμε έγκαιρα πιθανές καθυστερήσεις.',
          },
          {
            q: 'Συνεργάζεστε με δικηγόρους και μεσίτες στεγαστικών δανείων;',
            a: 'Ναι. Έχουμε καθιερωμένες συνεργασίες με εξειδικευμένους δικηγόρους ακινήτων και ανεξάρτητους συμβούλους στεγαστικών δανείων που γνωρίζουν την αγορά πολυτελείας. Μπορούμε να κάνουμε συστάσεις, ωστόσο είστε πάντα ελεύθεροι να χρησιμοποιήσετε τους δικούς σας επαγγελματίες.',
          },
          {
            q: 'Ποια είναι η διαδικασία κράτησης για νεόδμητα ή υπό κατασκευή ακίνητα;',
            a: 'Οι αγορές υπό κατασκευή απαιτούν συνήθως μια προκαταβολή κράτησης για τη δέσμευση της μονάδας σας, ακολουθούμενη από επίσημη ανταλλαγή συμβολαίων εντός συγκεκριμένου χρονικού διαστήματος. Σας καθοδηγούμε σε κάθε στάδιο και διασφαλίζουμε ότι κατανοείτε πλήρως τις υποχρεώσεις σας πριν υπογράψετε οτιδήποτε.',
          },
        ],
      },
      {
        category: 'Επενδύσεις & Χρηματοδότηση',
        icon: '◇',
        questions: [
          {
            q: 'Είναι τα ακίνητα στον ιστότοπό σας κατάλληλα για επενδυτική αγορά προς ενοικίαση;',
            a: 'Πολλές από τις καταχωρήσεις μας αναδεικνύονται ειδικά ως επενδυτικές ευκαιρίες, με προβλεπόμενες αποδόσεις ενοικίασης, στοιχεία πληρότητας και ανάλυση ανάπτυξης της περιοχής να περιλαμβάνονται στις λεπτομέρειες του ακινήτου. Αναζητήστε ακίνητα με την ένδειξη «Investor» στις καταχωρήσεις μας.',
          },
          {
            q: 'Μπορούν οι αλλοδαποί αγοραστές να αποκτήσουν στεγαστικό δάνειο στο Ηνωμένο Βασίλειο;',
            a: 'Ναι, αν και οι επιλογές είναι πιο περιορισμένες σε σχέση με τους κατοίκους του Ηνωμένου Βασιλείου. Συνεργαζόμαστε με εξειδικευμένους διεθνείς συμβούλους στεγαστικών δανείων που μπορούν να αξιολογήσουν την περίπτωσή σας και να εντοπίσουν δανειστές που εξυπηρετούν αλλοδαπούς αιτούντες.',
          },
          {
            q: 'Ποιες αποδόσεις ενοικίασης μπορώ να αναμένω από ένα ακίνητο πολυτελείας;',
            a: 'Οι αποδόσεις διαφέρουν ανάλογα με την τοποθεσία, τον τύπο ακινήτου και το μοντέλο διαχείρισης. Οι κεντρικές, κορυφαίες τοποθεσίες προσφέρουν συνήθως χαμηλότερες αλλά πολύ σταθερές αποδόσεις (3–5%), ενώ ακίνητα σε προαστιακές ζώνες και επαρχιακές πόλεις μπορούν να αποδώσουν 5–8%+ ή περισσότερο. Παρέχουμε ρεαλιστικές, τεκμηριωμένες προβλέψεις για κάθε καταχώρηση.',
          },
          {
            q: 'Προσφέρετε υπηρεσίες διαχείρισης ακινήτων μετά την αγορά;',
            a: 'Μπορούμε να σας συνδέσουμε με αξιόπιστους, ελεγμένους συνεργάτες διαχείρισης ακινήτων για ενοικιάσεις, συντήρηση και σχέσεις με ενοικιαστές. Ο ρόλος μας δεν τελειώνει με την ολοκλήρωση της αγοράς — στόχος μας είναι να είμαστε μακροπρόθεσμος συνεργάτης στο ταξίδι σας στην ακίνητη περιουσία.',
          },
        ],
      },
      {
        category: 'Συνεργασία Μαζί Μας',
        icon: '◉',
        questions: [
          {
            q: 'Είναι η HS Luxury Properties εποπτευόμενη/αδειοδοτημένη;',
            a: 'Ναι. Λειτουργούμε σε πλήρη συμμόρφωση με τους κανονισμούς ακινήτων του Ηνωμένου Βασιλείου, συμπεριλαμβανομένων των απαιτήσεων κατά της νομιμοποίησης εσόδων από παράνομες δραστηριότητες (AML). Είμαστε εγγεγραμμένοι στις αρμόδιες αρχές και τηρούμε αυστηρό κώδικα επαγγελματικής δεοντολογίας.',
          },
          {
            q: 'Ποιες περιοχές καλύπτετε;',
            a: 'Η κύρια εστίασή μας είναι η αγορά του Ηνωμένου Βασιλείου, με ιδιαίτερη παρουσία στο Λονδίνο και τις γύρω κομητείες (Home Counties). Διαθέτουμε επίσης συνδέσεις σε βασικές ευρωπαϊκές αγορές. Αν έχετε κατά νου μια συγκεκριμένη τοποθεσία, επικοινωνήστε μαζί μας — θα σας πούμε με ειλικρίνεια αν μπορούμε να βοηθήσουμε.',
          },
          {
            q: 'Πώς μπορώ να εγγραφώ ως πελάτης;',
            a: 'Απλώς επικοινωνήστε μέσω της φόρμας επικοινωνίας παρακάτω ή καλέστε μας απευθείας. Θα κανονίσουμε μια αρχική συνάντηση — χωρίς δέσμευση, χωρίς πίεση — για να κατανοήσουμε τις ανάγκες σας και να σας εξηγήσουμε πώς μπορούμε να βοηθήσουμε.',
          },
          {
            q: 'Διατηρούνται εμπιστευτικά τα προσωπικά μου στοιχεία;',
            a: 'Ασφαλώς. Η εμπιστευτικότητα των πελατών είναι θεμελιώδης για τον τρόπο λειτουργίας μας. Ποτέ δεν μοιραζόμαστε τα στοιχεία σας με τρίτους χωρίς ρητή συγκατάθεση, και όλα τα δεδομένα διαχειρίζονται σύμφωνα με τη νομοθεσία UK GDPR.',
          },
        ],
      },
    ],
  },
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      style={{
        borderBottom: `1px solid #2a2a2a`,
        transition: 'all 0.2s ease',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1.5rem',
          padding: '1.5rem 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '1.15rem',
            fontWeight: 500,
            lineHeight: 1.4,
            color: isOpen ? gold : cream,
            transition: 'color 0.2s ease',
            flex: 1,
          }}
        >
          {question}
        </span>
        <span
          style={{
            color: gold,
            fontSize: '1.25rem',
            fontWeight: 300,
            lineHeight: 1,
            flexShrink: 0,
            marginTop: '2px',
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            display: 'inline-block',
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: isOpen ? '400px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.4s ease',
        }}
      >
        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.9rem',
            lineHeight: 1.8,
            color: muted,
            paddingBottom: '1.5rem',
            margin: 0,
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  const locale = useLocale()
  const t = T[locale]

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})
  const [activeCategory, setActiveCategory] = useState(0)

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [phoneError, setPhoneError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhone = (phone: string) => {
    if (!phone) return true
    const re = /^[\d\s\+\-\(\)]{7,20}$/
    return re.test(phone)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let valid = true

    if (!validateEmail(formData.email)) {
      setEmailError(t.emailError)
      valid = false
    } else {
      setEmailError('')
    }

    if (!validatePhone(formData.phone)) {
      setPhoneError(t.phoneError)
      valid = false
    } else {
      setPhoneError('')
    }

    if (!valid) return

    setSubmitting(true)
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      await supabase.from('contact_submissions').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message,
          property_code: null,
        },
      ])
      setSubmitted(true)
    } catch {
      // silent fail — UX still shows success
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main style={{ background: black, minHeight: '100vh' }}>

        {/* ── Hero ── */}
        <section
          style={{
            background: dark,
            borderBottom: `1px solid #1e1e1e`,
            padding: '6rem 1.5rem 4rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              color: gold,
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}
          >
            {t.eyebrow}
          </p>
          <h1
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 400,
              color: cream,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}
          >
            {t.title}
          </h1>
          <p
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.875rem',
              color: muted,
              maxWidth: '540px',
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            {t.intro}
          </p>
        </section>

        {/* ── Category Tabs ── */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 40,
            background: dark,
            borderBottom: `1px solid #1e1e1e`,
            overflowX: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              maxWidth: '900px',
              margin: '0 auto',
              padding: '0 1.5rem',
            }}
          >
            {t.faqs.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(idx)}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: activeCategory === idx ? gold : muted,
                  background: 'none',
                  border: 'none',
                  borderBottom: activeCategory === idx ? `2px solid ${gold}` : '2px solid transparent',
                  padding: '1.25rem 1rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                }}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* ── FAQ Accordion ── */}
        <section
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            padding: '4rem 1.5rem',
          }}
        >
          {/* Category heading */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '2rem',
                fontWeight: 400,
                color: cream,
                marginBottom: '0.5rem',
              }}
            >
              {t.faqs[activeCategory].category}
            </h2>
            <div style={{ width: '48px', height: '1px', background: gold }} />
          </div>

          {/* Questions */}
          {t.faqs[activeCategory].questions.map((item, qIdx) => {
            const key = `${activeCategory}-${qIdx}`
            return (
              <AccordionItem
                key={key}
                question={item.q}
                answer={item.a}
                isOpen={!!openItems[key]}
                onToggle={() => toggleItem(key)}
              />
            )
          })}
        </section>

        {/* ── Divider ── */}
        <div
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            padding: '0 1.5rem',
          }}
        >
          <div
            style={{
              height: '1px',
              background: `linear-gradient(to right, transparent, #2a2a2a 20%, #2a2a2a 80%, transparent)`,
            }}
          />
        </div>

        {/* ── Contact Form ── */}
        <section
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            padding: '5rem 1.5rem 6rem',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.25em',
                color: gold,
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              {t.stillHaveQuestions}
            </p>
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)',
                fontWeight: 400,
                color: cream,
                marginBottom: '1rem',
              }}
            >
              {t.speakWithTeam}
            </h2>
            <p
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.85rem',
                color: muted,
                lineHeight: 1.8,
                maxWidth: '480px',
                margin: '0 auto',
              }}
            >
              {t.speakWithTeamDesc}
            </p>
          </div>

          {submitted ? (
            <div
              style={{
                textAlign: 'center',
                padding: '3rem 2rem',
                border: `1px solid #2a2a2a`,
                background: surface,
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  border: `1px solid ${gold}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: gold,
                  fontSize: '1.25rem',
                }}
              >
                ✓
              </div>
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '1.75rem',
                  fontWeight: 400,
                  color: cream,
                  marginBottom: '0.75rem',
                }}
              >
                {t.messageReceived}
              </h3>
              <p
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.85rem',
                  color: muted,
                  lineHeight: 1.8,
                }}
              >
                {t.messageReceivedDesc}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Name + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '0.65rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: muted,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {t.fullName}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      background: surface,
                      border: `1px solid #2a2a2a`,
                      color: cream,
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '0.85rem',
                      padding: '0.85rem 1rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '0.65rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: muted,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {t.emailAddress}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      if (emailError) setEmailError('')
                    }}
                    style={{
                      width: '100%',
                      background: surface,
                      border: `1px solid ${emailError ? '#c0392b' : '#2a2a2a'}`,
                      color: cream,
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '0.85rem',
                      padding: '0.85rem 1rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                  {emailError && (
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.72rem', color: '#c0392b', marginTop: '0.35rem' }}>
                      {emailError}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: muted,
                    marginBottom: '0.5rem',
                  }}
                >
                  {t.phoneNumber}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value })
                    if (phoneError) setPhoneError('')
                  }}
                  style={{
                    width: '100%',
                    background: surface,
                    border: `1px solid ${phoneError ? '#c0392b' : '#2a2a2a'}`,
                    color: cream,
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.85rem',
                    padding: '0.85rem 1rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                {phoneError && (
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.72rem', color: '#c0392b', marginTop: '0.35rem' }}>
                    {phoneError}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: muted,
                    marginBottom: '0.5rem',
                  }}
                >
                  {t.yourQuestion}
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    background: surface,
                    border: `1px solid #2a2a2a`,
                    color: cream,
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.85rem',
                    padding: '0.85rem 1rem',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Submit */}
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '0.5rem' }}>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: black,
                    background: submitting ? darkGold : gold,
                    border: 'none',
                    padding: '1rem 3rem',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s ease',
                    minWidth: '220px',
                  }}
                >
                  {submitting ? t.sending : t.sendMessage}
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
