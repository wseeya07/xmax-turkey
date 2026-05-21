export const SITE = {
  name: "XMAX Türkiye",
  shortName: "XMAX TR",
  url: "https://xmaxturkey.com",
  mirrorUrl: "https://turkxmax.com",
  locale: "tr-TR",
  description:
    "Yamaha XMAX sahipleri için varyatör modifikasyonları, periyodik bakım planlayıcı, mekanik nasıl-yapılır rehberleri ve jenerasyon bazlı teknik özellikler veritabanı.",
  tagline: "Türkiye'nin XMAX bilgi merkezi",
  author: "XMAX Türkiye Topluluğu",
  ogImage: "/og/xmax-turkey-og.jpg"
} as const;

export const NAV_ITEMS = [
  { href: "/varyator", label: "Varyatör", short: "Varyatör Mod." },
  { href: "/periyodik-bakim", label: "Periyodik Bakım", short: "Bakım" },
  { href: "/nasil-yapilir", label: "Nasıl Yapılır", short: "How-To" },
  { href: "/teknik-ozellikler", label: "Teknik Özellikler", short: "Teknik" }
] as const;
