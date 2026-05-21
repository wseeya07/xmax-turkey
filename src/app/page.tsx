import { Hero } from "@/components/hero";
import { VerticalBento } from "@/components/vertical-bento";
import { GenerationStrip } from "@/components/generation-strip";
import { VariatorTeaser } from "@/components/variator-teaser";
import { MaintenanceTimeline } from "@/components/maintenance-timeline";
import { HowToStrip } from "@/components/howto-strip";
import { FinalCTA } from "@/components/final-cta";
import { SITE } from "@/lib/site";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "XMAX 300 için en uygun varyatör baga ağırlığı nedir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Şehir içi sürüş için 13g, karma kullanım için 12g, pist için 11g önerilir. Stok 14g'dir; ağırlığı düşürmek erken devir ve agresif kalkış sağlar."
      }
    },
    {
      "@type": "Question",
      name: "XMAX antifriz değişimi ne sıklıkta yapılmalı?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yaklaşık 20.000 km veya 2 yılda bir. Sistem havasının alınması kritik; aksi halde motor aşırı ısınabilir."
      }
    },
    {
      "@type": "Question",
      name: "XMAX varyatör bakımı kaç kilometrede yapılır?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "İlk slider ve baga kontrolü 10.000 km civarında, tam revizyon 20.000 km'de önerilir. Kayış (drive belt) genellikle 40.000 km'de değişir."
      }
    }
  ]
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Ana Sayfa",
      item: SITE.url
    }
  ]
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Hero />
      <VerticalBento />
      <GenerationStrip />
      <VariatorTeaser />
      <MaintenanceTimeline />
      <HowToStrip />
      <FinalCTA />
    </>
  );
}
