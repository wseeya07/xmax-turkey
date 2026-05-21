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
    model: "XMAX 250",
    yearRange: "2014–2017",
    displacement: "249 cc",
    power: { hp: 22.5, rpm: 7500 },
    torque: { nm: 24, rpm: 6000 },
    weight: { wet: 181 },
    fuelTank: 13,
    seatHeight: 795,
    topSpeed: 135,
    euro: "Euro 3 / Euro 4",
    highlight:
      "Sınıfının dengeli mirası — şehir içi ekonomi ve uzun ömürlü Blue Core motor.",
    parts: {
      engineOil: "Yamalube 4S 10W-40 — 1.5 L (filtre dahil 1.6 L)",
      finalDrive: "Yamalube Final Gear Oil 80W — 0.25 L",
      coolant: "Yamaha Coolant — 1.45 L",
      sparkPlug: "NGK CR8E",
      airFilter: "B74-E5407-00"
    }
  },
  {
    slug: "xmax-300-2017",
    model: "XMAX 300",
    yearRange: "2017–2022",
    displacement: "292 cc",
    power: { hp: 27.6, rpm: 7250 },
    torque: { nm: 29, rpm: 5750 },
    weight: { wet: 179 },
    fuelTank: 13,
    seatHeight: 795,
    topSpeed: 145,
    euro: "Euro 4 / Euro 5",
    highlight:
      "VVA destekli Blue Core, daha geniş tork bandı ve TCS desteği ile sınıf lideri.",
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
    model: "XMAX 300 (Yeni)",
    yearRange: "2023–",
    displacement: "292 cc",
    power: { hp: 27.6, rpm: 7250 },
    torque: { nm: 29, rpm: 5750 },
    weight: { wet: 183 },
    fuelTank: 13,
    seatHeight: 800,
    topSpeed: 145,
    euro: "Euro 5",
    highlight:
      "Yeni 4.2'' TFT gösterge, akıllı anahtar, gelişmiş aerodinamik gövde.",
    parts: {
      engineOil: "Yamalube 4S 10W-40 — 1.5 L (filtre dahil 1.6 L)",
      finalDrive: "Yamalube Final Gear Oil 80W — 0.25 L",
      coolant: "Yamaha Coolant — 1.45 L",
      sparkPlug: "NGK LMAR8A-9",
      airFilter: "B74-E5407-00"
    }
  },
  {
    slug: "xmax-tech-max",
    model: "XMAX Tech MAX",
    yearRange: "2020–",
    displacement: "292 cc",
    power: { hp: 27.6, rpm: 7250 },
    torque: { nm: 29, rpm: 5750 },
    weight: { wet: 184 },
    fuelTank: 13,
    seatHeight: 800,
    topSpeed: 145,
    euro: "Euro 5",
    highlight:
      "Deri detaylar, alüminyum aksanlar, premium iç dolgu — XMAX'in en üst donanım paketi.",
    parts: {
      engineOil: "Yamalube 4S 10W-40 — 1.5 L (filtre dahil 1.6 L)",
      finalDrive: "Yamalube Final Gear Oil 80W — 0.25 L",
      coolant: "Yamaha Coolant — 1.45 L",
      sparkPlug: "NGK LMAR8A-9",
      airFilter: "B74-E5407-00"
    }
  }
];
