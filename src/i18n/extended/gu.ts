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
    'દુબઈ, યુએઈથી ઉમરાહ પેકેજ — યાત્રા કાર્યક્રમ જુઓ અને અમારી ટીમને પૂછો.',
  familyPill: 'કુટુંબ તીર્થયાત્રા',
  familyTitle: 'સાથે ચાલો. સાથે પ્રાર્થના કરો. આશીર્વાદ લઈને પાછા આવો.',
  familyText:
    'ELITE ALHUSSAM સંપૂર્ણ કુટુંબ માટે હજ અને ઉમરાહની યોજના બનાવે — વયસ્ક, બાળક અને શિશુ — આરામદાયક રહેઠાણ અને દુબઈ, યુએઈ કચેરીનું માર્ગદર્શન. હજ સેવાઓ ફક્ત ભારતીય પાસપોર્ટ ધારકો માટે.',
  processEyebrow: 'સરળ પ્રક્રિયા',
  processTitle: 'પૂછપરછથી પ્રસ્થાન સુધી 3 પગલાં',
  processSub: 'રસને પુષ્ટ બુકિંગમાં બદલવા માટે સ્પષ્ટ વ્યવસાયિક પ્રક્રિયા.',
}

export const hero: Dictionary['hero'] = {
  licensedOperator: 'લાઇસensed ઓપરેટર',
  yearsExperience: '45+ વર્ષ',
  dubaiUae: 'દુબઈ, યુએઈ',
  faithQuote: '"લબ્બૈક અલ્લાહુમ્મા લબ્બૈક" — અમે ઈમાન સાથે તમારી સાથે ચાલીએ છીએ.',
  passportNote: 'હજ સેવાઓ – ફક્ત ભારતીય પાસપોર્ટ ધારકો',
  slides: [
    {
      headline: 'ઉમરાહ, સરળ — વર્ષભર ક્યારેય',
      subtext:
        'દુબઈ, યુએઈથી લવચીક ઉમરાહ પેકેજ — વ્યક્તિ, જોડી અને જૂથ — હોટેલ, પરિવહન અને વિઝા સહાય.',
      primaryCta: 'ઉમરાહ ડીલ જુઓ',
      secondaryCta: 'અમારી ટીમ સાથે વાત કરો',
      complianceTag: null,
    },
    {
      headline: 'દુબઈ, યુએઈથી પ્રોફેશનલ હજ અને ઉમરાહ પેકેજ',
      subtext:
        'ELITE ALHUSSAM 45+ વર્ષથી દુબઈ, યુએઈથી સંગઠિત તીર્થ પેકેજ — કુટુંબ અને જૂથ બુકિંગ માટે. હજ સેવાઓ ફક્ત ભારતીય પાસપોર્ટ ધારકો માટે.',
      primaryCta: 'તમારી હજ યાત્રા શરૂ કરો',
      secondaryCta: 'હજ પેકેજ જુઓ',
      complianceTag: 'હજ સેવાઓ – ફક્ત ભારતીય પાસપોર્ટ ધારકો',
    },
    {
      headline: 'કુટુંબ અને જૂથ બુકિંગ, સંભાળથી',
      subtext:
        'સંકલિત હોટેલ રૂમથી સહિયારું પરિવહન — અમે કુટુંબો માટે જૂથ હજ અને ઉમરાહ સરળ બનાવીએ.',
      primaryCta: 'કુટુંબ પેકેજ જુઓ',
      secondaryCta: 'અમારી ટીમ સાથે વાત કરો',
      complianceTag: null,
    },
    {
      headline: '45+ વર્ષની વિશ્વસનીય આતિથ્ય, દુબઈથી',
      subtext:
        'દુબઈમાં વાસ્તવિક લોકો — વ્યક્તિગત અથવા WhatsApp પર — દાયકાઓના અનુભવ સાથે.',
      primaryCta: 'દુબઈ ટીમને મળો',
      secondaryCta: 'અમારી ટીમ સાથે વાત કરો',
      complianceTag: null,
    },
  ],
}

export const packageCatalog: Dictionary['packageCatalog'] = {
  'umrah-economy': {
    title: 'આર્થિક ઉમરાહ પેકેજ',
    summary: 'દુબઈ, યુએઈથી સસ્તું અને આરામદાયક ઉમરાહ — હોટેલ, પરિવહન અને વિઝા સહાય.',
  },
  'umrah-premium': {
    title: 'પ્રીમિયમ ઉમરાહ પેકેજ',
    summary: 'નજીકના હોટેલ, સરળ ટ્રાન્સફર અને ધ્યાનપૂર્ણ સંભાળ.',
  },
  'umrah-group': {
    title: 'જૂથ ઉમરાહ પેકેજ',
    summary: 'સંકલિત જૂથ પ્રસ્થાન — સહિયારા હોટેલ, પરિવહન અને જૂથ નેતા.',
  },
  'umrah-customise': {
    title: 'તમારી ઉમરાહ કસ્ટમાઇઝ કરો',
    summary: 'તારીખો, જૂથ કદ અને હોટેલ શ્રેણી જણાવો — અમે યાત્રા કાર્યક્રમ તૈયાર કરીશું.',
  },
  'platinum-2025': {
    title: 'પ્લેટિનમ હજ પેકેજ',
    summary: 'પ્રીમિયમ હરમૈન રહેઠાણ, આધ્યાત્મિક માર્ગદર્શન અને વિશ્વસનીય આતિથ્ય.',
  },
  'classic-hajj-2025': {
    title: 'બિઝનેસ હજ પેકેજ',
    summary: 'ઉન્નત રહેઠાણ, પ્રાથમિકતા ટ્રાન્સફર — ભારતીય પાસપોર્ટ ધારકો માટે.',
  },
  'hajj-budget': {
    title: 'બજેટ હજ પેકેજ',
    summary: 'મૂલ્ય-કેન્દ્રિત હજ — ભારતીય પાસપોર્ટ ધારકો માટે.',
  },
}

export const packagesUi: Dictionary['packagesUi'] = {
  socialProof: '★★★★★ 4.9 · 200+ હાજીઓએ પસંદ કર્યું',
  dubaiDepartures: 'દુબઈ · યુએઈ પ્રસ્થાન',
  selectPassengers: 'મુસાફરો પસંદ કરો',
  travelingQuestion: 'કેટલા લોકો મુસાફરી કરે છે?',
  adultLabel: 'વયસ્ક',
  childLabel: 'બાળક',
  infantLabel: 'શિશુ',
  adultHint: '12+ વર્ષ',
  childHint: '2–12 વર્ષ',
  infantHint: '2 વર્ષથી નીચે',
  travellerSummary: 'મુસાફર સારાંશ',
  trustedPartner: 'વિશ્વસનીય મુસાફરી ભાગીદાર',
  trustedPartnerSub: 'સુરક્ષિત યાત્રા · આધ્યાત્મિક અનુભવ',
  secureEnquiry: 'સુરક્ષિત પૂછપરછ · તમારી માહિતી ખાનગી રહે',
  callPrefix: 'કૉલ',
  mostPopular: 'સૌથી લોકપ્રિય',
  recommended: 'ભલામણ',
  showingPackages: '{total} માંથી {shown} પેકેજ બતાવે છે',
  gridTrust: '500+ કુટુંબોએ વિશ્વાસ સાથે બુક કર્યું · દુબઈ, યુએઈ',
}
