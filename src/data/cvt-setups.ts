export type CvtSetup = {
  slug: string;
  number: number;
  title: string;
  shortTitle: string;
  modelGroup: "XMAX 250" | "XMAX 300" | "XMAX 400";
  targetUse: string;
  style: string;
  front: {
    variator: string;
    rollers: string;
    shim: string;
  };
  rear: {
    clutch: string;
    bell: string;
    springs: string;
  };
  modifications?: string[];
  metrics: {
    throttle: string;
    engagementRPM: string;
    cruisingRPM: string;
    topSpeedDelta: string;
    belt: string;
    serviceInterval: string;
  };
};

export const CVT_SETUPS: CvtSetup[] = [
  {
    slug: "xmax-250-sehir-ici-canlilik",
    number: 1,
    title: "XMAX 250 — Şehir İçi Canlılık (Endonezya 'Stop-and-Go' Tarzı)",
    shortTitle: "Şehir İçi Canlılık",
    modelGroup: "XMAX 250",
    targetUse: "Günlük / yoğun trafik",
    style: "Endonezya stop-and-go",
    front: {
      variator: "OEM varyatör, tahrik yanakları 13.8°'ye tornalanır (Bubut Derajat). Baga kanalları hafif kerok.",
      rollers: "6 × 13 g yuvarlak NCY veya Dr. Pulley 13 g sliding",
      shim: "Sürücü burcu arkasına 0.5 mm çelik şim"
    },
    rear: {
      clutch: "Orijinal pabuçlara karbon-kevlar katkılı balata, veya Malossi Maxi Fly Clutch",
      bell: "Orijinal çana CNC ile spiral soğutma + toz tahliye kanalı",
      springs: "Orijinal kontrast yayı korunur. Debriyaj küçük yaylar Malossi Beyaz set"
    },
    modifications: [
      "Kavrama devri ~3500 RPM'den ~4200 RPM'e yükseltilir",
      "CVT filtresi metal tel süzgeçle değiştirilir"
    ],
    metrics: {
      throttle: "Orta–Hızlı",
      engagementRPM: "~4200 RPM",
      cruisingRPM: "5500–6200 RPM",
      topSpeedDelta: "Değişmez",
      belt: "OEM Standart",
      serviceInterval: "15.000 km"
    }
  },
  {
    slug: "xmax-250-otoban-uzun-yol",
    number: 2,
    title: "XMAX 250 — Otoban ve Uzun Yol",
    shortTitle: "Otoban / Uzun Yol",
    modelGroup: "XMAX 250",
    targetUse: "Tur / akıcı sürüş",
    style: "Yüksek son hız",
    front: {
      variator: "TDR Performance Pulley V.23 (13.8° açı)",
      rollers: "Dr. Pulley 15 g sliding baga",
      shim: "Önerilmez"
    },
    rear: {
      clutch: "Malossi Maxi Fly System",
      bell: "Malossi Maxi Wing Bell Ø150 mm (1440 g)",
      springs: "Faito R90 veya TDR %10 sert tork yayı"
    },
    metrics: {
      throttle: "Doğrusal",
      engagementRPM: "~3500 RPM",
      cruisingRPM: "5000–5800 RPM",
      topSpeedDelta: "+5 km/h",
      belt: "TDR Reinforced",
      serviceInterval: "18.000 km"
    }
  },
  {
    slug: "xmax-300-otoyol-konfor",
    number: 3,
    title: "XMAX 300 — Otoyol ve Konfor (Commuter / Touring)",
    shortTitle: "Konfor / Touring",
    modelGroup: "XMAX 300",
    targetUse: "Uzun yol / ekonomi",
    style: "Avrupa touring",
    front: {
      variator: "Orijinal varyatör grubu muhafaza",
      rollers: "6 × 17 g Malossi HTRoll (23 × 18 mm) — OEM 17.5 g'a çok yakın, ısı dayanımı yüksek",
      shim: "Yok"
    },
    rear: {
      clutch: "Orijinal debriyaj sistemi",
      bell: "Malossi Maxi Wing Clutch Bell Ø150 mm (1440 g)",
      springs: "Tamamen OEM orijinal yaylar"
    },
    metrics: {
      throttle: "Yumuşak",
      engagementRPM: "~3200 RPM",
      cruisingRPM: "4800–5500 RPM",
      topSpeedDelta: "Değişmez",
      belt: "OEM B5X-E7641-00",
      serviceInterval: "20.000 km"
    }
  },
  {
    slug: "xmax-300-agresif-sokak",
    number: 4,
    title: "XMAX 300 — Agresif Sokak / Spor Sürüş (İtalyan 'Hızlı Cadde')",
    shortTitle: "Agresif Sokak",
    modelGroup: "XMAX 300",
    targetUse: "Sportif cadde",
    style: "İtalyan hızlı cadde",
    front: {
      variator: "Malossi Multivar 2000 (Kod 5117861)",
      rollers: "Kit içinden çıkan 8 × 8 g HTRoll (25 × 14.9 mm)",
      shim: "Malossi burç arkasına 0.5 mm şim"
    },
    rear: {
      clutch: "Malossi Maxi Fly System",
      bell: "Malossi Maxi Wing Bell Ø150 mm",
      springs: "Malossi Sarı Kontrast Yayı (1500 RPM)"
    },
    metrics: {
      throttle: "Çok Hızlı",
      engagementRPM: "~4600 RPM",
      cruisingRPM: "6000–6800 RPM",
      topSpeedDelta: "+8 km/h",
      belt: "Malossi Kevlar",
      serviceInterval: "10.000 km"
    }
  },
  {
    slug: "xmax-300-yaris-drag",
    number: 5,
    title: "XMAX 300 — Yarış / Drag Setup'ı (Tayland 'Halimax' Tarzı)",
    shortTitle: "Yarış / Drag",
    modelGroup: "XMAX 300",
    targetUse: "Pist / maksimum güç",
    style: "Tayland Halimax",
    front: {
      variator: "Polini Hi-Speed 12-Roller (Kod 241.741)",
      rollers: "12 × 7 g Polini aramid-naylon",
      shim: "Polini kit içeriği ile"
    },
    rear: {
      clutch: "Dr. Pulley HiT Debriyajı (HiT261301M1) — kilit yayları en sert yeşil",
      bell: "Malossi Maxi Wing Soğutmalı Çan",
      springs: "Polini %10 sertleştirilmiş kontrast + en sert kırmızı küçük yaylar"
    },
    modifications: [
      "CVT filtresi tamamen çıkarılır, yerine paslanmaz çelik ızgara",
      "Varyatör yanakları tornalanıp 13.5° açı (Bubut Derajat)",
      "Baga kanalları sonuna kadar frezelenir (Kerok Jalur)",
      "Debriyaj 5500 RPM'de çana kilitlenir"
    ],
    metrics: {
      throttle: "Anlık (Instant)",
      engagementRPM: "~5500 RPM",
      cruisingRPM: "7000–8200 RPM",
      topSpeedDelta: "+15 km/h",
      belt: "Gates / Polini Kevlar",
      serviceInterval: "3.000 km"
    }
  },
  {
    slug: "xmax-400-sehir-ici-esneklik",
    number: 6,
    title: "XMAX 400 — Günlük Şehir İçi Esneklik",
    shortTitle: "XMAX 400 Şehir İçi",
    modelGroup: "XMAX 400",
    targetUse: "XMAX 400 şehir içi",
    style: "Ağır şasi esneklik",
    front: {
      variator: "Orijinal varyatör",
      rollers: "Dr. Pulley 25 × 15 mm × 15 g sliding (OEM 17g'a kıyasla kalkış devri +800 RPM)",
      shim: "Yok"
    },
    rear: {
      clutch: "Malossi Maxi Fly Clutch (Kod 5212819)",
      bell: "Orijinal",
      springs: "Orijinal kontrast yayı + Malossi Sarı debriyaj küçük yayları"
    },
    metrics: {
      throttle: "Doğrusal",
      engagementRPM: "~3800 RPM",
      cruisingRPM: "5200–6000 RPM",
      topSpeedDelta: "Değişmez",
      belt: "OEM Standart",
      serviceInterval: "15.000 km"
    }
  },
  {
    slug: "xmax-400-premium-touring",
    number: 7,
    title: "XMAX 400 — Performanslı Otoban ve Yüksek Hızlı Touring",
    shortTitle: "XMAX 400 Premium Touring",
    modelGroup: "XMAX 400",
    targetUse: "XMAX 400 performans",
    style: "Premium touring",
    front: {
      variator: "Malossi Multivar 2000 (Kod 5114148)",
      rollers: "8 baga (25 × 14.9 mm): 4 × 10 g + 4 × 12 g simetrik karışım",
      shim: "Malossi kit ile"
    },
    rear: {
      clutch: "Malossi Maxi Fly System",
      bell: "Malossi Maxi Wing Bell Ø160 mm (1664 g, Kod 5216331)",
      springs: "Malossi Beyaz Kontrast Yayı"
    },
    modifications: [
      "Karışım kuralı: 10-12-10-12-10-12 dairesel simetri — tırmanış + sollamada anında downshift, düz yolda titreşimsiz"
    ],
    metrics: {
      throttle: "Hızlı",
      engagementRPM: "~4000 RPM",
      cruisingRPM: "5500–6500 RPM",
      topSpeedDelta: "+10 km/h",
      belt: "Malossi X K Belt",
      serviceInterval: "12.000 km"
    }
  }
];
