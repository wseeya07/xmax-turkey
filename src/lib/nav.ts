import {
  Gauge,
  Wind,
  Cpu,
  Disc3,
  Wrench,
  Droplets,
  Snowflake,
  Zap,
  BookOpen,
  Bike,
  CircleDot,
  Lightbulb,
  Sofa,
  Smartphone,
  AlertCircle,
  GaugeCircle,
  type LucideIcon
} from "lucide-react";

export type NavLeaf = {
  href: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
  status?: "ready" | "soon";
};

export type NavGroup = {
  title: string;
  items: NavLeaf[];
};

export type NavMega = {
  href: string;
  label: string;
  description?: string;
  groups: NavGroup[];
  featured?: {
    eyebrow: string;
    title: string;
    description: string;
    href: string;
  };
};

export type NavSimple = {
  href: string;
  label: string;
};

export const NAV: (NavMega | NavSimple)[] = [
  {
    href: "/varyator",
    label: "Performans",
    description: "CVT, egzoz, ECU ve hava akışı modifikasyonları",
    featured: {
      eyebrow: "Karşılaştırma",
      title: "Hangi varyatör hangi karakter?",
      description: "Malossi · Spectro · TDR · Polini — baga ağırlığı ve yay seti tablosu.",
      href: "/varyator"
    },
    groups: [
      {
        title: "CVT & Aktarma",
        items: [
          { href: "/varyator", label: "Varyatör", icon: Gauge, description: "Malossi · Spectro · TDR · Polini" },
          { href: "/performans/baga-agirligi", label: "Baga (bilye) ağırlığı", icon: CircleDot, status: "soon" },
          { href: "/performans/debriyaj", label: "Debriyaj yayı / balata", icon: Disc3, status: "soon" },
          { href: "/performans/tork-koni", label: "Tork koni", icon: GaugeCircle, status: "soon" }
        ]
      },
      {
        title: "Hava & Yanma",
        items: [
          { href: "/performans/egzoz", label: "Egzoz sistemleri", icon: Wind, description: "Akrapovic · Leovince · Termignoni", status: "soon" },
          { href: "/performans/hava-filtresi", label: "Hava filtresi", icon: Wind, status: "soon" },
          { href: "/performans/ecu-remap", label: "ECU remap", icon: Cpu, status: "soon" }
        ]
      }
    ]
  },
  {
    href: "/periyodik-bakim",
    label: "Bakım",
    description: "Kilometre bazlı servis takvimi ve sıvı kapasiteleri",
    featured: {
      eyebrow: "Planlayıcı",
      title: "Modelime özel bakım takvimi",
      description: "1.000 km'den 40.000 km'ye kademeli servis kalemleri.",
      href: "/periyodik-bakim"
    },
    groups: [
      {
        title: "Sıvılar & Filtreler",
        items: [
          { href: "/periyodik-bakim", label: "Periyodik servis planı", icon: Wrench },
          { href: "/bakim/motor-yagi", label: "Motor yağı", icon: Droplets, status: "soon" },
          { href: "/bakim/antifriz", label: "Antifriz / soğutma", icon: Snowflake, status: "soon" },
          { href: "/bakim/buji", label: "Buji", icon: Zap, status: "soon" }
        ]
      },
      {
        title: "Sürtünme & Aşınma",
        items: [
          { href: "/bakim/kayis", label: "Drive belt / kayış", icon: Disc3, status: "soon" },
          { href: "/bakim/fren", label: "Fren sistemi", icon: Disc3, status: "soon" },
          { href: "/bakim/lastik", label: "Lastik kontrolü", icon: CircleDot, status: "soon" }
        ]
      }
    ]
  },
  {
    href: "/nasil-yapilir",
    label: "Mekanik",
    description: "Adım adım rehberler",
    groups: [
      {
        title: "Yayında",
        items: [
          {
            href: "/nasil-yapilir/varyator-bakimi-ve-temizligi",
            label: "Varyatör bakımı",
            icon: Gauge,
            description: "Slider, baga ve kasnak temizliği"
          },
          {
            href: "/nasil-yapilir/antifriz-degisimi-ve-hava-alma",
            label: "Antifriz değişimi",
            icon: Snowflake,
            description: "Sistem havasının doğru alınması"
          }
        ]
      },
      {
        title: "Yakında",
        items: [
          { href: "/nasil-yapilir/buji-degisimi", label: "Buji değişimi", icon: Zap, status: "soon" },
          { href: "/nasil-yapilir/yag-degisimi", label: "Motor yağı değişimi", icon: Droplets, status: "soon" },
          { href: "/nasil-yapilir/kayis-degisimi", label: "Drive belt değişimi", icon: Disc3, status: "soon" },
          { href: "/nasil-yapilir/fren-balata", label: "Fren balata değişimi", icon: Disc3, status: "soon" }
        ]
      }
    ]
  },
  {
    href: "/teknik-ozellikler",
    label: "Modeller",
    description: "Jenerasyon bazlı teknik tablo",
    featured: {
      eyebrow: "Selektör",
      title: "Modelimi tanı",
      description: "Yıl + plaka aralığı ile XMAX'inin jenerasyonunu doğrula.",
      href: "/teknik-ozellikler"
    },
    groups: [
      {
        title: "Jenerasyonlar",
        items: [
          { href: "/teknik-ozellikler/xmax-250-2014", label: "XMAX 250", description: "2014–2017", icon: Bike },
          { href: "/teknik-ozellikler/xmax-300-2017", label: "XMAX 300", description: "2017–2022", icon: Bike },
          { href: "/teknik-ozellikler/xmax-300-2023", label: "XMAX 300 (Yeni)", description: "2023+", icon: Bike },
          { href: "/teknik-ozellikler/xmax-tech-max", label: "XMAX Tech MAX", description: "2020+", icon: Bike }
        ]
      },
      {
        title: "Karşılaştır",
        items: [
          { href: "/teknik-ozellikler", label: "Tüm modeller tablosu", icon: GaugeCircle }
        ]
      }
    ]
  },
  {
    href: "/bilgi",
    label: "Bilgi",
    description: "Hızlı referanslar",
    groups: [
      {
        title: "Sürüş referansları",
        items: [
          {
            href: "/bilgi/lastik-basinci",
            label: "Lastik basıncı",
            icon: CircleDot,
            description: "Tek/çift kişi · soğuk değer"
          },
          {
            href: "/bilgi/hata-kodlari",
            label: "Hata kodları",
            icon: AlertCircle,
            description: "ECU · ABS · TCS"
          },
          { href: "/bilgi/sivilar", label: "Sıvı kapasiteleri", icon: Droplets, status: "soon" },
          { href: "/bilgi/tork-tablosu", label: "Tork tablosu", icon: GaugeCircle, status: "soon" }
        ]
      },
      {
        title: "Alış kararı",
        items: [
          { href: "/bilgi/ikinci-el", label: "2.el alım rehberi", icon: BookOpen, status: "soon" },
          { href: "/bilgi/rakipler", label: "Rakip karşılaştırması", icon: Bike, status: "soon" }
        ]
      }
    ]
  },
  {
    href: "/aksesuar",
    label: "Aksesuar",
    description: "Uyumlu donanım kataloğu",
    groups: [
      {
        title: "Sürüş",
        items: [
          { href: "/aksesuar/cam", label: "Ön cam", icon: Wind, status: "soon" },
          { href: "/aksesuar/cantalar", label: "Çanta · Topcase", icon: BookOpen, status: "soon" },
          { href: "/aksesuar/sele", label: "Sele · Konfor", icon: Sofa, status: "soon" }
        ]
      },
      {
        title: "Elektronik",
        items: [
          { href: "/aksesuar/aydinlatma", label: "LED · far yükseltme", icon: Lightbulb, status: "soon" },
          { href: "/aksesuar/usb-telefon", label: "USB · telefon tutucu", icon: Smartphone, status: "soon" }
        ]
      }
    ]
  }
];

export const FOOTER_NAV = NAV;
