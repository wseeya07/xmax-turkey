export type GuideStep = {
  title: string;
  body: string;
  tip?: string;
  warning?: string;
};

export type Guide = {
  slug: string;
  title: string;
  shortTitle: string;
  excerpt: string;
  durationMinutes: number;
  difficulty: "kolay" | "orta" | "ileri";
  tools: string[];
  parts: string[];
  steps: GuideStep[];
};

export const GUIDES: Guide[] = [
  {
    slug: "varyator-bakimi-ve-temizligi",
    title: "Adım Adım XMAX Varyatör Bakımı ve Temizliği",
    shortTitle: "Varyatör Bakımı",
    excerpt:
      "Varyatör kapağını söküp baga, slider ve kasnak yüzeylerini doğru sırayla temizleme; aşınma kontrolü; yeniden montaj torkları.",
    durationMinutes: 90,
    difficulty: "orta",
    tools: [
      "8 / 10 / 17 / 19 / 24 mm lokma seti",
      "Tork anahtarı (5–80 Nm)",
      "Varyatör tutucu aparat (Yamaha 90890-01701 muadili)",
      "Fırça + temiz bez",
      "Yağ çözücü sprey"
    ],
    parts: [
      "Slider seti (3 adet)",
      "Baga seti (6 adet, model uygun gram)",
      "Conta — varyatör kapağı (gerekirse)"
    ],
    steps: [
      {
        title: "1. Hazırlık ve güvenlik",
        body:
          "Motorun soğuk olduğundan emin olun. Aküyü ayırın. Sol yan kapağı sökerek varyatör kapağını ortaya çıkarın.",
        tip: "Söktüğünüz cıvataları sıralı kutuya yerleştirin — montajda sıra önemlidir."
      },
      {
        title: "2. Varyatör kapağı sökümü",
        body:
          "Kapak cıvatalarını çapraz sırayla, dıştan içe doğru gevşetin. Conta zarar görmemeli; alttaki yönlendirici pimlere dikkat edin.",
        warning: "Cıvataları gevşek bırakıp kapağı kademeli açın — iç parça yayı olabilir."
      },
      {
        title: "3. Birincil kasnak ve baga çıkarma",
        body:
          "Tutucu aparatla ön kasnağı sabitleyin, 24 mm somunu sökün. Hareketli kasnak yüzeyini temiz bir yere alın. Bagaları tek tek çıkarın ve her birini gözle inceleyin.",
        tip: "Baga yüzeyinde yassılaşma 0.5 mm'yi geçtiyse set halinde değiştirin."
      },
      {
        title: "4. Slider kontrol ve temizlik",
        body:
          "Üç slider'ı çıkarın. Plastik yüzeyde çentik / aşınma varsa set halinde yenileyin. Slider kanallarını yağ çözücüyle silin — kuru bırakın.",
        warning: "Asla gres veya yağ uygulamayın — kayış kayar."
      },
      {
        title: "5. Kayış kontrolü",
        body:
          "Drive belt'i kasnaklardan ayırın. Çatlak, lif kopması, yan yüzey aşınması bakın. Genişlik servis limitine (genelde 22.0 mm) düşmüşse değiştirin."
      },
      {
        title: "6. Yeniden montaj ve tork",
        body:
          "Yeni / temizlenmiş parçalarla ters sırada birleştirin. Birincil kasnak somunu 95 Nm, varyatör kapağı cıvataları 10 Nm tork ile sıkın.",
        tip: "Montaj sonrası 50 km'lik bir tur atın; ardından kapağı tekrar açıp yerleşme izlerine bakın."
      }
    ]
  },
  {
    slug: "antifriz-degisimi-ve-hava-alma",
    title: "XMAX Soğutma Sıvısı (Antifriz) Değişimi ve Sistem Havasının Alınması",
    shortTitle: "Antifriz Değişimi",
    excerpt:
      "Eski antifrizin tahliyesi, sistem yıkama, yeni antifriz dolumu ve hava kabarcıklarını çıkartmak için doğru rölanti yöntemi.",
    durationMinutes: 60,
    difficulty: "orta",
    tools: [
      "10 mm anahtar",
      "Geniş ağızlı tahliye kabı (min 2 L)",
      "Huni",
      "Temiz hortum (hava alma için)"
    ],
    parts: [
      "Yamaha Coolant veya muadil hazır karışım — 1.5 L",
      "Sızdırmazlık halkası (drain bolt) — gerekirse"
    ],
    steps: [
      {
        title: "1. Motoru soğutun",
        body:
          "Motor minimum 30 dakika soğumuş olmalı. Sıcak antifriz haşlama yapar — radyatör kapağını asla sıcakken açmayın.",
        warning: "Soğutma sistemi basınç altındadır. Kapak sıcakken açılırsa fışkırma riski vardır."
      },
      {
        title: "2. Tahliye",
        body:
          "Su pompası altındaki drain bolt'u 10 mm anahtarla gevşetin. Eski sıvıyı kaba boşaltın. Radyatör kapağını açarak akışı hızlandırın.",
        tip: "Eski sıvının rengini kontrol edin — kahverengi/paslı ise sistem yıkaması yapın."
      },
      {
        title: "3. Sistem yıkama (opsiyonel)",
        body:
          "Distile suyla doldurup motoru 2-3 dakika çalıştırın ve tekrar boşaltın. Sıvı berraklaşana kadar tekrarlayın."
      },
      {
        title: "4. Yeni antifriz dolumu",
        body:
          "Drain bolt'u sıkın (10 Nm). Huniyle radyatör boğazından yavaşça doldurun. Kabarcık çıkmaya başladığında dolumu yavaşlatın.",
        tip: "Yamaha Coolant zaten hazır karışımdır — su eklemeyin."
      },
      {
        title: "5. Hava alma — kritik adım",
        body:
          "Kapağı açık tutarak motoru rölantide çalıştırın. Termostat açıldığında seviye düşer; eklemeye devam edin. 2-3 kez gaz vererek hava kabarcıklarının çıkmasını sağlayın.",
        warning: "Hava cebi kalırsa motor aşırı ısınır. Bu adımı atlamayın."
      },
      {
        title: "6. Genleşme deposu",
        body:
          "Genleşme deposunu MAX/MIN çizgileri arasında doldurun. Kapağı kapatın. İlk 2 sürüşten sonra seviyeyi tekrar kontrol edin."
      }
    ]
  }
];
