export type Generation = {
  slug: string;
  model: string;
  yearRange: string;
  displacement: string;
  power: { hp: number; rpm: number };
  torque: { nm: number; rpm: number };
  weight: { wet: number };
  fuelTank: number;
  seatHeight: number;
  topSpeed?: number;
  euro: string;
  highlight: string;
  parts: {
    engineOil: string;
    finalDrive: string;
    coolant: string;
    sparkPlug: string;
    airFilter: string;
  };
};

export const GENERATIONS: Generation[] = [
  {
    slug: "xmax-250-2014",
    model: "XMAX 250 (Eski Kasa)",
    yearRange: "2014–2017",
    displacement: "249 cc",
    power: { hp: 20.1, rpm: 7500 },
    torque: { nm: 21.0, rpm: 6000 },
    weight: { wet: 178 },
    fuelTank: 13.2,
    seatHeight: 785,
    topSpeed: 135,
    euro: "Euro 3",
    highlight:
      "Tasarım dilinde keskin agresif kaporta hatlarının öncüsü. Analog-dijital karma kadran, çift halojen far ve sert spor amortisörler.",
    parts: {
      engineOil: "Yamalube 4S 10W-40 — 1.5 L (filtre dahil 1.6 L)",
      finalDrive: "Yamalube Final Gear Oil 80W — 0.25 L",
      coolant: "Yamaha Coolant — 1.45 L",
      sparkPlug: "NGK CR8E",
      airFilter: "1SD-E5407-00"
    }
  },
  {
    slug: "xmax-250-2018",
    model: "XMAX 250 (Ara Kasa)",
    yearRange: "2018–2022",
    displacement: "249 cc",
    power: { hp: 22.8, rpm: 7000 },
    torque: { nm: 24.3, rpm: 5500 },
    weight: { wet: 183 },
    fuelTank: 13.2,
    seatHeight: 795,
    topSpeed: 138,
    euro: "Euro 4 / Euro 5",
    highlight:
      "Blue Core motor bloğuna geçiş. TCS çekiş kontrol sistemi, Smart Key akıllı anahtar ve tam LED far grubu standartlaştı.",
    parts: {
      engineOil: "Yamalube 4S 10W-40 — 1.5 L (filtre dahil 1.6 L)",
      finalDrive: "Yamalube Final Gear Oil 80W — 0.25 L",
      coolant: "Yamaha Coolant — 1.45 L",
      sparkPlug: "NGK LMAR8A-9",
      airFilter: "B74-E5407-00"
    }
  },
  {
    slug: "xmax-250-2023",
    model: "XMAX 250 (Yeni Kasa - X)",
    yearRange: "2023–2024",
    displacement: "249 cc",
    power: { hp: 22.8, rpm: 7000 },
    torque: { nm: 24.3, rpm: 5500 },
    weight: { wet: 183 },
    fuelTank: 13.2,
    seatHeight: 795,
    topSpeed: 138,
    euro: "Euro 5",
    highlight:
      "Türkiye'ye özel üretilen radikal X-Dizayn LED far grubu. Y-Connect entegrasyonu, yenilenen sele formu ve Garmin navigasyon desteği.",
    parts: {
      engineOil: "Yamalube 4S 10W-40 — 1.5 L (filtre dahil 1.6 L)",
      finalDrive: "Yamalube Final Gear Oil 80W — 0.25 L",
      coolant: "Yamaha Coolant — 1.45 L",
      sparkPlug: "NGK LMAR8A-9",
      airFilter: "B74-E5407-00"
    }
  },
  {
    slug: "xmax-250-2025",
    model: "XMAX 250 (Yeni Kasa - Plus)",
    yearRange: "2025–2026+",
    displacement: "249 cc",
    power: { hp: 22.8, rpm: 7000 },
    torque: { nm: 24.3, rpm: 5500 },
    weight: { wet: 183 },
    fuelTank: 13.2,
    seatHeight: 795,
    topSpeed: 138,
    euro: "Euro 5+",
    highlight:
      "Euro 5+ uyumu, kütle merkezini artıran ince-uzun egzoz susturucusu. Gidondan tek tuşla 95 mm ayarlanabilen elektrikli ön cam ve entegre sele/elcik ısıtmaları.",
    parts: {
      engineOil: "Yamalube 4S 10W-40 — 1.5 L (filtre dahil 1.6 L)",
      finalDrive: "Yamalube Final Gear Oil 80W — 0.25 L",
      coolant: "Yamaha Coolant — 1.45 L",
      sparkPlug: "NGK LMAR8A-9",
      airFilter: "B74-E5407-00"
    }
  },
  {
    slug: "xmax-300-2018",
    model: "XMAX 300 (Ara Kasa)",
    yearRange: "2018–2022",
    displacement: "292 cc",
    power: { hp: 28.0, rpm: 7250 },
    torque: { nm: 29.0, rpm: 5750 },
    weight: { wet: 179 },
    fuelTank: 13.0,
    seatHeight: 795,
    topSpeed: 145,
    euro: "Euro 4 / Euro 5",
    highlight:
      "Uzun stroklu 292cc Blue Core bloğu. Motosiklet tipi çift kelepçeli ön çatal tasarımı sayesinde otoyol hızlarında yüksek yol tutuş kararlılığı.",
    parts: {
      engineOil: "Yamalube 4S 10W-40 — 1.5 L (filtre dahil 1.6 L)",
      finalDrive: "Yamalube Final Gear Oil 80W — 0.25 L",
      coolant: "Yamaha Coolant — 1.45 L",
      sparkPlug: "NGK LMAR8A-9",
      airFilter: "B74-E5407-00"
    }
  },
  {
    slug: "xmax-300-2023",
    model: "XMAX 300 (Yeni Kasa - X)",
    yearRange: "2023–2024",
    displacement: "292 cc",
    power: { hp: 28.0, rpm: 7250 },
    torque: { nm: 29.0, rpm: 5750 },
    weight: { wet: 183 },
    fuelTank: 13.2,
    seatHeight: 795,
    topSpeed: 145,
    euro: "Euro 5",
    highlight:
      "A2 ehliyet uyumlu spor scooter amiral gemisi. Garmin navigasyonlu 4.2'' TFT ekran, X-Dizayn far grubu ve geliştirilmiş rüzgar koruması.",
    parts: {
      engineOil: "Yamalube 4S 10W-40 — 1.5 L (filtre dahil 1.6 L)",
      finalDrive: "Yamalube Final Gear Oil 80W — 0.25 L",
      coolant: "Yamaha Coolant — 1.45 L",
      sparkPlug: "NGK LMAR8A-9",
      airFilter: "B74-E5407-00"
    }
  },
  {
    slug: "xmax-300-2025",
    model: "XMAX 300 (Yeni Kasa - Plus)",
    yearRange: "2025–2026+",
    displacement: "292 cc",
    power: { hp: 28.0, rpm: 7250 },
    torque: { nm: 29.0, rpm: 5750 },
    weight: { wet: 183 },
    fuelTank: 13.2,
    seatHeight: 795,
    topSpeed: 145,
    euro: "Euro 5+",
    highlight:
      "Euro 5+ emisyon normlarına tam uyum, revize edilmiş salıncak mimarisi. Gidondan 95 mm hareket edebilen elektronik ön cam ve Crystal Graphite özel renk seçeneği.",
    parts: {
      engineOil: "Yamalube 4S 10W-40 — 1.5 L (filtre dahil 1.6 L)",
      finalDrive: "Yamalube Final Gear Oil 80W — 0.25 L",
      coolant: "Yamaha Coolant — 1.45 L",
      sparkPlug: "NGK LMAR8A-9",
      airFilter: "B74-E5407-00"
    }
  },
  {
    slug: "xmax-400-2013",
    model: "XMAX 400 (Eski Kasa)",
    yearRange: "2013–2017",
    displacement: "395 cc",
    power: { hp: 33.0, rpm: 7000 },
    torque: { nm: 36.0, rpm: 6000 },
    weight: { wet: 210 },
    fuelTank: 13.0,
    seatHeight: 800,
    topSpeed: 150,
    euro: "Euro 3",
    highlight:
      "Majesty 400 altyapılı yüksek torklu çift eksantrikli DOHC motor bloğu. Çift ön disk freni ve otoyolda yan rüzgarlardan etkilenmeyen ağır şasi.",
    parts: {
      engineOil: "Yamalube 4S 10W-40 — 1.7 L (filtre dahil 1.8 L)",
      finalDrive: "Yamalube Final Gear Oil 80W — 0.25 L",
      coolant: "Yamaha Coolant — 1.5 L",
      sparkPlug: "NGK LMAR8A-9",
      airFilter: "5RU-15407-00"
    }
  },
  {
    slug: "xmax-400-2018",
    model: "XMAX 400 (Ara Kasa)",
    yearRange: "2018–2020",
    displacement: "395 cc",
    power: { hp: 33.0, rpm: 7000 },
    torque: { nm: 36.0, rpm: 6000 },
    weight: { wet: 210 },
    fuelTank: 13.0,
    seatHeight: 800,
    topSpeed: 150,
    euro: "Euro 4",
    highlight:
      "Çekiş Kontrol Sistemi (TCS), Smart Key ve hafifletilmiş yeni gövde tasarımı. Euro 5 emisyon limitleri dolayısıyla 2020 sonunda üretimi durdurulan maksi dev.",
    parts: {
      engineOil: "Yamalube 4S 10W-40 — 1.7 L (filtre dahil 1.8 L)",
      finalDrive: "Yamalube Final Gear Oil 80W — 0.25 L",
      coolant: "Yamaha Coolant — 1.5 L",
      sparkPlug: "NGK LMAR8A-9",
      airFilter: "5RU-15407-00"
    }
  }
];
