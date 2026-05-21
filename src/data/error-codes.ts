export type ErrorCode = {
  code: string;
  system: "ECU" | "ABS" | "TCS" | "Immobilizer";
  title: string;
  description: string;
  causes: string[];
  fixes: string[];
  severity: "kritik" | "yüksek" | "orta";
};

export const ERROR_CODES: ErrorCode[] = [
  {
    code: "12",
    system: "ECU",
    title: "Krank pozisyon sensörü sinyali yok",
    description:
      "Krank sensörü ECU'ya sinyal göndermiyor. Motor çalışmaz veya ani kesintilerle çalışır.",
    causes: [
      "Krank sensörü kablosu kopmuş / pin oksitlenmiş",
      "Sensör arızalı",
      "Sensör ile volan arası boşluk değişmiş (montaj sonrası)"
    ],
    fixes: [
      "Konnektör temizliği + ohm ölçümü",
      "Sensör değişimi (orijinal: 1RC-81421-00 uyumluluk kontrolü)",
      "Volan üzerindeki diş takımı kontrolü"
    ],
    severity: "kritik"
  },
  {
    code: "13",
    system: "ECU",
    title: "Emme manifold basınç sensörü (MAP) hatası",
    description:
      "MAP sensörü beklenen aralık dışı sinyal üretiyor. Motor yüke göre aşırı zengin / fakir yanma yapabilir.",
    causes: ["Vakum hortumu çatlağı", "Sensör arızası", "Konnektör neme maruz kalmış"],
    fixes: [
      "Vakum hattı görsel inceleme",
      "Konnektör kurutma + dielectric gres",
      "Sensör değişimi"
    ],
    severity: "yüksek"
  },
  {
    code: "21",
    system: "ECU",
    title: "Soğutma sıvısı sıcaklık sensörü",
    description:
      "Coolant temp sensörü hatalı okuma yapıyor. ECU motor sıcaklığını yanlış yorumlayıp zengin/fakir karışım üretiyor.",
    causes: [
      "Sensör başı paslı / mineral birikimi",
      "Kablo kopuğu",
      "Termostat sıkışık"
    ],
    fixes: [
      "Sensör söküm + kontrol",
      "Antifriz tazeleme",
      "Termostat değişimi"
    ],
    severity: "orta"
  },
  {
    code: "22",
    system: "ECU",
    title: "Emme hava sıcaklığı sensörü",
    description: "IAT sensörü aralık dışı. Soğuk havalarda kalkış zorluğu yaratabilir.",
    causes: ["Sensör arızası", "Hava filtresi kutusunda nem"],
    fixes: ["Konnektör temizliği", "Sensör değişimi"],
    severity: "orta"
  },
  {
    code: "33",
    system: "ECU",
    title: "Bobin / ateşleme sinyali",
    description: "Bobin primer devresinde sinyal yok. Buji ateşleme yapmaz.",
    causes: ["Bobin sargı arızası", "Kablo kopuğu", "Ateşleme rölesi"],
    fixes: ["Bobin primer/secondary ohm ölçümü", "Buji + kablo kontrolü"],
    severity: "kritik"
  },
  {
    code: "C12",
    system: "ABS",
    title: "Ön tekerlek hız sensörü sinyali",
    description:
      "ABS modülü ön tekerlek hızını okuyamıyor. ABS devre dışı kalır; standart fren çalışmaya devam eder.",
    causes: [
      "ABS sensör başı çamur / pas",
      "Tone ring (encoder halkası) eğri / kırık",
      "Sensör kablosu çatlağı"
    ],
    fixes: [
      "Sensör başı temizliği",
      "Tone ring görsel kontrolü",
      "Diagnostik cihaz ile sıfırlama"
    ],
    severity: "yüksek"
  },
  {
    code: "C14",
    system: "ABS",
    title: "Arka tekerlek hız sensörü sinyali",
    description: "ABS arka okumayı kaybetti. Ön ile aynı semptom.",
    causes: ["Sensör mesafesi kayması (genelde montaj sonrası)", "Konnektör nem"],
    fixes: ["Mesafe ayarı 0.5–1.5 mm aralığında", "Konnektör kurutma"],
    severity: "yüksek"
  },
  {
    code: "TCS-On",
    system: "TCS",
    title: "TCS sürekli aktif / lamba söndüremiyor",
    description:
      "Traction Control ışığı kontak açıkken yanıp sönmüyor; sistemde bir anomali. (XMAX 300 2017+ TCS donanımlı modeller.)",
    causes: ["ABS sensör sorunu (TCS aynı sinyali kullanır)", "Yazılım güncellemesi gerekli"],
    fixes: ["ABS sensör akışı önce çözülmeli", "Yetkili servis yazılım kontrolü"],
    severity: "orta"
  },
  {
    code: "Imm-1",
    system: "Immobilizer",
    title: "Anahtar tanınamadı",
    description: "Anahtar chip'i ECU tarafından okunamadı. Motor çalışmaz.",
    causes: [
      "Anahtar pili biten smart-key (yeni modeller)",
      "Anten halka arızası",
      "Yedek anahtar tanıtım hatası"
    ],
    fixes: [
      "Smart-key pil değişimi (CR2032)",
      "Anahtarı kontak başlığına temas ettirerek başlatma denemesi",
      "Yetkili servis anahtar tanıtımı"
    ],
    severity: "kritik"
  }
];

export const SYSTEM_LEGEND: Record<ErrorCode["system"], string> = {
  ECU: "Motor kontrol ünitesi",
  ABS: "Anti-blokaj fren",
  TCS: "Traction control",
  Immobilizer: "Anahtar / Immobilizer"
};
