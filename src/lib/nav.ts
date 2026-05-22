export type NavSubItem = {
  href: string;
  label: string;
  description: string;
};

export type NavItem = {
  href: string;
  label: string;
  description?: string;
  items?: NavSubItem[];
};

export const NAV: NavItem[] = [
  {
    href: "/performans",
    label: "Performans",
    description: "Yükseltme rehberleri",
    items: [
      { href: "/varyator", label: "Varyatör Modları", description: "Malossi · Polini · J.Costa · TDR Gold" },
      { href: "/motor-modifikasyon", label: "Motor Modifikasyon", description: "Bore-up · TDR/BRT/S90 · aRacer · Wideband AFR" },
      { href: "/performans/mekanik", label: "Mekanik Setup (Özet)", description: "BRT Silindir, enjektör, egzantrik özet" },
      { href: "/performans/fren", label: "Fren Sistemleri", description: "RPD diskler, kaliperler, balatalar" }
    ]
  },
  { href: "/periyodik-bakim", label: "Bakım", description: "Servis takvimi" },
  { href: "/nasil-yapilir", label: "Rehberler", description: "Adım adım mekanik" },
  {
    href: "/teknik-ozellikler",
    label: "Modeller",
    description: "Jenerasyon tablosu",
    items: [
      { href: "/teknik-ozellikler", label: "Teknik Özellikler", description: "Detaylı jenerasyon tablosu" },
      { href: "/satin-alma-rehberi", label: "Satın Alma Rehberi", description: "Jenerasyon karşılaştırmaları & tavsiyeler" }
    ]
  },
  { href: "/bilgi", label: "Bilgi", description: "Hızlı referans" }
];
