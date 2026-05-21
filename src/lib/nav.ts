export type NavItem = {
  href: string;
  label: string;
  description?: string;
};

export const NAV: NavItem[] = [
  { href: "/varyator", label: "Varyatör", description: "CVT karşılaştırması" },
  { href: "/periyodik-bakim", label: "Bakım", description: "Servis takvimi" },
  { href: "/nasil-yapilir", label: "Rehberler", description: "Adım adım mekanik" },
  { href: "/teknik-ozellikler", label: "Modeller", description: "Jenerasyon tablosu" },
  { href: "/bilgi", label: "Bilgi", description: "Hızlı referans" }
];
