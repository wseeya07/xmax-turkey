/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Cpu,
  Wind,
  Ruler,
  Briefcase,
  ShieldCheck,
  TrendingDown,
  AlertTriangle,
  Users,
  Quote
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { RakipRecommender } from "@/components/rakip-recommender";
import { RakipComparisonMatrix } from "@/components/rakip-comparison-matrix";
import { CITATIONS } from "@/data/rakipler";

export const metadata: Metadata = {
  title: "XMAX vs Rakipleri — Maksi-Scooter Karşılaştırma",
  description:
    "Yamaha XMAX 250/300/400'ün Türkiye pazarındaki rakiplerle (Forza 250, Burgman 400, Beverly 400, Vespa GTS 300, NMAX 155, PCX 160, Joymax 250, Downtown 250i, Zontes 350D/E) kapsamlı mühendislik karşılaştırması. İnteraktif seçim rehberi + 34 kaynaklı analiz.",
  alternates: { canonical: "/bilgi/rakipler" },
  openGraph: {
    title: "XMAX vs Rakipleri — Maksi-Scooter Pazar ve Mühendislik Analizi",
    description:
      "Türkiye'deki tüm maksi-scooterların teknik karşılaştırması + 4 soruluk interaktif seçim rehberi.",
    type: "article"
  }
};

const ARTICLE_SECTIONS = [
  { id: "motor-mimarisi", title: "Motor Mimarisi", icon: Cpu },
  { id: "suspansiyon", title: "Süspansiyon & Konfor", icon: Wind },
  { id: "ergonomi", title: "Ergonomi & Sele", icon: Ruler },
  { id: "depolama", title: "Depolama & Menzil", icon: Briefcase },
  { id: "elektronik", title: "Güvenlik Elektroniği", icon: ShieldCheck },
  { id: "pazar", title: "Türkiye Pazarı & Değer", icon: TrendingDown },
  { id: "forza-sorunlari", title: "Forza Kronik Sorunları", icon: AlertTriangle },
  { id: "kullanici-profilleri", title: "Sürücü Profilleri", icon: Users }
] as const;

const PROFILES = [
  {
    title: "Kentsel pratiklik + yakıt tasarrufu",
    short: "Şehir trafiği · 30–50 km günlük",
    pick: "Honda PCX 160 / Yamaha NMAX 155",
    body:
      "Günlük tıkanık trafikte koltuktan kalkmadan üst-üste sollama yapabilecek çevikliği önemseyen sürücüler için 130 kg sınıfı en mantıklı seçim. PCX 160'ın 12.0:1 sıkıştırma oranı 2.1–2.5 L/100 km tüketim üretir; NMAX 155'in VVA teknolojisi düşük devirde tork verir, yüksek devirde performansı korur."
  },
  {
    title: "Şehir içi konfor + çok yönlü otoyol",
    short: "Hafta içi şehir + hafta sonu uzun yol",
    pick: "Yamaha XMAX 250 / Honda Forza 250",
    body:
      "Geniş tank, kapalı kask alabilen sele altı, premium şasi geometrisi arayan rasyonel alıcı için. XMAX 250 Türkiye'de en likit ikinci el — Forza 250 daha yumuşak süspansiyon sunar ama kronik clutch shudder ve gidon sallama raporları nedeniyle değer kaybı yüksek."
  },
  {
    title: "Sportif yol tutuşu + teknoloji",
    short: "Agresif sürüş · navigasyon · TFT",
    pick: "Yamaha XMAX 300 Tech MAX Plus",
    body:
      "Rijit telesko çatallar + 29 Nm tork + Garmin navigasyonlu çift TFT ekran. Otoyolda artçısı bile sollama kabiliyeti veren, şehirde 183 kg gövde sayesinde kıvraklığı koruyan tek 300cc sınıfı seçenek. Tech MAX Plus paketinde ısıtmalı sele/elcik ve elektrikli cam."
  },
  {
    title: "Sınırlı bütçe + maksimum donanım",
    short: "Fiyat/donanım oranı önceliği",
    pick: "Zontes 350D / Zontes 350E",
    body:
      "36.7 HP + 38 Nm + elektrikli cam + ısıtmalı elcik + TFT ekran XMAX 300'ün sıfır fiyatına yakın bantta. Çin menşeli marka algısı ve ikinci el likidite zayıflığı en büyük dezavantaj — sıfır alıp 6–8 yıl kullanmayı planlayanlara mantıklı."
  },
  {
    title: "Klasik tasarım + prestij + yatırım",
    short: "Koleksiyoner / şehirli alıcı",
    pick: "Vespa GTS 300 HPE",
    body:
      "Çelik monokok gövde, zamansız tasarım, döviz-endeksli ikinci el değer korunumu. Sele altı kapasitesi 16 L'de kalıyor (sadece yarım kask), tek kişilik tasarım — fakat şehir-içi prestij arayan alıcı için Vespa'nın eşdeğeri yok."
  },
  {
    title: "Otoyol seyahati + üst segment konfor",
    short: "400cc+ · uzun mesafe · çift kişi",
    pick: "Suzuki Burgman 400 / Yamaha XMAX 400 (2.el)",
    body:
      "Burgman 400'ün 750 mm sele yüksekliği sınıfın en erişilebileri, 60 L bagajı iki tam boy kask alır, 35 Nm tork çift kişi otoyol için fazlasıyla yeterli. XMAX 400 Türkiye'de sıfır pazarda yok — 2018–2020 Gen 4 DOHC 2. el ilanları seçeneği. Piaggio Beverly 400 S sınıfın en güçlüsü (35 HP) ama Avrupa fiyatlaması cazip değil."
  }
] as const;

export default function RakiplerPage() {
  return (
    <>
      {/* Hero */}
      <section className="container-x pb-10 pt-16 sm:pt-24 relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-yamaha-500/10 blur-3xl"
          aria-hidden
        />
        <Reveal>
          <Link
            href="/bilgi"
            className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.22em] text-carbon-300 transition hover:text-electric-cyan"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Bilgi Merkezi
          </Link>
        </Reveal>
        <SectionHeading
          eyebrow="Maksi-scooter pazarı + mühendislik analizi"
          title={
            <>
              XMAX vs{" "}
              <span className="text-electric">rakipleri.</span>
            </>
          }
          description={
            <>
              Yamaha XMAX 250/300/400 ile Türkiye pazarındaki tüm rakip modeller (Honda Forza
              250, Suzuki Burgman 400, Piaggio Beverly 400, Vespa GTS 300 HPE, Yamaha NMAX 155,
              Honda PCX 160, Kymco Downtown 250i, SYM Joymax 250, Zontes 350D/E) — motor mimarisi,
              süspansiyon, ergonomi, pazar değeri ve kronik sorunlar başlıklarında bağımsız
              karşılaştırma. 4 soruluk interaktif eşleyici ile sana en uygun seçenek 3 saniyede
              hazır.
            </>
          }
        />
      </section>

      {/* Section nav */}
      <section className="container-x pb-10">
        <Reveal>
          <nav
            aria-label="Makale bölümleri"
            className="glass-quiet flex flex-wrap items-center gap-2 px-4 py-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400 mr-1">
              <BookOpen className="inline h-3 w-3 mr-1" />
              Bölümler:
            </span>
            {ARTICLE_SECTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[11px] text-carbon-200 transition hover:border-electric-cyan/30 hover:bg-electric-cyan/[0.05] hover:text-white"
                >
                  <Icon className="h-3 w-3" />
                  {s.title}
                </a>
              );
            })}
          </nav>
        </Reveal>
      </section>

      {/* Interactive recommender */}
      <section className="container-x pb-16">
        <Reveal>
          <RakipRecommender />
        </Reveal>
      </section>

      {/* ARTICLE BODY */}
      <section className="container-x pb-16">
        {/* Motor mimarisi */}
        <Article id="motor-mimarisi" icon={Cpu} title="Motor Mimarisi ve Termodinamik Tasarım">
          <p>
            Maksi-scooter segmentindeki motor tasarımları, mukavemet, ağırlık minimizasyonu ve
            termal verimlilik dengesini kurmak zorundadır. Hangi modelin tek silindirli sport
            spirit motor mimarisinin sahip olduğu CR (sıkıştırma oranı) ve supap zamanlaması
            mühendislik tercihleri açısından birbirinden ayrışmaktadır.
          </p>
          <p>
            Segmentteki modellerin büyük çoğunluğu <strong>Tek Üstten Eksantrik (SOHC)</strong> ve
            silindir kafası başına 4 supaplı bir tasarım benimser. Bu mimari, hareketli parça
            sayısını ve mekanik sürtünme kayıplarını azaltarak yakıt verimliliği ve düşük frekans
            harmoniklerini optimize eder. <strong>Yamaha NMAX 155</strong> modeli, bu hâkim
            tasarımı emiş eksantriği üzerinde düşük ile yüksek devirler arasında segment 360°'lik
            geçişi sağlayan <em>Değişken Supap Zamanlaması (VVA)</em> teknolojisiyle birleştirir;
            sınıfında benzersizdir.
          </p>
          <p>
            Buna karşılık <strong>Suzuki Burgman 400</strong> ve <strong>Honda Forza 250</strong>{" "}
            modelleri Çift Üstten Eksantrik (DOHC) sistemini tercih ederek emiş ve egzoz supap
            zamanlamalarını daha hassas optimize eder. Bu mühendislik tercihi, yüksek silindir
            hacmine (Burgman 400) veya yüksek sıkıştırma oranına (Forza 250) sahip motorlarda
            stabil çalışmayı destekler.
          </p>
          <p>
            <strong>Sıkıştırma oranlarına</strong> bakıldığında: Suzuki Burgman 400 (10.5:1) düşük
            sıkıştırma seçerek vuruntu marjını korur. Yamaha XMAX 250/300 (10.5–10.9:1) atmosferik
            dengesini Blue Core teknolojisiyle harmanlar. Honda Forza 250 (10.7:1) ve özellikle
            Honda PCX 160 (12.0:1) yüksek sıkıştırmayı Bosch elektronik enjeksiyonla birleştirir —
            sınıfın en düşük yakıt tüketimi (2.1 L/100 km) bu tasarımdan gelir. <strong>Zontes 350D/E</strong>{" "}
            modelleri 11.8:1 ile DOHC bloğunda performans odaklı bir mühendislik tercihi yapar.
          </p>
        </Article>

        {/* Süspansiyon */}
        <Article
          id="suspansiyon"
          icon={Wind}
          title="Süspansiyon Karakteristiği ve Konfor Sönümlemesi"
        >
          <p>
            Yamaha XMAX 250/300 şasisi, sportif sürüş dinamiklerini desteklemek üzere oldukça rijit
            tasarlanmıştır. Ön tarafta çift bağlantılı teleskopik çatallar kullanılırken, arka tarafta
            çift amortisörlü ünite yer alır. XMAX'ın süspansiyon sönümleme karakteri oldukça sportif
            ayarlıdır; yüksek hızda stabil ve manevralarda gerçek motosiklet hissini korur, ancak{" "}
            <strong>kötü asfalt yüzeyinde direkt sertlik aktarır</strong>.
          </p>
          <p>
            <strong>Honda Forza 250</strong> ise daha yumuşak bir süspansiyon ayarına sahiptir;
            uzun yolda ve bozuk yol koşullarında konfor avantajı belirgindir. Forza 250'nin asıl
            zayıflığı, kentsel pürüzler için yeterli sertliğe sahip olmamasıdır.{" "}
            <strong>Suzuki Burgman 400</strong> ise ön havalı süspansiyon ile sınıfının en yumuşak
            tasarımına sahiptir; çift kişi otoyol konforunda referans noktasıdır.
          </p>
          <p>
            <strong>Piaggio Beverly 400 S</strong> 16'' jant kombinasyonu sayesinde diğer
            scooterların sahip olmadığı motosiklet seviyesinde yol tutuşu sunar. Honda PCX 160 ve
            Yamaha NMAX 155 hafif gövdeleri sayesinde sönümleme yetersizliğine rağmen kentsel
            kullanımda yorucu hissetmezler.
          </p>
        </Article>

        {/* Ergonomi */}
        <Article id="ergonomi" icon={Ruler} title="Ergonomi, Sele Yüksekliği ve Jant Konfigürasyonu">
          <p>
            Motosikletlerin yer çapları, ağırlık dağılımı ve jant konfigürasyonu sürüş
            karakteristiğini doğrudan etkiler. Bu etkinin temel fiziksel formülü şu şekildedir:
            ergonomik elverişlilik, sürücü için güvenli olarak algılanan sele yüksekliği, motor
            gövdesinin ağırlık merkezinin yüksekliğine doğru orantılıdır.
          </p>
          <p>
            <strong>Burada L (sürücünün ayağı momenti)</strong>, J (sele yüksekliği) ve T (jant
            büyüklüğü) arasındaki tasarım dengesi tüm gövdenin sürüş geometrisini belirler.
            Süspansiyon karakteri ile genelde gerçekleştirir.
          </p>
          <p>
            <strong>Yamaha XMAX 250/300</strong> 795 mm sele yüksekliği ve 15'' ön / 14'' arka jant
            konfigürasyonu sayesinde her boydaki sürücüye hitap eder. <strong>Honda Forza 250</strong>{" "}
            780 mm ile kısa boylu sürücüyü tercih eder, fakat hafif daha küçük selesi konfor
            avantajına dönüşür. <strong>Suzuki Burgman 400</strong> 750 mm sele ile sınıfının
            en erişilebilir maxi-scooteridir — 215 kg gövdesine rağmen düşük selesi ergonomik
            avantaj sağlar.
          </p>
          <p>
            <strong>Yamaha NMAX 155</strong> (765 mm) ve <strong>Honda PCX 160</strong> (764 mm)
            hem hafif gövde hem de düşük sele kombinasyonu sayesinde yeni sürücülere ideal başlangıç
            noktasıdır. <strong>Piaggio Beverly 400 S</strong> ve <strong>Kymco Downtown 250i</strong>{" "}
            810 mm sele ile uzun boylu sürücülere yöneliktir.
          </p>
        </Article>

        {/* Depolama */}
        <Article
          id="depolama"
          icon={Briefcase}
          title="Pratiklik, Depolama Kapasitesi ve Menzil Analizi"
        >
          <p>
            Maksi-scooter segmentinde kullanılabilir sele altı bagaj hacmi ve yakıt deposu kapasitesi
            sürücünün sahiplik tatmininde doğrudan rol oynar. Depolama hacmi ve yakıt tüketimi
            seyahat planlamasında belirleyici iki parametredir.
          </p>
          <p>
            <strong>Sele altı kapasiteleri:</strong> Suzuki Burgman 400 sınıfın lideri (60 L) — iki
            tam boy kask. Kymco Downtown 250i (50 L) ve Honda Forza 250 (48 L) kapalı kask alabilen
            tasarımıyla seyahat alıcısı için ideal. Yamaha XMAX 250/300 (45 L) kapalı kask + ek
            ekipman alabilir. Yamaha NMAX 155 (23 L) ve Honda PCX 160 (30 L) yarım kask sınırında.
            Vespa GTS 300 HPE (16 L) sadece yarım kask alır — pratiklik öncelikli değildir.
          </p>
          <p>
            <strong>Yakıt tüketimi & menzil:</strong> Honda PCX 160 (2.1–2.5 L/100 km, 8.1 L tank) →
            ~340 km menzil. Yamaha NMAX 155 (2.2–2.6, 7.1 L) → ~290 km. Yamaha XMAX 250 (3.3–3.8,
            13 L) → ~380 km. Yamaha XMAX 300 (3.2–3.5, 13 L) → ~390 km. Honda Forza 250 (3.5–4.0,
            11 L) → ~290 km. Zontes 350E (3.6–4.1, 16 L tank) → en yüksek menzil olan ~430 km.
          </p>
        </Article>

        {/* Elektronik */}
        <Article id="elektronik" icon={ShieldCheck} title="Güvenlik Elektronikleri (ABS ve TCS)">
          <p>
            Gelişen motosiklet teknolojisi, maksi-scooter segmentinde güvenlik ve bağlanabilirlik
            donanımlarını standart hâle getirmiştir. Pazar genelindeki tüm modellerde Çift Kanallı
            ABS standart sunulurken, TCS (Traksiyon Kontrol Sistemi) varlığı segment-içi farklılık
            yaratan en önemli faktörlerden biridir.
          </p>
          <p>
            <strong>HSTC (Honda)</strong> ve <strong>ASR (Piaggio/Vespa)</strong> markaya özel
            traksiyon kontrol sistemleridir. Honda Forza 250'nin HSTC sistemi çoklu kademe (Off/1/2)
            ayarı sunar — yağışlı zemin için belirgin avantaj. Yamaha XMAX 250/300 TCS standart
            ancak tek kademedir.
          </p>
          <p>
            <strong>Gösterge panelleri</strong> başlığında Yamaha XMAX 2023+ (Gen 5) modellerinde
            tam TFT, eğlence + navigasyon çift ekran sunar. Forza 250 2025 modeli renkli TFT'ye
            geçer. Zontes 350D/E donanım listesinde elektrikli cam, ısıtmalı elcik ve gidon dahil
            tam paket sunar — sınıfın en zengin donanımı.
          </p>
        </Article>

        {/* Pazar */}
        <Article
          id="pazar"
          icon={TrendingDown}
          title="Türkiye Pazarı: Fiyatlama, Değer Kaybı ve Karaborsa"
        >
          <p>
            Türkiye motosiklet pazarı, yüksek enflasyon, döviz kuru dalgalanmaları ve değer kaybı
            kendine has dinamiklere sahiptir. Bu durum, motosikletlerin ikinci el değer kaybı,
            stoğun bulunması ve karaborsa fiyatlandırması üzerinde belirleyici etkiler gösterir.
          </p>
          <p>
            <strong>Yamaha XMAX 250/300</strong>, Türkiye'de uzun yıllardır yüksek popülerite
            nedeniyle "karaborsa" mantığıyla satılmaktadır. Yetkili bayilerde 6–12 aylık liste
            fiyatından üstüne ek bayi karı (galerici) talep edilir; Yamaha gibi binişin tamamı
            tüketimine ile pazarın direnişi yaratır. Bu durum, motosikletin ilk birinci elden
            başlayarak ikinci el piyasasında değer kaybını yumuşatır.
          </p>
          <p>
            <strong>Honda Forza 250</strong>, 4–5 model orijinal akıllı arka çantasıyla (Smart Bag)
            birlikte paket satılır, fakat fiyatlaması karşısında pratiklik dezavantajları kullanıcı
            yorumlarında çıkar. Vespa GTS 300 ise döviz endeksli, en güvenilir alıcılarla
            ilgilenmektedir. <strong>Kymco Downtown 250i</strong> ve <strong>SYM Joymax 250</strong>{" "}
            Japon rakiplerin altında bir fiyat noktasına yerleşir; ikinci el değerleri marka
            algısının zayıflığı nedeniyle düşüktür ve ortalama 4–6 ay arası ilan süresinde satılır.
          </p>
        </Article>

        {/* Forza sorunları */}
        <Article
          id="forza-sorunlari"
          icon={AlertTriangle}
          title="Honda Forza 250'nin Kronik Mekanik Sorunları"
        >
          <p>
            Türkiye'de çok satan rakiplerden olan Honda Forza 250, kullanıcı geri bildirimleri ve
            servis kayıtlarına göre belirli kronik sorunlar barındırır. Forza 250'nin{" "}
            <strong>Kalkışta Debriyaj Titremesi ve Silkeleme (Clutch Shudder)</strong> şikayeti
            sahiplerin çoğunda, özellikle düşük trafikte rüzgar ortaya çıkar.
          </p>
          <p>
            Forza 250, sürtünme balatasının (shoe) aşınmasına, ortaya çıkan organik balata tozu
            kapalı varyatör kutusunun iç yüzeyinde re-balata pabuçlarına camlaşma (glazed) silkeleme
            örneği yaratır. Bu durum, sürtünme katsayısının (μ) karasız hale gelmesine yol açar.
            Kalkış anında debriyaj balatası cam-sertleşmesi yapamadığında, sürücü hissedilebilir{" "}
            <em>düşük rezonans/silkme</em> sürüş döngüsüne maruz kalır.
          </p>
          <p>
            <strong>Mühendislik çözümleri:</strong> Varyatör ve Debriyaj Temizliği (her 3.000–5.000
            km periyotlarda iç balata pabuçları açılarak basınçlı hava ile sökülmeli, balata camı
            ve disk yüzeyleri kompresörle sökülmesi). Orijinal Aftermarket Tork ve Debriyaj Yay
            Değişimi: Aftermarket dayanıklı parça kullanımı (örnek Malossi) entegre edilirse,
            debriyaj pabuçlarının daha az aşınması ve titremeyi azaltır. Performans Bağası ve Tork
            Değişimi: Orijinal elastiklik bağaların yerine asimetrik yapılı J. Costa veya Polini
            16 gramlık varyatör reçeteleri sürünüş kayma yumuşatır ve titreyi azaltır.
          </p>
          <p>
            Diğer şikayetler: <strong>Gidon sallama / "shimming"</strong> 40–70 km/h hızlarda
            seyrederken sürücü elinden gidonun hafifçe çekildiğine veya geveşliğine ön tekerleğin
            hızla soğa olduktan sonra yaşaması durumudur. <strong>Mekanik analiz:</strong>{" "}
            Çoğunlukla agresif kısmi arka aks üzerindeki Forza 250 ya arka jantını şekil
            değişimiyle birlikte rezonansa giriyor; lastik aşınması düzleşmiş, basıncı bozuk veya
            şişme süspansiyon konumu boz olduğunda da ağırlaşıyor.
          </p>
          <p>
            <strong>Forza 250'nin gerçek bir reka 'sızı vs masa mesafesi (Preload):</strong> Ayar,
            kapasiteye göre yüksek normal ön sürücü ve sertlik kapasitesi servet aşar ve fizikçe
            artırılarak güçlendirmiş motorlardan. Bu çekme arttıkça basıncın düşmesi rezonansını
            kolaylaştırır. Lastik basıncı standartların altında ise (örn. arka 28 psi yerine 33 psi
            tavsiyesi), salınımın da artma olasılığı dramatik şekilde yükselir.
          </p>
        </Article>

        {/* Kullanıcı profilleri */}
        <Article
          id="kullanici-profilleri"
          icon={Users}
          title="Kullanıcı Segmentasyonu ve Stratejik Tercih Rehberi"
        >
          <p>
            Motosiklet alım kararının teknik bileşenler değil, kullanıcının coğrafyası ve
            önceliklerine bağlı değişkenler tanımlar. Aşağıdaki 6 farklı sürücü profili, PDF
            kaynağındaki segmentasyon analizinden derlenmiştir.
          </p>

          <div className="grid gap-4 pt-2 md:grid-cols-2">
            {PROFILES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.04}>
                <div className="glass-quiet h-full p-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-cyan">
                    Profil 0{i + 1}
                  </div>
                  <h3 className="mt-2 h-display text-lg font-semibold text-white">
                    {p.title}
                  </h3>
                  <div className="mt-1 text-[11px] text-carbon-400">{p.short}</div>
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-yamaha-500/30 bg-yamaha-500/10 px-3 py-1 text-[11px] font-semibold text-yamaha-100">
                    <ArrowRight className="h-3 w-3" />
                    {p.pick}
                  </div>
                  <p className="mt-3 text-[12px] leading-relaxed text-carbon-200">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Article>
      </section>

      {/* Comparison matrix */}
      <section className="container-x pb-20">
        <Reveal>
          <div className="mb-6">
            <span className="chip">Tam karşılaştırma matrisi</span>
            <h2 className="mt-3 h-display text-2xl font-semibold text-white sm:text-3xl">
              13 model · 9 kriter — sıralanabilir tablo.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-carbon-300">
              Sütun başlığına tıklayarak teknik kriter bazında sıralayabilirsin. Mobilde model
              başına kart görünümüne döner. Yamaha XMAX satırları altın yatak ile vurgulanır.
            </p>
          </div>
          <RakipComparisonMatrix />
        </Reveal>
      </section>

      {/* Citations */}
      <section className="container-x pb-24">
        <Reveal>
          <div className="glass p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Quote className="h-5 w-5 text-electric-cyan" />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400">
                  Kaynaklar
                </div>
                <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
                  Alıntılanan Çalışmalar
                </h2>
              </div>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-carbon-300">
              Bu makaledeki teknik veriler, marka teknik bültenleri, bağımsız test yayınları, kullanıcı
              forumları ve servis kayıtlarından derlenmiştir. Toplam {CITATIONS.length} kaynak referans
              alınmıştır.
            </p>

            <ol className="mt-6 grid gap-2 sm:grid-cols-2">
              {CITATIONS.map((c) => (
                <li
                  key={c.id}
                  className="flex items-start gap-2.5 rounded-xl border border-white/[0.04] bg-white/[0.015] p-3 text-[11px] leading-snug transition hover:border-electric-cyan/20 hover:bg-electric-cyan/[0.025]"
                >
                  <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[9px] font-semibold text-carbon-200">
                    {String(c.id).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-carbon-400">
                      {c.source}
                    </div>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="block text-carbon-100 underline decoration-white/10 underline-offset-2 transition hover:text-white hover:decoration-electric-cyan break-words"
                    >
                      {c.title}
                    </a>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      {/* Outro CTA */}
      <section className="container-x pb-20">
        <Reveal>
          <Link
            href="/satin-alma-rehberi"
            className="group flex flex-col gap-4 rounded-3xl border border-electric-cyan/25 bg-gradient-to-br from-electric-cyan/12 via-electric-cyan/5 to-transparent p-7 transition hover:-translate-y-0.5 hover:border-electric-cyan/60 hover:shadow-ambient-blue md:flex-row md:items-center md:justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-electric-cyan/30 bg-electric-cyan/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-electric-cyan">
                Bir sonraki adım
              </div>
              <h3 className="mt-3 h-display text-xl font-semibold text-white sm:text-2xl">
                XMAX'a karar verdin mi? Satın alma rehberine geç.
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-carbon-200">
                Hangi jenerasyon (250 / 300 / 400), sıfır mı 2.el mi, hangi yıl — 2 soruluk
                eşleyiciden geçtikten sonra 50 maddelik tam ekspertiz protokolüne ulaş.
              </p>
            </div>
            <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-electric-cyan/40 bg-electric-cyan/10 px-5 py-3 text-sm font-semibold text-white transition group-hover:gap-3">
              Satın Alma Rehberi
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </div>
          </Link>
        </Reveal>
      </section>
    </>
  );
}

function Article({
  id,
  icon: Icon,
  title,
  children
}: {
  id: string;
  icon: typeof Cpu;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <article id={id} className="scroll-mt-24 border-b border-white/[0.05] py-10 first:pt-0 last:border-b-0">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl border border-electric-cyan/20 bg-electric-cyan/[0.05] text-electric-cyan">
            <Icon className="h-4 w-4" />
          </span>
          <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
            {title}
          </h2>
        </div>
        <div className="mt-5 max-w-3xl space-y-4 text-[15px] leading-relaxed text-carbon-200 [&_strong]:font-semibold [&_strong]:text-white [&_em]:not-italic [&_em]:text-electric-ice">
          {children}
        </div>
      </article>
    </Reveal>
  );
}
