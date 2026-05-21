export type VariatorBrand = {
  slug: string;
  name: string;
  origin: string;
  positioning: string;
  pros: string[];
  cons: string[];
  rollerWeights: { stock: number; recommended: number[]; rangeNote: string };
  springRate: { stock: string; options: string[] };
  fitsGenerations: string[];
  pricingTier: "ekonomik" | "orta" | "premium";
  bestFor: string;
};

export const VARIATOR_BRANDS: VariatorBrand[] = [
  {
    slug: "malossi",
    name: "Malossi Multivar 2000",
    origin: "İtalya",
    positioning: "Pist & yüksek devir odaklı performans referansı.",
    pros: [
      "CNC işlenmiş kasnak yüzeyleri — pürüzsüz baga hareketi",
      "Geniş ratio bandı: kalkışta tork, son hızda devir",
      "Yedek parça erişimi (baga + slider) Türkiye'de yaygın"
    ],
    cons: [
      "Stok beygir altında yumuşak kalkış için doğru baga seçimi şart",
      "Premium fiyat segmenti"
    ],
    rollerWeights: {
      stock: 14,
      recommended: [11, 12, 13],
      rangeNote: "XMAX 300 için 12g — şehir için 13g, pist için 11g önerilir."
    },
    springRate: {
      stock: "Stok yay",
      options: ["+%20 Malossi Yellow", "+%30 Malossi Red"]
    },
    fitsGenerations: ["xmax-300-2017", "xmax-300-2023", "xmax-tech-max"],
    pricingTier: "premium",
    bestFor: "Son hız ve yüksek devir aralığında performans arayan kullanıcı."
  },
  {
    slug: "spectro",
    name: "Spectro Sport Pro",
    origin: "İtalya",
    positioning: "Şehir + uzun yol dengesini gözeten yarı performans set.",
    pros: [
      "Stok hissinden ödün vermeden tork artışı",
      "Garantili 8 baga + slider set",
      "Orta segment fiyat"
    ],
    cons: [
      "Pist düzeyi son hız kazancı sınırlı",
      "Yedek baga setlerine erişim zaman zaman dalgalı"
    ],
    rollerWeights: {
      stock: 14,
      recommended: [12, 13],
      rangeNote: "Şehir/uzun yol için 13g, biraz daha agresif kalkış için 12g."
    },
    springRate: {
      stock: "Stok yay yeterli",
      options: ["+%15 Spectro Sport yay"]
    },
    fitsGenerations: ["xmax-300-2017", "xmax-300-2023"],
    pricingTier: "orta",
    bestFor: "Günlük binip hafta sonu agresif sürmek isteyenler için."
  },
  {
    slug: "tdr",
    name: "TDR Racing",
    origin: "Endonezya / Tayvan",
    positioning: "Ekonomik giriş seviyesi — ilk modifikasyon için tercih.",
    pros: [
      "Erişilebilir fiyat",
      "Stok hissi ile kıyaslandığında belirgin kalkış kazancı",
      "Geniş baga ağırlığı opsiyonu"
    ],
    cons: [
      "Uzun vadede slider aşınması daha hızlı",
      "Yüksek devirde Malossi/Spectro kadar pürüzsüz değil"
    ],
    rollerWeights: {
      stock: 14,
      recommended: [11, 12, 13],
      rangeNote: "İlk denemede 12g — kalkış agresifliği belirgin hissedilir."
    },
    springRate: {
      stock: "Stok",
      options: ["TDR +%20"]
    },
    fitsGenerations: ["xmax-250-2014", "xmax-300-2017"],
    pricingTier: "ekonomik",
    bestFor: "İlk varyatör modunu deneyecek, bütçe odaklı kullanıcı."
  }
];

export const ROLLER_GUIDE = {
  intro:
    "Baga (bilye) ağırlığı, varyatör kasnağının ne kadar erken açıldığını belirler. Doğru gram seçimi motor devrini optimum tork bandında tutar.",
  rules: [
    {
      title: "Hafif baga (-1g / -2g stoktan)",
      detail:
        "Erken devir, agresif kalkış, daha yüksek motor sesi. Şehir içi trafiği ve sollama gücü için ideal. Yakıt tüketimi hafif artar."
    },
    {
      title: "Ağır baga (+1g / +2g stoktan)",
      detail:
        "Geç devir, yumuşak kalkış, daha düşük tüketim. Uzun yol ve sabit hızlı sürüş için tercih edilir."
    },
    {
      title: "Karışık set (örn. 3×11g + 3×13g)",
      detail:
        "Bazı kullanıcılar dengeyi yakalamak için karışık baga kullanır. Önerilmez; balansı bozar, slider'ı düzensiz aşındırır."
    }
  ]
};
