export type EcuBrand = {
  slug: string;
  name: string;
  models: string;
  origin: string;
  positioning: string;
  mcu: string;
  mappingDimension: string;
  ignitionPrecision: string;
  raceFunctions: string[];
  appExperience: string;
  bestFor: string;
  tone: "violet" | "cyan";
};

export const ECU_BRANDS: EcuBrand[] = [
  {
    slug: "aracer",
    name: "aRacer",
    models: "RC Super X · RC Mini X",
    origin: "Tayvan",
    positioning:
      "Motor sporları odaklı bağımsız ECU referansı. 4 çekirdekli yeni nesil MCU, gerçek yarış fonksiyonları.",
    mcu: "4 çekirdekli MCU — işlem hızı +%200",
    mappingDimension: "4D yakıt haritası (TPS% × RPM × AP × Vites) + 4D ateşleme avansı (SA)",
    ignitionPrecision: "0.25° CA krank açı hassasiyeti",
    raceFunctions: [
      "Launch Control (düşen devir / hıza göre tork kesme)",
      "Quick Shift — kesme süresi ms düzeyinde ayarlanır",
      "Pit Lane Limiter (pit kulvarı sınırlandırma)",
      "Çok kademeli Çekiş Kontrolü (TCS) yazılım içinde gömülü",
      "AF2 Wideband modülü ile gerçek zamanlı Auto-Tune"
    ],
    appExperience: "aRacer X Tune — mobil + bilgisayar; tam telemetri + harita aktarımı",
    bestFor:
      "Bore-up + ileri kurulumlar, drag/pist, gerçek yarış fonksiyonu isteyen kullanıcı.",
    tone: "violet"
  },
  {
    slug: "tuneboss",
    name: "TuneBoss",
    models: "Xmax V3 standalone serisi",
    origin: "Tayland",
    positioning:
      "Sokak kullanımında pratiklik ve OEM konfor entegrasyonu önceliği olan kullanıcıya yönelik kullanıcı dostu ECU.",
    mcu: "Bluetooth bağlantılı standalone kontrolör",
    mappingDimension: "Akıllı telefon üzerinden hızlı harita + yakıt %/rölanti ayarı",
    ignitionPrecision: "Standart yarış hassasiyeti altında — sokak yetkin",
    raceFunctions: [
      "Hızlı harita yükleme (Bluetooth)",
      "Rölanti devri + temel yakıt yüzdesi ayarı",
      "Speed Dependent Windshield (hıza duyarlı elektrikli ön cam)",
      "OEM konfor fonksiyonlarıyla geniş uyum"
    ],
    appExperience: "Mobil uygulama — hızlı, kullanıcı dostu arayüz",
    bestFor:
      "Hafif bore-up + sokak kullanımı, orijinal konfor entegrasyonunu koruyarak harita değiştirmek isteyen kullanıcı.",
    tone: "cyan"
  }
];

export const ECU_LIMIT_REMOVAL = [
  {
    label: "Stok motorda",
    body: "Devir limitini 9000 → 11000 RPM'e açmak güç eğrisinin düşüş noktasını uzatır ama mekanik nefes alma kapasitesi sınırlı olduğundan belirgin tepe güç artmaz — yalnızca son hız bir miktar artar."
  },
  {
    label: "Bore-up motorda",
    body: "Hacim arttığı için birim zamandaki yakıt ihtiyacı katlanır. Stok ECU enjektör Pulse Width'i ölçeklendiremez → anında fakir karışım → motor erimesi. Bağımsız ECU silindir cc + enjektör cc/dk girişiyle baz haritayı yeniden ölçekler."
  },
  {
    label: "Smart Key entegrasyonu",
    body: "XMAX'in akıllı anahtar sistemi aRacer + bLink modülü ile yeni ECU'ya kopyalanır (Signal Acquisition). Bu adım atlanmamalıdır — yoksa orijinal kontak/immobilizer devre dışı kalır."
  }
];
