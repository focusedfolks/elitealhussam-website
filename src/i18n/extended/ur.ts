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
    'دبئی، یو اے ای سے عمرہ پیکج — سفرنامہ دیکھیں اور ہماری ٹیم سے رابطہ کریں۔',
  familyPill: 'خاندانی زیارت',
  familyTitle: 'ساتھ چلیں۔ ساتھ دعا کریں۔ برکت لے کر لوٹیں۔',
  familyText:
    'ELITE ALHUSSAM پورے خاندان کے لیے حج و عمرہ کی منصوبہ بندی — بالغ، بچے اور شیر خوار — آرام دہ قیام اور دبئی، یو اے ای دفتر سے قابل اعتماد رہنمائی۔ حج خدمات صرف بھارتی پاسپورٹ holders کے لیے۔',
  processEyebrow: 'آسان عمل',
  processTitle: 'استفسار سے روانگی تک 3 مراحل',
  processSub: 'دلچسپی کو تصدیق شدہ بکنگ میں بدلنے کے لیے واضح کاروباری عمل۔',
}

export const hero: Dictionary['hero'] = {
  licensedOperator: 'لائسنس یافتہ آپریٹر',
  yearsExperience: '45+ سال',
  dubaiUae: 'دبئی، یو اے ای',
  faithQuote: '"لبیک اللہم لبیک" — ہم ایمان کے ساتھ آپ کے ساتھ چلتے ہیں۔',
  passportNote: 'حج خدمات – صرف بھارتی پاسپورٹ holders',
  slides: [
    {
      headline: 'عمرہ، آسان — سال بھر کسی بھی وقت',
      subtext:
        'دبئی، یو اے ای سے لچکدار عمرہ پیکج — افراد، جوڑے اور گروپ — ہوٹل، نقل و حمل اور ویزا مکمل سہولت۔',
      primaryCta: 'عمرہ ڈیل دیکھیں',
      secondaryCta: 'ہماری ٹیم سے بات کریں',
      complianceTag: null,
    },
    {
      headline: 'دبئی، یو اے ای سے پیشہ ورانہ حج و عمرہ پیکج',
      subtext:
        'ELITE ALHUSSAM 45+ سالوں سے دبئی، یو اے ای سے منظم زیارتی پیکج — خاندان اور گروپ بکنگ کے لیے۔ حج خدمات صرف بھارتی پاسپورٹ holders کے لیے۔',
      primaryCta: 'اپنا حج سفر شروع کریں',
      secondaryCta: 'حج پیکج دیکھیں',
      complianceTag: 'حج خدمات – صرف بھارتی پاسپورٹ holders',
    },
    {
      headline: 'خاندان اور گروپ بکنگ، احتیاط سے',
      subtext:
        'ہم آہنگ ہوٹل کمرے سے مشترکہ نقل و حمل تک — ہم خاندانوں کے لیے گروپ حج و عمرہ آسان بناتے ہیں۔',
      primaryCta: 'خاندانی پیکج دیکھیں',
      secondaryCta: 'ہماری ٹیم سے بات کریں',
      complianceTag: null,
    },
    {
      headline: '45+ سالوں کی قابل اعتماد مہمان نوازی، دبئی سے',
      subtext:
        'دبئی میں حقیقی لوگ — ذاتی یا WhatsApp پر — دہائیوں کے تجربے کے ساتھ۔',
      primaryCta: 'دبئی ٹیم سے ملیں',
      secondaryCta: 'ہماری ٹیم سے بات کریں',
      complianceTag: null,
    },
    {
      headline: '200+ سے زائد حاجیوں نے منتخب کیا',
      subtext:
        'دبئی اور یو اے ای بھر کے خاندان Elite Alhussam پر کیوں بھروسہ کرتے ہیں، جانیں۔',
      primaryCta: 'دستیاب تاریخیں دیکھیں',
      secondaryCta: 'حج پیکج دیکھیں',
      complianceTag: null,
    },
  ],
}

export const packageCatalog: Dictionary['packageCatalog'] = {
  'umrah-economy': {
    title: 'معاشی عمرہ پیکج',
    summary: 'دبئی، یو اے ای سے سستا اور آرام دہ عمرہ — ہوٹل، نقل و حمل اور ویزا سہولت۔',
  },
  'umrah-premium': {
    title: 'پریمیم عمرہ پیکج',
    summary: 'قریبی ہوٹل، ہموار ٹرانسفر اور توجہ سے دیکھ بھال۔',
  },
  'umrah-group': {
    title: 'گروپ عمرہ پیکج',
    summary: 'ہم آہنگ گروپ روانگی — مشترکہ ہوٹل، نقل و حمل اور گروپ لیڈر۔',
  },
  'umrah-customise': {
    title: 'اپنا عمرہ حسب ضرورت',
    summary: 'تاریخیں، گروپ سائز اور ہوٹل درجہ بتائیں — ہم سفرنامہ تیار کریں گے۔',
  },
  'platinum-2025': {
    title: 'پلاٹinum حج پیکج',
    summary: 'پریمیم حرمین قیام، روحانی رہنمائی اور قابل اعتماد مہمان نوازی۔',
  },
  'classic-hajj-2025': {
    title: 'بزنس حج پیکج',
    summary: 'بہتر قیام، ترجیحی ٹرانسفر — بھارتی پاسپورٹ holders کے لیے۔',
  },
  'hajj-budget': {
    title: 'بجٹ حج پیکج',
    summary: 'قیمت پر مبنی حج — بھارتی پاسپورٹ holders کے لیے۔',
  },
}

export const packagesUi: Dictionary['packagesUi'] = {
  socialProof: '★★★★★ 4.9 · 200+ حاجیوں نے منتخب کیا',
  dubaiDepartures: 'دبئی · یو اے ای روانگی',
  selectPassengers: 'مسافروں کا انتخاب',
  travelingQuestion: 'کتنے لوگ سفر کر رہے ہیں؟',
  adultLabel: 'بالغ',
  childLabel: 'بچہ',
  infantLabel: 'شیر خوار',
  adultHint: '12+ سال',
  childHint: '2–12 سال',
  infantHint: '2 سال سے کم',
  travellerSummary: 'مسافر خلاصہ',
  trustedPartner: 'قابل اعتماد سفری ساتھی',
  trustedPartnerSub: 'محفوظ سفر · روحانی تجربہ',
  secureEnquiry: 'محفوظ استفسار · آپ کی معلومات نجی رہتی ہیں',
  callPrefix: 'کال',
  mostPopular: 'سب سے مقبول',
  recommended: 'تجویز کردہ',
  showingPackages: '{total} میں سے {shown} پیکج دکھائے جا رہے ہیں',
  gridTrust: '500+ خاندانوں نے اعتماد سے بک کیا · دبئی، یو اے ای',
}
