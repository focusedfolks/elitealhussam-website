import type { Dictionary } from '../types'

export const homeExtended: Pick<
  Dictionary['home'],
  | 'packagesIntro'
  | 'familyPill'
  | 'familyTitle'
  | 'familyText'
  | 'processEyebrow'
  | 'processTitle'
  | 'processSub'
> = {
  packagesIntro:
    'दुबई, यूएई से उमराह पैकेज — यात्रा कार्यक्रम देखें और हमारी टीम से पूछताछ करें।',
  familyPill: 'पारिवारिक तीर्थयात्रा',
  familyTitle: 'साथ चलें। साथ प्रार्थना करें। आशीर्वाद लेकर लौटें।',
  familyText:
    'ELITE ALHUSSAM पूरे परिवार के लिए हज और उमराह की योजना बनाता है — वयस्क, बच्चे और शिशु — आरामदायक ठहराव और दुबई, यूएई कार्यालय से विश्वसनीय मार्गदर्शन। हज सेवाएँ केवल भारतीय पासपोर्ट धारकों के लिए।',
  processEyebrow: 'सरल प्रक्रिया',
  processTitle: 'पूछताछ से प्रस्थान तक 3 चरण',
  processSub:
    'रुचि को पुष्ट बुकिंग में बदलने के लिए स्पष्ट व्यावसायिक प्रक्रिया।',
}

export const hero: Dictionary['hero'] = {
  licensedOperator: 'लाइसेंस प्राप्त ऑपरेटर',
  yearsExperience: '45+ वर्ष',
  dubaiUae: 'दुबई, यूएई',
  faithQuote: '"लब्बैक अल्लाहुम्मा लब्बैक" — हम ईमान के साथ आपके साथ चलते हैं।',
  passportNote: 'हज सेवाएँ – केवल भारतीय पासपोर्ट धारक',
  slides: [
    {
      headline: 'उमराह, सरल — साल भर कभी भी',
      subtext:
        'दुबई, यूएई से लचीले उमराह पैकेज — व्यक्ति, जोड़े और समूह — होटल, परिवहन और वीज़ा पूर्ण सहायता।',
      primaryCta: 'उमराह डील देखें',
      secondaryCta: 'हमारी टीम से बात करें',
      complianceTag: null,
    },
    {
      headline: 'दुबई, यूएई से पेशेवर हज और उमराह पैकेज',
      subtext:
        'ELITE ALHUSSAM 45+ वर्षों से दुबई, यूएई से संगठित तीर्थ पैकेज — परिवार और समूह बुकिंग के लिए। हज सेवाएँ केवल भारतीय पासपोर्ट धारकों के लिए।',
      primaryCta: 'अपनी हज यात्रा शुरू करें',
      secondaryCta: 'हज पैकेज देखें',
      complianceTag: 'हज सेवाएँ – केवल भारतीय पासपोर्ट धारक',
    },
    {
      headline: 'परिवार और समूह बुकिंग, सावधानी से',
      subtext:
        'समन्वित होटल कमरे से साझा परिवहन तक — हम परिवारों के लिए समूह हज और उमराह यात्रा सरल बनाते हैं।',
      primaryCta: 'पारिवारिक पैकेज देखें',
      secondaryCta: 'हमारी टीम से बात करें',
      complianceTag: null,
    },
    {
      headline: '45+ वर्षों की विश्वसनीय आतिथ्य, दुबई से',
      subtext:
        'दुबई में वास्तविक लोग — व्यक्तिगत या WhatsApp पर — दशकों के अनुभव के साथ।',
      primaryCta: 'दुबई टीम से मिलें',
      secondaryCta: 'हमारी टीम से बात करें',
      complianceTag: null,
    },
    {
      headline: '200+ से अधिक हाजियों ने चुना',
      subtext:
        'दुबई और यूएई भर के परिवार Elite Alhussam पर क्यों भरोसा करते हैं, जानें।',
      primaryCta: 'उपलब्ध तिथियाँ देखें',
      secondaryCta: 'हज पैकेज देखें',
      complianceTag: null,
    },
  ],
}

export const packageCatalog: Dictionary['packageCatalog'] = {
  'umrah-economy': {
    title: 'आर्थिक उमराह पैकेज',
    summary: 'दुबई, यूएई से सस्ती और आरामदायक उमराह — होटल, परिवहन और वीज़ा सहायता।',
  },
  'umrah-premium': {
    title: 'प्रीमियम उमराह पैकेज',
    summary: 'नज़दीकी होटल, सुचारु ट्रांसफर और ध्यानपूर्ण देखभाल।',
  },
  'umrah-group': {
    title: 'समूह उमराह पैकेज',
    summary: 'समन्वित समूह प्रस्थान — साझा होटल, परिवहन और समूह नेता।',
  },
  'umrah-customise': {
    title: 'अपनी उमराह अनुकूलित करें',
    summary: 'तिथियाँ, समूह आकार और होटल श्रेणी बताएँ — हम यात्रा कार्यक्रम तैयार करेंगे।',
  },
  'platinum-2025': {
    title: 'प्लैटिनम हज पैकेज',
    summary: 'प्रीमियम हरमैन ठहराव, आध्यात्मिक मार्गदर्शन और विश्वसनीय आतिथ्य।',
  },
  'classic-hajj-2025': {
    title: 'बिज़नेस हज पैकेज',
    summary: 'उन्नत ठहराव, प्राथमिकता ट्रांसफर — भारतीय पासपोर्ट धारकों के लिए।',
  },
  'hajj-budget': {
    title: 'बजट हज पैकेज',
    summary: 'मूल्य-केंद्रित हज — भारतीय पासपोर्ट धारकों के लिए।',
  },
}

export const packagesUi: Dictionary['packagesUi'] = {
  socialProof: '★★★★★ 4.9 · 200+ हाजियों ने चुना',
  dubaiDepartures: 'दुबई · यूएई प्रस्थान',
  selectPassengers: 'यात्रियों का चयन',
  travelingQuestion: 'कितने लोग यात्रा कर रहे हैं?',
  adultLabel: 'वयस्क',
  childLabel: 'बच्चा',
  infantLabel: 'शिशु',
  adultHint: '12+ वर्ष',
  childHint: '2–12 वर्ष',
  infantHint: '2 वर्ष से कम',
  travellerSummary: 'यात्री सारांश',
  trustedPartner: 'विश्वसनीय यात्रा साथी',
  trustedPartnerSub: 'सुरक्षित यात्रा · आध्यात्मिक अनुभव',
  secureEnquiry: 'सुरक्षित पूछताछ · आपका डेटा निजी रहता है',
  callPrefix: 'कॉल',
  mostPopular: 'सबसे लोकप्रिय',
  recommended: 'अनुशंसित',
  showingPackages: '{total} में से {shown} पैकेज दिखाए जा रहे हैं',
  gridTrust: '500+ परिवारों ने विश्वास के साथ बुक किया · दुबई, यूएई',
}
