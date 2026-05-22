export type CamSpec = {
  brand: string;
  model: string;
  partCode?: string;
  intakeDuration?: string;
  exhaustDuration?: string;
  intakeLift: string;
  exhaustLift: string;
  intakeClose?: string;
  exhaustOpen?: string;
  use: string;
};

export const CAMSHAFT_SPECS: CamSpec[] = [
  {
    brand: "TDR",
    model: "Camshaft X-MAX 300 (T02)",
    partCode: "12101-B7401-TDR02",
    intakeDuration: "230°",
    exhaustDuration: "236°",
    intakeLift: "9.36 mm",
    exhaustLift: "8.94 mm",
    use: "Radikal güç — XMAX 300 → 400cc kurulumu"
  },
  {
    brand: "BRT",
    model: "Master Cam X-MAX 250 (T1)",
    intakeLift: "8.82 mm",
    exhaustLift: "8.80 mm",
    intakeClose: "TDC sonrası 50°",
    exhaustOpen: "BDC öncesi 49°",
    use: "Hafif modifiyeli sokak — XMAX 250 bore-up"
  }
];

export const CAM_SERIES_TIERS = [
  {
    tier: "S-Serisi",
    title: "Standard / Daily",
    body: "Sokak kullanımına yakın profil. Stok karakteri korur, alt-orta devirde tork dolumu için optimize.",
    tone: "cyan"
  },
  {
    tier: "T-Serisi",
    title: "Hafif Modifiye / Bore-up",
    body: "Stage 1 cadde + dayanıklılık. Lift artırılmış, durasyon orta — hızlı sokak kurulumlarının referansı.",
    tone: "yamaha"
  },
  {
    tier: "R-Serisi",
    title: "Radikal / Drag",
    body: "Büyük subaplarla kombine en yüksek lift derecesi. Yüksek overlap, agresif güç eğrisi üst devirlere kayar.",
    tone: "violet"
  }
];

export const PERFORMANCE_INJECTORS = [
  {
    flow: "240 cc/dk",
    brand: "RPD / TDR 12-delikli",
    fits: "XMAX 250 → 294 cc · Stage 1 cadde",
    note: "Hafif bore-up + dereceli kam kombinasyonu için referans."
  },
  {
    flow: "260 cc/dk",
    brand: "UMA Racing / RPD",
    fits: "XMAX 300 → 344 cc",
    note: "Stage 2 hızlı cadde + ECU remap ile."
  },
  {
    flow: "280 cc/dk",
    brand: "RPD Racing (44005-B7477)",
    fits: "XMAX 300 → 400 cc · XMAX 400 → 424 cc",
    note: "Çift enjektörlü throttle body birincil hattı için."
  }
];

export const THROTTLE_BODY_UPGRADE = [
  {
    diameter: "37 – 38 mm",
    label: "OEM Stok",
    detail: "XMAX serisi stok gaz kelebeği aralığı. Bore-up sonrası venturi kısıtlaması orta-üst devirde nefes darlığı yaratır.",
    isStock: true
  },
  {
    diameter: "40 mm",
    label: "Ataka Racing CNC",
    detail: "Giriş daralma kayıplarını azaltır, gaz tepkisi keskinleşir. Sokak + cadde kurulumları için optimum."
  },
  {
    diameter: "42 mm",
    label: "Ataka Racing CNC + Dual Injector",
    detail: "Çift enjektör yuvası — yüksek devirde ikincil enjektör hava-yakıt karışımını homojenleştirir, havayı soğutur, hacimsel yoğunluğu artırır."
  }
];

export const PORT_POLISH = {
  title: "Port-polish + 45° subap yuvası kesimi",
  body: "Silindir kapağı emme/egzoz kanallarındaki döküm pürüzleri türbülans yaratır, akış hızını düşürür. CNC veya el işçiliği ile pürüzsüzleştirme + subap kılavuzu aerodinamik tıraşı + 45° oturma yüzeyi kesimi hava akış katsayısını (CFM) %25'e kadar artırır.",
  outcomes: [
    "Subap perdesi etrafındaki efektif geçiş alanı büyür",
    "Yüksek devirde 'nefes darlığı' sorunu çözülür",
    "Ram etkisi (kinetik hava sütunu) silindire daha fazla kütle taşır",
    "Yüksek overlap düşük devirde rölanti kararsızlığına yol açabilir — güç eğrisi üst devirlere kayar"
  ]
};
