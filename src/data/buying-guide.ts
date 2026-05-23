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
    recommendedModel: "XMAX 250 (Standart / Tech MAX)",
    generationRange: "2018–2022 (Gen 4 - Ara Kasa)",
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
    generationRange: "2023–2024 (Gen 5 - Yeni Kasa)",
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
    generationRange: "2018–2020 (Gen 4 - Ara Kasa)",
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
    generationRange: "2025–2026 (Gen 6 - Yeni Kasa)",
    why: "Segmentinin teknoloji zirvesidir. Gidondan tek tuşla kademesiz olarak 95 mm yukarı/aşağı hareket ettirilebilen elektronik ön camı, entegre fabrika çıkışlı sele/elcik ısıtmaları ve Garmin navigasyonu destekleyen çift ekranlı kokpitiyle hava şartlarını tamamen sürüşün dışına iter. Euro 5+ uyumludur.",
    pros: [
      "Kademesiz 95 mm elektrikli ön cam sistemi ile tam rüzgar koruması",
      "Fabrika çıkışlı entegre kademeli sele ve elcik ısıtma",
      "Euro 5+ emisyon uyumluluğu ve optimize edilmiş egzoz/swingarm yapısı"
    ],
    cons: [
      "Ekstra donanımlar sebebiyle standart modelden 4 kg daha ağır yapı",
      "Gelişmiş elektrik-elektronik aksam ve sensör yapısı sebebiyle artan hassasiyet"
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
    yearRange: "2005–2009",
    title: "1. Jenerasyon: Klasik Başlangıç ve EFI",
    headline: "Retro-sportif hatlar ve karbüratörden enjeksiyona geçiş dönemi.",
    highlights: [
      "Retro-sportif hatlar ve yüksek sabit ön cam tasarımı",
      "Karbüratörlü beslemeden elektronik yakıt enjeksiyonuna (EFI) geçiş",
      "Tamamen analog dairesel gösterge paneli ve sade şasi yapısı",
      "Erken nesil XMAX 125 ve XMAX 250 motor blokları"
    ],
    details: "XMAX ailesinin küresel yolculuğunun başladığı temel kasa. İlk yıllarda karbüratörlü olan motor blokları, 2007 sonrasında yakıt enjeksiyonlu ünitelere (EFI) kavuşarak modern otoyol sürüşlerinin ve yakıt ekonomisinin temellerini atmıştır."
  },
  {
    yearRange: "2010–2013",
    title: "2. Jenerasyon: Geliştirilmiş Şasi ve Gövde",
    headline: "Dinamik kaporta panelleri, daha rijit şasi ve MomoDesign prestiji.",
    highlights: [
      "Tamamen yenilenen dinamik kaporta ve gövde panelleri",
      "Genişletilmiş sele altı bagaj hacmi ve sertleştirilmiş şasi geometrisi",
      "Yenilenen analog-dijital gösterge paneli",
      "MomoDesign gibi prestijli özel serilerin temellerinin atılması"
    ],
    details: "Tasarımın daha kaslı hale geldiği, sürüş rijitliğinin artırıldığı jenerasyondur. Euro 3 emisyon standartlarına uyum sağlayan varyatör grubu, şehir içinde üstün kalkış kabiliyeti ve kararlı otoyol kararlılığı sunmuştur."
  },
  {
    yearRange: "2014–2017",
    title: "3. Jenerasyon: Keskin Hatlar ve Halojen",
    headline: "Köşeli agresif tasarım dili, çift halojen far ve spor sert süspansiyon.",
    highlights: [
      "Çift halojen ön far grubu ve LED arka stop lambası entegrasyonu",
      "Analog hız/devir göstergeleri ve dijital karma orta ekran",
      "Sert karakterli spor sürüş odaklı arka amortisör ayarları",
      "SOHC 250cc motor bloğu ve çift diskli Majesty altyapılı XMAX 400"
    ],
    details: "Türkiye'de satış rekorları kıran, agresif köşeli kasa tasarımıyla ün salmış efsanevi 'Eski Kasa' dönemidir. Mekanik sürüş hissiyatına önem veren, elektronik müdahalelerin olmadığı, sert ama virajda son derece kararlı spor süspansiyon geometrisiyle bilinir."
  },
  {
    yearRange: "2018–2022",
    title: "4. Jenerasyon: Blue Core ve TCS",
    headline: "Elektronik devrim, yakıt verimli Blue Core, akıllı anahtar ve üstün güvenlik.",
    highlights: [
      "Isıl verimliliği yüksek, düşük sürtünmeli Blue Core motor teknolojisi",
      "Çekiş Kontrol Sistemi (TCS) ve Smart Key (Akıllı Anahtar) standartlaşması",
      "Motosiklet tarzı çift kelepçeli teleskopik ön çatal tasarımı (stabilite artışı)",
      "Euro 4 / Euro 5 emisyon geçişi ve tam LED far grubu"
    ],
    details: "XMAX serisinin efsaneleştiği 'Ara Kasa' dönemidir. Anahtarsız çalıştırma sistemi sayesinde sele altı, yakıt kapağı ve gidon tek bir çevirmeli kilit üzerinden kontrol edilir. Şasi revizyonlarıyla ıslak ağırlık 250cc modelde 183-184 kg'da dengelenmiştir. İkinci el pazarının tartışmasız en güçlü oyuncusudur."
  },
  {
    yearRange: "2023–2024",
    title: "5. Jenerasyon: Radikal X-Dizayn",
    headline: "Radikal X LED tasarımı, Garmin navigasyonlu çift ekran ve Y-Connect.",
    highlights: [
      "Radikal 'X' tasarımlı LED ön farlar ve entegre arka X stop grubu",
      "Tech MAX paketinde Garmin Navigasyon destekli 4.2 inç TFT + 3.2 inç LCD çift ekran",
      "Gövdenin yukarısına taşınmış yüksek görünürlüklü sinyaller",
      "Bacakların yere daha kolay ulaşmasını sağlayan daraltılmış sele tasarımı"
    ],
    details: "Estetik algısının fütüristik boyuta ulaştığı jenerasyon. Türkiye pazarına özel olarak üretilen X-Dizayn 250cc modeli de bu kasayla gelmiştir. Standart modelde 4.3 inç LCD ekran kullanılırken, premium Tech MAX sürümünde navigasyon destekli gelişmiş TFT ekran konumlandırılmıştır."
  },
  {
    yearRange: "2025–2026",
    title: "6. Jenerasyon: Euro 5+ ve Elektrikli Cam",
    headline: "Euro 5+ emisyon normları, elektrikli ön cam ve Tech MAX Plus konforu.",
    highlights: [
      "Euro 5+ normlarına tam uyumlu yeni katalitik egzoz sistemi ve salıncak mimarisi",
      "Sol gidondan tek tuşla 95 mm dikey eksende kademesiz ayarlanabilen Elektronik Ön Cam",
      "Kütle merkezileştirmesini artıran uzun-ince egzoz yapısı",
      "Entegre ısıtmalı sele, ısıtmalı elcikler ve Acil Fren Sinyali (ESS) güvenlik donanımı"
    ],
    details: "XMAX ailesinin ulaştığı en son konfor ve teknoloji zirvesidir. 'Tech MAX Plus' paketi ile birlikte sele ve elcik ısıtma doğrudan motorun beyin ünitesi (ECU) üzerinden kontrol edilir. Rüzgar girdaplarını azaltan aerodinamik gövde ve Crystal Graphite özel renk seçeneği öne çıkar."
  }
];

export const CHRONIC_ISSUES: ChronicIssue[] = [
  {
    title: "Süspansiyon Sertliği ve Konfor Kısıtı",
    severity: "orta",
    generationsAffected: "Özellikle Gen 3 (2014–2017) ve Kısmen Gen 4 (2018–2022)",
    symptom: "Şehir içi tümseklerde ve çukurlarda darbenin sönümlenemeyerek doğrudan sürücünün bel ve omurgasına iletilmesi, sert sekme hissi.",
    officialFix: "Yamaha, 2018 sonrasındaki Blue Core şasilerinde arka amortisörlerin iç valf yapısını ve yay oranlarını yumuşatmıştır. Gen 5 kasa güncellemesinde ise sele dolgusu kalınlaştırılarak bacak arası daraltılmış ve fiziksel sönümleme desteklenmiştir.",
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
    generationsAffected: "Özellikle Gen 3 ve Gen 4 Kasaları",
    symptom: "Çift kilitleme noktasına sahip sele altı bagaj kapağının sürüş esnasında tıkırdaması, kilit mandallarının sert plastik yuvalarının esneyerek aşınması ve kilitlememe yapması.",
    officialFix: "2023+ jenerasyonunda sele menteşe mukavemeti artırılmış, kilit dillerinde metal takviyeli karşılıklar kullanılmıştır.",
    aftermarketFix: "Seleni kapatırken yukarıdan sertçe vurarak çarpmak yerine, selenin arka/orta kısmına elinizle hafifçe bastırıp iki kilit noktasından da 'klik' sesinin gelmesini sağlayın. Kilit mandallarını silikon sprey ile düzenli yağlayın."
  },
  {
    title: "Eksantrik Dişlisi Cıvatalarının Gevşemesi",
    severity: "yuksek",
    generationsAffected: "Özellikle 2023+ XMAX 250 (Gen 5) Modelleri",
    symptom: "Soğuk çalıştırmada veya rölantide silindir kapağının sol üst yanından gelen düzensiz, metalik bir vuruntu/takırtı sesi. Cıvata gevşedikçe kapak yatağına sürterek metal talaşı döker.",
    officialFix: "Yamaha yetkili servisleri şikayet üzerine silindir kapağını açarak eksantrik mili dişlisini kontrol eder. Gevşeyen cıvatalar yüksek mukavemetli sabitleyici (Loctite 243/270) ile torkunda sıkılarak sabitlenir.",
    aftermarketFix: "Sol üst kapak bölgesindeki sesleri kulak vererek dinleyin. Eğer ritmik dikiş makinesi sesi dışında kaba bir çarpma/takırtı sesi varsa motoru kesinlikle çalıştırmayın. Kapağı açtırıp cıvataları Loctite ile torkunda sabitleyin."
  },
  {
    title: "ABS Hidrolik Modülü Arızaları ve Kod 46 Hataları",
    severity: "yuksek",
    generationsAffected: "Tüm Jenerasyonlar (Özellikle Gen 4 ve Gen 5)",
    symptom: "ABS uyarı lambasının 10 km/h hıza ulaşıldıktan sonra dahi sürekli yanık kalması, ABS fren sisteminin tamamen devre dışı kalması ve DIAG ekranında Kod 21 / Kod 46 hatalarının görülmesi.",
    officialFix: "Yamaha servislerinde arızalı ABS hidrolik ünitesi komple yeni modül ile değiştirilir. Oldukça yüksek maliyetli bir parçadır.",
    aftermarketFix: "Aküden doğrudan rölesiz beslenen sis farı, yüksek akım çeken kornalar veya kalitesiz alarm kitlerini sökün; röleli özel tesisat çekin. ABS sensör kablolarının ve okuyucu disklerin temizliğini kontrol edin. Hata geçici bir voltaj dalgalanmasından (Kod 46) kaynaklanıyorsa DIAG menüsünden (d62) silmeyi deneyin."
  }
];

export const COMPARISON_MATRIX: ComparisonMatrixCol[] = [
  {
    slug: "xmax-250-gen3",
    name: "XMAX 250 (Gen 3)",
    yearNote: "2014–2017 (Halojen)",
    specs: {
      "Motor Tipi": "Tek Silindir, SOHC, 4-Subap",
      "Silindir Hacmi": "249 cc",
      "Çap x Strok": "69.0 x 66.8 mm",
      "Sıkıştırma Oranı": "10.0:1",
      "Maksimum Güç": "20.1 HP @ 7.500 rpm",
      "Maksimum Tork": "21.0 Nm @ 6.000 rpm",
      "Ön Fren": "Tek Hidrolik Disk, Ø267 mm",
      "Arka Fren": "Tek Hidrolik Disk, Ø240 mm",
      "Ön Süspansiyon Yolu": "110 mm",
      "Arka Süspansiyon Yolu": "84 mm",
      "Sele Yüksekliği": "785 mm",
      "Islak Ağırlık": "178 kg (ABS'siz)",
      "Yakıt Tankı": "13.2 L",
      "Yakıt Tüketimi": "3.5 L/100 km",
      "Bagaj Kapasitesi": "2 Kapalı Kask",
      "Önemli Özellikler": "Çift Halojen Far, Analog Kadran, Manuel Cam",
      "ÖTV Oranı": "%8",
      "Yıllık MTV": "1.069 TL"
    }
  },
  {
    slug: "xmax-250-gen4",
    name: "XMAX 250 (Gen 4)",
    yearNote: "2018–2022 (Blue Core)",
    specs: {
      "Motor Tipi": "Tek Silindir, SOHC, 4-Subap",
      "Silindir Hacmi": "249 cc",
      "Çap x Strok": "70.0 x 64.9 mm",
      "Sıkıştırma Oranı": "10.5:1",
      "Maksimum Güç": "22.8 HP @ 7.000 rpm",
      "Maksimum Tork": "24.3 Nm @ 5.500 rpm",
      "Ön Fren": "Tek Hidrolik Disk, Ø267 mm",
      "Arka Fren": "Tek Hidrolik Disk, Ø245 mm",
      "Ön Süspansiyon Yolu": "110 mm",
      "Arka Süspansiyon Yolu": "79 mm",
      "Sele Yüksekliği": "795 mm",
      "Islak Ağırlık": "183 kg",
      "Yakıt Tankı": "13.2 L",
      "Yakıt Tüketimi": "3.1 L/100 km",
      "Bagaj Kapasitesi": "2 Kapalı Kask",
      "Önemli Özellikler": "Tam LED Farlar, Smart Key, TCS, Tek LCD Ekran",
      "ÖTV Oranı": "%8",
      "Yıllık MTV": "1.069 TL"
    }
  },
  {
    slug: "xmax-250-gen6",
    name: "XMAX 250 (Gen 6)",
    yearNote: "2025–2026 (Tech MAX Plus)",
    specs: {
      "Motor Tipi": "Tek Silindir, SOHC, 4-Subap",
      "Silindir Hacmi": "249 cc",
      "Çap x Strok": "70.0 x 64.9 mm",
      "Sıkıştırma Oranı": "10.5:1",
      "Maksimum Güç": "22.8 HP @ 7.000 rpm",
      "Maksimum Tork": "24.3 Nm @ 5.500 rpm",
      "Ön Fren": "Tek Hidrolik Disk, Ø267 mm",
      "Arka Fren": "Tek Hidrolik Disk, Ø245 mm",
      "Ön Süspansiyon Yolu": "110 mm",
      "Arka Süspansiyon Yolu": "79 mm",
      "Sele Yüksekliği": "795 mm",
      "Islak Ağırlık": "187 kg",
      "Yakıt Tankı": "13.2 L",
      "Yakıt Tüketimi": "3.1 L/100 km",
      "Bagaj Kapasitesi": "2 Kapalı Kask",
      "Önemli Özellikler": "Elektrikli Cam (95 mm), Isıtmalı Sele/Elcik, TFT Çift Ekran, Garmin",
      "ÖTV Oranı": "%8",
      "Yıllık MTV": "1.069 TL"
    }
  },
  {
    slug: "xmax-300-gen6",
    name: "XMAX 300 (Gen 6)",
    yearNote: "2025–2026 (Tech MAX Plus)",
    specs: {
      "Motor Tipi": "Tek Silindir, SOHC, 4-Subap",
      "Silindir Hacmi": "292 cc",
      "Çap x Strok": "70.0 x 75.9 mm",
      "Sıkıştırma Oranı": "10.9:1",
      "Maksimum Güç": "28.0 HP @ 7.250 rpm",
      "Maksimum Tork": "29.0 Nm @ 5.750 rpm",
      "Ön Fren": "Tek Hidrolik Disk, Ø267 mm",
      "Arka Fren": "Tek Hidrolik Disk, Ø245 mm",
      "Ön Süspansiyon Yolu": "110 mm",
      "Arka Süspansiyon Yolu": "79 mm",
      "Sele Yüksekliği": "795 mm",
      "Islak Ağırlık": "183 kg",
      "Yakıt Tankı": "13.2 L",
      "Yakıt Tüketimi": "3.0 L/100 km",
      "Bagaj Kapasitesi": "2 Kapalı Kask",
      "Önemli Özellikler": "Elektrikli Cam (95 mm), Isıtmalı Sele/Elcik, TFT Çift Ekran, ESS Acil Fren",
      "ÖTV Oranı": "%37",
      "Yıllık MTV": "2.215 TL"
    }
  },
  {
    slug: "xmax-400-gen4",
    name: "XMAX 400 (Gen 4)",
    yearNote: "2018–2020 (DOHC)",
    specs: {
      "Motor Tipi": "Tek Silindir, DOHC, 4-Subap",
      "Silindir Hacmi": "395 cc",
      "Çap x Strok": "83.0 x 73.0 mm",
      "Sıkıştırma Oranı": "10.6:1",
      "Maksimum Güç": "33.0 HP @ 7.000 rpm",
      "Maksimum Tork": "36.0 Nm @ 6.000 rpm",
      "Ön Fren": "Çift Hidrolik Disk, Ø267 mm",
      "Arka Fren": "Tek Hidrolik Disk, Ø267 mm",
      "Ön Süspansiyon Yolu": "110 mm (Motosiklet Tipi)",
      "Arka Süspansiyon Yolu": "79 mm",
      "Sele Yüksekliği": "800 mm",
      "Islak Ağırlık": "210 kg",
      "Yakıt Tankı": "13.0 L",
      "Yakıt Tüketimi": "4.18 L/100 km",
      "Bagaj Kapasitesi": "2 Kapalı Kask",
      "Önemli Özellikler": "Çift Ön Disk, TCS, Smart Key, Park Freni, Tam LED",
      "ÖTV Oranı": "%37",
      "Yıllık MTV": "2.215 TL"
    }
  }
];
