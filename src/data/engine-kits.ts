export type EngineKitBrand = {
  slug: string;
  name: string;
  partCode: string;
  origin: string;
  positioning: string;
  bodyMaterial: string;
  sleeveTech: string;
  weightCharacter: string;
  thermalDissipation: string;
  deformationResistance: string;
  bestUse: string;
  segment: "sokak" | "hizli-sokak" | "yaris";
  fitsModels: string[];
  pros: string[];
  cons: string[];
  pricingTier: "premium" | "orta" | "yaris";
};

export const ENGINE_KIT_BRANDS: EngineKitBrand[] = [
  {
    slug: "tdr-ceramic",
    name: "TDR Ceramic Cylinder",
    partCode: "13100-B7401-C78YG",
    origin: "Tayland / Endonezya",
    positioning:
      "Pazarın en dengeli ısı dağılımı. Titanyum kaplı sekmanlarla kombine. Sokak + uzun yol + dayanıklılık odaklı premium silindir.",
    bodyMaterial: "Yüksek Isı Transferli Alüminyum",
    sleeveTech: "Mikron Düzeyde Seramik (Ni-SiC) Kaplama",
    weightCharacter: "Ultra Hafif",
    thermalDissipation: "Mükemmel (>200 W/m·K)",
    deformationResistance: "Yüksek",
    bestUse: "Sokak · Uzun Yol · Dayanıklılık",
    segment: "sokak",
    fitsModels: ["XMAX 250", "XMAX 300"],
    pros: [
      "Termal kararlılık zirvede — aşırı ısınma genleşmesi ~sıfır",
      "Kit içeriği genellikle buji + enjektör paket — yüksek uyumluluk",
      "Titanyum kaplı sekmanlar parazit sürtünmeyi minimize eder"
    ],
    cons: [
      "S90'a göre tepe basınç dirençli ama yarış kullanımında limit var",
      "Premium fiyat segmenti"
    ],
    pricingTier: "premium"
  },
  {
    slug: "brt-ceramic",
    name: "BRT Ceramic Super Cylinder",
    partCode: "76mm / 344cc Bintang Racing Team",
    origin: "Endonezya",
    positioning:
      "Yanma odası squish alanı ile piston kafa tasarımı kusursuz uyumlu. 12.8:1 dinamik sıkıştırmada blow-by riski sıfır. Hızlı cadde ve pist odaklı.",
    bodyMaterial: "Özel Alaşımlı Alüminyum",
    sleeveTech: "Çift Katmanlı Seramik",
    weightCharacter: "Hafif / Standart",
    thermalDissipation: "Çok İyi (180 W/m·K)",
    deformationResistance: "Yüksek",
    bestUse: "Hızlı Sokak · Pist · Touring",
    segment: "hizli-sokak",
    fitsModels: ["XMAX 250", "XMAX 300"],
    pros: [
      "Conta hizası ve saplama yuvalarında yüksek hassasiyet — blow-by yok",
      "Piston kafa + squish geometrisi yanma odasıyla milimetrik uyumlu",
      "Super Cast Iron alternatifi de mevcut (daha ekonomik)"
    ],
    cons: [
      "Ağırlığı TDR'den biraz fazla",
      "Yedek sekman/piston pin temininde marka bayisine ihtiyaç"
    ],
    pricingTier: "premium"
  },
  {
    slug: "s90-billet-sleeved",
    name: "S90 Racing Billet Sleeved",
    partCode: "S90BLK0012",
    origin: "Malezya",
    positioning:
      "Uçak sınıfı CNC alüminyum bloğa çakılmış yüksek dayanımlı çelik gömlek. Bore distortion sıfır — radikal drag ve yarış için.",
    bodyMaterial: "CNC İşlenmiş Billet Alüminyum",
    sleeveTech: "Yüksek Mukavemetli Çelik Gömlek",
    weightCharacter: "Ağır / Maksimum Mukavemet",
    thermalDissipation: "Orta (60 W/m·K)",
    deformationResistance: "Ultra Yüksek (Esneme Sıfır)",
    bestUse: "Radikal Drag · Yarış · Maksimum Güç",
    segment: "yaris",
    fitsModels: ["XMAX 250", "XMAX 300"],
    pros: [
      "Silindir duvarı esnemesi (bore distortion) sıfır — daireselliği milimetrik korur",
      "Yüksek tepe basıncı (P_max) altında dahi geometri bozulmaz",
      "82 mm çapla 400+ cc hacim potansiyeli"
    ],
    cons: [
      "Conta paketi kit içinde yok — özel ölçü çıkarılır, profesyonel kurulum şart",
      "Ağır kütle, ısı dağıtımı seramik bloklara göre düşük",
      "Tamamen yarış ürünü — sokak konforu için değil"
    ],
    pricingTier: "yaris"
  }
];

export const SEGMENT_LABEL: Record<EngineKitBrand["segment"], string> = {
  sokak: "Sokak",
  "hizli-sokak": "Hızlı Sokak",
  yaris: "Yarış"
};

export const SEGMENT_TONE: Record<EngineKitBrand["segment"], string> = {
  sokak: "text-electric-cyan",
  "hizli-sokak": "text-yamaha-200",
  yaris: "text-electric-violet"
};
