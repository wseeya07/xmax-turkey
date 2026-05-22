import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "XMAX Rodaj Kılavuzu — Bilimsel & Metalurjik Teknik Analiz",
  description:
    "Yamaha XMAX 250 ve XMAX 300 Blue Core için bilimsel rodaj rehberi. DiASil silindir teknolojisi, segman alıştırma (ring seating), termal döngü ve 1600 km'lik kronolojik aksiyon planı.",
  alternates: { canonical: "/bilgi/rodaj" },
  openGraph: {
    title: "XMAX Rodaj Kılavuzu — Bilimsel & Metalurjik Teknik Analiz",
    description:
      "DiASil silis kristalleri, segman alıştırma, termal döngü, motor freni vakumu, 1000 km kritik bakımı ve 1600 km nihai güç sınırı.",
    url: `${SITE.url}/bilgi/rodaj`,
    type: "article",
    locale: "tr_TR"
  },
  twitter: {
    card: "summary_large_image",
    title: "XMAX Rodaj Kılavuzu — Bilimsel & Metalurjik Teknik Analiz",
    description:
      "Kulaktan dolma ezberler değil; mühendislik. Yamaha XMAX 250 / 300 için 5 aşamalı rodaj kılavuzu."
  }
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Bilgi", item: `${SITE.url}/bilgi` },
    {
      "@type": "ListItem",
      position: 3,
      name: "Rodaj kılavuzu",
      item: `${SITE.url}/bilgi/rodaj`
    }
  ]
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Yamaha XMAX 250 ve 300 için Bilimsel Rodaj Kılavuzu",
  description:
    "DiASil silindir, segman alıştırma (ring seating), termal döngü ve motor freni vakumunun XMAX 250/300 rodajına etkisi.",
  author: { "@type": "Organization", name: SITE.name, url: SITE.url },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  inLanguage: "tr-TR",
  mainEntityOfPage: `${SITE.url}/bilgi/rodaj`,
  about: [
    { "@type": "Thing", name: "Yamaha XMAX 250" },
    { "@type": "Thing", name: "Yamaha XMAX 300" },
    { "@type": "Thing", name: "Motor rodajı" },
    { "@type": "Thing", name: "DiASil silindir" }
  ]
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "XMAX rodajı kaç kilometredir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yamaha'nın fabrika el kitabında rodaj 0-1600 km arasında tanımlanmıştır. 1000 km'de yağ + filtre + şanzıman yağı değişimi yapılır, 1600 km sonunda tam sentetik yağa geçilir."
      }
    },
    {
      "@type": "Question",
      name: "İlk 1000 km'de tam sentetik yağ kullanılır mı?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hayır. Tam sentetik yağ aşırı kaygan moleküler film oluşturduğu için segmanların DiASil silindirdeki silisyum kristallerine oturmasını engeller. İlk 1000 km için Yamalube 10W-40 mineral veya yarı sentetik yağ kullanılmalıdır."
      }
    },
    {
      "@type": "Question",
      name: "Otoyolda sabit hızda rodaj yapılır mı?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hayır. Sabit düşük devirde yanma basıncı (P_gas) yetersiz kalır, segmanlar silindir duvarına yeterince bastırılamaz ve silindir yüzeyi camlaşır (glazing). Doğru yöntem değişken devir + değişken yük (Variable RPM & Variable Load) sürüşüdür."
      }
    },
    {
      "@type": "Question",
      name: "Motor freni rodajda neden önemli?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gaz kolu kapatıldığında silindirde oluşan güçlü vakum, segman alıştırmasından kaynaklanan mikro metal tozlarını emerek egzozdan tahliye eder ve karterden taze yağı yukarı çekerek silindiri soğutur."
      }
    }
  ]
};

export default function RodajLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
