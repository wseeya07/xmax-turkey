export type ClutchBrand = {
  slug: string;
  brand: string;
  product: string;
  category: "sokak" | "ayarlanabilir" | "kilitli" | "çan" | "yay";
  productCodes: { model: string; code: string }[];
  positioning: string;
  engineering: string[];
  benefit: string;
  fitsGenerations: string[];
  pricingTier: "orta" | "premium";
};

export const CLUTCHES: ClutchBrand[] = [
  {
    slug: "malossi-maxi-fly",
    brand: "Malossi",
    product: "Maxi Fly Clutch",
    category: "sokak",
    productCodes: [
      { model: "XMAX 300", code: "5217848B" },
      { model: "XMAX 400", code: "5212819" }
    ],
    positioning:
      "OEM debriyajın tak-çalıştır mantığında güçlendirilmiş alternatifi. Sokak kullanımı için hazırlanmış.",
    engineering: [
      "Sinterlenmiş metal bileşenli balata pabuçları — yüksek sürtünme katsayısı",
      "Yay sertliği fabrika ayarından bir kademe daha sert",
      "Kavrama 500–800 RPM daha geç gerçekleşir — dur-kalk hantallığı sıfırlanır",
      "Ayar mekanizması yok, tak-çalıştır"
    ],
    benefit: "Titreşimsiz, kararlı kalkış + uzun balata ömrü.",
    fitsGenerations: [
      "xmax-300-2018",
      "xmax-300-2023",
      "xmax-300-2025",
      "xmax-400-2013",
      "xmax-400-2018"
    ],
    pricingTier: "orta"
  },
  {
    slug: "malossi-maxi-delta",
    brand: "Malossi",
    product: "Maxi Delta Clutch (Ayarlanabilir)",
    category: "ayarlanabilir",
    productCodes: [
      { model: "XMAX 300", code: "M5211821" },
      { model: "XMAX 400", code: "M5211481" }
    ],
    positioning:
      "Yarış ve agresif sokak için ince ayar yapılabilir patentli yarış debriyajı.",
    engineering: [
      "Üç sabitleme vidası + değişken yay konumu = 3 → 9 mikro ayar",
      "Yay + pabuç ağırlığı kombinasyonu ile 27 farklı ayar matrisi",
      "Pabuç açılma geometrisi ve yay ön yüklemesi (preload) ayarlanabilir",
      "Peak torque RPM'de çana kavrar — sıfır kayıpla launch"
    ],
    benefit:
      "Kalkış devrinin milimetrik ayarlanması — torkun tam zirvesinde kavrama.",
    fitsGenerations: [
      "xmax-300-2018",
      "xmax-300-2023",
      "xmax-300-2025",
      "xmax-400-2013",
      "xmax-400-2018"
    ],
    pricingTier: "premium"
  },
  {
    slug: "drpulley-hit",
    brand: "Dr. Pulley",
    product: "High Thrust (HiT) Debriyajı",
    category: "kilitli",
    productCodes: [{ model: "XMAX 300", code: "HiT261301M1" }],
    positioning:
      "Tayvan Ar-Ge'sinin tork yardımlı kilitleme sistemi — sıfır kayma, sıfır camlaşma.",
    engineering: [
      "Çift yaylı sistem: debriyaj yayları (clutch springs) + kilit yayları (pillow springs)",
      "Balata çana temas anında özel kama/itici mekanizma devreye girer",
      "Motor torku doğrudan balatayı çan duvarına mekanik olarak kilitler",
      "%35 daha yüksek kavrama kuvveti"
    ],
    benefit:
      "Sıfır kayma, sıfır balata camlaşması, ani gaz açmada gecikmesiz aktarım.",
    fitsGenerations: ["xmax-300-2018", "xmax-300-2023", "xmax-300-2025"],
    pricingTier: "premium"
  },
  {
    slug: "malossi-maxi-wing-bell",
    brand: "Malossi",
    product: "Maxi Wing Clutch Bell (Soğutmalı Çan)",
    category: "çan",
    productCodes: [
      { model: "XMAX 300 (Ø150mm, 1440g)", code: "7717853b" },
      { model: "XMAX 400 (Ø160mm, 1664g)", code: "7715582b" }
    ],
    positioning:
      "Dış çevresinde patentli kanatlı soğutma halkası olan çan — fan etkisiyle CVT odasından sıcak havayı dışarı üfler.",
    engineering: [
      "Kaynakla birleştirilmiş kanatlı soğutma halkası (fin ring)",
      "Çan döndükçe fan görevi görür, debriyaj odasından sıcak havayı tahliye eder",
      "Çanın aşırı ısıdan dolayı eğrilmesini (warping) ve mavi lekelenmeyi (heat spotting) engeller",
      "Dinamik balanslı — yüksek hız uğultusu ve titreşimi sönümlenir"
    ],
    benefit: "Isı dağılımı sayesinde debriyaj camlaşmasının ve eğrilmenin önlenmesi.",
    fitsGenerations: [
      "xmax-300-2018",
      "xmax-300-2023",
      "xmax-300-2025",
      "xmax-400-2013",
      "xmax-400-2018"
    ],
    pricingTier: "premium"
  }
];

export type ContrastSpring = {
  brand: string;
  name: string;
  rpm: number;
  effect: string;
  pairing: string;
};

export const CONTRAST_SPRINGS: ContrastSpring[] = [
  {
    brand: "Malossi",
    name: "Sarı (Yellow)",
    rpm: 1500,
    effect:
      "Arka kasnağın açılması zorlaşır. Şanzıman düşük viteste daha uzun kalır — ara hızlanmalar agresifleşir.",
    pairing: "8–12g hafif baga + Malossi Multivar 2000 ile dengeli."
  },
  {
    brand: "Malossi",
    name: "Kırmızı (Red)",
    rpm: 2000,
    effect:
      "Daha sert kontrast. Yarış kurulumlarında peak torque'a kadar düşük viteste kalmayı garanti eder.",
    pairing: "Yarış kurulumu — 7g Polini veya 8g HTRoll baga ile."
  },
  {
    brand: "Faito",
    name: "R90 Serisi",
    rpm: 1800,
    effect:
      "Asya pazarı yarış standartı. Malossi Sarı ile Kırmızı arasında bir karakter.",
    pairing: "TDR Performance Pulley + 13–14g baga ile uyumlu."
  },
  {
    brand: "TDR",
    name: "%10 Sert Tork Yayı",
    rpm: 1700,
    effect:
      "Stok yaya göre %10 sert, otoyol sürüşünde ara hızlanma kazancı sağlar.",
    pairing: "TDR Performance Pulley + Dr. Pulley sliding baga seti."
  }
];
