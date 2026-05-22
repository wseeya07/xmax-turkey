export type AfrZone = {
  band: string;
  ratio: string;
  lambda: string;
  use: string;
  tone: "cyan" | "yamaha" | "violet" | "danger";
  note: string;
};

export const AFR_ZONES: AfrZone[] = [
  {
    band: "Stokiyometrik",
    ratio: "14.7 : 1",
    lambda: "λ = 1.00",
    use: "Rölanti · cruising · emisyon testi",
    tone: "cyan",
    note: "Yalnızca sabit hız ve düşük yükte ekonomi koruması için. Modifiyeli motorda bu değerde yük altına girmek aşırı ısınmaya yol açar."
  },
  {
    band: "WOT Hedef",
    ratio: "12.8 – 13.3 : 1",
    lambda: "λ ≈ 0.87 – 0.91",
    use: "Tam gaz (WOT) · maksimum güç + termal güvenlik",
    tone: "violet",
    note: "Zengin karışım, fazla yakıtın buharlaşmasıyla yanma odasını içeriden soğutur ve egzoz gazı sıcaklığını (EGT) düşürür."
  },
  {
    band: "Fakir Kritik Sınır",
    ratio: "≥ 14.0 : 1 (yük altında)",
    lambda: "λ ≥ 0.95",
    use: "Yük altında bu sınıra girmek kritik tehlike",
    tone: "danger",
    note: "Kontrolsüz alev yayılımı, vuruntu (knock), silindir içi sıcaklık 930 °C kritik sınırı aşar — buji elektrotu erir, piston tepesi delinir."
  }
];

export const WIDEBAND_VS_NARROWBAND = [
  {
    title: "Stok dar bant (narrowband)",
    measureRange: "Yalnızca 14.7:1 (λ = 1.0) çevresi · 0.1 V – 0.9 V analog",
    capability:
      "Sadece 'zengin mi / fakir mi' kabaca söyler. WOT altında ne kadar zengin/fakir olduğunu ölçemez.",
    use: "Emisyon kontrolü ve closed-loop rölanti.",
    tone: "carbon"
  },
  {
    title: "Wideband (Bosch LSU 4.9)",
    measureRange: "λ 0.65 — atmosfer arası doğrusal · pompalama akımı çıkışı",
    capability:
      "Yanma odasından çıkan gazdaki oksijen konsantrasyonunu milisaniyelik gecikmeyle doğrusal ölçer. 5 kablolu planar sensör.",
    use: "Auto-Tune, harita kalibrasyonu, gerçek WOT AFR doğrulaması.",
    tone: "electric"
  }
];

export const BUNG_MOUNT_RULES = [
  {
    label: "Diş yapısı",
    body: "Bosch LSU 4.9 → M18 × 1.5. Egzoz borusuna paslanmaz çelik bung kaynak edilir."
  },
  {
    label: "Montaj açısı",
    body: "Yatay düzlemden 10° – 90° yukarı bakacak şekilde (tercihen dik düzleme 10° – 45° sapmalı, kablo yukarı). Asla yatay veya borunun alt kısmına monte edilmez."
  },
  {
    label: "Konum mesafesi",
    body: "Egzoz subapından ≥ 45 cm (18 inç) — gaz sıcaklığı 930 °C'yi geçmesin. Egzoz ucundan ≥ 1 m geride — taze atmosfer havası emilmesin."
  },
  {
    label: "Soğuk start koruması",
    body: "Su yoğuşması (kondansasyon) sensör seramiğine damlamasın diye sensör başı yukarı bakar. 600 °C'deki seramik üzerine düşen su damlası gövdeyi termal şokla çatlatır."
  }
];

export const AUTOTUNE_LOOP = [
  {
    step: "01",
    title: "Hedef AFR haritası tanımlanır",
    body: "Kullanıcı devir × gaz açısı koordinatlarında hedef AFR'yi girer — örn. WOT bölgesi 13.0."
  },
  {
    step: "02",
    title: "Wideband anlık AFR okur",
    body: "Sensör pompalama akımını CAN-Bus üzerinden ECU'ya iletir. ECU gerçek AFR'yi tespit eder (örn. 13.6 — +0.6 fakir sapma)."
  },
  {
    step: "03",
    title: "VE çarpanı düzeltilir",
    body: "Auto-Tune döngüsü o koordinattaki Volumetric Efficiency (VE) çarpanını anlık olarak artırır — yakıt zenginleşir."
  },
  {
    step: "04",
    title: "Harita kalıcı kayıt",
    body: "Düzeltme haritaya yazılır. Mevsim/rakım/oktan değişimlerine karşı motor sürekli optimum karışımda kalır, mekanik kırım önlenir."
  }
];
