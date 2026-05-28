export type NavSubItem = {
  href: string;
  label: string;
  description: string;
  icon: string;
  comingSoon?: boolean;
};

export type NavGroup = {
  href: string;
  label: string;
  tagline: string;
  accent: string;
  items: NavSubItem[];
};

export const NAV: NavGroup[] = [
  {
    href: "/performans",
    label: "Performans",
    tagline: "Hız ve güç",
    accent: "from-yamaha-500/30 via-yamaha-600/10 to-transparent",
    items: [
      {
        href: "/performans/varyator",
        label: "Varyatör Modları",
        description: "Malossi · Polini · J.Costa · TDR",
        icon: "Settings2"
      },
      {
        href: "/motor-modifikasyon",
        label: "Motor Modifikasyon",
        description: "Bore-up · TDR · BRT · aRacer",
        icon: "Zap"
      },
      {
        href: "/performans/mekanik",
        label: "Mekanik Setup",
        description: "Silindir, enjektör, egzantrik",
        icon: "Cog"
      },
      {
        href: "/performans/fren",
        label: "Fren Sistemleri",
        description: "RPD diskler, kaliper, balata",
        icon: "Disc"
      }
    ]
  },
  {
    href: "/periyodik-bakim",
    label: "Bakım",
    tagline: "Servis ve sıvılar",
    accent: "from-electric-cyan/30 via-electric-cyan/10 to-transparent",
    items: [
      {
        href: "/periyodik-bakim",
        label: "Periyodik Bakım",
        description: "Servis takvimi · yağ analizi",
        icon: "Wrench"
      },
      {
        href: "/bilgi/lastik-basinci",
        label: "Lastik Basıncı",
        description: "Tek/çift kişi · soğuk değer",
        icon: "CircleDot"
      },
      {
        href: "/bilgi/hata-kodlari",
        label: "Hata Kodları",
        description: "ECU · ABS · TCS uyarıları",
        icon: "AlertCircle"
      },
      {
        href: "/bilgi",
        label: "Tüm Referanslar",
        description: "Tork tablosu · sıvı kapasiteleri",
        icon: "Database"
      }
    ]
  },
  {
    href: "/nasil-yapilir",
    label: "Rehberler",
    tagline: "Adım adım kılavuzlar",
    accent: "from-electric-violet/30 via-electric-violet/10 to-transparent",
    items: [
      {
        href: "/nasil-yapilir",
        label: "Nasıl Yapılır",
        description: "Mekanik adım adım kılavuzlar",
        icon: "BookOpen"
      },
      {
        href: "/bilgi/rodaj",
        label: "Rodaj Kılavuzu",
        description: "1600 km bilimsel alıştırma planı",
        icon: "Atom"
      },
      {
        href: "/satin-alma-rehberi",
        label: "Satın Alma Rehberi",
        description: "Jenerasyon karşılaştırmaları",
        icon: "ShoppingCart"
      }
    ]
  },
  {
    href: "/teknik-ozellikler",
    label: "XMAX Modelleri",
    tagline: "250 · 300 · 400 jenerasyonları",
    accent: "from-electric-ember/25 via-yamaha-700/10 to-transparent",
    items: [
      {
        href: "/teknik-ozellikler",
        label: "Teknik Özellikler",
        description: "Detaylı jenerasyon tablosu",
        icon: "Bike"
      },
      {
        href: "/aksesuar",
        label: "Aksesuarlar",
        description: "Cam, çanta, sele, LED far, USB",
        icon: "Sofa"
      }
    ]
  }
];
