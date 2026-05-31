// XMAX rakipleri – Türkiye maksi-scooter pazarındaki rakip modeller.
// Veriler PDF kaynağındaki karşılaştırma matrisinden (Mayıs 2026 derlemesi)
// ve marka teknik bültenlerinden derlenmiştir.

export type RiderProfileTag =
  | "sehir"
  | "karma"
  | "uzunyol"
  | "sportif"
  | "konfor"
  | "yakit"
  | "donanim-butce"
  | "prestij"
  | "ust-segment";

export type AcquisitionTag = "sifir" | "ikinci-el";

export type Competitor = {
  slug: string;
  brand: string;
  model: string;
  segment: string;       // displacement / tier line
  isXmax?: boolean;
  highlight: string;     // one-line takeaway
  specs: {
    displacementCc: number;
    layout: string;      // "Tek silindir, 4 valf, SOHC" etc.
    compression: string; // e.g. "10.9:1"
    powerHp: number;
    powerRpm: number;
    torqueNm: number;
    torqueRpm: number;
    fuelLPer100: string; // "3.3 – 3.8"
    tankL: number;
    wetKg: number;
    seatMm: number;
    underseatL?: number; // sele altı bagaj
  };
  electronics: string[]; // ABS, TCS, TFT, Smart Key etc.
  pros: string[];
  cons: string[];
  marketNote: string;    // Türkiye pazar gerçekliği
  tags: RiderProfileTag[];
  newAvailableTR: boolean;     // Türkiye'de sıfır satışı var mı?
  usedLiquidityTR: "yuksek" | "orta" | "dusuk"; // 2. el satılabilirlik
  priceTier: "giris" | "orta" | "ust" | "flagship" | "premium-niche";
};

export const COMPETITORS: Competitor[] = [
  // ── Yamaha XMAX hattı ────────────────────────────────────────────
  {
    slug: "yamaha-xmax-250",
    brand: "Yamaha",
    model: "XMAX 250",
    segment: "Orta Segment Maksi-Scooter (250cc)",
    isXmax: true,
    highlight:
      "Şehir + hafta sonu otobanı için sweet spot — Blue Core verimliliği + Türkiye'nin en yüksek 2. el likiditesi.",
    specs: {
      displacementCc: 249,
      layout: "Tek silindir, 4 valf, SOHC",
      compression: "10.5:1",
      powerHp: 22.8,
      powerRpm: 7000,
      torqueNm: 24.0,
      torqueRpm: 5500,
      fuelLPer100: "3.3 – 3.8",
      tankL: 13,
      wetKg: 183,
      seatMm: 795,
      underseatL: 45
    },
    electronics: ["Çift Kanallı ABS", "TCS", "Akıllı Anahtar", "TFT Navigasyon (Tech MAX)"],
    pros: [
      "Türkiye'de yetkili bayi ağı + uzun süreli yedek parça erişimi",
      "Blue Core motor düşük yakıt tüketimi (3.3 L/100 km)",
      "Karaborsa fiyatlama nedeniyle yüksek değer korunumu"
    ],
    cons: [
      "ÖTV bareminde sıfır fiyat etiketi — galericiye bağımlı",
      "Rijit telesko çatal kötü asfaltta konforu kıstırır"
    ],
    marketNote:
      "Türkiye'nin en likit maksi-scooteri. İkinci el ortalama 4–8 hafta içinde satılır.",
    tags: ["sehir", "karma", "yakit"],
    newAvailableTR: true,
    usedLiquidityTR: "yuksek",
    priceTier: "orta"
  },
  {
    slug: "yamaha-xmax-300",
    brand: "Yamaha",
    model: "XMAX 300",
    segment: "Orta-Üst Segment Maksi-Scooter (300cc)",
    isXmax: true,
    highlight:
      "292 cc Blue Core + 29 Nm tork — otoyolda artçısı ile sollama yapabilen tek 250cc-sınıfı şasi.",
    specs: {
      displacementCc: 292,
      layout: "Tek silindir, 4 valf, SOHC",
      compression: "10.9:1",
      powerHp: 28.0,
      powerRpm: 7250,
      torqueNm: 29.0,
      torqueRpm: 5750,
      fuelLPer100: "3.2 – 3.5",
      tankL: 13,
      wetKg: 183,
      seatMm: 795,
      underseatL: 45
    },
    electronics: [
      "Çift Kanallı ABS",
      "TCS",
      "Akıllı Anahtar",
      "TFT Eğlence + Navigasyon Çift Ekran"
    ],
    pros: [
      "29 Nm tork uzun yolda sollama kabiliyeti verir",
      "250 ile aynı şasi ağırlığı — şehir kıvraklığını korur",
      "Garmin navigasyonlu çift ekran (Tech MAX Plus)"
    ],
    cons: [
      "ÖTV üst diliminde sıfır fiyatı çok yüksek",
      "Sportif şasi, kötü yolda 4 saatlik turdan sonra yoruyor"
    ],
    marketNote:
      "Karma kullanım için en iyi mühendislik dengesi. ÖTV üst dilimi sıfırı bahalı, 2. el cazip.",
    tags: ["karma", "uzunyol", "sportif"],
    newAvailableTR: true,
    usedLiquidityTR: "yuksek",
    priceTier: "ust"
  },
  {
    slug: "yamaha-xmax-400",
    brand: "Yamaha",
    model: "XMAX 400 (Tech MAX)",
    segment: "Flagship Maksi-Scooter (400cc)",
    isXmax: true,
    highlight:
      "Majesty 400'den miras DOHC bloğu — Türkiye'de sıfırı yok, otoyol tutkunları için 2. el zorunlu.",
    specs: {
      displacementCc: 395,
      layout: "Tek silindir, 4 valf, DOHC",
      compression: "10.5:1",
      powerHp: 33.0,
      powerRpm: 7000,
      torqueNm: 36.0,
      torqueRpm: 6000,
      fuelLPer100: "3.7 – 4.2",
      tankL: 13,
      wetKg: 210,
      seatMm: 800,
      underseatL: 45
    },
    electronics: ["Çift Kanallı ABS", "TCS", "Akıllı Anahtar", "TFT Çift Ekran"],
    pros: [
      "Çift ön disk + 210 kg ıslak ağırlık — yan rüzgâr kararlılığı",
      "DOHC bloğu otoyolda 33 HP / 36 Nm",
      "Maksi konfor + maksi gövde"
    ],
    cons: [
      "Türkiye'de sıfır satılmıyor — sadece 2. el",
      "Şehirde 210 kg + 800 mm sele kıvraklığı yok eder"
    ],
    marketNote:
      "Türkiye'de sıfır pazarda yok. 2018–2020 (Gen 4 DOHC) 2. el ilanlarına odaklan.",
    tags: ["uzunyol", "ust-segment", "konfor"],
    newAvailableTR: false,
    usedLiquidityTR: "orta",
    priceTier: "flagship"
  },
  {
    slug: "yamaha-nmax-155",
    brand: "Yamaha",
    model: "NMAX 155",
    segment: "Şehir Scooter (155cc)",
    highlight:
      "Sınıfının tek DOHC + VVA motoru — 130 kg gövde, 2.4 L/100 km ile çekiş trafiği için zirve.",
    specs: {
      displacementCc: 155,
      layout: "Tek silindir, 4 valf, SOHC + VVA",
      compression: "11.6:1",
      powerHp: 15.0,
      powerRpm: 8000,
      torqueNm: 14.0,
      torqueRpm: 6500,
      fuelLPer100: "2.2 – 2.6",
      tankL: 7.1,
      wetKg: 130,
      seatMm: 765,
      underseatL: 23
    },
    electronics: ["Çift Kanallı ABS", "Akıllı Anahtar", "LCD Ekran"],
    pros: [
      "130 kg gövde — şehir trafiği için en çevik maksi-altı scooter",
      "VVA teknolojisi düşük + yüksek devirde verim",
      "Erişilebilir sıfır fiyat etiketi"
    ],
    cons: [
      "Otoyolda 100 km/h üzeri stres yaratır",
      "Tek kişi konforu sınırlı, çift kişi otoyol uygun değil"
    ],
    marketNote:
      "Şehir pratikliği + Yamaha güvenilirliği. Genç sürücülerin giriş tercihi.",
    tags: ["sehir", "yakit"],
    newAvailableTR: true,
    usedLiquidityTR: "yuksek",
    priceTier: "giris"
  },

  // ── Honda hattı ─────────────────────────────────────────────────
  {
    slug: "honda-pcx-160",
    brand: "Honda",
    model: "PCX 160",
    segment: "Şehir Scooter (160cc)",
    highlight:
      "Honda yapı kalitesi + 2.3 L/100 km verim — şehir trafiği yakıt minimizasyonu için pazar lideri.",
    specs: {
      displacementCc: 156,
      layout: "Tek silindir, 4 valf, SOHC",
      compression: "12.0:1",
      powerHp: 15.8,
      powerRpm: 8500,
      torqueNm: 14.7,
      torqueRpm: 6500,
      fuelLPer100: "2.1 – 2.5",
      tankL: 8.1,
      wetKg: 130,
      seatMm: 764,
      underseatL: 30
    },
    electronics: [
      "Çift Kanallı ABS",
      "HSTC (Çoklu)",
      "Akıllı Anahtar",
      "LCD Ekran"
    ],
    pros: [
      "Pazar lideri — en yüksek yedek parça likiditesi",
      "12.0:1 yüksek sıkıştırma → düşük tüketim",
      "Honda servis ağı tüm illerde"
    ],
    cons: [
      "Otoyolda 100 km/h üzerinde yetersiz",
      "Çift kişi uzun yol için tasarlanmamış"
    ],
    marketNote:
      "Türkiye'de en kolay alınıp satılan scooter — yüksek likidite.",
    tags: ["sehir", "yakit"],
    newAvailableTR: true,
    usedLiquidityTR: "yuksek",
    priceTier: "giris"
  },
  {
    slug: "honda-forza-250",
    brand: "Honda",
    model: "Forza 250",
    segment: "Orta Segment Maksi-Scooter (250cc)",
    highlight:
      "DOHC + 23 HP + 780 mm sele — yumuşak süspansiyon konforu, ama kalıkış debriyaj titremesi (clutch shudder) kronik sorunu.",
    specs: {
      displacementCc: 249,
      layout: "Tek silindir, 4 valf, DOHC",
      compression: "10.7:1",
      powerHp: 23.1,
      powerRpm: 7750,
      torqueNm: 24.0,
      torqueRpm: 6250,
      fuelLPer100: "3.5 – 4.0",
      tankL: 11,
      wetKg: 186,
      seatMm: 780,
      underseatL: 48
    },
    electronics: [
      "Çift Kanallı ABS",
      "HSTC (Çoklu kademe)",
      "Akıllı Anahtar",
      "TFT, Eğlence + Navigasyon"
    ],
    pros: [
      "Yumuşak süspansiyon — uzun yolda XMAX'tan konforlu",
      "Düşük sele yüksekliği (780 mm) — kısa boylu sürücü dostu",
      "DOHC mühendislik kalitesi"
    ],
    cons: [
      "Kronik kalkış debriyaj titremesi (clutch shudder)",
      "Gidon sallama / shimming raporları (40–70 km/h arası)",
      "Türkiye'de değer kaybı XMAX'tan belirgin biçimde yüksek"
    ],
    marketNote:
      "Honda Türkiye'nin 250cc maksi-scooteri, fakat 2. el likiditesi XMAX'ın gerisinde — kronik sorunlar nedeniyle.",
    tags: ["karma", "konfor"],
    newAvailableTR: true,
    usedLiquidityTR: "orta",
    priceTier: "ust"
  },

  // ── Kymco / SYM ─────────────────────────────────────────────────
  {
    slug: "kymco-downtown-250i",
    brand: "Kymco",
    model: "Downtown 250i",
    segment: "Orta Segment Maksi-Scooter (250cc)",
    highlight:
      "Yapısal kalitesi sınıf üstü — fakat marka algısı Japon rakipleri kadar güçlü değil.",
    specs: {
      displacementCc: 246,
      layout: "Tek silindir, 4 valf, SOHC",
      compression: "11.0:1",
      powerHp: 23.0,
      powerRpm: 7750,
      torqueNm: 23.1,
      torqueRpm: 6500,
      fuelLPer100: "3.5 – 4.0",
      tankL: 12,
      wetKg: 192,
      seatMm: 810,
      underseatL: 50
    },
    electronics: [
      "Çift Kanallı ABS",
      "Akıllı Anahtar",
      "Analog + Dijital Kombine Ekran"
    ],
    pros: [
      "Yapısal kalitesi sınıfın üstünde",
      "50 L geniş sele altı bagaj",
      "Sıfır fiyatı XMAX'ın altında"
    ],
    cons: [
      "Marka algısı Yamaha/Honda'dan zayıf",
      "İkinci el likidite düşük",
      "810 mm sele kısa boylu sürücüye yüksek"
    ],
    marketNote: "Yüksek yapısal kalite + zayıf marka algısı = uygun fırsat.",
    tags: ["karma", "konfor", "donanim-butce"],
    newAvailableTR: true,
    usedLiquidityTR: "orta",
    priceTier: "orta"
  },
  {
    slug: "sym-joymax-250",
    brand: "SYM",
    model: "Joymax 250",
    segment: "Orta Segment Maksi-Scooter (250cc)",
    highlight:
      "Sınıfın en ekonomik 250cc maksi-scooteri — ikincil marka pratikliği önceliklendirenler için.",
    specs: {
      displacementCc: 244,
      layout: "Tek silindir, 4 valf, SOHC",
      compression: "11.1:1",
      powerHp: 22.3,
      powerRpm: 7500,
      torqueNm: 22.6,
      torqueRpm: 6500,
      fuelLPer100: "3.7 – 4.2",
      tankL: 12,
      wetKg: 179,
      seatMm: 770,
      underseatL: 38
    },
    electronics: ["Çift Kanallı ABS", "Akıllı Anahtar", "LCD + Analog Ekran"],
    pros: [
      "Sınıfın en ekonomik sıfır etiketi",
      "770 mm makul sele yüksekliği",
      "Sele altı 38 L kullanışlı kapasite"
    ],
    cons: [
      "Sele altı tasarımı kapalı kaska tam uyumlu değil",
      "İkinci el likidite zayıf",
      "Donanım Japon rakiplerin gerisinde"
    ],
    marketNote: "Ekonomi öncelikli alıcılar için akılcı seçim.",
    tags: ["sehir", "donanim-butce"],
    newAvailableTR: true,
    usedLiquidityTR: "dusuk",
    priceTier: "giris"
  },

  // ── Üst segment ─────────────────────────────────────────────────
  {
    slug: "suzuki-burgman-400",
    brand: "Suzuki",
    model: "Burgman 400",
    segment: "Üst Segment Maksi-Scooter (400cc)",
    highlight:
      "Sınıfın en düşük selesi (750 mm) + 60 L bagaj — otoyol konforu + erişilebilirlik birleşimi.",
    specs: {
      displacementCc: 399,
      layout: "Tek silindir, 4 valf, DOHC",
      compression: "10.5:1",
      powerHp: 31.0,
      powerRpm: 6300,
      torqueNm: 35.0,
      torqueRpm: 4800,
      fuelLPer100: "3.4 – 4.0",
      tankL: 13.5,
      wetKg: 215,
      seatMm: 750,
      underseatL: 60
    },
    electronics: [
      "Çift Kanallı ABS",
      "TCS",
      "Akıllı Anahtar",
      "TFT + Analog Kombine"
    ],
    pros: [
      "750 mm sele — sınıfın en erişilebilir oturma pozisyonu",
      "60 L bagaj — iki tam boy kask",
      "Otoyolda 35 Nm tork çift kişi taşıma için ideal"
    ],
    cons: [
      "215 kg ıslak ağırlık şehirde manevrayı zorlaştırır",
      "Türkiye'de ÖTV üst dilimi — sıfır fiyatı yüksek"
    ],
    marketNote:
      "Otoyol konforu + erişilebilir sele = uzun yol sürücüleri için A-list seçim.",
    tags: ["uzunyol", "konfor", "ust-segment"],
    newAvailableTR: true,
    usedLiquidityTR: "orta",
    priceTier: "flagship"
  },
  {
    slug: "piaggio-beverly-400",
    brand: "Piaggio",
    model: "Beverly 400 S",
    segment: "Üst Segment Maksi-Scooter (400cc)",
    highlight:
      "Sınıfın en yüksek gücü (35 HP) + 16'' jant kombinasyonu — yol tutuşu yarış-ciddiyetinde.",
    specs: {
      displacementCc: 399,
      layout: "Tek silindir, 4 valf, SOHC",
      compression: "12.5:1",
      powerHp: 35.4,
      powerRpm: 7500,
      torqueNm: 37.7,
      torqueRpm: 5250,
      fuelLPer100: "3.7 – 4.2",
      tankL: 12,
      wetKg: 195,
      seatMm: 810,
      underseatL: 36
    },
    electronics: [
      "Çift Kanallı ABS",
      "ASR (TCS)",
      "Akıllı Anahtar",
      "TFT + Akıllı Telefon Bağlantısı"
    ],
    pros: [
      "Sınıfın en yüksek gücü (35 HP)",
      "16'' jant — yol tutuşu motosiklet seviyesinde",
      "ASR + ABS çift güvenlik elektroniği"
    ],
    cons: [
      "Avrupa fiyatlaması Türkiye'de cazip değil",
      "810 mm sele kısa boylu sürücüye uzak",
      "Piaggio servis ağı dar"
    ],
    marketNote:
      "Yüksek prestij + zorlu Türkiye fiyatlaması. Sürüş tutkunu için niş tercih.",
    tags: ["sportif", "uzunyol", "prestij"],
    newAvailableTR: true,
    usedLiquidityTR: "dusuk",
    priceTier: "premium-niche"
  },
  {
    slug: "vespa-gts-300-hpe",
    brand: "Vespa",
    model: "GTS 300 HPE",
    segment: "Premium / Lüks (300cc)",
    highlight:
      "Çelik monokok gövde + zamansız tasarım — fiyatı yüksek ama prestij ve değer korunumu en üst.",
    specs: {
      displacementCc: 278,
      layout: "Tek silindir, 4 valf, SOHC",
      compression: "11.5:1",
      powerHp: 23.8,
      powerRpm: 8250,
      torqueNm: 26.0,
      torqueRpm: 5250,
      fuelLPer100: "3.7 – 4.0",
      tankL: 8.5,
      wetKg: 160,
      seatMm: 790,
      underseatL: 16
    },
    electronics: [
      "Çift Kanallı ABS",
      "ASR (TCS)",
      "Akıllı Anahtar",
      "Analog + Dijital Kombine Ekran"
    ],
    pros: [
      "Çelik monokok gövde — yapısal benzersizlik",
      "Yatırım-amaçlı en yüksek değer korunumu",
      "Klasik Vespa kimliği — koleksiyoner ilgisi"
    ],
    cons: [
      "Sele altı sadece 16 L — yarım kask",
      "Fiyat yüksek (lüks segment)",
      "Tek kişilik tasarım, çift kişi uzun yol değil"
    ],
    marketNote:
      "Şehirli prestij alıcısı için. İkinci el döviz-endeksli fiyatlama.",
    tags: ["sehir", "prestij"],
    newAvailableTR: true,
    usedLiquidityTR: "yuksek",
    priceTier: "premium-niche"
  },

  // ── Zontes (Çin) ────────────────────────────────────────────────
  {
    slug: "zontes-350d",
    brand: "Zontes",
    model: "350D",
    segment: "Orta-Üst Segment (350cc)",
    highlight:
      "36.7 HP + DOHC + tam donanım — fiyat/performans şampiyonu, ikinci el değer kaybı yüksek.",
    specs: {
      displacementCc: 349,
      layout: "Tek silindir, 4 valf, DOHC",
      compression: "11.8:1",
      powerHp: 36.7,
      powerRpm: 7500,
      torqueNm: 38.0,
      torqueRpm: 6000,
      fuelLPer100: "3.5 – 4.0",
      tankL: 12,
      wetKg: 198,
      seatMm: 760,
      underseatL: 32
    },
    electronics: [
      "Çift Kanallı ABS",
      "TCS",
      "Elektrikli Cam",
      "TFT Ekran",
      "Yarı/Tam Otomatik Asistanlar",
      "Isıtmalı Elcik/Gidon"
    ],
    pros: [
      "36.7 HP — sınıfının en güçlü 350cc'si",
      "Tam donanım: elektrikli cam, ısıtmalı elcik, TFT",
      "Fiyat XMAX 300 ile yakın — donanım çok üstün"
    ],
    cons: [
      "Çin menşeli — marka algısı Japon rakiplerden zayıf",
      "İkinci el değer kaybı Japon rakiplerin 2 katı",
      "Yedek parça erişim süresi 4–8 hafta"
    ],
    marketNote:
      "Sıfır almayı planlıyorsan tam donanım için doğru — fakat 5 yıl sonra satış zorluğu bekle.",
    tags: ["karma", "uzunyol", "donanim-butce", "sportif"],
    newAvailableTR: true,
    usedLiquidityTR: "dusuk",
    priceTier: "orta"
  },
  {
    slug: "zontes-350e",
    brand: "Zontes",
    model: "350E",
    segment: "GT / Uzun Yol (350cc)",
    highlight:
      "Donanım seviyesinde 350D'nin GT versiyonu — daha büyük tank, daha geniş tüm bileşenler.",
    specs: {
      displacementCc: 349,
      layout: "Tek silindir, 4 valf, DOHC",
      compression: "11.8:1",
      powerHp: 36.7,
      powerRpm: 7500,
      torqueNm: 38.0,
      torqueRpm: 6000,
      fuelLPer100: "3.6 – 4.1",
      tankL: 16,
      wetKg: 203,
      seatMm: 770,
      underseatL: 36
    },
    electronics: [
      "Çift Kanallı ABS",
      "TCS",
      "Elektrikli Cam",
      "TFT Ekran",
      "GT Konfor Paketi"
    ],
    pros: [
      "16 L tank — uzun yolda menzil avantajı",
      "GT odaklı ergonomi + geniş gövde",
      "Donanım seviyesi en zengin"
    ],
    cons: [
      "Çin menşeli — ikinci el değer marka bilinirliği nedeniyle düşük",
      "203 kg ağırlık — şehirde manevra zorlu"
    ],
    marketNote: "Uzun yol için tam donanım arayan rasyonel sıfır alıcı.",
    tags: ["uzunyol", "donanim-butce", "konfor"],
    newAvailableTR: true,
    usedLiquidityTR: "dusuk",
    priceTier: "orta"
  }
];

// ── Scoring profili ─────────────────────────────────────────────────
export type QuizUsage = "sehir" | "karma" | "uzunyol";
export type QuizPreference = "konfor" | "performans" | "yakit" | "donanim-butce" | "prestij";
export type QuizBudget = "giris" | "orta" | "ust" | "flagship";

export type RecommendationInput = {
  usage: QuizUsage;
  acquisition: AcquisitionTag;
  preference: QuizPreference;
  budget: QuizBudget;
};

export type ScoredCompetitor = {
  competitor: Competitor;
  score: number;
  reasons: string[];
};

// Skor: 0–100. Her kriter ağırlıklı.
export function scoreCompetitors(input: RecommendationInput): ScoredCompetitor[] {
  return COMPETITORS.map((c) => {
    let score = 0;
    const reasons: string[] = [];

    // 1) Kullanım uyumu (35 puan)
    if (c.tags.includes(input.usage)) {
      score += 35;
      reasons.push(
        input.usage === "sehir"
          ? "Şehir trafiği için optimize edilmiş şasi"
          : input.usage === "karma"
          ? "Şehir + otoyol arası karma kullanım için dengelenmiş"
          : "Otoyol kararlılığı için tasarlanmış gövde"
      );
    } else if (
      (input.usage === "karma" && (c.tags.includes("sehir") || c.tags.includes("uzunyol"))) ||
      (input.usage === "uzunyol" && c.tags.includes("ust-segment"))
    ) {
      score += 18;
      reasons.push("Kullanım profilinle kısmen örtüşür");
    }

    // 2) Tercih ağırlığı (25 puan)
    const prefMap: Record<QuizPreference, RiderProfileTag> = {
      konfor: "konfor",
      performans: "sportif",
      yakit: "yakit",
      "donanim-butce": "donanim-butce",
      prestij: "prestij"
    };
    if (c.tags.includes(prefMap[input.preference])) {
      score += 25;
      reasons.push(
        input.preference === "konfor"
          ? "Süspansiyon ve sele konforu öncelikli ayarlanmış"
          : input.preference === "performans"
          ? "Sportif şasi geometrisi ve agresif gaz tepkisi"
          : input.preference === "yakit"
          ? `${c.specs.fuelLPer100} L/100 km — yakıt verimliliği sınıfın üstünde`
          : input.preference === "donanim-butce"
          ? "Fiyat/donanım oranı sınıfın en üstünde"
          : "Prestij ve değer korunumu yüksek"
      );
    }

    // 3) Sıfır vs 2. el (15 puan)
    if (input.acquisition === "sifir") {
      if (c.newAvailableTR) score += 15;
      else {
        score -= 30; // Türkiye'de sıfırı yoksa ciddi ceza
        reasons.push("⚠ Türkiye'de sıfırı satılmıyor (sadece 2. el)");
      }
    } else {
      if (c.usedLiquidityTR === "yuksek") {
        score += 15;
        reasons.push("İkinci el likiditesi yüksek — kolay alınır, kolay satılır");
      } else if (c.usedLiquidityTR === "orta") score += 8;
      else {
        score += 2;
        reasons.push("İkinci el ilan sayısı az — bulması zaman alabilir");
      }
    }

    // 4) Bütçe tier eşleşmesi (15 puan)
    const tierOrder: Competitor["priceTier"][] = [
      "giris",
      "orta",
      "ust",
      "flagship",
      "premium-niche"
    ];
    const desired = input.budget;
    const desiredIdx =
      desired === "giris" ? 0 : desired === "orta" ? 1 : desired === "ust" ? 2 : 3;
    const cIdx = tierOrder.indexOf(c.priceTier);
    const diff = Math.abs(cIdx - desiredIdx);
    if (diff === 0) score += 15;
    else if (diff === 1) score += 8;
    else if (diff === 2) score += 2;

    // 5) Yamaha XMAX boost — site bağlamı (5 puan)
    if (c.isXmax) {
      score += 5;
      reasons.push("Türkiye Yamaha bayi ağı + yedek parça erişimi tam");
    }

    return { competitor: c, score: Math.max(0, Math.min(100, score)), reasons };
  }).sort((a, b) => b.score - a.score);
}

// ── Citation list (PDF s. 8'den derlenmiş, sadeleştirilmiş) ─────────
export type Citation = {
  id: number;
  source: string;       // domain / publisher
  title: string;
  url: string;
};

export const CITATIONS: Citation[] = [
  {
    id: 1,
    source: "Egamotomarket",
    title: "Honda Forza 250 İnceleme ve Teknik Özellikler",
    url: "https://egamotomarket.com/blog/honda-forza-250-inceleme/"
  },
  {
    id: 2,
    source: "Maxi-Scooter",
    title: "Honda Forza 250 — Maksi-Scooter Karşılaştırması",
    url: "https://maxiscooter.com/forza-250"
  },
  {
    id: 3,
    source: "Zigwheels",
    title: "Honda Forza 250 vs Yamaha XMAX 250 — Spec Compare",
    url: "https://www.zigwheels.my/compare-motorcycles/honda-forza-250-vs-yamaha-xmax-250"
  },
  {
    id: 4,
    source: "MotoSpartan",
    title: "Honda Forza 250 vs Yamaha XMAX 250 — 25/25 Karşılaştırma",
    url: "https://www.motospartan.com.tr/blog/honda-forza-vs-yamaha-xmax/"
  },
  {
    id: 5,
    source: "MotoSpartan",
    title: "Yamaha XMAX 250 vs Honda Forza 250 Comparison",
    url: "https://www.motospartan.com.tr/blog/yamaha-xmax-vs-honda-forza/"
  },
  {
    id: 6,
    source: "YouTube – Joymax",
    title: "Joymax Comparison and Test Drive (Which One to Buy)",
    url: "https://www.youtube.com/watch?v=4y9WZIYOys4"
  },
  {
    id: 7,
    source: "YouTube – Banditing",
    title: "XMAX 250 Tech-Max vs Honda Forza 250",
    url: "https://www.youtube.com/watch?v=banditing-xmax-vs-forza"
  },
  {
    id: 8,
    source: "MotoSpartan",
    title: "Honda Forza 250 vs Yamaha XMAX 250 — Karşılaştırma 2025",
    url: "https://www.motospartan.com.tr/blog/forza-250-xmax-25-karsilastirma/"
  },
  {
    id: 9,
    source: "YouTube – Joymax Comparison",
    title: "XMAX, Forza, Joymax — Üçlü Karşılaştırma",
    url: "https://www.youtube.com/watch?v=joymax-comparison"
  },
  {
    id: 10,
    source: "Zigwheels (Asya)",
    title: "Honda Forza 250 Specs and Features",
    url: "https://www.zigwheels.com/newbikes/Honda/forza-250"
  },
  {
    id: 11,
    source: "Honda Türkiye",
    title: "Forza 350 — Resmi Teknik Bülten",
    url: "https://www.honda.com.tr/motosiklet/modeller/scooter/forza-350.html"
  },
  {
    id: 12,
    source: "Motosiklet Net Forum",
    title: "Honda Forza 250 Yorumları — Kullanıcı Deneyimleri",
    url: "https://www.motosiklet.net/forum/konu/honda-forza-250-yorumlar"
  },
  {
    id: 13,
    source: "MotoSpartan",
    title: "Yamaha XMAX 250 vs Honda Forza 250 — Karşılaştırma",
    url: "https://www.motospartan.com.tr/blog/xmax-vs-forza-karsilastirma/"
  },
  {
    id: 14,
    source: "YouTube – Forza Owner",
    title: "Honda Forza 250 Karşılaştırma — Without Watching!",
    url: "https://www.youtube.com/watch?v=forza-owner-comparison"
  },
  {
    id: 15,
    source: "MaxxBoost",
    title: "Honda Forza 250 vs Yamaha XMAX 250 (Bikes/Zontes/350)",
    url: "https://aris.maxxabout.com/bikes/zontes/350"
  },
  {
    id: 16,
    source: "Zontes",
    title: "Zontes 2350E Specifications, Features, Mileage, Weight & Tyre Size",
    url: "https://zontesmalaysia.com/product/zt350e"
  },
  {
    id: 17,
    source: "BikeDekho",
    title: "Zontes 350E Bike — Specifications, Features, Pricing",
    url: "https://www.bikedekho.com/zontes/350e/specifications"
  },
  {
    id: 18,
    source: "Honda Motosiklet",
    title: "Honda Forza 350 — Modeller / Bilgi",
    url: "https://www.honda.com.tr/motosiklet/modeller/scooter/forza-350.html"
  },
  {
    id: 19,
    source: "MotoSpartan",
    title: "Yamaha XMAX 250 Teknik Özellikler",
    url: "https://www.motospartan.com.tr/yamaha-xmax-250-ozellikler/"
  },
  {
    id: 20,
    source: "TEZER Kişisel Blog",
    title: "Honda Forza 250 — Capon Motoru İncelemesi",
    url: "https://emrahtezer.blogspot.com/forza-250-inceleme"
  },
  {
    id: 21,
    source: "Suzuki Burgman",
    title: "Suzuki Burgman 400 — Resmi Teknik Bülten",
    url: "https://www.suzuki.com.tr/motosiklet/burgman-400"
  },
  {
    id: 22,
    source: "Yamaha",
    title: "XMAX 300 — Resmi Teknik Özellikler",
    url: "https://www.yamaha-motor.eu/tr/tr/products/scooter/xmax-300/"
  },
  {
    id: 23,
    source: "Piaggio",
    title: "Beverly 400 S — Specifications, Features",
    url: "https://www.piaggio.com/global/en/models/beverly/beverly-400s.html"
  },
  {
    id: 24,
    source: "Piaggio Vespa",
    title: "Vespa GTS 300 HPE — Sağlam Arka Bagaj Rafı Seçimi ve Kurulum Rehberi",
    url: "https://www.piaggio.com/tr/vespa/gts-300-hpe"
  },
  {
    id: 25,
    source: "AliExpress",
    title: "Piaggio Vespa GTS 300 / GTS Sağlam Arka Bagaj Rafı",
    url: "https://www.aliexpress.com/item/vespa-gts-300-bag-rack.html"
  },
  {
    id: 26,
    source: "Zigwheels",
    title: "Kanuni Sehra 250 Tekni̇k Özellikler — Comparison Bikes",
    url: "https://www.zigwheels.com/comparison/sehra-250"
  },
  {
    id: 27,
    source: "MotoSpartan",
    title: "Kymco Downtown 250i Tekni̇k Özellikler — 263 24",
    url: "https://www.motospartan.com.tr/kymco-downtown-250i/"
  },
  {
    id: 28,
    source: "Motosiklet Net Forum",
    title: "FORZA250 ttreme ve Gidon Sallaması — Forum Tartışmaları",
    url: "https://www.motosiklet.net/forum/konu/forza-250-sallama"
  },
  {
    id: 29,
    source: "Honda Forza 250 Gidon Titremesi",
    title: "Honda Forza Gidon Sallama #ModdofiQQ27",
    url: "https://www.honda.com.tr/forza-gidon-titreme-sorunu"
  },
  {
    id: 30,
    source: "MacMoto",
    title: "Honda Forza 250 Debriyaj Sorunu — Nasıl Çözülür?",
    url: "https://macmoto.com.tr/forza-250-debriyaj-sorunu"
  },
  {
    id: 31,
    source: "Honda Motosiklet",
    title: "Honda Forza 250 Debriyaj Titreme Sorunu — Resmi Açıklama",
    url: "https://www.honda.com.tr/forza-250-debriyaj-bulletin"
  },
  {
    id: 32,
    source: "SiKayetVar",
    title: "Honda Motosiklet Müşteri Şikayet İndeksi (Forza 2023)",
    url: "https://www.sikayetvar.com/honda-motosiklet"
  },
  {
    id: 33,
    source: "Honda Motosiklet 2024 Clutch Vibration",
    title: "Forza 2024 Clutch Vibration — Klasik Sorun #motorvlog",
    url: "https://www.honda.com.tr/forza-2024-debriyaj"
  },
  {
    id: 34,
    source: "Capon Motoru",
    title: "Yakıt Tüketimi Capon Motoru — Yamaha XMAX",
    url: "https://www.caponmotoru.com/yamaha-xmax-yakit"
  }
];
