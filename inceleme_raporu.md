# XMAX Turkey - Proje İnceleme ve Hata Raporu

## 1. Genel Mobil Uyumluluk (Responsive Design) ve UI/UX Eksiklikleri
Proje genel olarak Tailwind CSS kullanılarak modern bir yapıda kurgulanmış. Çoğu bileşende mobil öncelikli (mobile-first) tasarım anlayışı (`sm:`, `md:`, `lg:` prefixleri) mevcut ancak bazı önemli noktalarda eksiklikler ve iyileştirilmesi gereken yerler bulunuyor:

- **ModelSelector Bileşeni (`src/components/model-selector.tsx`):**
  - Model gruplarını (`XMAX 250`, `XMAX 300`, vs.) listeleyen buton grubunda `<div className="flex gap-1 ... self-start">` kullanılmış. Yeni gruplar eklendiğinde veya ekran çok daraldığında (örn. 320px cihazlar) butonlarda taşma (overflow) yaşanabilir. Buraya `flex-wrap` sınıfının eklenmesi daha güvenli olacaktır.

- **Teknik Özellikler Sayfası (`src/app/teknik-ozellikler/[slug]/page.tsx`):**
  - Servis parçalarını listeleyen satırlarda `grid grid-cols-[140px_1fr] gap-4 py-3 text-sm` kullanılmış. Çok dar ekranlarda sol kolonun `140px` sabit olması, sağ kolonu (değerlerin yazdığı kısım) aşırı daraltabilir veya metinlerin bozulmasına yol açabilir. `grid-cols-1 sm:grid-cols-[140px_1fr]` gibi bir yapı ile mobilde etiket ve değerin alt alta gelmesi okunabilirliği artırır.

- **Rehber (Guide) Sayfası (`src/app/nasil-yapilir/[slug]/page.tsx`):**
  - Başlığın hemen üstünde yer alan, zorluk derecesi, süre ve adım sayısını gösteren hap (chip) şeklindeki rozetlerin bulunduğu `<div className="flex items-center gap-2">` yapısında `flex-wrap` eksikliği var. Dar ekranlarda (mobile) rozetlerin yan yana sığmaması durumunda ekrandan taşma (horizontal scroll/overflow) yaşanabilir.

- **Motor Modifikasyon Sayfası (`src/app/motor-modifikasyon/page.tsx`):**
  - "Beş Aşama" (5 Stages Chooser) bölümünde kartlar `md:grid-cols-2 lg:grid-cols-5` olarak listelenmiş. Mobilde (alt alta tek kolon) 5 adet büyük kart, dikey olarak çok uzun bir kaydırma alanı (scroll fatigue) oluşturabilir. Mobil ekranlar için bu bölümün yana kaydırılabilir bir slider/carousel (örn. `flex overflow-x-auto snap-x`) yapısına çevrilmesi UX açısından değerlendirilebilir.

## 2. React Mantık Hataları ve Olası Hydration Bug'ları
- **ModelSelector Component'i Initial State:**
  - `activeSlug` state'i varsayılan olarak `groupItems[groupItems.length - 1]?.slug ?? GENERATIONS[0].slug` kullanılarak başlatılıyor. Statik veri seti kullanıldığı için şu an sorun görünmüyor olsa da, sunucu (SSR/SSG) tarafında oluşturulan ilk `activeSlug` ile istemci (client) tarafındaki ilk değer herhangi bir sebeple farklılaşırsa **Hydration Mismatch** hatası ortaya çıkabilir.
- **Key Kullanımları:**
  - İncelenen dosyalarda `map` fonksiyonları içerisinde (örn. `GROUPS.map((g) => ... key={g})`) güvenli `key` değerleri kullanılmış, bu kısımlarda React'in listeleme optimizasyonlarına uygun davranılmış.

## 3. Genel Mimari ve Geliştirme Önerileri
- **Bileşen (Component) İzolasyonu:** 
  - Sayfa komponentleri (`page.tsx` dosyaları) oldukça uzun ve birden fazla alt bölüm (section) içeriyor. Örneğin `GuidePage` içerisindeki adımlar listesi `<ol className="mt-6 space-y-4">...` kendi başına ayrı bir `GuideSteps` bileşeni (component) yapılabilir. Bu durum hem okunabilirliği hem de kodun yeniden kullanılabilirliğini (reusability) artırır.
- **Link Bileşenlerinde `prefetch` Kullanımı:** 
  - `next/link` bileşeni varsayılan olarak viewport'ta belirdiğinde gideceği sayfayı önceden yükler (prefetch). Eğer sayfada (örneğin listede) çok fazla `<Link>` bulunuyorsa, bu durum gereksiz arka plan ağ isteklerine (network request) sebep olabilir. Performans odaklı yaklaşım için sık tıklanmayacak linklerde `prefetch={false}` kullanımı eklenebilir.
- **Erişilebilirlik (A11y - Accessibility):** 
  - Form ve etkileşimli elemanlarda (örn. tab geçiş butonları - `XMAX 250`, `XMAX 300`) `aria-selected`, `aria-controls` veya `role="tab"` gibi accessibility öznitelikleri eksik. Görme engelliler ve ekran okuyucu (Screen Reader) cihaz kullanan kullanıcılar için bu eksikliklerin tamamlanması uygulamanın kalitesini artıracaktır.
- **Type/Lint Hataları:**
  - Projede terminalde çalıştırılan `npm run typecheck` komutu, `prop-types` paketinin tip tanımlarının bulunamadığına dair (`error TS2688: Cannot find type definition file for 'prop-types'`) hata vermiştir. Proje bağımlılıklarına (devDependencies) `@types/prop-types` paketi eklenerek bu hata çözülmelidir.
