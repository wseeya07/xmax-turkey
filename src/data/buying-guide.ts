export type RiderProfile = {
  slug: string;
  title: string;
  tagline: string;
  recommendedModel: string;
  generationRange: string;
  why: string;
  pros: string[];
  cons: string[];
  savingDetail: string;
  bestFor: string;
};

export type TaxRateItem = {
  model: string;
  ccRange: string;
  otv: number;
  kdv: number;
  totalTaxLoad: number;
  annualMtv: string;
  marketImpact: string;
};

export type GenTimelineEvent = {
  yearRange: string;
  title: string;
  headline: string;
  highlights: string[];
  details: string;
};

export type ChronicIssue = {
  title: string;
  severity: "dusuk" | "orta" | "yuksek";
  generationsAffected: string;
  symptom: string;
  officialFix: string;
  aftermarketFix: string;
};

export type ComparisonMatrixCol = {
  slug: string;
  name: string;
  yearNote: string;
  specs: Record<string, string>;
};

export const RIDER_PROFILES: RiderProfile[] = [
  {
    slug: "sehir-ici",
    title: "Şehir İçi & Maksimum Ekonomi",
    tagline: "Yoğun trafikte kıvraklık, minimum servis maliyeti ve düşük yakıt tüketimi arayanlar.",
    recommendedModel: "XMAX 250 (Standart)",
    generationRange: "2018–2022 Jenerasyonu",
    why: "Şehir içi dur-kalk trafiğinde debriyaj ömrünü gözeten ve yakıtı koklayan Blue Core motor bloğuna sahiptir. Türkiye'deki %8 ÖTV bareminde yer alması ve yıllık 1.069 TL'lik düşük MTV tutarı sayesinde işletme maliyetini minimumda tutar. TCS ve Smart Key standarttır.",
    pros: [
      "3.1 L/100 km ortalama tüketim ile üstün ekonomi",
      "Giriş bütçesinde en yüksek ikinci el likiditesi",
      "Islak zeminlerde hayat kurtaran TCS çekiş kontrolü"
    ],
    cons: [
      "Otoyol süratlerinde ve dik yokuşlarda tek silindir 250cc limiti",
      "Gösterge panelinde yeni nesil TFT ekranlar kadar zengin bilgi akışı olmaması"
    ],
    savingDetail: "ÖTV bareminin %8'de kalması, motoru %250 üstü alternatiflere göre doğrudan %34.8 oranında daha avantajlı kılar.",
    bestFor: "İşe gidip gelmek, kurye/şehir içi gündelik ulaşım sağlamak ve bütçeyi korumak isteyen rasyonel alıcılar."
  },
  {
    slug: "otoyol-artci",
    title: "Artçılı Seyahat & Sollama Gücü",
    tagline: "Eşli/artçılı uzun seyahatlere çıkan, otoyol geçişlerinde ekstra güç rezervi isteyenler.",
    recommendedModel: "XMAX 300 Tech MAX",
    generationRange: "2023–2024 Jenerasyonu",
    why: "XMAX 300, 28 HP güç ve 29 Nm tork ile dik yokuşlarda ve otoban sollamalarında artçıyla dahi tıkanmadan ivmelenir. 250cc kasa ölçüleri ile birebir aynı şasiye (183 kg) sahip olduğundan şehir içindeki aralardan geçme (filtering) pratikliğini hiç kaybetmez.",
    pros: [
      "29 Nm yüksek tork ile otoyol süratlerinde (110-130 km/s) üstün soluk",
      "Çift ekranlı navigasyonlu TFT kokpit (Tech MAX sürümü)",
      "250cc ile aynı ağırlıkta kalarak sunulan yüksek güç ağırlık rasyosu"
    ],
    cons: [
      "Türkiye'deki %37 ÖTV dilimine takılması sebebiyle yüksek ilk alım maliyeti",
      "Yıllık MTV tutarının 250cc grubunun iki katından fazla olması (2.215 TL)"
    ],
    savingDetail: "A2 ehliyet limitleri dahilinde kalınabilecek en yüksek otoyol performansını sunar.",
    bestFor: "Hafta içi şehre sığan, hafta sonu ise eşiyle birlikte otoban üzerinden uzaklaşmak isteyen performans odaklı sürücüler."
  },
  {
    slug: "uzun-tur",
    title: "Uzun Yol & Maksimum Duruş",
    tagline: "Şehirler arası mesafeleri yorulmadan aşmak, yan rüzgarlardan etkilenmemek isteyen otoban sevdalıları.",
    recommendedModel: "XMAX 400 Tech MAX",
    generationRange: "2018–2020 Jenerasyonu",
    why: "Majesty 400'den miras kalan 395 cc hacmindeki çift eksantrikli (DOHC) motor bloğu, 33 HP güç ve 36 Nm tork üretir. 210 kg ıslak ağırlığı ve kalın ön çatalları sayesinde yan rüzgarlara karşı adeta tren kararlılığında otoyola yapışarak ilerler.",
    pros: [
      "Ön tekerlekte 267 mm çift disk fren tertibatı ile üstün duruş gücü",
      "Ağır şasisi sayesinde yüksek süratlerde benzersiz otoyol kararlılığı",
      "Geniş 150 taban arka lastik ve daha uzun aks mesafesi"
    ],
    cons: [
      "4.18 - 5.2 L/100 km arası yüksek yakıt tüketimi",
      "Bütünleşik büyük motor bloğu nedeniyle arka aksta yüksek yaysız kütle (unsprung mass) ve bozuk yolda sert sürüş"
    ],
    savingDetail: "Yeni nesil 300cc motorların ikinci el fiyatına DOHC çift diskli gerçek maksi-scooter hacmi sunar.",
    bestFor: "Şehir içini ikinci plana atan, tamamen uzun turlar, otoban sürüşleri ve otoyol kararlılığı odaklı tecrübeli sürücüler."
  },
  {
    slug: "kisin-konfor",
    title: "Maksimum Teknoloji & 4 Mevsim",
    tagline: "Kışın dahi motordan inmeyen, en son aerodinamik ve teknolojik donanımları arzulayanlar.",
    recommendedModel: "XMAX 250 Tech MAX Plus",
    generationRange: "2025–2026 Jenerasyonu",
    why: "Segmentinin teknoloji zirvesidir. Gidondan tek tuşla kademesiz olarak 95 mm yukarı/aşağı hareket ettirilebilen elektronik ön camı, entegre fabrika çıkışlı sele/elcik ısıtmaları ve Garmin navigasyonu destekleyen çift ekranlı kokpitiyle hava şartlarını tamamen sürüşün dışına iter. Euro 5+ uyumludur.",
    pros: [
      "Kademesiz 95 mm elektrikli ön cam sistemi ile tam rüzgar koruması",
      "Fabrika çıkışlı entegre kademeli sele ve elcik ısıtma",
      "Euro 5+ emisyon uyumluluğu ve optimize edilmiş egzoz/swingarm yapısı"
    ],
    cons: [
      "2026 Mayıs ayı itibariyle 447.000 TL düzeyindeki yüksek sıfır km fiyatı",
      "Karmakarışık elektrik-elektronik aksam ve sensör yapısı"
    ],
    savingDetail: "Ekstra hiçbir kablo, telefon tutucu veya çakmaklık aparatı gerektirmeden tam donanımlı konfor paketi sunar.",
    bestFor: "Bütçe kısıtlaması olmayan, telefonunu gidona asıp sarsıntıdan bozmak istemeyen ve 365 gün sürüş yapan konfor tutkunları."
  }
];

export const TAX_DATA: { explain: string; formulas: string[]; rates: TaxRateItem[] } = {
  explain: "Türkiye'de 250 cc sınırı, motosiklet alım kararlarında en belirleyici mali bariyerdir. 250 cc altı modeller %8 ÖTV ile vergilendirilirken, bu sınırı tek bir cc bile aşan (örn. 292 cc XMAX 300) modeller %37 ÖTV baremine çarpar. Bu durum, vergisiz fabrika çıkış fiyatları tamamen aynı olan iki motordan 300 cc olanının, tüketiciye doğrudan %34.8 daha pahalı yansımasına neden olur.",
  formulas: [
    "Toplam Vergi Katsayısı (K) = (1 + ÖTV) × (1 + KDV)",
    "250 cc ve Altı (%8 ÖTV) için: K = 1.08 × 1.20 = 1.296 (Toplam vergi yükü %29.6)",
    "250 cc Üstü (%37 ÖTV) için: K = 1.37 × 1.20 = 1.644 (Toplam vergi yükü %64.4)"
  ],
  rates: [
    {
      model: "XMAX 250 (Blue Core / 2026)",
      ccRange: "249 cc",
      otv: 8,
      kdv: 20,
      totalTaxLoad: 29.6,
      annualMtv: "1.069 TL",
      marketImpact: "Distribütör ithalat ağırlığı bu modeldedir. Geniş bayi ağı ve yüksek ikinci el likiditesi."
    },
    {
      model: "XMAX 300 (Blue Core / 2026)",
      ccRange: "292 cc",
      otv: 37,
      kdv: 20,
      totalTaxLoad: 64.4,
      annualMtv: "2.215 TL",
      marketImpact: "Vergi farkından ötürü lüks/marjinal tercih sınıfında kalır. Özel sipariş veya kısıtlı ithalat."
    }
  ]
};

export const GEN_TIMELINE: GenTimelineEvent[] = [
  {
    yearRange: "2014–2017",
    title: "Analog Karakter ve Keskin Hatlar",
    headline: "Köşeli, agresif sportif kaporta tasarımı ve mekanik sürüş hissi.",
    highlights: [
      "Çift halojen ön far grubu ve LED stop entegrasyonu",
      "Analog hız/devir göstergeleri ve ufak dijital orta ekran",
      "Sert karakterli çift arka amortisör ayarı (çukur sönümlemesi zayıf)",
      "Smart Key (anahtarsız çalıştırma) ve TCS (çekiş kontrol) bulunmaz"
    ],
    details: "XMAX ailesinin tasarım dilini modern çağın keskin hatlarına taşıdığı dönemdir. Yakıt deposu kapasitesi 11.8 L ile 13.2 L arasında değişkenlik gösterir, sele yüksekliği ise 785-792 mm'dir. Mekanik hisse önem veren ve elektronik müdahale istemeyen eski ekol kullanıcıların tercihidir."
  },
  {
    yearRange: "2018–2022",
    title: "Elektronik Devrim ve Blue Core",
    headline: "Premium özelliklerin standartlaştığı, emisyon ve güvenlik odaklı altın çağ.",
    highlights: [
      "Isıl verimliliği yüksek ve sürtünmesiz Blue Core motor teknolojisi",
      "TCS (Çekiş Kontrol Sistemi) ve Smart Key (Anahtarsız Çalıştırma) standart",
      "Motosiklet tarzı tekil kelepçeli teleskopik ön çatal tasarımı (yol tutuş stabilite artışı)",
      "Euro 4 / Euro 5 emisyon geçişlerine tam uyum"
    ],
    details: "XMAX serisinin efsaneleştiği jenerasyondur. Anahtarsız çalıştırma sistemi sayesinde sele altı, yakıt kapağı ve gidon tek bir çevirmeli kilit üzerinden kontrol edilir. Şasi revizyonlarıyla ıslak ağırlık 250cc modelde 183-184 kg'da dengelenmiştir. İkinci el pazarının tartışmasız en güçlü oyuncusudur."
  },
  {
    yearRange: "2023–2024",
    title: "X-Dizayn ve Dijital Entegrasyon",
    headline: "Estetik algının fütüristik boyuta ulaştığı, çift ekranlı kokpit dönemi.",
    highlights: [
      "Radikal 'X' tasarımlı LED ön farlar ve entegre arka X stop grubu",
      "Tech MAX paketinde Garmin Navigasyon destekli 4.2'' TFT ekran kokpiti",
      "Yukarıya (rüzgarlık hizasına) taşınmış yüksek görünürlüklü sinyaller",
      "Bacakların yere daha kolay ulaşmasını sağlayan daraltılmış sele formu"
    ],
    details: "Tasarım tamamen fütüristik bir yapıya bürünmüştür. Standart modelde 4.3'' akıllı telefon bağlantılı LCD ekran kullanılırken, premium Tech MAX sürümünde üste 3.2'' yardımcı hız ekranı, alta ise navigasyon haritasını yansıtan 4.2'' renkli TFT yerleştirilmiştir. Sele yüksekliği 795 mm olarak optimize edilmiştir."
  },
  {
    yearRange: "2025–2026",
    title: "Euro 5+ ve Aktif Konfor Güncellemeleri",
    headline: "Çevre normlarına uyum ve elektronik olarak optimize edilen aerodinamik detaylar.",
    highlights: [
      "Euro 5+ gereksinimlerine uyumlu yeni katalitik konvertörlü egzoz sistemi",
      "Gidondan tek tuşla kontrol edilebilen 95 mm hareketli Elektronik Ön Cam",
      "Kütle merkezileştirmesi sağlayan ince-uzun egzoz ve revize edilmiş swingarm",
      "Fabrika çıkışlı entegre kademeli sele ve elcik ısıtma sistemleri (Plus Paketi)"
    ],
    details: "En son jenerasyon, sürücü üzerindeki rüzgar girdaplarını azaltacak rüzgar tüneli testli gövdeyle gelir. 'Tech MAX Plus' adını alan üst paketle birlikte sele ve elcik ısıtma doğrudan fabrika çıkışlı entegre tesisatla gelir. Ceramic Grey ve Crystal Graphite gibi özel renk şemaları sunulmuştur."
  }
];

export const CHRONIC_ISSUES: ChronicIssue[] = [
  {
    title: "Süspansiyon Sertliği ve Konfor Kısıtı",
    severity: "orta",
    generationsAffected: "Özellikle 2014–2017 (Kısmen 2018–2022)",
    symptom: "Şehir içi tümseklerde ve çukurlarda darbenin sönümlenemeyerek doğrudan sürücünün bel ve omurgasına iletilmesi, sert sekme hissi.",
    officialFix: "Yamaha, 2018 sonrasındaki Blue Core şasilerinde arka amortisörlerin iç valf yapısını ve yay oranlarını yumuşatmıştır. 2023 kasa güncellemesinde ise sele dolgusu kalınlaştırılarak bacak arası daraltılmış ve fiziksel sönümleme desteklenmiştir.",
    aftermarketFix: "Kesin ve konforlu çözüm için YSS progressif yaylı amortisörler veya Öhlins amortisör setleri montajı popülerdir. Arka lastik yanak genişliğini (soğukta doğru basınçta tutarak) korumak da sönümlemeyi rahatlatır."
  },
  {
    title: "Debriyaj Silkelemesi ve Kalkışta Titreme",
    severity: "yuksek",
    generationsAffected: "Tüm Jenerasyonlar (Kuru Tip Santrifüj Debriyaj)",
    symptom: "Şehir içi dur-kalk trafikte debriyaj ısındıkça balata tozunun tas içine birikmesi, 3.000–4.000 rpm arasındaki ilk kalkış anlarında şiddetli titreme ve silkme yapması.",
    officialFix: "Yamaha yeni kasalarda debriyaj tası havalandırma kanallarını genişleterek toz tahliyesini kolaylaştırmıştır. Servislerde periyodik olarak (5.000-10.000 km) varyatör kapağı açılarak balata tozu temizlenir ve pabuçlar zımparalanır.",
    aftermarketFix: "Performans odaklı kullanıcılar için Malossi Maxi Fly/Delta Clutch debriyaj seti, Malossi/Polini varyatör kiti ve daha sert tork yayları entegrasyonu titreşim problemini kökten ve kalıcı olarak çözer."
  },
  {
    title: "Akü Bitirme ve Akıllı Anahtar (Smart Key) Hataları",
    severity: "orta",
    generationsAffected: "2018 ve Sonrası (Smart Key Kullanan Modeller)",
    symptom: "Kullanıcının motoru park ederken kilit kadranını 'Off' yerine kazara daha sola çevirip Park (P) modunda bırakması ve stop lambasının açık kalarak aküyü tamamen bitirmesi.",
    officialFix: "Yamaha, kilit mekanizmasında kadran geçiş direncini fiziksel olarak artırmış ve motor Park moduna geçtiğinde sürücüyü sesli (bipleyici) ve görsel olarak uyaran ikaz sistemlerini devreye almıştır.",
    aftermarketFix: "Motoru stop ederken kadranı yavaşça sola çevirin ve sadece gidon kilidi çıt sesini duyacak kadar klikleyin. Kazara sola abanıp parka geçirmemeye özen gösterin. Uzun süre yatacaksa akü şarj koruma cihazı bağlayın."
  },
  {
    title: "Sele Altı Kilit Mekanizması Aşınmaları",
    severity: "dusuk",
    generationsAffected: "Özellikle 2014–2022 Kasaları",
    symptom: "Çift kilitleme noktasına sahip sele altı bagaj kapağının sürüş esnasında tıkırdaması, kilit mandallarının sert plastik yuvalarının esneyerek aşınması ve kilitlememe yapması.",
    officialFix: "2023+ jenerasyonunda sele menteşe mukavemeti artırılmış, kilit dillerinde metal takviyeli karşılıklar kullanılmıştır.",
    aftermarketFix: "Seleni kapatırken yukarıdan sertçe vurarak çarpmak yerine, selenin arka/orta kısmına elinizle hafifçe bastırıp iki kilit noktasından da 'klik' sesinin gelmesini sağlayın. Kilit mandallarını silikon sprey ile düzenli yağlayın."
  }
];

export const COMPARISON_MATRIX: ComparisonMatrixCol[] = [
  {
    slug: "xmax-250-2016",
    name: "XMAX 250 (Halojen)",
    yearNote: "2014–2017 Jenerasyonu",
    specs: {
      "Motor Tipi": "Tek Silindir, SOHC, 4-Subap",
      "Silindir Hacmi": "249.78 cc",
      "Çap x Strok": "69.0 x 66.8 mm",
      "Sıkıştırma Oranı": "10.0:1",
      "Maksimum Güç": "20.1 HP @ 7.500 rpm",
      "Maksimum Tork": "21.0 Nm @ 6.000 rpm",
      "Ön Fren Tertibatı": "Tek Hidrolik Disk, Ø267 mm",
      "Arka Fren Tertibatı": "Tek Hidrolik Disk, Ø240 mm",
      "Ön Süspansiyon Yolu": "110 mm",
      "Arka Süspansiyon Yolu": "84 mm",
      "Ön Lastik Ebadı": "120/70-15",
      "Arka Lastik Ebadı": "140/70-14",
      "Tekerlekler Arası Mesafe": "1.545 mm",
      "Sele Yüksekliği": "785 mm",
      "Islak Ağırlık": "178 kg (ABS'siz)",
      "Yakıt Depo Hacmi": "11.8 - 13.2 L",
      "Fabrika Yakıt Tüketimi": "3.5 L/100 km",
      "Bagaj Kapasitesi": "2 Kapalı Kask"
    }
  },
  {
    slug: "xmax-250-2026",
    name: "XMAX 250 (Blue Core)",
    yearNote: "2018–2026 Jenerasyonu",
    specs: {
      "Motor Tipi": "Tek Silindir, SOHC, 4-Subap",
      "Silindir Hacmi": "249 cc",
      "Çap x Strok": "70.0 x 64.9 mm",
      "Sıkıştırma Oranı": "10.5:1",
      "Maksimum Güç": "22.8 HP @ 7.000 rpm",
      "Maksimum Tork": "24.3 Nm @ 5.500 rpm",
      "Ön Fren Tertibatı": "Tek Hidrolik Disk, Ø267 mm",
      "Arka Fren Tertibatı": "Tek Hidrolik Disk, Ø245 mm",
      "Ön Süspansiyon Yolu": "110 mm",
      "Arka Süspansiyon Yolu": "79 mm",
      "Ön Lastik Ebadı": "120/70-15",
      "Arka Lastik Ebadı": "140/70-14",
      "Tekerlekler Arası Mesafe": "1.540 mm",
      "Sele Yüksekliği": "795 mm",
      "Islak Ağırlık": "183 - 184 kg",
      "Yakıt Depo Hacmi": "13.2 L",
      "Fabrika Yakıt Tüketimi": "3.1 L/100 km",
      "Bagaj Kapasitesi": "2 Kapalı Kask"
    }
  },
  {
    slug: "xmax-300-2026",
    name: "XMAX 300 (Blue Core)",
    yearNote: "2017–2026 Jenerasyonu",
    specs: {
      "Motor Tipi": "Tek Silindir, SOHC, 4-Subap",
      "Silindir Hacmi": "292 cc",
      "Çap x Strok": "70.0 x 75.9 mm",
      "Sıkıştırma Oranı": "10.9:1",
      "Maksimum Güç": "28.0 HP @ 7.250 rpm",
      "Maksimum Tork": "29.0 Nm @ 5.750 rpm",
      "Ön Fren Tertibatı": "Tek Hidrolik Disk, Ø267 mm",
      "Arka Fren Tertibatı": "Tek Hidrolik Disk, Ø245 mm",
      "Ön Süspansiyon Yolu": "110 mm",
      "Arka Süspansiyon Yolu": "79 mm",
      "Ön Lastik Ebadı": "120/70-15",
      "Arka Lastik Ebadı": "140/70-14",
      "Tekerlekler Arası Mesafe": "1.539 - 1.540 mm",
      "Sele Yüksekliği": "795 mm",
      "Islak Ağırlık": "179 - 183 kg",
      "Yakıt Depo Hacmi": "13.0 - 13.2 L",
      "Fabrika Yakıt Tüketimi": "3.0 - 3.2 L/100 km",
      "Bagaj Kapasitesi": "2 Kapalı Kask"
    }
  },
  {
    slug: "xmax-400-2020",
    name: "XMAX 400 (DOHC)",
    yearNote: "2018–2020 Jenerasyonu",
    specs: {
      "Motor Tipi": "Tek Silindir, DOHC, 4-Subap",
      "Silindir Hacmi": "395 cc",
      "Çap x Strok": "83.0 x 73.0 mm",
      "Sıkıştırma Oranı": "10.6:1",
      "Maksimum Güç": "33.0 HP @ 7.000 rpm",
      "Maksimum Tork": "36.0 Nm @ 6.000 rpm",
      "Ön Fren Tertibatı": "Çift Hidrolik Disk, Ø267 mm",
      "Arka Fren Tertibatı": "Tek Hidrolik Disk, Ø267 mm",
      "Ön Süspansiyon Yolu": "110 mm (Motosiklet Tipi)",
      "Arka Süspansiyon Yolu": "79 mm (Unit Swing)",
      "Ön Lastik Ebadı": "120/70-15",
      "Arka Lastik Ebadı": "150/70-13",
      "Tekerlekler Arası Mesafe": "1.565 - 1.567 mm",
      "Sele Yüksekliği": "800 mm",
      "Islak Ağırlık": "210 kg",
      "Yakıt Depo Hacmi": "13.0 L",
      "Fabrika Yakıt Tüketimi": "4.18 L/100 km",
      "Bagaj Kapasitesi": "2 Kapalı Kask"
    }
  }
];
