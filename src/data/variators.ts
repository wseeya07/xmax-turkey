export type VariatorBrand = {
  slug: string;
  name: string;
  origin: string;
  positioning: string;
  productCodes: { model: string; code: string }[];
  rollerCount: number | "özel";
  rollerSize: string;
  kitWeight: string;
  engineering: string[];
  pros: string[];
  cons: string[];
  rollerWeights: { stock: number; recommended: number[]; rangeNote: string };
  springRate: { stock: string; options: string[] };
  fitsGenerations: string[];
  pricingTier: "ekonomik" | "orta" | "premium";
  bestFor: string;
  riskNote?: string;
};

export const VARIATOR_BRANDS: VariatorBrand[] = [
  {
    slug: "malossi",
    name: "Malossi Multivar 2000",
    origin: "İtalya",
    positioning:
      "Avrupa pazarının referans performans varyatörü. 6 → 8 bagalı radikal mimari ile titreşimi sönümleyip ivmelenmeyi pürüzsüzleştirir.",
    productCodes: [
      { model: "XMAX 300", code: "5117861" },
      { model: "XMAX 400", code: "5114148" },
      { model: "Sabit yanak (Ventilvar 2000)", code: "6118260B" }
    ],
    rollerCount: 8,
    rollerSize: "25 × 14.9 mm",
    kitWeight: "8.0 g HTRoll (XMAX 300) · 10/12 g (XMAX 400)",
    engineering: [
      "Sürücü burcu sinterlenmiş çelikten imal, sert krom kaplı + elmas uçla taşlanmış yüzey",
      "8 bagalı sistem merkezkaç kuvvetini rampaya homojen dağıtır, kayış titreşimini sönümler",
      "Yüksek silikon alaşımlı hareketli yanak",
      "Tamamlayıcı Ventilvar 2000 sabit yanak — aerodinamik soğutma kanatları"
    ],
    pros: [
      "Pürüzsüz devirlenme, geniş ratio bandı",
      "Yedek baga + slider Türkiye'de yaygın bulunur",
      "8 bagalı sistem motor titreşimini sıfırlar"
    ],
    cons: [
      "Stok beygir altında doğru baga seçimi şart — yanlış gramda yumuşak kalkış",
      "Premium fiyat segmenti"
    ],
    rollerWeights: {
      stock: 14,
      recommended: [8, 10, 12],
      rangeNote:
        "Kit içeriği 8g HTRoll geliyor. Şehir kullanımı için 10–12g, yarış için 8g önerilir."
    },
    springRate: {
      stock: "OEM stok yay",
      options: ["Malossi Sarı (1500 RPM)", "Malossi Kırmızı (2000 RPM)"]
    },
    fitsGenerations: ["xmax-300-2018", "xmax-300-2023", "xmax-300-2025", "xmax-400-2013", "xmax-400-2018"],
    pricingTier: "premium",
    bestFor:
      "Avrupa cadde tarzı sportif sürüş, son hız + ara hızlanma odaklı kullanıcı."
  },
  {
    slug: "polini",
    name: "Polini Hi-Speed 12-Roller",
    origin: "İtalya",
    positioning:
      "12 bagalı patentli sistem ve dahili yağlama rezervuarı — gaz tepkisini milisaniyeler seviyesine çeken mühendislik çözümü.",
    productCodes: [{ model: "XMAX 300", code: "241.741" }],
    rollerCount: 12,
    rollerSize: "Özel Polini geometri",
    kitWeight: "7.0 g (aramid-naylon)",
    engineering: [
      "12 adet 7 gram aramid-naylon baga — dairesel sapma (runout) neredeyse sıfır",
      "DLC (Diamond Like Carbon) kaplamalı sertleştirilmiş çelik pin",
      "Patentli dahili yay + gres rezervuarı — sürekli ve homojen yağlama",
      "%60 daha az aşınma, milisaniyeler seviyesinde gaz tepkisi",
      "%10 daha sert arka kontrast yay kit içeriğinde"
    ],
    pros: [
      "Sınıfının en hızlı gaz reaksiyonu",
      "Düşük aşınma — uzun ömür",
      "Dahili yağlama sayesinde bakım periyodu uzun"
    ],
    cons: [
      "12 bagalı sistem balans için hassas montaj gerektirir",
      "Yedek baga setleri Türkiye'de sınırlı"
    ],
    rollerWeights: {
      stock: 14,
      recommended: [7],
      rangeNote: "Polini sadece kendi 7g özel bagasıyla optimum çalışır."
    },
    springRate: {
      stock: "Kit içeriği %10 sert yay",
      options: ["Polini %10", "Polini %20 yarış"]
    },
    fitsGenerations: ["xmax-300-2018", "xmax-300-2023", "xmax-300-2025"],
    pricingTier: "premium",
    bestFor:
      "Pist performansı + anlık tepki arayan yarış / agresif drag kullanıcısı."
  },
  {
    slug: "jcosta",
    name: "J.Costa Transverse PRO",
    origin: "İspanya",
    positioning:
      "Geleneksel dairesel baga hareketini reddeden tek marka — eksenel mermi-ağırlık sistemi ile sıfır rampa sürtünmesi.",
    productCodes: [{ model: "XMAX 250 (TM42)", code: "TM42" }],
    rollerCount: "özel",
    rollerSize: "Mermi tipi eksenel ağırlık",
    kitWeight: "Değişken (mermi sayısı + ağırlık)",
    engineering: [
      "Mermi şeklinde plastik ağırlıklar varyatör gövdesinde dikey kanallarda kayar",
      "Rampa plakası ve baga yuvası arasındaki sürtünme sıfıra yakın",
      "İnstant RPM jump — motor adeta boşta devirleniyor gibi maks. güç noktasına fırlar",
      "Doğrusal tork eğrisi"
    ],
    pros: [
      "Sınıfının en hızlı devirlenmesi",
      "Doğrusal güç eğrisi",
      "Klasik baga aşınması yok"
    ],
    cons: [
      "Kasnak yanaklarını çok açar → kayışın çana sürtme riski",
      "Çok sıkı kayış kontrolü ister",
      "Düzenli ağırlık değişimi gerekir"
    ],
    rollerWeights: {
      stock: 0,
      recommended: [],
      rangeNote: "Bagalar yerine değişken ağırlıklı mermi paketleri kullanılır."
    },
    springRate: {
      stock: "Standart",
      options: ["J.Costa PRO yay seti"]
    },
    fitsGenerations: ["xmax-250-2018", "xmax-250-2023", "xmax-250-2025"],
    pricingTier: "premium",
    bestFor:
      "Klasik bagayı reddeden, doğrusal güç eğrisi ve anlık devirlenme arayan deneyimli kullanıcı.",
    riskNote:
      "İspanya/İtalya atölyelerinin raporu: sistem kasnak yanaklarını maksimum açtığı için kayış kasnaktan kaçarak çana sürtebilir ya da vaktinden önce kopabilir. Düzenli kayış kontrolü ve ağırlık ayarı şart."
  },
  {
    slug: "tdr",
    name: "TDR CVT Performance Pulley V.23",
    origin: "Tayland / Endonezya",
    positioning:
      "Güneydoğu Asya'nın nemli-sıcak iklimine göre tasarlanmış 13.8° dikleştirilmiş kasnak açısı — kısa vites + overdrive etkisi.",
    productCodes: [{ model: "XMAX 250 / 300", code: "33301-B7401-CPWSR" }],
    rollerCount: 6,
    rollerSize: "23 × 18 mm",
    kitWeight: "İsteğe bağlı tedarik",
    engineering: [
      "Varyatör kasnak yüzey açısı 14°'den 13.8°'ye dikleştirilmiş",
      "Alt devirde kayış aşağıda kalır (kısa vites etkisi)",
      "Üst devirde kasnağın en dış çeperine kadar tırmanır (overdrive etkisi)",
      "Yüksek ısı iletim katsayılı alüminyum alaşım — kayış kaçırma riski düşük"
    ],
    pros: [
      "Asya yarış sahnesinde kanıtlanmış",
      "Sıcak iklim performansı",
      "Ekonomik fiyat segmenti"
    ],
    cons: [
      "Bagalar ayrı tedarik",
      "Yüksek devirde Malossi/Polini kadar pürüzsüz değil"
    ],
    rollerWeights: {
      stock: 17.5,
      recommended: [13, 14, 15],
      rangeNote:
        "23×18 mm baga ile uyumlu. Şehir için 14–15g, agresif kalkış için 13g."
    },
    springRate: {
      stock: "Stok",
      options: ["TDR %10 sert", "Faito R90"]
    },
    fitsGenerations: [
      "xmax-250-2018",
      "xmax-250-2023",
      "xmax-250-2025",
      "xmax-300-2018",
      "xmax-300-2023",
      "xmax-300-2025"
    ],
    pricingTier: "orta",
    bestFor:
      "Sıcak iklim + bütçe odaklı, Asya yarış kurulumu peşindeki sürücü."
  }
];

export const ROLLER_GUIDE = {
  intro:
    "Baga (bilye) ağırlığı, varyatör kasnağının ne kadar erken açıldığını belirler. Merkezkaç kuvveti formülü F_c = m·ω²·r — baga kütlesi azaldığında aynı kuvvete ulaşmak için motor daha yüksek devire çıkmak zorundadır.",
  rules: [
    {
      title: "Hafif baga (−1g / −2g stoktan)",
      detail:
        "Kalkışta motor hızla 6000–7000 RPM bandına tırmanır. Beygir zirvesinde çalışır, hızlanma agresif olur. Dik rampalı coğrafyada tırmanış kuvvetlidir. Uzun yolda devir yüksek kalır, yakıt tüketimi artar."
    },
    {
      title: "Ağır baga (+1g / +2g stoktan)",
      detail:
        "Varyatör erken açılır, şanzıman erken vites büyütür. Kalkışta yığılma (bogging) olabilir ama otoyolda motor devri düşer, konfor + ekonomi kazanılır."
    },
    {
      title: "Karışım kuralları (Mixing Weights)",
      detail:
        "Dairesel simetri zorunludur — 6 bagada 14-16-14-16-14-16 ardışık olmalı. Yan yana iki aynı ağırlık balans bozar, krank rulmanına zarar verir. İki grup arası max 2 gram fark."
    }
  ]
};
