import { LanguageCode, LanguageOption } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flagEmoji: '🇰🇪', greeting: 'Habari mkulima!' },
  { code: 'en', name: 'English', nativeName: 'English', flagEmoji: '🇬🇧', greeting: 'Hello farmer!' },
  { code: 'ki', name: 'Kikuyu', nativeName: 'Gĩkũyũ', flagEmoji: '🌾', greeting: 'Wĩmwega mũrĩmi!' },
  { code: 'luo', name: 'Luo', nativeName: 'Dholuo', flagEmoji: '🐟', greeting: 'Misawa japur!' },
  { code: 'luh', name: 'Luhya', nativeName: 'Oluluhya', flagEmoji: '🌽', greeting: 'Mulembe mulimi!' },
  { code: 'kal', name: 'Kalenjin', nativeName: 'Kalenjin', flagEmoji: '🏃', greeting: 'Chamgei kipsoiyot!' },
  { code: 'kam', name: 'Kamba', nativeName: 'Kĩkamba', flagEmoji: '🥑', greeting: 'Muvea mũĩmi!' },
  { code: 'som', name: 'Somali', nativeName: 'Af-Soomaali', flagEmoji: '🐫', greeting: 'Nabed beeraley!' },
];

export interface TranslationDict {
  appName: string;
  tagline: string;
  nav: {
    home: string;
    about: string;
    services: string;
    careers: string;
    ussd: string;
    contact: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    askAiBtn: string;
    scanDiseaseBtn: string;
    viewPricesBtn: string;
    buyInputsBtn: string;
    quickDialUssd: string;
    weatherTitle: string;
    todayPricesTitle: string;
    marketArbitrageTitle: string;
    offlineModeNotice: string;
    storiesTitle: string;
    cropCalendarTitle: string;
    videoTutorialsTitle: string;
  };
  chat: {
    title: string;
    placeholder: string;
    listening: string;
    recordingVoice: string;
    send: string;
    suggestedQuestions: string[];
    disclaimer: string;
    speakResponse: string;
    stopAudio: string;
    uploadImagePrompt: string;
  };
  disease: {
    title: string;
    subtitle: string;
    uploadPrompt: string;
    dragDrop: string;
    takePhoto: string;
    sampleImages: string;
    analyzing: string;
    diagnosisResult: string;
    confidence: string;
    severity: string;
    symptoms: string;
    organicCure: string;
    chemicalCure: string;
    prevention: string;
    buyTreatments: string;
  };
  prices: {
    title: string;
    subtitle: string;
    filterCrop: string;
    filterMarket: string;
    allCrops: string;
    allMarkets: string;
    wholesale: string;
    retail: string;
    change24h: string;
    bestSellMarket: string;
    priceAlert: string;
  };
  marketplace: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allCategories: string;
    addToCart: string;
    viewDetails: string;
    inStock: string;
    outOfStock: string;
    verifiedKephis: string;
    cart: string;
    checkoutMpesa: string;
    total: string;
    whatsappSeller: string;
    callSeller: string;
  };
  footer: {
    quickLinks: string;
    resources: string;
    contact: string;
  };
  auth: {
    loginTitle: string;
    enterPhone: string;
    phonePlaceholder: string;
    sendOtp: string;
    enterOtp: string;
    verifyOtp: string;
    name: string;
    county: string;
    farmSize: string;
    successGreeting: string;
    logout: string;
  };
}

export const translations: Record<LanguageCode, TranslationDict> = {
  sw: {
    appName: 'SautiFarm',
    tagline: 'Msaidizi Mahiri wa Kilimo kwa Wakulima wa Kenya',
    nav: {
      home: 'Nyumbani',
      about: 'Kuhusu Sisi',
      services: 'Huduma Zetu',
      careers: 'Ajira',
      ussd: 'Piga USSD',
      contact: 'Wasiliana',
    },
    home: {
      heroTitle: 'Kilimo Bora, Mavuno Mengi, Faida Zaidi',
      heroSubtitle: 'Ongea na Bwana Shamba wa AI kwa Kiswahili au lugha yako ya kienyeji. Pata ushauri wa mimea, kagua magonjwa ya majani, na linganisha bei za masoko ya Kenya.',
      askAiBtn: 'Uliza Bwana Shamba AI',
      scanDiseaseBtn: 'Piga Picha Jani la Mmea',
      viewPricesBtn: 'Tazama Bei za Leo',
      buyInputsBtn: 'Nunua Mbegu & Mbolea',
      quickDialUssd: 'Bila Mtandao? Piga *384*77#',
      weatherTitle: 'Utabiri wa Hali ya Hewa na Mvua',
      todayPricesTitle: 'Bei za Wakulima Masokoni Leo (KES)',
      marketArbitrageTitle: 'Fursa ya Faida: Wapi Uuze Mazao Yako?',
      offlineModeNotice: 'Hali ya bila mtandao inafanya kazi. Unaweza kutumia ujumbe mfupi au USSD.',
      storiesTitle: 'Hadithi za Wafanyabiashara Waliyofanikiwa',
      cropCalendarTitle: 'Kalenda ya Mazao',
      videoTutorialsTitle: 'Mafunzo ya Video',
    },
    chat: {
      title: 'Bwana Shamba AI (SautiFarm)',
      placeholder: 'Andika swali lako la kilimo au bonyeza kipaza sauti...',
      listening: 'Ninasikiliza... ongea sasa',
      recordingVoice: 'Inarekodi ujumbe wa sauti...',
      send: 'Tuma',
      suggestedQuestions: [
        'Mbolea gani inafaa kupanda mahindi wakati wa mvua za masika?',
        'Njia gani za kienyeji za kudhibiti Funza wa Mahindi (Fall Armyworm)?',
        'Bei ya nyanya soko la Wakulima Nairobi ni ngapi leo?',
        'Jinsi ya kutibu ugonjwa wa ukungu (Blight) kwenye viazi mviringo?',
      ],
      disclaimer: 'Ushauri unazingatia miongozo ya KALRO na Wizara ya Kilimo Kenya.',
      speakResponse: 'Soma kwa Sauti',
      stopAudio: 'Simamisha Sauti',
      uploadImagePrompt: 'Weka picha ya mmea au jani',
    },
    disease: {
      title: 'Utambuzi wa Magonjwa ya Mimea kwa AI',
      subtitle: 'Pakia au piga picha ya jani lililoathirika. Mfumo wetu wa AI utatambua ugonjwa papo hapo na kutoa tiba.',
      uploadPrompt: 'Pakia picha ya jani la mmea hapa',
      dragDrop: 'Buruta picha hapa au bofya kuchagua',
      takePhoto: 'Tumia Kamera',
      sampleImages: 'Mifano ya Majani Yenye Magonjwa',
      analyzing: 'Bwana Shamba AI anakagua jani...',
      diagnosisResult: 'Matokeo ya Ukaguzi',
      confidence: 'Uhakika wa AI',
      severity: 'Kiwango cha Hatari',
      symptoms: 'Dalili Kuu',
      organicCure: 'Tiba za Kienyeji (Organic)',
      chemicalCure: 'Dawa za Kununua (Fungicide/Pesticide)',
      prevention: 'Jinsi ya Kuzuia Lisijirudie',
      buyTreatments: 'Nunua Dawa Hii Sokoni',
    },
    prices: {
      title: 'Bei za Mazao Masoko Makuu ya Kenya',
      subtitle: 'Taarifa za moja kwa moja kutoka soko la Wakulima, Kongowea, Eldoret, Kisumu na Nakuru.',
      filterCrop: 'Chagua Zao',
      filterMarket: 'Chagua Soko',
      allCrops: 'Mazao Yote',
      allMarkets: 'Masoko Yote',
      wholesale: 'Jumla (Wholesale)',
      retail: 'Rejareja (Retail)',
      change24h: 'Mabadiliko (24h)',
      bestSellMarket: 'Soko Lenye Bei Bora Zaidi',
      priceAlert: 'Weka Ilani ya Bei kupitia SMS',
    },
    marketplace: {
      title: 'Soko la Pembejeo Halisi za Kilimo',
      subtitle: 'Mbegu zilizothibitishwa na KEPHIS, mbolea bora, na madawa ya mimea kwa bei nafuu.',
      searchPlaceholder: 'Tafuta mbegu, mbolea, au vifaa vya kilimo...',
      allCategories: 'Vitengo Vyote',
      addToCart: 'Weka Kikapuni',
      viewDetails: 'Tazama Maelezo',
      inStock: 'Ipo Dukan',
      outOfStock: 'Imeisha',
      verifiedKephis: 'Imethibitishwa na KEPHIS',
      cart: 'Kikapu cha Ununuzi',
      checkoutMpesa: 'Lipa na M-Pesa',
      total: 'Jumla Kuu',
      whatsappSeller: 'Wasiliana kwa WhatsApp',
      callSeller: 'Piga Simu Muuzaji',
    },
    footer: {
      quickLinks: 'Kiungo Muhimu',
      resources: 'Rasilimali',
      contact: 'Wasiliana Nasi',
    },
    auth: {
      loginTitle: 'Kuingia kwa Mkulima (SautiFarm)',
      enterPhone: 'Weka Nambari yako ya Simu ya Safaricom/Airtel',
      phonePlaceholder: '0712 345 678 au +254...',
      sendOtp: 'Tuma Nambari ya Siri (OTP)',
      enterOtp: 'Weka Nambari ya Siri (OTP) uliyotumiwa',
      verifyOtp: 'Thibitisha na Uingie',
      name: 'Jina Lako Kamili',
      county: 'Kaunti Unayolima (mf. Uasin Gishu, Kiambu, Meru)',
      farmSize: 'Ukubwa wa Shamba (Ekari)',
      successGreeting: 'Karibu tena shambani',
      logout: 'Toka',
    },
  },

  en: {
    appName: 'SautiFarm',
    tagline: 'Multi-Channel AI Agricultural Assistant for Kenyan Farmers',
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Our Services',
      careers: 'Careers',
      ussd: 'Dial USSD',
      contact: 'Contact',
    },
    home: {
      heroTitle: 'Smart Farming, Higher Yields, Better Profits',
      heroSubtitle: 'Consult Kenya’s specialized AI Agronomist in English, Swahili or your vernacular. Get crop advice, instant leaf disease diagnosis, and live market commodity prices.',
      askAiBtn: 'Chat with SautiFarm AI',
      scanDiseaseBtn: 'Scan Crop Leaf Photo',
      viewPricesBtn: 'Check Today’s Prices',
      buyInputsBtn: 'Shop Seeds & Fertilizers',
      quickDialUssd: 'No Internet? Dial *384*77#',
      weatherTitle: 'County Weather & Rainfall Advisory',
      todayPricesTitle: 'Today’s Live Market Commodity Prices (KES)',
      marketArbitrageTitle: 'Market Price Arbitrage & Profit Opportunities',
      offlineModeNotice: 'Offline Mode Active. Cached data available. SMS/USSD fallback supported.',
      storiesTitle: 'Farmer Success Stories',
      cropCalendarTitle: 'Crop Calendar',
      videoTutorialsTitle: 'Video Tutorials',
    },
    chat: {
      title: 'SautiFarm AI ',
      placeholder: 'Ask any farming question or click microphone to speak...',
      listening: 'Listening... speak clearly now',
      recordingVoice: 'Recording audio note...',
      send: 'Send',
      suggestedQuestions: [
        'Which basal fertilizer is best for planting maize in Trans-Nzoia?',
        'How do I naturally eliminate Fall Armyworms without toxic chemicals?',
        'What is the current 90kg maize bag price at Eldoret vs Wakulima market?',
        'How to manage early blight in tomatoes during the rainy season?',
      ],
      disclaimer: 'Advisories are grounded in KALRO and Ministry of Agriculture guidelines.',
      speakResponse: 'Read Aloud',
      stopAudio: 'Stop Audio',
      uploadImagePrompt: 'Attach plant or leaf image',
    },
    disease: {
      title: 'Disease and Pest Scanner',
      subtitle: 'Upload or snap a photo of any damaged plant leaf or crop. Gemini Vision AI diagnoses the condition and suggests both organic and certified chemical remedies.',
      uploadPrompt: 'Upload a clear leaf photo here',
      dragDrop: 'Drag and drop an image or click to browse',
      takePhoto: 'Use Camera',
      sampleImages: 'Test with Sample Crop Diseases',
      analyzing: 'SautiFarm AI is analyzing leaf pathology...',
      diagnosisResult: 'Diagnosis & Treatment Plan',
      confidence: 'AI Confidence',
      severity: 'Severity Level',
      symptoms: 'Key Symptoms',
      organicCure: 'Organic & Cultural Control',
      chemicalCure: 'Registered Chemical Treatment',
      prevention: 'Future Prevention Protocol',
      buyTreatments: 'Buy Treatment on Marketplace',
    },
    prices: {
      title: 'Market Prices for Kenyan Crops & Commodities',
      subtitle: 'Real-time wholesale and retail prices tracked across Nairobi, Mombasa, Kisumu, Nakuru, and Eldoret.',
      filterCrop: 'Filter Crop',
      filterMarket: 'Filter Market',
      allCrops: 'All Commodities',
      allMarkets: 'All Markets',
      wholesale: 'Wholesale Price',
      retail: 'Retail Price',
      change24h: '24h Trend',
      bestSellMarket: 'Highest Price Market',
      priceAlert: 'Set SMS Price Alert',
    },
    marketplace: {
      title: 'Marketplace',
      subtitle: 'Buy genuine KEPHIS-certified seeds, Yara/DAP fertilizers, sprayers, and solar irrigation with M-Pesa.',
      searchPlaceholder: 'Search seeds, fertilizers, pesticides, drip kits...',
      allCategories: 'All Categories',
      addToCart: 'Add to Cart',
      viewDetails: 'View Details',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      verifiedKephis: 'KEPHIS Certified',
      cart: 'Cart',
      checkoutMpesa: 'Pay with M-Pesa STK Push',
      total: 'Grand Total',
      whatsappSeller: 'WhatsApp Seller',
      callSeller: 'Call Seller',
    },
    footer: {
      quickLinks: 'Quick Links',
      resources: 'Resources',
      contact: 'Contact',
    },
    auth: {
      loginTitle: 'Farmer Sign In / Registration',
      enterPhone: 'Enter your Safaricom or Airtel phone number',
      phonePlaceholder: '0712 345 678 or +254...',
      sendOtp: 'Send OTP Verification Code',
      enterOtp: 'Enter 4-digit OTP Code',
      verifyOtp: 'Verify & Access SautiFarm',
      name: 'Full Name',
      county: 'Your County (e.g. Uasin Gishu, Kiambu, Meru)',
      farmSize: 'Farm Acreage (Acres)',
      successGreeting: 'Welcome back to SautiFarm',
      logout: 'Sign Out',
    },
  },

  ki: {
    appName: 'SautiFarm',
    tagline: 'Mũteithia wa Ũrĩmi wa AI thĩinĩ wa Kenya',
    nav: {
      home: 'Mũciĩ',
      about: 'Kũrĩa Ũcio',
      services: 'Wĩ Witũ',
      careers: 'Wĩora',
      ussd: 'Hũũra USSD',
      contact: 'Ĩraa',
    },
    home: {
      heroTitle: 'Ũrĩmi Mũgaacĩru, Maciaro Maingĩ, Uumithio Mũnene',
      heroSubtitle: 'Aria na Bwana Shamba wa AI na Gĩkũyũ. Rora thogora wa thoko na ũmenye mĩrimũ ya mĩtĩ na mbembe ciaku.',
      askAiBtn: 'Ũria Bwana Shamba',
      scanDiseaseBtn: 'Hũũra Mahuti Mbica',
      viewPricesBtn: 'Rora Thogora wa Ũmũthĩ',
      buyInputsBtn: 'Gũra Mbeũ na Thumu',
      quickDialUssd: 'Gũtĩ Net? Hũũra *384*77#',
      weatherTitle: 'Mbura na Rũhuho rwa Kaunti Yaku',
      todayPricesTitle: 'Thogora wa Ũmũthĩ Thoko-inĩ (KES)',
      marketArbitrageTitle: 'Thoko Ĩrĩa Ĩna Thogora Mwega',
      offlineModeNotice: 'Nĩ ũrahota kũhũthĩra USSD kũũria ciũria.',
      storiesTitle: 'Niundo cia Arĩmi Aathiũrũire',
      cropCalendarTitle: 'Kalenda ya Mmera',
      videoTutorialsTitle: 'Vidio cia Kũruta',
    },
    chat: {
      title: 'Bwana Shamba AI (Gĩkũyũ)',
      placeholder: 'Ũria ciũria ciothe cia ũrĩmi kana ũhũũre kĩgũũti kia mĩgambo...',
      listening: 'Nĩndĩrethikĩrĩria... aria rĩu',
      recordingVoice: 'Nĩkũrekodi rũgendo...',
      send: 'Tũma',
      suggestedQuestions: [
        'Thumu ũrĩkũ mwega wa kũhanda mbembe Nyandarua?',
        'Nĩ ũndũ ũrĩkũ ũngĩthũkia ngũkũ cia mbembe (Fall armyworm)?',
        'Thogora wa waru thoko ya Wakulima ũmũthĩ nĩ ciringi cigana?',
      ],
      disclaimer: 'Ũhoro ũyũ ũrutĩtwo kũringana na watho wa KALRO.',
      speakResponse: 'Thoma na Mũgambo',
      stopAudio: 'Rũgama',
      uploadImagePrompt: 'Tũma mbica ya ihuti',
    },
    disease: {
      title: 'Kũmenya Mĩrimũ ya Mĩmera na Mbica',
      subtitle: 'Tũma mbica ya ihuti rĩrĩa rĩrũaru. AI nĩĩgũkũhe ndawa iria ciagĩrĩire.',
      uploadPrompt: 'Haica mbica ya ihuti haha',
      dragDrop: 'Gucia mbica haha',
      takePhoto: 'Hũũra Kamera',
      sampleImages: 'Ngerekano cia Mĩrimũ ya Mĩmera',
      analyzing: 'AI nĩĩrathuthuria ihuti rĩaku...',
      diagnosisResult: 'Ũhoro wa Mũrimũ na Ndawa',
      confidence: 'Wĩhokeku wa AI',
      severity: 'Kĩrugamo kĩa Mũrimũ',
      symptoms: 'Kĩrĩa Kĩronania Mũrimũ',
      organicCure: 'Ndawa ya Kĩndũire',
      chemicalCure: 'Ndawa ya Duka (Fungicide)',
      prevention: 'Mĩvango ya Kũgirĩrĩria',
      buyTreatments: 'Gũra Ndawa Ĩno Thoko-inĩ',
    },
    prices: {
      title: 'Thogora wa Indo cia Mũgũnda Thoko-inĩ',
      subtitle: 'Thogora wa thoko nene ta Wakulima, Kongowea, na Nakuru.',
      filterCrop: 'Thuura Mũmera',
      filterMarket: 'Thuura Thoko',
      allCrops: 'Mĩmera Yothe',
      allMarkets: 'Thoko Ciothe',
      wholesale: 'Thogora wa Mũrũrũmo',
      retail: 'Thogora wa Ĩmwe Ĩmwe',
      change24h: 'Ũgarũrũku wa Ũmũthĩ',
      bestSellMarket: 'Thoko Ĩrĩa Ĩna Thogora Mũnene',
      priceAlert: 'Ĩka Nothithi ya SMS',
    },
    marketplace: {
      title: 'Duka ya Mbeũ na Thumu ya Mũgũnda',
      subtitle: 'Mbeũ cia KEPHIS, thumu wa DAP/CAN, na ndawa cia mĩmera na M-Pesa.',
      searchPlaceholder: 'Caria mbeũ, thumu, kana indo cia kũnyitĩrĩria...',
      allCategories: 'Mĩthemba Yothe',
      addToCart: 'Ĩkĩra Kĩondo-inĩ',
      viewDetails: 'Rora Details',
      inStock: 'Nĩkĩo Kĩo',
      outOfStock: 'Nĩgĩathirire',
      verifiedKephis: 'Nĩkĩonirwo nĩ KEPHIS',
      cart: 'Kĩondo Gĩaku',
      checkoutMpesa: 'Rĩha na M-Pesa',
      total: 'Thogora Wothe',
      whatsappSeller: 'WhatsApp Muuzi',
      callSeller: 'Hũra Simu Muuzi',
    },
    footer: {
      quickLinks: 'Link cia Hara hara',
      resources: 'Risorsa',
      contact: 'Ũnganĩre',
    },
    auth: {
      loginTitle: 'Kũingĩra kwa Mũrĩmi (SautiFarm)',
      enterPhone: 'Andika namba yaku ya simu',
      phonePlaceholder: '0712 345 678...',
      sendOtp: 'Tũma Koodi ya Siri (OTP)',
      enterOtp: 'Andika Koodi ya OTP',
      verifyOtp: 'Thĩĩ na Mbere',
      name: 'Rĩĩtwa Rĩaku',
      county: 'Kaunti Yaku',
      farmSize: 'Ekari cia Mũgũnda',
      successGreeting: 'Wĩmwega mũrĩmi mũrũ',
      logout: 'Uma',
    },
  },

  luo: {
    appName: 'SautiFarm',
    tagline: 'Jakony Pur mar AI ne Japur mag Kenya',
    nav: {
      home: 'Pacho',
      about: 'Kuom Wa',
      services: 'Jothieth Wa',
      careers: 'Tije',
      ussd: 'Goyo USSD',
      contact: 'Nong\'o',
    },
    home: {
      heroTitle: 'Pur Maber, Cham Mang\'eny, Ohala Maduong\'',
      heroSubtitle: 'Wuo gi Japuonj Pur mar AI e Dholuo. Ng\'i tuoche mag koth, kendo ng\'e nengo chiro mar Kisumu, Wakulima kod mamoko.',
      askAiBtn: 'Penj Japuonj AI',
      scanDiseaseBtn: 'Gow Picha It Yadh',
      viewPricesBtn: 'Ng\'i Nengo ma Kawuono',
      buyInputsBtn: 'Nyiew Koth gi Yadh Lowo',
      quickDialUssd: 'Kionge Net? Go *384*77#',
      weatherTitle: 'Koth kod Chal mar Piny e Kaunti',
      todayPricesTitle: 'Nengo mag Chiro ma Kawuono (KES)',
      marketArbitrageTitle: 'Kama Nengo Ber mar Uso Cham',
      offlineModeNotice: 'Inyalo tiyo gi USSD kapo ni net onge.',
      storiesTitle: 'Sigendni mag Jathwon',
      cropCalendarTitle: 'Kalenda mar Cham',
      videoTutorialsTitle: 'Vidio mag Puonj',
    },
    chat: {
      title: 'Japuonj Pur mar AI (Dholuo)',
      placeholder: 'Penj penjo moro amora mar pur kata go maik...',
      listening: 'Awinji... wuo sani',
      recordingVoice: 'Mako dwol...',
      send: 'Oor',
      suggestedQuestions: [
        'Yadh lowo mane maber ne komo oduma e piny Luo?',
        'Wanyalo gengo kute mag oduma (Fall Armyworm) nade?',
        'Nengo rabuon e chiro mar Kibuye Kisumu en ng\'adi?',
      ],
      disclaimer: 'Piny mar pur luwo chike mag KALRO.',
      speakResponse: 'Som gi Dwol',
      stopAudio: 'Geng\' Dwol',
      uploadImagePrompt: 'Ket picha mar it yath',
    },
    disease: {
      title: 'Fwenyo Tuoche mag Cham gi AI',
      subtitle: 'Ket picha mar it yath ma nigi tuo. AI biro nyisi tuo kendo chiwo yadh thiedho.',
      uploadPrompt: 'Ket picha mar it yath ka',
      dragDrop: 'Gow picha ka',
      takePhoto: 'Tiy gi Kamera',
      sampleImages: 'Ranyisi mag Tuoche',
      analyzing: 'AI sani nono it yath...',
      diagnosisResult: 'Duoko mar Nonro',
      confidence: 'Kido mar Adier',
      severity: 'Tuo Marach Nade',
      symptoms: 'Ranyisi mag Tuo',
      organicCure: 'Thiedho mar Kanyakla',
      chemicalCure: 'Yadh Duka (Chemical)',
      prevention: 'Geng\'o Mondo Kik Oduogi',
      buyTreatments: 'Nyiew Yadhni e Chiro',
    },
    prices: {
      title: 'Nengo mag Cham e Chiro mag Kenya',
      subtitle: 'Nengo mar chiro mag Kibuye, Wakulima, Kongowea kod mamoko.',
      filterCrop: 'Yier Cham',
      filterMarket: 'Yier Chiro',
      allCrops: 'Cham Duto',
      allMarkets: 'Chiro Duto',
      wholesale: 'Nengo mar Jomoko',
      retail: 'Nengo mar Achiel Achiel',
      change24h: 'Lokruok mar Kawuono',
      bestSellMarket: 'Chiro ma Nengo Ber',
      priceAlert: 'Ket SMS mar Nengo',
    },
    marketplace: {
      title: 'Chiro mar Koth gi Yadh Lowo Mowinjore',
      subtitle: 'Koth mochan gi KEPHIS, yadh DAP/CAN, kendo chul gi M-Pesa.',
      searchPlaceholder: 'Many koth, yadh pur, gige pi...',
      allCategories: 'Kinde Duto',
      addToCart: 'Ket e Okapu',
      viewDetails: 'Nen Details',
      inStock: 'Nitiere',
      outOfStock: 'Oserumo',
      verifiedKephis: 'KEPHIS Oseyiego',
      cart: 'Okapu Mari',
      checkoutMpesa: 'Chul gi M-Pesa',
      total: 'Kar Kwer Duto',
      whatsappSeller: 'WhatsApp Jualo',
      callSeller: 'Luong Jualo',
    },
    footer: {
      quickLinks: 'Retok Mapiyo',
      resources: 'Ngech',
      contact: 'Kodwa',
    },
    auth: {
      loginTitle: 'Donjo mar Japur (SautiFarm)',
      enterPhone: 'Ket namba mari mar simu',
      phonePlaceholder: '0712 345 678...',
      sendOtp: 'Oor Namba mar Muma (OTP)',
      enterOtp: 'Ket Namba mar OTP',
      verifyOtp: 'Dhi Mbele',
      name: 'Nyingi Duto',
      county: 'Kaunti Mari',
      farmSize: 'Hekari mar Puodho',
      successGreeting: 'Oyawore japur!',
      logout: 'Wuog',
    },
  },

  luh: {
    appName: 'SautiFarm',
    tagline: 'Omukonyi wo Vurimi wo AI mu Kenya',
    nav: {
      home: 'Ingo',
      about: 'Khukhulaho',
      services: 'Jothieth Jie',
      careers: 'Mulimo',
      ussd: 'Goba USSD',
      contact: 'Somboraa',
    },
    home: {
      heroTitle: 'Oburimi Vwelukhu, Emikunda Minji, Omwando',
      heroSubtitle: 'Loma nende omukonyi wo vurimi mu Luluhya. Lola malwaye ke amakondo, nende ibeeyi yo siro mu Kakamega, Eldoret nende Nairobi.',
      askAiBtn: 'Reva Omwalimu AI',
      scanDiseaseBtn: 'Tsia Ifoto ye Likondo',
      viewPricesBtn: 'Lola Ibeeyi ya Rero',
      buyInputsBtn: 'Gula Imbeu nende Ishumu',
      quickDialUssd: 'Shio Net? Goba *384*77#',
      weatherTitle: 'Ifula nende Omwoyo mu Kaunti',
      todayPricesTitle: 'Ibeeyi yo Siro ya Rero (KES)',
      marketArbitrageTitle: 'Asi Ibeeyi ili Indayi yo Gusia',
      offlineModeNotice: 'Onyala okhutumia USSD nali obulahi.',
      storiesTitle: 'Niundo chia Abarimi Bafwene',
      cropCalendarTitle: 'Kalinda ya Ebilime',
      videoTutorialsTitle: 'Vidiozia ya Okhunyirira',
    },
    chat: {
      title: 'Omwalimu wo Vurimi AI (Luluhya)',
      placeholder: 'Reva khuvurimi shiosi shiosi kana gona...',
      listening: 'Ndi khuretselesia... loma lino',
      recordingVoice: 'Nirekoda ilikanakana...',
      send: 'Ruma',
      suggestedQuestions: [
        'Ishumu shina shilahi okhuhanda amavindi mu Kakamega?',
        'Onyala okhwirira ovusu bwe amavindi nade?',
        'Ibeeyi ye amavindi ku siro lya Eldoret ili hena?',
      ],
      disclaimer: 'Obuyeti bulondana nende amateka ke KALRO.',
      speakResponse: 'Soma nende Liikana',
      stopAudio: 'Imilila',
      uploadImagePrompt: 'Ruma ifoto ye likondo',
    },
    disease: {
      title: 'Okhumanya Malwaye ke Ebilime',
      subtitle: 'Ruma ifoto ye likondo lialwala. AI yikhakuhesia omuleshi kwolulahi.',
      uploadPrompt: 'Ruma ifoto ye likondo yaha',
      dragDrop: 'Kukuta ifoto yaha',
      takePhoto: 'Tumia Kamera',
      sampleImages: 'Amalwaye ko Mulindi',
      analyzing: 'AI yikeba likondo lilio...',
      diagnosisResult: 'Amasang\'anyisi ko Mulwaye',
      confidence: 'Obuchesi bwe AI',
      severity: 'Obunyali bwo Mulwaye',
      symptoms: 'Ebimanyisi bie Shiroha',
      organicCure: 'Omuleshi kwo Omwalo',
      chemicalCure: 'Omuleshi kwo Duka',
      prevention: 'Tsinzila tsio Khwilinda',
      buyTreatments: 'Gula Omuleshi ku Siro',
    },
    prices: {
      title: 'Ibeeyi ye Ebilime mu Siro bia Kenya',
      subtitle: 'Ibeeyi yo siro lia Kakamega, Wakulima, Kongowea nende Nakuru.',
      filterCrop: 'Tondola Shilime',
      filterMarket: 'Tondola Siro',
      allCrops: 'Ebilime Biosi',
      allMarkets: 'Siro Tsiosi',
      wholesale: 'Ibeeyi yo Bunji',
      retail: 'Ibeeyi yo Mulala',
      change24h: 'Okhuchenja kwa Rero',
      bestSellMarket: 'Siro lili nende Ibeeyi Indayi',
      priceAlert: 'Kora Alati ye SMS',
    },
    marketplace: {
      title: 'Siro ye Imbeu nende Ishumu Yolulahi',
      subtitle: 'Imbeu tsia KEPHIS, ishumu ya DAP/CAN, ulehe nende M-Pesa.',
      searchPlaceholder: 'Ronda imbeu, ishumu, amatsikhi...',
      allCategories: 'Tsing\'ano Tsiosi',
      addToCart: 'Shila mu Shinang\'ano',
      viewDetails: 'Lola Ebimanyisio',
      inStock: 'Yilaho',
      outOfStock: 'Yashira',
      verifiedKephis: 'Yalolwa nende KEPHIS',
      cart: 'Shinang\'ano Shio',
      checkoutMpesa: 'Rung\'a nende M-Pesa',
      total: 'Tsikura Tsiosi',
      whatsappSeller: 'WhatsApp Omurushi',
      callSeller: 'Hura Simu Omurushi',
    },
    footer: {
      quickLinks: 'Links Shiololi',
      resources: 'Ngech',
      contact: 'Soma Naso',
    },
    auth: {
      loginTitle: 'Okhwinjira khwo Mulimi (SautiFarm)',
      enterPhone: 'Kora namba yio ye simu',
      phonePlaceholder: '0712 345 678...',
      sendOtp: 'Ruma Namba ye Tsisiri (OTP)',
      enterOtp: 'Kora Namba ye OTP',
      verifyOtp: 'Injira Shambani',
      name: 'Lira Lio',
      county: 'Kaunti Yio',
      farmSize: 'Eka tsio Mulimi',
      successGreeting: 'Mulembe muno mulimi!',
      logout: 'Rula',
    },
  },

  kal: {
    appName: 'SautiFarm',
    tagline: 'Kiptaiyat ne Bo AI ne Tokochin Kipsoiyotab Kenya',
    nav: {
      home: 'Gaa',
      about: 'Koile En',
      services: 'Serikali Ino',
      careers: 'Totie',
      ussd: 'Kwir USSD',
      contact: 'Kontak',
    },
    home: {
      heroTitle: 'Kapkorenet ne Nyolu, Robto ne Chang, Rabisiek',
      heroSubtitle: 'Ng\'alaal ak Kiptaiyat ne bo AI eng kutitab Kalenjin. Iten mionwogik che bo bandek, ak iger taitab siroitab Eldoret, Wakulima ak Kitale.',
      askAiBtn: 'Teeb Kiptaiyat AI',
      scanDiseaseBtn: 'Nam Picha nebo Sotet',
      viewPricesBtn: 'Geer Taitab Raini',
      buyInputsBtn: 'Al Keswek ak Yabosiek',
      quickDialUssd: 'Mami Net? Kwir *384*77#',
      weatherTitle: 'Robto ak Emet eng Kaunti',
      todayPricesTitle: 'Taitab Siroitab Raini (KES)',
      marketArbitrageTitle: 'Siro ne Mi Tait ne Kararan',
      offlineModeNotice: 'Imuchi iyai tuiyet ak USSD ye mami net.',
      storiesTitle: 'Niundo che bo Kapkorenok',
      cropCalendarTitle: 'Kalinda ne bo Ebilime',
      videoTutorialsTitle: 'Vidio che bo Puonj',
    },
    chat: {
      title: 'Kiptaiyat ne bo AI (Kalenjin)',
      placeholder: 'Teeb kandoet agot tugul ne bo kapkorenet...',
      listening: 'Agas ng\'olyot... ng\'alaal raini',
      recordingVoice: 'Mitei rekotin...',
      send: 'Iyook',
      suggestedQuestions: [
        'Yabosiet ano ne kararan eng bandek Uasin Gishu?',
        'Kekose ano kutit che bo bandek (Fall Armyworm)?',
        'Taitab bandek eng siroitab Eldoret raini ko siringiik ata?',
      ],
      disclaimer: 'Ng\'alechoto konyolu ak kalosunetab KALRO.',
      speakResponse: 'Soman eng Kutit',
      stopAudio: 'Kanyis',
      uploadImagePrompt: 'Iyook picha nebo sotet',
    },
    disease: {
      title: 'Koger Mionwogik che bo Mbukusiek',
      subtitle: 'Iyook picha nebo sotet ne nyalil. AI biro konyoru miondot ak konyor kerichek.',
      uploadPrompt: 'Nam picha nebo sotet yu',
      dragDrop: 'Kwet picha yu',
      takePhoto: 'Tee Kamera',
      sampleImages: 'Kaborunoik che bo Mionwogik',
      analyzing: 'AI mitei koger sotet...',
      diagnosisResult: 'Kaborunoet ak Kerichek',
      confidence: 'Imong\'it nebo AI',
      severity: 'Nyalilda nebo Miondot',
      symptoms: 'Kaborunoik',
      organicCure: 'Kerichek che bo Gaa',
      chemicalCure: 'Kerichek che bo Duka',
      prevention: 'Ribet mondo koma weegy',
      buyTreatments: 'Al Kerichek eng Siro',
    },
    prices: {
      title: 'Taitab Mbukusiek eng Siroisiekab Kenya',
      subtitle: 'Taitab Eldoret, Wakulima, Kongowea ak Nakuru.',
      filterCrop: 'Lewen Mbukit',
      filterMarket: 'Lewen Siro',
      allCrops: 'Mbukusiek Tugul',
      allMarkets: 'Siroisiek Tugul',
      wholesale: 'Taitab Kaboroto',
      retail: 'Taitab Ageng\'',
      change24h: 'Waletab Raini',
      bestSellMarket: 'Siro ne Bo Tait ne Kararan',
      priceAlert: 'Yai SMS Alati',
    },
    marketplace: {
      title: 'Siroitab Keswek ak Yabosiek ne Chut',
      subtitle: 'Keswek che kiyap KEPHIS, yabosiek che bo DAP/CAN, ak ilipanen M-Pesa.',
      searchPlaceholder: 'Ceng keswek, yabosiek, kerichek...',
      allCategories: 'Tugul',
      addToCart: 'Keny eng Konoito',
      viewDetails: 'Geer Mab',
      inStock: 'Mitei',
      outOfStock: 'Kogosir',
      verifiedKephis: 'Kiyap KEPHIS',
      cart: 'Konoitang\'ung',
      checkoutMpesa: 'Lipan ak M-Pesa',
      total: 'Kiroboto Tugul',
      whatsappSeller: 'WhatsApp Che Mius',
      callSeller: 'Cham Simu Che Mius',
    },
    footer: {
      quickLinks: 'Links che Bo Sogor',
      resources: 'Ngech',
      contact: 'Chorwa',
    },
    auth: {
      loginTitle: 'Chutto nebo Kipsoiyot (SautiFarm)',
      enterPhone: 'Keny namba nebo simu',
      phonePlaceholder: '0712 345 678...',
      sendOtp: 'Iyook Namba nebo Mboit (OTP)',
      enterOtp: 'Keny Namba nebo OTP',
      verifyOtp: 'Chut Bareet',
      name: 'Kaineng\'ung',
      county: 'Kaunti neng\'ung',
      farmSize: 'Ekainik che bo Bareet',
      successGreeting: 'Chamgei kipsoiyot!',
      logout: 'Manda',
    },
  },

  kam: {
    appName: 'SautiFarm',
    tagline: 'Mũtetheesya wa Ũĩmi wa AI wa Aĩmi ma Kenya',
    nav: {
      home: 'Mũsyĩ',
      about: 'Kũthi Wĩ',
      services: 'Utuu Wĩ',
      careers: 'Mũlimu',
      ussd: 'Kũna USSD',
      contact: 'Mũtumia',
    },
    home: {
      heroTitle: 'Ũĩmi Mũseo, Ngetha Mbingĩ, Ũthwii',
      heroSubtitle: 'Neena na Mwalimũ wa AI na Kĩkamba. Sũvĩa mawau ma mĩmera na ũmanye thooa wa ndũnyũ ya Machakos, Wakulima na kitui.',
      askAiBtn: 'Kũlya Mwalimũ AI',
      scanDiseaseBtn: 'Kũna Mbica ya Itũ',
      viewPricesBtn: 'Sisya Thooa wa Ũmũnthĩ',
      buyInputsBtn: 'Thooa Mbeũ na Mbolea',
      quickDialUssd: 'Vai Net? Kũna *384*77#',
      weatherTitle: 'Mbua na Nzeve Kauntinĩ Yaku',
      todayPricesTitle: 'Thooa wa Ũmũnthĩ Ndũnyũnĩ (KES)',
      marketArbitrageTitle: 'Vandũ Vaa Thooa Mũseo wa Kũthaa Ngetha',
      offlineModeNotice: 'Noũtũmĩe USSD kũlya makũlyo me yĩulu wa ũĩmi.',
      storiesTitle: 'Niundo sya Aimi Matũlũkĩle',
      cropCalendarTitle: 'Kalinda ya Mmera',
      videoTutorialsTitle: 'Vidio sya Kũmanyĩa',
    },
    chat: {
      title: 'Mwalimũ wa Ũĩmi AI (Kĩkamba)',
      placeholder: 'Kũlya ĩkũlyo yĩla wenda yĩũlu wa ũĩmi...',
      listening: 'Nĩngwĩthukĩĩsya... neena yu',
      recordingVoice: 'Nĩkũkopa wasya...',
      send: 'Tũma',
      suggestedQuestions: [
        'Mbolea yĩva yĩseo ya kũvanda mbembe kĩthekani kya Ukambani?',
        'Nĩ ata tũtonya kũkita ngũngũni sya mbembe (Fall Armyworm)?',
        'Thooa wa nzae na mbembe ndũnyũ ya Machakos nĩ meana?',
      ],
      disclaimer: 'Ũtetheesyo ũũ nĩ kũringana na mĩao ya KALRO.',
      speakResponse: 'Thoma na Wasya',
      stopAudio: 'Tiĩa Wasya',
      uploadImagePrompt: 'Tũma mbica ya itũ',
    },
    disease: {
      title: 'Kũmanya Mawau ma Mĩmera na AI',
      subtitle: 'Tũma mbica ya itũ yĩla yĩwete. AI nĩkũũtavya ũwau na ndawa ila syaĩle.',
      uploadPrompt: 'Ĩkya mbica ya itũ vaa',
      dragDrop: 'Kũnta mbica vaa',
      takePhoto: 'Tũmĩa Kamera',
      sampleImages: 'Ngelekany\'o sya Mawau',
      analyzing: 'AI nĩkũkunzĩa itũ yaku...',
      diagnosisResult: 'Ũtũmo wa Ũwau na Ndawa',
      confidence: 'Ũĩ wa AI',
      severity: 'Ũthũku wa Ũwau',
      symptoms: 'Mawanzo ma Ũwau',
      organicCure: 'Ndawa ya Kĩtũngatĩro',
      chemicalCure: 'Ndawa ya Ndũnyũ',
      prevention: 'Nzĩa sya Kũvĩngĩa',
      buyTreatments: 'Thooa Ndawa Ndũnyũnĩ',
    },
    prices: {
      title: 'Thooa wa Syĩndũ sya Mũũnda Ndũnyũnĩ',
      subtitle: 'Thooa wa Machakos, Wakulima, Kitui na Kongowea.',
      filterCrop: 'Nyuvanyuva Mũmera',
      filterMarket: 'Nyuvanyuva Ndũnyũ',
      allCrops: 'Mĩmera Yonthe',
      allMarkets: 'Ndũnyũ Syonthe',
      wholesale: 'Thooa wa Mũtĩlo',
      retail: 'Thooa wa Kĩmwe Kĩmwe',
      change24h: 'Kũvĩndũka kwa Ũmũnthĩ',
      bestSellMarket: 'Ndũnyũ Yĩla Yĩna Thooa Mũseo',
      priceAlert: 'Ĩka Nothisi ya SMS',
    },
    marketplace: {
      title: 'Ndũnyũ ya Mbeũ na Mbolea Ntheu',
      subtitle: 'Mbeũ sya KEPHIS, mbolea ya DAP/CAN, ĩva na M-Pesa.',
      searchPlaceholder: 'Mantha mbeũ, mbolea, mĩtambo ya kĩw\'ĩ...',
      allCategories: 'Mĩthemba Yonthe',
      addToCart: 'Ĩkya Kĩondonĩ',
      viewDetails: 'Sisya Mab',
      inStock: 'Yĩvo',
      outOfStock: 'Nĩyathira',
      verifiedKephis: 'Nĩyaĩkĩĩthw\'a nĩ KEPHIS',
      cart: 'Kĩondo Kyaku',
      checkoutMpesa: 'Ĩva na M-Pesa',
      total: 'Thooa Wonthe',
      whatsappSeller: 'WhatsApp Mũusi',
      callSeller: 'Ĩtha Simu Mũusi',
    },
    footer: {
      quickLinks: 'Links ya Kw\'onany\'a',
      resources: 'Ngech',
      contact: 'Kũmyĩ',
    },
    auth: {
      loginTitle: 'Kũlika kwa Mũĩmi (SautiFarm)',
      enterPhone: 'Kũna namba yaku ya simũ',
      phonePlaceholder: '0712 345 678...',
      sendOtp: 'Tũma Namba ya Kĩvitho (OTP)',
      enterOtp: 'Kũna Namba ya OTP',
      verifyOtp: 'Lika Mũũndanĩ',
      name: 'Ĩsyĩtwa Yaku',
      county: 'Kaunti Yaku',
      farmSize: 'Eka sya Mũũnda',
      successGreeting: 'Muvea mũĩmi!',
      logout: 'Uma',
    },
  },

  som: {
    appName: 'SautiFarm',
    tagline: 'Kaaliyaha Beeraha ee AI ee Beeralayda Kenya',
    nav: {
      home: 'Guriga',
      about: 'Naga Sahanoo',
      services: 'Khidmadaadka Naga',
      careers: 'Shaqo',
      ussd: 'Wac USSD',
      contact: 'Xaqiiji',
    },
    home: {
      heroTitle: 'Beerasho Casri ah, Waxsoosaar Badan, Faa\'iido Wanaagsan',
      heroSubtitle: 'La hadal khabiirka beeraha ee AI adigoo ku hadlaya Af-Soomaali. Baar cudurrada caleemaha geedahaaga, lana socod qiimaha suuqyada Kenya.',
      askAiBtn: 'Weydii AI Beeraha',
      scanDiseaseBtn: 'Sawir Caleenta Geedka',
      viewPricesBtn: 'Eeg Qiimaha Maanta',
      buyInputsBtn: 'Iibso Abuur & Bacrimiyaha',
      quickDialUssd: 'Internet Ma Haysatid? Wac *384*77#',
      weatherTitle: 'Roobka iyo Cimilada Deegaankaaga',
      todayPricesTitle: 'Qiimaha Suuqyada Maanta (KES)',
      marketArbitrageTitle: 'Suuqa Ugu Qiimaha Wanaagsan',
      offlineModeNotice: 'Waxaad isticmaali kartaa USSD marka uusan internet jirin.',
      storiesTitle: 'Sheekooyinka Beeralayda Guulaysta',
      cropCalendarTitle: 'Hambalalka Beeraha',
      videoTutorialsTitle: 'Warbixinooyinka Fiidiyowga',
    },
    chat: {
      title: 'Khabiirka Beeraha ee AI (Af-Soomaali)',
      placeholder: 'Weydii su\'aal kasta oo ku saabsan beeraha...',
      listening: 'Waan ku dhageysanayaa... hadal hadda',
      recordingVoice: 'Codka ayaa la duubayaa...',
      send: 'Dir',
      suggestedQuestions: [
        'Bacrimintee ayaa ugu fiican beerashada qamadiga ama galleyda?',
        'Sidee loo dilaa cayayaanka galleyda (Fall Armyworm)?',
        'Waa imisa qiimaha yaanyada ee suuqa Nairobi maanta?',
      ],
      disclaimer: 'Talooyinka waxay ku saleysan yihiin shuruucda KALRO.',
      speakResponse: 'Cod ku Akhri',
      stopAudio: 'Jooji Codka',
      uploadImagePrompt: 'Soo rar sawirka caleenta',
    },
    disease: {
      title: 'Baarista Cudurrada Geedaha ee AI',
      subtitle: 'Soo geli sawirka caleenta buka. AI waxay aqoonsan doontaa cudurka waxayna ku siin doontaa daawada saxda ah.',
      uploadPrompt: 'Halkan geli sawirka caleenta',
      dragDrop: 'Soo jiid sawirka halkan',
      takePhoto: 'Isticmaal Kaamerada',
      sampleImages: 'Tusaalooyinka Cudurrada Geedaha',
      analyzing: 'AI ayaa baareysa caleenta...',
      diagnosisResult: 'Natiijada Baarista & Daawada',
      confidence: 'Kalsoonida AI',
      severity: 'Heerka Khatarta',
      symptoms: 'Calaamadaha Cudurka',
      organicCure: 'Dawo Dabiici ah',
      chemicalCure: 'Dawooyinka Kiimikada',
      prevention: 'Tallaabooyinka Ka-hortagga',
      buyTreatments: 'Iibso Dawadan Suuqa',
    },
    prices: {
      title: 'Qiimaha Dalagyada ee Suuqyada Kenya',
      subtitle: 'Qiimaha tooska ah ee Nairobi, Mombasa, Garissa, Mandera iyo Wajir.',
      filterCrop: 'Dooro Dalagga',
      filterMarket: 'Dooro Suuqa',
      allCrops: 'Dhammaan Dalagyada',
      allMarkets: 'Dhammaan Suuqyada',
      wholesale: 'Qiimaha Jumlad',
      retail: 'Qiimaha Tafaariiq',
      change24h: 'Isbeddelka Maanta',
      bestSellMarket: 'Suuqa Qiimaha Sare',
      priceAlert: 'Dhig Fariin Digniin SMS',
    },
    marketplace: {
      title: 'Suuqa Qalabka & Abuurka Saxda ah',
      subtitle: 'Abuurka KEPHIS aqoonsatay, bacrimiyaha Yara/DAP, iyo ku bixi M-Pesa.',
      searchPlaceholder: 'Raadi abuur, bacrimi, dawooyinka cayayaanka...',
      allCategories: 'Dhammaan Qeybaha',
      addToCart: 'Ku dar Gaariga',
      viewDetails: 'Fiiri Faahfaahin',
      inStock: 'Waa Diyaar',
      outOfStock: 'Wuu Dhamaaday',
      verifiedKephis: 'KEPHIS ayaa Hubisay',
      cart: 'Gaariga Wax Iibsiga',
      checkoutMpesa: 'Ku bixi M-Pesa',
      total: 'Wadarta Guud',
      whatsappSeller: 'WhatsApp Iibsade',
      callSeller: 'Wac Iibsade',
    },
    footer: {
      quickLinks: 'Laamaasta',
      resources: 'Hagidh',
      contact: 'Nala Soo Xiriir',
    },
    auth: {
      loginTitle: 'Galitaanka Beeraleyda (SautiFarm)',
      enterPhone: 'Geli lambarkaaga taleefanka',
      phonePlaceholder: '0712 345 678...',
      sendOtp: 'Dir Lambarka Sirta (OTP)',
      enterOtp: 'Geli Lambarka OTP',
      verifyOtp: 'Xaqiiji & Gal',
      name: 'Magacaaga oo Buuxa',
      county: 'Deegaankaaga/Kauntigaada',
      farmSize: 'Baaxadda Beerta (Hektar/Acre)',
      successGreeting: 'Kusoo dhawaw SautiFarm!',
      logout: 'Ka Bax',
    },
  },
};

export const getTranslation = (lang: LanguageCode): TranslationDict => {
  return translations[lang] || translations.sw;
};
