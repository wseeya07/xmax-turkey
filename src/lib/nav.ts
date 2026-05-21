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
      { href: "/performans/varyator", label: "Varyatör Modları", description: "TDR Gold, Jcosta, Malossi CVT" },
      { href: "/performans/mekanik", label: "Mekanik Setup", description: "BRT Silindir, enjektör, egzantrik" },
      { href: "/performans/fren", label: "Fren Sistemleri", description: "RPD diskler, kaliperler, balatalar" }
    ]
  },
  { href: "/periyodik-bakim", label: "Bakım", description: "Servis takvimi" },
  { href: "/nasil-yapilir", label: "Rehberler", description: "Adım adım mekanik" },
  { href: "/teknik-ozellikler", label: "Modeller", description: "Jenerasyon tablosu" },
  { href: "/bilgi", label: "Bilgi", description: "Hızlı referans" }
];
