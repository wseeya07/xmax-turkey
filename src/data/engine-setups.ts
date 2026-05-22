export type EngineSetup = {
  slug: string;
  modelGroup: "XMAX 250" | "XMAX 300" | "XMAX 400";
  number: number;
  title: string;
  shortTitle: string;
  targetVolume: string;
  intent: string;
  style: string;
  block: {
    kit: string;
    netVolume: string;
    piston: string;
    spark?: string;
  };
  compression: string;
  camshaft: string;
  throttleAndAir: string;
  injector: string;
  ecu: {
    unit: string;
    idleRpm: string;
    rpmLimit: string;
    afrMap: string;
    ignition: string;
  };
  thermal?: string[];
  highlights: string[];
};

export const ENGINE_SETUPS: EngineSetup[] = [
  {
    slug: "xmax-250-294cc-gunluk-sokak",
    modelGroup: "XMAX 250",
    number: 1,
    title: "XMAX 250 → 294 cc · Günlük Hızlı Sokak",
    shortTitle: "294 cc · Günlük",
    targetVolume: "294.43 cc",
    intent: "Sokakta yüksek dayanıklılık, titreşimsiz çalışma, şehir içi hızlanma torkunun optimize edilmesi.",
    style: "Stage 1 · Cadde",
    block: {
      kit: "TDR Ceramic Cylinder Block 76 mm (13100-B7401-C78YG)",
      netVolume: "294.43 cc · +%17.88",
      piston: "Dövme alüminyum düz kafa piston",
      spark: "TDR Twin Iridium MA9RT buji"
    },
    compression: "11.5 : 1 — pompa benziniyle vuruntusuz. Alt conta 0.5 mm + üst conta 0.3 mm.",
    camshaft: "BRT Master Cam T1 (In lift 8.82 mm / Ex lift 8.80 mm)",
    throttleAndAir:
      "Orijinal kelebek veya Ataka CNC 38 mm. Filtre kutusu içi taze hava giriş borusu genişletilmiş performans tipi.",
    injector: "RPD / TDR 12-delikli 240 cc/dk",
    ecu: {
      unit: "aRacer RC Mini X",
      idleRpm: "1550 RPM",
      rpmLimit: "9600 RPM (subap yayı stok — mekanik koruma)",
      afrMap: "Rölanti 14.2 · Cruise 13.5 – 13.8 · WOT 13.0",
      ignition: "Orta devirlerde standarda +2° avans (vuruntu izlenerek)"
    },
    highlights: [
      "30 RPM altı vuruntu yok",
      "Şehir içi sollama torku belirgin",
      "Stok şanzıman korunur — varyatör ayrıca elden geçirilir"
    ]
  },
  {
    slug: "xmax-300-400cc-radikal",
    modelGroup: "XMAX 300",
    number: 2,
    title: "XMAX 300 → 400 cc · Radikal Güç",
    shortTitle: "400 cc · Radikal",
    targetVolume: "400.48 cc",
    intent: "Maksimum güç üretimi, yüksek devir kararlılığı, drag/pist odaklı hızlanma.",
    style: "Stage 3 · Drag / Pist",
    block: {
      kit: "S90 Racing CNC Billet X-Pro 82 mm (S90BLK0012)",
      netVolume: "400.48 cc · +%37.11",
      piston: "Özel üretim yüksek kubbeli (dome) dövme piston",
      spark: "İridyum yüksek ısı katsayılı yarış bujisi"
    },
    compression: "12.8 : 1 — bakır silindir kapak contası 0.2 mm + yüksek mukavemetli saplama cıvataları.",
    camshaft:
      "TDR Camshaft T02 (In 230° / Ex 236° · In lift 9.36 mm / Ex lift 8.94 mm). Subap yayları TDR çift sarmal sert yaylar.",
    throttleAndAir:
      "Ataka Racing 40 mm Çift Enjektörlü CNC + velocity stack. Silindir kapağı emme portu CNC port-polish 40 mm.",
    injector:
      "Birincil RPD 280 cc/dk · İkincil TDR 240 cc/dk (7000 RPM üzerinde devreye girer)",
    ecu: {
      unit: "aRacer RC Super X + AF2 Wideband (Bosch LSU 4.9)",
      idleRpm: "1700 RPM (yüksek durasyon nedeniyle)",
      rpmLimit: "11000 RPM",
      afrMap: "Rölanti 13.8 · Cruise 13.2 · WOT (>7000 RPM) 12.8",
      ignition: "0.25° CA adımlarla optimize edilmiş yüksek devir avansı (Knock Sensor maks. hassasiyet)"
    },
    highlights: [
      "Auto-Tune aktif — gerçek zamanlı AFR düzeltmesi",
      "Subap bindirmesi yüksek — düşük devir tork azalır, üst devire kayar",
      "Yarış parçası — sokak kullanımı için değil"
    ]
  },
  {
    slug: "xmax-400-424cc-tork-isi",
    modelGroup: "XMAX 400",
    number: 3,
    title: "XMAX 400 → 424 cc · Tork ve Isı Yönetimli",
    shortTitle: "424 cc · Tork + Isı",
    targetVolume: "423.99 cc",
    intent: "Yüksek tork çıkışını korumak, DOHC çift silindir kapağının termal yükünü yönetmek, uzun ömürlü touring.",
    style: "Stage 2 · Tork + Touring",
    block: {
      kit: "Custom 86 mm Silindir Gömlek Uygulaması",
      netVolume: "423.99 cc · +%7.35",
      piston: "Dövme piston"
    },
    compression: "11.2 : 1 — termal güvenlik için sınırlandırılmıştır.",
    camshaft:
      "Custom DOHC orta derece eksantrik milleri. 30°/45°/60° çok açılı subap yuvası. Hafif port-polish.",
    throttleAndAir:
      "Orijinal kelebek 40 mm ölçüsüne genişletilir. Yüksek akışlı hava filtresi.",
    injector: "280 cc/dk",
    ecu: {
      unit: "aRacer RC Super X",
      idleRpm: "1500 RPM",
      rpmLimit: "9200 RPM (büyük piston atalet kuvveti — krank ömrü koruması)",
      afrMap: "Rölanti 14.0 · Cruise 13.4 · WOT 12.9 (zengin karışımla iç soğutma)",
      ignition: "TCS vitese göre kademeli — ıslak zeminde tork patinajını engeller"
    },
    thermal: [
      "Yüksek akışlı çift sıralı alüminyum performans radyatörü",
      "Yağ filtresi kapağına bypass + 10 sıralı harici yağ soğutucu (ön panele)",
      "Şanzıman: Eneos 80W-90 dişli yağı · Motor: Wolf Fully Synthetic 5W-40",
      "Fan devreye girme sıcaklığı 100 °C → 88 °C (aRacer üzerinden)"
    ],
    highlights: [
      "Yüksek tork + uzun yol konforu hedefli",
      "Termal yönetim kritik — radyatör + yağ soğutucu zorunlu",
      "Devir limiti muhafazakar — krank dayanıklılık"
    ]
  }
];
