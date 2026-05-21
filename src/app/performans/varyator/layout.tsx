import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "XMAX Küresel CVT ve Arka Debriyaj Modifikasyon Rehberi",
  description: "Yamaha XMAX 250, 300 ve 400 modelleri için bölgesel atölye sırları, performans varyatörleri, debriyaj çanları ve özel şanzıman reçeteleri.",
  alternates: { canonical: "/performans/varyator" }
};

export default function VariatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
