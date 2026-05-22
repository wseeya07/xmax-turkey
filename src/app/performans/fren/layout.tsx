import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "XMAX Fren Yükseltme: Brembo, RPD, Çelik Hortum, RCS Master Silindir",
  description:
    "Yamaha XMAX 250/300/400 için kapsamlı fren mühendisliği rehberi: Brembo M4/GP4-RX/RPD Blitz kaliperler, RCS 14/15/17 master silindirler, HEL çelik hortumlar, EBC HH balatalar, DOT 4/5.1 sıvılar, ABS jumper hava alma prosedürü ve model bazlı komple kurulum reçeteleri.",
  alternates: { canonical: "/performans/fren" },
  openGraph: {
    title: "XMAX Fren Sistemi Yükseltme Teknik Kütüphane",
    description:
      "Brake fade fiziği, kaliper karşılaştırma, RCS master silindir seçimi, ABS hava alma ve model bazlı komple fren reçeteleri.",
    type: "article",
  },
};

export default function BrakeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
