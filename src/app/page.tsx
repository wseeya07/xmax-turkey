import { Hero } from "@/components/hero";
import { IntentSplit } from "@/components/intent-split";
import { ContentPillars } from "@/components/content-pillars";
import { ModelSelector } from "@/components/model-selector";
import { BuyingGuidePromo } from "@/components/buying-guide-promo";
import { MaintenanceTimeline } from "@/components/maintenance-timeline";
import { FinalCTA } from "@/components/final-cta";
import { SITE } from "@/lib/site";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "XMAX 300 için önerilen lastik basıncı nedir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ön 2.0 bar, arka 2.25 bar (tek kişi). Çift kişi / yüklü kullanımda arka 2.5 bar. Ölçüm soğuk lastikte yapılmalı."
      }
    },
    {
      "@type": "Question",
      name: "XMAX 300 hata kodu okunur mu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Evet. ECU pano lambası yanıp söndüğünde sayı serisi okunur. ABS/TCS uyarıları ayrı lambalar ile bildirilir. Sözlük için /bilgi/hata-kodlari sayfasına bakın."
      }
    },
    {
      "@type": "Question",
      name: "XMAX varyatör bakımı ne zaman yapılır?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Slider ve baga kontrolü 10.000 km, tam revizyon 20.000 km, drive belt değişimi 40.000 km civarında önerilir."
      }
    }
  ]
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE.url }
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
      <IntentSplit />
      <ModelSelector />
      <MaintenanceTimeline />
      <BuyingGuidePromo />
      <ContentPillars />
      <FinalCTA />
    </>
  );
}
