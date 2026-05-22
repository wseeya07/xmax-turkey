# XMAX Türkiye — Gemini Derin Araştırma Promptları

> Bu dosya, **xmaxturkiye.com** için Gemini Deep Research ile üretilecek makalelerin
> hazır promptlarını barındırır. Her prompt **Türkçe çıktı**, **Yamaha XMAX 250 / 300
> (2017+ ve 2023+ jenerasyonları)**, **Türkiye pazarı** ve **sürücü/sahibi perspektifi**
> bağlamı üzerine kuruludur.
>
> Kullanım: Aşağıdaki bloklardan birini olduğu gibi kopyala → Gemini'da "Deep Research"
> modunu aç → çıktıyı alıp ilgili site bölümüne (bilgi / nasıl-yapılır / performans /
> aksesuar) uyarla.
>
> Çıktı formatı isteği — **her promptta** şunları talep ediyoruz: başlık + alt
> başlıklar, karşılaştırma tabloları, parça numaraları/tork değerleri (varsa),
> kaynak listesi (link), TR mevzuatına uygunluk notu, "kırmızı bayraklar" listesi.

---

## İçindekiler

1. [Bakım ve sıvılar](#1-bakım-ve-sıvılar)
2. [Varyatör ve aktarma](#2-varyatör-ve-aktarma)
3. [Motor ve performans](#3-motor-ve-performans)
4. [Fren sistemi](#4-fren-sistemi)
5. [Elektrik ve elektronik](#5-elektrik-ve-elektronik)
6. [Lastik ve süspansiyon](#6-lastik-ve-süspansiyon)
7. [Aksesuar ve kurulum](#7-aksesuar-ve-kurulum)
8. [Egzoz, emiş ve ses](#8-egzoz-emiş-ve-ses)
9. [Sürüş ve teknik](#9-sürüş-ve-teknik)
10. [Satın alma, 2.el ve değer](#10-satın-alma-2el-ve-değer)
11. [Karşılaştırmalar (rakipler ve içsel)](#11-karşılaştırmalar-rakipler-ve-içsel)
12. [Türkiye'ye özel: mevzuat, sigorta, servis ağı](#12-türkiyeye-özel-mevzuat-sigorta-servis-ağı)
13. [Arıza, tanı ve hata kodları](#13-arıza-tanı-ve-hata-kodları)
14. [Sürücü ekipmanı](#14-sürücü-ekipmanı)
15. [Kış / yaz / uzun yol senaryoları](#15-kış--yaz--uzun-yol-senaryoları)
16. [Kurye, mototaksi, ticari kullanım](#16-kurye-mototaksi-ticari-kullanım)
17. [İleri seviye: ECU, tuning, yarış hazırlığı](#17-ileri-seviye-ecu-tuning-yarış-hazırlığı)

---

## 1. Bakım ve sıvılar

### 1.1 Motor yağı — marka ve viskozite karşılaştırması
```
Yamaha XMAX 250 ve 300 (2017+ jenerasyon, EU3/EU4/EU5) için motor yağı seçimini
derinlemesine araştır. Şunları kapsa:
- Yamalube 4S 10W-40, Motul 5100 10W-40, Motul 7100 10W-40, Castrol Power 1 4T,
  Liqui Moly Motorbike 4T, Repsol Moto 4T, Petronas Sprinta F900 markalarının
  laboratuvar testleri, JASO MA2 sertifikası, API SL/SM sınıfı.
- Mineral / yarı sentetik / tam sentetik fark; XMAX'ın ıslak debriyajı için JASO
  MA2 zorunluluğu.
- Türkiye iklim koşullarında (yaz +40 °C, kış -5 °C) viskozite önerisi.
- Türkiye fiyat aralıkları (2025/2026), 4 L'lik kova ekonomisi.
- Yağ değişim aralığı (km / ay), filtre numarası (5GH-13440-50).
- Yağ tüketimi belirtileri; çubukta "min-max" arası doğru okuma yöntemi.
Çıktı: karşılaştırma tablosu + öneri matrisi (şehir içi / uzun yol / yarış kullanımı).
Kaynak listesi: Yamaha resmi servis bülteni, üretici teknik dokümanları, forum
gerçek-dünya gözlemleri (ScooterUnderground, ADVrider, XMAX Forum).
```

### 1.2 Sıvı kapasiteleri tablosu — tek sayfa referans
```
Yamaha XMAX 250 (2017-2022) ve XMAX 300 (2017-2022 ile 2023+ yeni nesil) için
TÜM servis sıvılarının tam listesini hazırla:
- Motor yağı (yağ değişimi vs yağ + filtre değişimi miktarları ayrı)
- Final dişli (transmisyon) yağı
- Soğutma sıvısı / antifriz
- Ön ve arka fren hidroliği
- Yakıt deposu kapasitesi + rezerv
- Cam yıkama sıvısı (varsa)
Her sıvı için: kapasite (litre/ml), önerilen ürün + Yamaha part no, muadiller,
değişim periyodu (km/yıl). Türkçe terimlerle ve metrik birimle.
Sonunda: tek bakışta görülecek bir "garaj duvarı" özet tablosu üret.
```

### 1.3 Tork tablosu — kademeli ve görsel
```
XMAX 250/300 üzerindeki tüm kritik cıvata torkları için kapsamlı bir tablo
hazırla. Bölgelere göre grupla:
- Motor: silindir kapağı, krank somunu, balata, kam zinciri gergi.
- Varyatör: birincil kasnak somunu, ikincil kasnak, kapak cıvataları.
- Aks ve süspansiyon: ön aks, arka aks, amortisör bağlantıları.
- Fren: kaliper, disk cıvataları, master silindir.
- Egzoz: manifold, susturucu, ısı kalkanı.
- Şasi: motor takozları, ayak komutu, gidon.
Her cıvata için: Nm değeri, sırası/sıkma sırası (varsa), tek-kullanımlık mı,
loctite gerekiyor mu, tipik hata (overtorque belirtileri).
Çıktıyı PDF/baskıya uygun, garaja asılacak tek sayfaya sığacak şekilde organize et.
```

### 1.4 Buji seçimi ve değişim aralığı
```
XMAX 250/300 için buji konusunu kapsamlı araştır:
- Orijinal NGK LMAR8A-9 ve muadilleri (Denso, Bosch).
- Iridyum upgrade (NGK Iridium IX LMAR8AIX-9): performans iddiaları ve gerçek dünya
  testleri.
- Elektrot aralığı 0.7 mm — neden bu kadar dar, ne zaman ayarlanır, ne ile ölçülür.
- Buji okuma: renkten karışım/yağ yanması nasıl anlaşılır (fotoğraf rehberi
  beklentisi).
- Değişim aralığı (km), söküm sırası, tork (12 Nm), zorlu durumda söküm
  (kırılan buji çıkartma teknikleri).
- 2023+ Connected modelde TPS kapama prosedürü gerekiyor mu?
```

### 1.5 Hava filtresi: orijinal, K&N, sünger
```
XMAX 250/300 hava filtresi (orijinal B74-E5407-00) üzerine derinlemesine:
- Orijinal vs K&N performance air filter (yıkanabilir) vs aftermarket sünger
  (Polini, Malossi) karşılaştırması: hava akışı (CFM), filtreleme kalitesi,
  bakım sıklığı.
- ECU ile uyumluluk — modifiye edilmiş filtre ile fuel trim sapması.
- Türkiye tozlu/şehir koşullarında öneri.
- Adım adım söküm/temizlik rehberi (fotoğrafsız ama detaylı), tork değerleri.
- Yıkanabilir filtre temizleme kiti (K&N Recharger): adım adım, kuruma süresi.
- Filtre tıkanma belirtileri: yakıt sarfiyatı artışı, üst devir kaybı, yarım gaz
  tepkisizliği.
```

### 1.6 Final dişli yağı — neden ihmal edilmemeli
```
XMAX final transmisyon yağı (transmission/gear oil) hakkında detaylı yazı:
- Neden ayrı bir yağ (motor yağından bağımsız reduktör)?
- Kapasite: 0.25 L, ürün: Yamalube Final Gear 80W veya GL-4 80W-90 muadili.
- Değişim periyodu: ilk 1000 km, sonra her 20.000 km — bu neden bu kadar uzun?
- Değişim adımları: drain bolt + fill bolt yerleri, tork (gerekirse boltlar için
  ayrı), kontrol bolt'u ile seviye okuma.
- Yağın kararması/yanık kokusu ne anlama gelir? Metalik parça tortusu = rulman
  hasarı erken belirtisi.
- Aşırı doldurma riski: keçe (seal) basıncı + kaçak.
```

---

## 2. Varyatör ve aktarma

### 2.1 Slider ağırlığı (baga gramajı) tam rehberi
```
XMAX 250 ve 300 için varyatör baga (roller weight) gramajı seçimini araştır:
- Orijinal gram: 250'de X g, 300'de Y g (kesin değer + Yamaha part no).
- Daha hafif baga (örn. 13g, 14g) → daha yüksek devir, daha güçlü ivmelenme,
  düşük üst hız.
- Daha ağır baga (örn. 18g, 20g) → düşük devir, yakıt ekonomisi, üst hızda
  daha rahat seyir.
- Polini, Malossi, Dr Pulley, Naraku marka karşılaştırması; Dr Pulley'in
  "sliding roller" (yarım yuvarlak) tasarımının avantajı.
- Kullanım profiline göre matris: şehir içi, uzun yol, çift kişi, dağ/eğim,
  pist günü.
- Karışık set (mixed roller setup) mantığı — ne zaman işe yarar, ne zaman
  varyatörü titretir.
- Slider değişim adımları + tork (24 mm somun, 95 Nm) + tutucu aparat
  alternatifleri.
```

### 2.2 Kayış (drive belt) — değişim ve aşınma okuma
```
XMAX 250/300 drive belt (V-belt) tam rehberi:
- Orijinal part: 1DK-E7641-00 (250) / B74-E7641-00 (300) — modele göre ayır.
- Servis ömrü: km bazında üretici tavsiyesi vs gerçek dünya.
- Aşınma belirtileri: yan yüzey çatlağı, lif kopması, genişlik daralması
  (servis limiti ≈ 22.0 mm, kesin değer üretici manualı).
- Şüphe = değişim mantığı: kayış pist üzerinde kopması durumunda hasar (kapak,
  kasnak yüzeyi).
- Muadil kayış (Bando, Mitsuboshi, Gates, Malossi Kevlar) karşılaştırması:
  fiyat, ömür, performans.
- Kayış değişiminde dikkat: kayış yönü (ok işareti), kasnak yüzey temizliği,
  baga ve slider'ı birlikte değiştirme önerisi.
- "Kayış kayma" sesi vs gerçek kopma — ayrım nasıl yapılır.
```

### 2.3 İkincil kasnak (torque driver) ve contrast spring
```
XMAX varyatörünün arka kısmı — ikincil kasnak (clutch bell + torque driver)
ve contrast spring üzerine teknik rehber:
- Mekanizma nasıl çalışır: kayma noktası, debriyaj balatasının açılma devri.
- Contrast spring değişimi (Malossi MHR, Polini Evolution) → kalkış devrinin
  yükselmesi, ivmelenmenin artması ama balata aşınmasının hızlanması.
- Torque driver (rampa) eğrisinin etkisi.
- Debriyaj balatası kalınlığı min. 1.0 mm — ölçüm yöntemi, set halinde değişim.
- Clutch bell yüzey bozulması (hot spot, mavi renk) — neden ve çözüm.
- "Kalkışta sarsıntı" şikayetinin teşhis ağacı.
```

### 2.4 Slider kanalı yağlama: ne ile, ne kadar?
```
XMAX varyatör slider kanalı (slide rail, guide pin) yağlama:
- Bagaların hareket ettiği kanal: kuru mu olmalı, gres mi sürülmeli?
- Yamaha resmi servis bülteni ne diyor (yüksek sıcaklığa dayanıklı moly gres,
  Polini varyatör gresi, vs).
- Hatalı yağlama: kayışa gres bulaşma → ani kayma, varyatör performansı kaybı.
- Slider plastiğinin (Teflon kaplama) zarar görmemesi için kimyasal uyumluluk.
- Yağlama aralığı: her varyatör bakımında mı, yoksa belirli km'de mi.
```

### 2.5 Varyatör titreşimi ve "tek-bandda kayma" teşhisi
```
XMAX kullanıcılarının en yaygın varyatör şikayetleri için teşhis rehberi:
- 60-80 km/h arası titreşim → baga aşınması mı, kayış yıpranması mı, slider
  düzensizliği mi?
- Gaz keserken "boşa düşme" hissi → torque driver yatak aşınması.
- Kalkışta uğultu/inleme sesi → contrast spring yorgunluğu vs balata.
- Üst hızda sınır (örn. 110 km/h'de tıkanma) → baga gramajı yüksek mi, kayış
  geniş mi.
Her semptom için: "önce bunu kontrol et" sırasıyla teşhis akışı, ortalama
parça maliyeti (TL, 2026 fiyatlarıyla yaklaşık).
```

---

## 3. Motor ve performans

### 3.1 Big bore kit — XMAX 250 → 300 dönüşümü?
```
XMAX 250 motorunu büyütme (big bore / silindir genişletme) konusunda kapsamlı:
- Mekanik fizibilite: aynı blok mu, krank/biyel uyumluluğu, soğutma yeterli mi.
- Malossi, Polini, Athena 286/300/330 cc kitleri — gerçek dünya ölçümleri (hp/Nm).
- DiASil silindir teknolojisi: kit kullanımında orijinal silindiri rektifiye mi
  yoksa komple silindir bloku mu.
- Türkiye'de motor hacmi değişiminin trafik mevzuatı sonuçları (tescil iptali,
  sigorta geçersizliği).
- Maliyet: parça + işçilik + ECU adaptasyonu — toplam yatırım.
- "Yapma" senaryoları: garanti süresi içinde, günlük kullanım aracında, ehliyet
  A2 sahibi sürücüde.
```

### 3.2 Stage 1 / Stage 2 / Stage 3 — performans modifikasyon piramidi
```
XMAX 250/300 için modifikasyon seviyelerini piramit halinde sunan rehber:
- Stage 0: doğru bakım + buji + hava filtresi (kayıp gücün geri kazanımı).
- Stage 1: ECU flash (Malossi Force Master), açık hava filtresi, daha hafif baga.
- Stage 2: kam mili (Malossi MHR / Polini Evolution), büyük emiş yolu, sport
  egzoz.
- Stage 3: big bore + ECU tam tune + yarış varyatörü + güçlendirilmiş debriyaj.
Her seviye için: hp kazancı (rakamsal), yakıt sarfiyatı etkisi, ömür/güvenilirlik
etkisi, Türkiye tipik fiyat aralığı, "gerçek farkı hisseder misiniz" değerlendirmesi.
Stage tablosu format: kaynak XMAX Motor Modifikasyon Raporu PDF'i ile uyumlu.
```

### 3.3 Kam mili (camshaft) modifikasyonu
```
XMAX kam mili değişimini deeply araştır:
- Orijinal kam mili profili (lift mm, duration °) — XMAX 250 ve 300 ayrı.
- Malossi MHR ve Polini Evolution kam millerinin profili ve karakteri.
- "Kazanılan" güç bandı: alt mı üst mı kayıyor?
- ECU adaptasyonu zorunluluğu (kam değişimi sonrası fuel/ignition map).
- Subap ve subap yayı yükseltme gereksinimi (rev limiti).
- Klepens (valve clearance) ayar değerleri ve değişim sonrası kontrol periyodu.
- Çiğneme (lobe wear) belirtileri: tıkırtı sesi, kompresyon kaybı.
```

### 3.4 Karbon birikimi ve enjektör temizliği
```
XMAX motorunda karbon birikimi (carbon buildup) ve yakıt sisteminin temizlenmesi:
- EU3/EU4/EU5 fark: EGR olmayan motorlar daha az karbon mı biriktirir?
- Belirtiler: rölantide titreme, gaz tepki gecikmesi, kompresyon düşüşü.
- Self-service yöntemler: Liqui Moly Pro-Line Throttle Body Cleaner, BG44K
  yakıt katkısı, CRC Fuel System Cleaner.
- Walnut blasting (ceviz kabuğu kumlama) gerekiyor mu — direkt enjeksiyon
  olmayan motorda anlam ifade ediyor mu?
- Enjektör akış testi: bayide ultrasonik temizlik hangi kilometrede mantıklı.
- "Yakıt katkısı her depoya" inancı: gerçek mi efsane mi.
```

### 3.5 Soğutma sistemi: termostat, su pompası, fan
```
XMAX soğutma sistemi tam teşhis ve servis rehberi:
- Termostat çalışma sıcaklığı (açılma derecesi) + arıza belirtileri (motor geç
  ısınma / aşırı ısınma).
- Su pompası rulman/keçe ömrü — sızdırma noktasının (weep hole) konumu ve
  yorumu.
- Fan rölesi ve fan motoru testi (multimetre).
- Radyatör peteğinin tıkanması (böcek/toz) — basınçlı yıkama doğru mu?
- Genleşme deposu (expansion tank) seviyesinin sürekli düşmesi: nereden kaybediyor?
- Aşırı ısınma uyarısı (LCD'de termometre ikonu) → ne yapmalı, nerede durmalı,
  nasıl serinletmeli.
- Sistemden hava alma: kapağı açık çalıştırma süresi, gaz vererek hava
  cebini boşaltma.
```

### 3.6 Yağ tüketimi normalde ne kadar? Ne zaman alarm vermeli?
```
"XMAX yağ yiyor" şikayetinin objektif değerlendirilmesi:
- Yamaha resmi tolerans (1000 km'de X ml).
- Hangi yaş/km'de yağ tüketiminin "normalin üstüne" çıkması beklenir.
- Sebepler: piston segman yorgunluğu, supap lastiği (valve stem seal), PCV
  sistemi.
- Tanı testleri: kompresyon (cold/warm), kuru/yaş kompresyon farkı, leakdown
  testi, buji izi.
- Yağ üst sınır işaretine yakın doldurma → karter basıncı + PCV hortumundan
  emiş manifolduna yağ kaçması.
- Onarım eşiği: rektifiye / yağ keçesi / topyekun motor revizyonu.
```

---

## 4. Fren sistemi

### 4.1 Fren balata türleri: orijinal vs sinter vs organik
```
XMAX 250/300 ön ve arka fren balatası seçimi:
- Yamaha orijinal balatası (semi-metallic) — kompozisyon, ısıl davranış.
- EBC SFA, EBC FA serisi (organic / semi-sinter), Brembo Z04/SP, Galfer.
- Sinter (metal kaplama) → disk aşındırma artışı, sıcakta üstün performans.
- Organik → düşük gürültü, soğukta iyi ısırma, disk ömrü uzun.
- Türkiye iklim/şehir koşulu önerisi (yaz sıcağında sinter, kış nemli şehirde
  organik?).
- Balata yatırma (bedding-in) prosedürü — yeni balata ilk 200 km.
- Tıslama/gıcırtı şikayetlerinin (squeal) çözüm matrisi: shim, copper grease,
  pad chamfer.
```

### 4.2 Fren diski yükseltme: havalandırmalı, dalgalı, çelik braided
```
XMAX fren diski upgrade rehberi:
- Orijinal disk çap (267 mm ön, 245 mm arka) ve kalınlığı; servis limiti.
- Wave (dalgalı) disk: gerçekten serinletiyor mu, soğutma + ısı transferi
  iddiaları.
- Galfer, NG, Brembo Serie Oro, Sunstar disk markaları — fiyat/performans.
- Braided çelik fren hortumu (Goodridge, HEL, Galfer) — ABS uyumlu modeller,
  pedal hissi farkı.
- ABS sensörü ile uyum: disk diş sayısı / dalgalı disk → hata kodu riski?
- Disk değişimi: cıvata tork, loctite, yeni balata zorunluluğu.
```

### 4.3 Fren hidroliği: DOT 4 vs DOT 5.1, kaynama noktaları
```
XMAX fren hidroliği rehberi:
- Yamaha tavsiyesi: DOT 4. Neden DOT 5 (silikon) kullanılmaz (ABS uyumsuzluk).
- DOT 4 vs DOT 5.1 fark: kaynama noktası (dry/wet), viskozite, nem emme hızı.
- Marka önerisi: Castrol React SRF, Motul RBF 600, Brembo HTC 64T, Bosch ESI 6.
- Değişim periyodu: 2 yıl veya 20.000 km. Nem nedeni: higroskopik özellik.
- Adım adım bleeding (hava alma) — ABS modellerde özel sıra var mı?
- "Pedal yumuşadı" → kaçak mı, hava mı, hidrolik mi kaynamış (sıcak iniş
  sonrası).
```

### 4.4 ABS ve TCS sistemlerinin teşhisi
```
XMAX ABS ve TCS (traction control) sistemleri:
- Hangi modeller hangi yıldan itibaren ABS / TCS standart (250 vs 300, EU vs
  TR pazarı).
- Sensör konumu (tone wheel, hall sensor), açıklık ayarı.
- "ABS ışığı yanıyor" sebepleri: sensör pisliği, kablo kopuğu, hub bearing,
  ECU resmi.
- Diagnostic tool: OBD-II adaptör (Yamaha 6 pinli özel konnektör), Y-Connect
  app diagnostik kapasitesi.
- TCS kapatma — ne zaman gerekir (toprak yol, drift egzersizi, dyno).
- Acil durum: ABS arızasıyla sürüş güvenli mi?
```

### 4.5 Fren kaliper bakım ve revizyon
```
XMAX ön ve arka kaliper sökme/temizlik/revizyon:
- Kaliper piston sayısı (250 vs 300, eski vs yeni nesil).
- Piston temizliği: balatayı çıkarmadan dış çevre temizliği, piston kit ile
  iç tam revizyon.
- Dust seal ve fluid seal değişimi — ne sıklıkta?
- Kaliper boyama (cilalama amacıyla): ısıya dayanıklı boya, prep yöntemi.
- Kayan pim (slide pin) gres tipi (yüksek sıcaklık, silikon bazlı).
- Frenleme sonrası "diskten ısı buharı" → normal mi anormal mi.
- "Frenleme sonrasında çekme" → piston sıkışması; bedava düzeltme yöntemi.
```

---

## 5. Elektrik ve elektronik

### 5.1 Akü seçimi ve kış bakımı
```
XMAX 250/300 akü tam rehberi:
- Orijinal akü: YTZ7V (Yuasa) — voltaj, kapasite (Ah), CCA değeri.
- Muadiller: Varta YTZ7-BS, Banner, Topla, Türkiye'de bulunurluk + fiyat.
- AGM vs Gel vs Lithium (LiFePO4) — Shorai, Aliant karşılaştırması.
- Kış aylarında akü saklama: kontak ayırma, akıllı şarj cihazı (CTEK MXS 5.0,
  NOCO Genius 1).
- Voltaj okumaları: dinlenme 12.6V, çalışırken 13.8-14.4V — bunun altında ne
  arıza.
- Alternatör (regülatör) testi: röle alanı.
- Akü gözleminden marş demoraj testi: 5 saniyede düşen voltaj.
```

### 5.2 LED far yükseltme — DRL, hi/lo, sis farı
```
XMAX 250/300 far sistemi LED dönüşümü:
- Orijinal far tipi (halojen H7, halojen H4, factory LED) — model yıllarına göre
  ayır.
- Plug-and-play LED ampul: Philips X-Treme Ultinon LED Gen2, Osram Night Breaker
  LED, Cree XHP70 modülleri.
- Lümen değerleri ve gerçek dünya etkisi (lümen ≠ kullanılabilir yol aydınlatma).
- CAN-Bus uyumluluk + flicker problemi.
- TR mevzuat: tip onaylı (E-mark) ampul zorunluluğu, muayene geçmesi.
- DRL eklemek (gündüz farı): röle + sigorta + bağlantı şeması.
- Sis farı kiti: LED bar veya çift küresel sis farı, montaj noktası, kablolama.
```

### 5.3 Y-Connect uygulaması ve Smart Key
```
2023+ XMAX Connected model için Y-Connect ekosistemi:
- Telefon eşleştirme adımları, BlueTooth versiyonu.
- Sunulan veriler: yakıt sarfiyatı, son park yeri (GPS), bildirim aynalama,
  bakım hatırlatma.
- Sürekli bağlı kalma akü tüketimi (parazitik yük).
- Eski model XMAX'a Y-Connect modülü retrofit mümkün mü?
- Smart Key sistemi: anahtar pili (CR2032), pil değişim, anahtarsız çalıştırma,
  acil yedek anahtar.
- Anahtar kaybı: yeni anahtar kodlama ücreti ve süresi (Türkiye servisi).
```

### 5.4 USB / cep telefonu şarjı kurulumu
```
XMAX 250/300 için USB şarj soketi ekleme:
- Orijinal aksesuar USB (gidon altı) — model uyumluluğu, fiyat.
- Aftermarket Quick Charge 3.0 + USB-C PD bağlantı: marka önerisi (Xeagle,
  Twart, Nukem) + amperaj.
- Bağlantı noktası: kontak (ignition switched) vs akü direkt — pros/cons.
- Sigorta seçimi (5A) ve röle gereksinimi.
- Su geçirmez (IP67) USB seçimi.
- "Telefon şarjı yapmıyor" yaygın hatalar: kablo direnci, OPC tetikleme.
```

### 5.5 Aksiyon kamera, GPS tracker, alarm
```
XMAX güvenlik ve kayıt sistemleri:
- GoPro / Insta360 / DJI Action montajı: gidon, miğfer çene, kuyruk koruma.
- Sürekli kayıt için harici güç: kontak-switched bağlantı, oto-on/off.
- GPS tracker karşılaştırması: Concox GT06N, MeiTrack T366, Türkiye SIM'li
  Tractive — abonelik, doğruluk, geofence.
- 2.el alımda GPS tracker iz tespiti (gizli takip cihazı tarama).
- Anti-theft alarm: orijinal Yamaha alarm 90793-65027 vs Scorpio SR-i900,
  Spy Bike — bağlantı, hassasiyet, telefon ile entegrasyon.
- "Akü boşaltan alarm" şikayetinin sebebi ve çözümü.
```

---

## 6. Lastik ve süspansiyon

### 6.1 Lastik markası karşılaştırması — ön/arka 120/70-15 ve 140/70-14
```
XMAX 250/300 (2017+ ve 2023+ jenerasyon) için lastik tam rehber:
- Orijinal lastik (Pirelli Diablo Scooter, Dunlop ScootSmart, Michelin City Grip 2)
  — model yıllarına göre.
- Karşılaştırma: City Grip 2 / Diablo Rosso Scooter / ScootSmart 2 / Pilot
  Road Scooter / Mitas MC32 / Continental ContiScoot.
- Yaş / kuru ısırma, ömür (km), yağmurdaki güven hissi, soğukta ısınma süresi.
- Türkiye fiyat aralıkları + DOT (üretim tarihi) okuma — depo eskiliği.
- Tek kişi vs çift kişi sürüşte basınç ayarı.
- Pist günü için sport touring vs sport lastik fark.
```

### 6.2 Lastik basıncı + TPMS retrofit
```
XMAX lastik basıncı detaylı rehberi:
- Yamaha tavsiyesi: ön 2.0 bar, arka 2.5 bar (tek kişi) — TR sıcağında sapma
  okuma yöntemi (soğuk ölçüm).
- Yük durumu matrisi: tek kişi, çift kişi, çantalı, otoyol uzun yol.
- TPMS yok — aftermarket sensör çözümü: Fobo Bike 2, Cleewa, Steelmate (CAP
  sensör vs internal valve sensör).
- Lastik basınç ölçer (manometre) marka tavsiyesi (Michelin, AccuGauge).
- "Lastik basıncı çok düşük" belirtileri: yan dalga, ısınma, yan duvar şişmesi.
```

### 6.3 Ön süspansiyon (telesilik çatal) bakımı
```
XMAX ön çatal (front fork) servis rehberi:
- Orijinal çatal yağı viskozitesi (genelde 10W veya 15W fork oil), kapasitesi.
- Servis aralığı: 20.000 km veya 2 yılda bir.
- Yağ değişimi adımları: amortisör söküm, contalı kapak, eski yağı boşaltma.
- Çatal keçesi (fork seal) değişim belirtileri: yağ damlama, krom çubukta
  ince yağ izi.
- "Fork seal kondom" (seal mate) kullanımı — kalıcı çözüm değil ama acil.
- Progresif yay (Wilbers, K-Tech, YSS) ile sağlam zemin/orijinal yay
  karşılaştırması.
```

### 6.4 Arka amortisör değişimi (çift amortisör)
```
XMAX 250/300 arka çift amortisör (twin shocks) upgrade:
- Orijinal amortisör karakteri (rebound only, çoğunlukla yaylı tip).
- YSS Z-Series, Bitubo XZE11, Öhlins S46DR1, Hagon NITRO — fiyat, ayar
  kabiliyeti (preload, rebound, compression).
- Çift kişi sürüş için preload ayarı: kaç klik, ölçüm yöntemi (sag).
- Sürüş yüksekliği değişimi (uzun amortisör → arka kalkar, ön ağırlık değişir).
- Türkiye'de muayene + sigorta kapsamı içinde mi (yapısal değişiklik?).
```

### 6.5 Lastik aşınma okuma — neden bu kalıba aşınıyor?
```
Lastik aşınma kalıplarının teşhisi:
- Merkez aşınması: aşırı basınç + uzun otoyol.
- İki yan aşınması: düşük basınç.
- Tek yan asimetrik aşınma: rotor eğikliği, jant balans yokluğu, yatak
  hasarı.
- Cupping / scalloping (kepek): yıpranmış amortisör.
- Kare profil (square edge): şehir içi sert frenleme.
- DOT'tan üretim tarihi okuma; 6 yaş üstü lastik değişim önerisi.
- TWI (tread wear indicator) işareti — 1.6 mm yasal limit Türkiye.
```

---

## 7. Aksesuar ve kurulum

### 7.1 Üst çanta (top case) — Givi, Shad, Kappa karşılaştırma
```
XMAX 250/300 için top case seçimi:
- Orijinal Yamaha 39L üst çanta vs Givi B47 / Shad SH48 / Kappa K46 / Wunderlich
  / Coocase.
- Hacim (L), tek kask vs çift kask kapasitesi, ağırlık.
- Anahtar paylaşımı (matching key) vs ayrı anahtar.
- Plaka adapteri (montaj braketi) marka uyumluluğu — Givi Monokey vs Monolock,
  Shad 3P, Kappa K-Force.
- Çanta yüklü sürüş davranışı: rüzgar bayrağı (high-side wind), arka süspansiyon
  preload artırımı gerekliliği.
- Çanta hırsızlık koruma: anahtarı kilitli halde çıkarma riski, anahtar
  kopyalama.
```

### 7.2 Yan çanta / saddlebag çözümleri
```
XMAX 250/300 için yan çanta:
- Sert kasa (Givi V35, Shad SH35) vs yumuşak yan çanta (Kriega, Wunderlich
  Elephant, Pacsafe).
- Isı kalkanı zorunluluğu (egzoz teması).
- Yan kasanın bagaj çubuğu (side rack) montajı: tork, vidalar, panel sökme.
- Çift yan + üst kasa = "tam tur" konfigürasyon: toplam ağırlık 15-25 kg.
- Pazarda bulunan ekonomik muadiller (Türk üretici GFB, Esda).
```

### 7.3 Cam (siperlik) yükseltme: Yamaha vs MRA vs Givi
```
XMAX cam upgrade rehberi:
- Orijinal cam yüksekliği (250 vs 300 vs 2023+ farkları).
- Aftermarket: Givi 2136DT, MRA Vario, Puig Touring, National Cycle, Wunderlich.
- Cam yüksekliği vs sürücü boyu matrisi (160-170-180-190 cm).
- Türbülans (kafa sallanma) problemi: çok kısa veya çok uzun camda görülür.
- Cam vurma sesi (windshield buffeting) — yan rüzgar geliş açısının etkisi.
- Tam koruyucu cam (touring) ile sıcak günde yaz dönüşü yetersiz havalanma.
```

### 7.4 Konfor: sele yükseltme, kol koruma, ayaklık
```
XMAX konfor aksesuarları:
- Comfort selesi (Yamaha low seat / Givi gel pad / Corbin) — boy/kalça avantajı.
- Heated grips (ısıtmalı gidon): Daytona, Oxford, Yamaha original kit.
- El koruma (handguard): Acerbis, Givi HP — soğuk havada el üşümesi azaltma.
- Sürücü ayaklığı uzatması (highway peg): uzun yol diz rahatlığı.
- Yolcu (pillion) sırt desteği (backrest pad) — orijinal vs Givi TB.
- Gidon riser (gidon yükseltici): boyu uzun sürücü için 30 mm yükseltme.
```

### 7.5 Park ekipmanı: paddock stand, kilit, branda
```
XMAX park, transport ve uzun süre saklama:
- Center stand (orta sehpa) zaten standart — yan sehpa eklenir mi?
- Paddock stand (yarış sehpası): merkez sehpa varken anlamlı mı?
- Disk kilidi (Abus Granit Detecto, Xena XX10) + alarm.
- U-kilit ile zincir/disk kilit kombinasyonu — caydırıcılık.
- Branda (motorcycle cover): iç astar, su geçirmez, içeride nefes alan
  kumaş; depo deformasyonu önleme.
- 1 ay+ saklama: yakıt dolduralım mı / boşaltalım mı, akü çıkarma, lastik
  hava arttırma, yağ değişimi öncesi/sonrası.
```

---

## 8. Egzoz, emiş ve ses

### 8.1 Aftermarket egzoz: Akrapovic, SC-Project, Mivv, Leovince
```
XMAX 250/300 sport egzoz karşılaştırması:
- Akrapovic Racing Line Carbon, SC-Project SC1-R, Mivv MK3, Leovince LV-10,
  Arrow Race-Tech karşılaştırması.
- Slip-on vs full system fark; XMAX'ta full system var mı?
- Ağırlık tasarrufu (kg) ve hp artışı (dyno).
- Ses dB ölçümleri — TR mevzuat sınırı (95 dB AB direktifi yaklaşımı).
- Eç (EC) homologasyonu olan vs "racing only" — muayene geçer mi?
- Spark arrestor (kıvılcım tutucu) gerekliliği orman yangını sezonunda.
- Db killer (susturucu tıkacı) çıkartmanın yasal sonuçları.
```

### 8.2 Sport hava filtresi + emiş geliştirme
```
XMAX emiş sistemi modifikasyonu:
- Açık hava filtresi (K&N pod, Polini, Malossi MHR Sport): hava akışı, ısı emiş.
- Airbox modifikasyonu (kapak deliklendirme) — geri tepme riski (backfire).
- Hava akış metresi (MAF) yok, MAP sensör var → açık filtrede ECU adaptasyonu
  nasıl çalışır.
- Throttle body genişletme (bore-out) — pratik mi?
- Snorkel (emiş hortumu) uzatma vs kısaltma → tork eğrisi etkisi.
- Türkiye tozlu yollar — açık filtre periyodik temizliği zorunluluğu.
```

### 8.3 Ses ayarı: pop-bang map, decel popping
```
XMAX modifiye egzoz sonrası ses karakteri:
- "Deceleration popping" (gaz keserken patlama) — sebebi (zayıf karışım) ve
  ECU mapinde önlenmesi.
- Bilinçli "pop & bang" map — Türkiye'de yasal mı, muayenede sorun mu?
- Cold start (soğuk çalıştırma) yüksek ses — komşu şikayeti yönetimi.
- "Yumuşak ama dolgun" ses arayışına en uygun susturucu (DB killer + iç camsı
  yün dolgu).
- Helyum testi (ses karakteri spektrumu) — sadece bilgi olarak.
```

---

## 9. Sürüş ve teknik

### 9.1 Otoyol sürüşü: 110-130 km/h rüzgar yönetimi
```
XMAX ile otoyol sürüşü tekniği:
- Optimal yelken-açma (tucked position) pozisyonu — cam arkasına saklanma.
- 110+ km/h'de el-kol yorgunluğu önleme (gidon riser, throttle lock).
- Şerit değişimi sırasında rüzgar gerilimi — küçük gövde efekti.
- Yakıt sarfiyatı 110 vs 130 km/h fark — gerçek dünya ölçüm.
- Otoyola kısa süreli giriş için A2 ehliyet sınırı.
- Yorgunluk yönetimi: 100 km'de bir mola, su, esneme.
- Otoyolda lastik basıncı (+ 0.2 bar) önerisi.
```

### 9.2 Şehir içi: dar şerit, yağmurda, gece
```
Günlük şehir kullanımı için XMAX teknik:
- Lane filtering (şerit aralarından geçiş) — TR mevzuatı, etik, güvenlik.
- 2.el XMAX'lı kuryelerin şehir içi rota optimizasyonu.
- Yağmurlu Türkiye şehirleri (İstanbul/Trabzon/Rize) için ekipman + sürüş
  tekniği.
- Tramvay/metro hattı ray geçişi tehlikesi.
- Gece sürüş: körnoktada görünürlük, far ayarı, refleks bantları.
- Karasal sıcakta (50°C asfalt) lastik ve fren davranışı.
```

### 9.3 Kornering — viraj alma tekniği (scooter spesifik)
```
Scooter ile viraj alma (motosikletten farkı):
- Düşük ağırlık merkezi, küçük tekerlek → yatma açısı sınırı.
- Counter-steering hâlâ geçerli mi?
- Sele üzerinde "ağırlık aktarma" mümkün mü, ne kadar etkili?
- Footboard (ayak tablası) tıkırdaması — yatma açısı limiti.
- ABS+TCS açıkken iz alma — viraj ortasında frenleme reaksiyonu.
- Pist günü ayarı: TCS off, basınç düşür, lastik ısınma.
```

### 9.4 Acil frenleme — ABS'li scooter'da doğru teknik
```
Emergency stop tekniği:
- Ön/arka fren dağılımı: scooter'da 70/30 vs 60/40.
- ABS varken parmak çekme tereddütünü yenme.
- "Brake-and-look" ders düzeni (DIVAK eğitimi vs İSEM kursu Türkiye).
- Yağışta acil duruş — ABS aktif olunca ne hissedersin.
- Yıllık pratik egzersizi: boş otoparkta 30 km/h → tam duruş.
- 0-100 km/h ve 100-0 stopping distance — XMAX 300 testleri (MCN, Bennett's).
```

### 9.5 Yakıt sarfiyatı optimizasyon ipuçları
```
XMAX 250 vs 300 gerçek dünya yakıt sarfiyatı:
- Yamaha tablo değeri (WMTC, EURO5).
- Şehir / karma / otoyol gerçek dünya: ortalama L/100km.
- Yakıt sarfiyatını etkileyen 10 faktör (lastik basıncı, hava filtresi, vites
  yok, sürüş tarzı, ağırlık, rüzgar, kalite yakıt, oktan, soğuk-sıcak motor,
  bakım durumu).
- Eco mod var mı (2023+ Connected'da)?
- Hipermiling teknikleri (gaz pulse-and-glide) — scooter için.
- Yakıt katkı maddeleri (octane booster) — efsane mi gerçek mi.
```

---

## 10. Satın alma, 2.el ve değer

### 10.1 2.el XMAX 250/300 alım rehberi (uzun versiyon)
```
Türkiye 2.el pazarında XMAX alımı tam rehber (satın alırken yapılacak 50 kontrol):
- Belge kontrolü: ruhsat, TÜVTÜRK muayene, vergi, hasar kaydı.
- Şasi ve motor numarası eşleşmesi; çalıntı sorgulama (e-Devlet).
- Çerçeve kontrolü: kaynak izi, boyalı alan UV/ışık testi.
- Plastik panel ve cam: çatlak, tutucu kırığı, çizik.
- Motor: soğuk start dinleme, rölantide titreşim, egzozdan duman rengi.
- Varyatör sesi: kalkışta tıkırtı, hızlanmada ıslık.
- Fren: pedal hissi, disk parlak izli mi (overheat), balata kalınlığı.
- Lastik: DOT tarihi, profil eşitliği, yan yüzey çatlağı.
- Elektrik: tüm uyarı ışıkları, far hi/lo, sinyal, korna, soğutma fan testi.
- Test sürüşü: 5 km, 60 km/h, 90 km/h, acil duruş, viraj.
- Servis defteri ve fatura kontrolü, son yağ değişimi tarihi.
- Pazarlık ipuçları: ne için indirim isteyebilirsin.
- "Asla almama" kırmızı bayrakları: yanmış ECU, boyalı şasi, kilometre geri sarımı.
```

### 10.2 Yeni XMAX alımı: bayi pazarlığı + Tech Max farkı
```
2026 Türkiye pazarında yeni XMAX alımı:
- Mevcut model yelpazesi: XMAX 250 (varsa), XMAX 300, XMAX 300 Tech Max.
- Tech Max ile standart farkı: TFT ekran, Y-Connect, ayarlanabilir cam, daha
  iyi sele, krom detaylar.
- Türkiye fiyat tarihçesi (2020-2025) ve enflasyon karşısında değer.
- Bayi pazarlığı: takas, sigorta, plaka, ekstra aksesuar paketi.
- Sıfır km teslim alımda kontrol listesi (PDI).
- Garanti süresi (Türkiye 2 yıl) ve uzatılmış garanti seçenekleri.
- 0% faiz / vade kampanyaları — gizli maliyetler.
```

### 10.3 XMAX'ın 5 yıllık değer kaybı analizi
```
Türkiye 2.el pazarında XMAX değer kaybı:
- Sıfır kilometreden 5 yıl sonrasına (örneğin 2021 model 2026'da) değer düşüşü.
- Renk/varyant etkisi (matt black vs Tech Max grey).
- Kilometre vs yıl ağırlığı.
- Kaza geçmişi etkisi (hasar kaydı çıkmasa bile boya kalınlığı ölçümü).
- Modifiye sürümünün satış değeri etkisi (üst egzoz, ECU flash).
- Karşılaştırma: PCX 150, Forza 350, NMAX 155, Burgman 400 değer kaybı eğrisi.
- En iyi satış zamanı (kaç km/yaş öncesi sat?).
```

### 10.4 Hangi yıl modeli en iyi? Jenerasyon karşılaştırma
```
XMAX nesilleri karşılaştırma (TR pazarı):
- 2017-2018: ilk EU4 nesil, ABS standart, LCD.
- 2019-2021: minor güncellemeler.
- 2022: TCS, anahtarsız çalıştırma seçeneği.
- 2023+: Connected nesil, TFT, Y-Connect, yeni stil.
- Her nesilin "tipik sorunu" (örn. yağ tüketimi raporlanmış jenerasyon).
- Yedek parça bulunurluğu (eski nesil için).
- Hangi yıl modeli en iyi fiyat/değer denklemine sahip?
```

---

## 11. Karşılaştırmalar (rakipler ve içsel)

### 11.1 XMAX 300 vs Honda Forza 350
```
İki maxi-scooter karşılaştırması — sıfır TL'den sahip olma maliyetine kadar:
- Motor karakteri: 292 cc (XMAX, Blue Core) vs 330 cc (Forza, eSP+).
- Performans: 0-100, en üst hız, hp/Nm dyno verisi.
- Yakıt sarfiyatı gerçek dünya (Türkiye yakıt fiyatlarıyla aylık maliyet).
- Konfor: cam, sele, ayak tablası, depo kapasitesi.
- Teknoloji: Y-Connect vs Honda Smartphone Voice Control.
- Süspansiyon: ön çatal vs USD, arka çift amortisör.
- Fren: ABS, TCS, fren mesafesi.
- Türkiye fiyat farkı + yedek parça maliyet karşılaştırması (10K km bakım toplamı).
- Hangi profil için hangisi daha mantıklı (kurye, hafta sonu, uzun yol)?
```

### 11.2 XMAX 250 vs Yamaha NMAX 155
```
Aynı marka iki scooter — neden XMAX?
- A2 ehliyetli alıcı için.
- Boy/kilo profili.
- Şehir içi vs şehirler arası kullanım.
- Yakıt ekonomisi farkı (Türkiye 2026 fiyatlarıyla aylık fark).
- Park kolaylığı + manevra.
- Yeniden satış değeri farkı.
- Hangi sürücü için NMAX yeterli, hangisi için XMAX zorunlu.
```

### 11.3 XMAX 300 vs Burgman 400 / Beverly 400 / SH350i
```
400 cc segmentine sıçramak mantıklı mı?
- Suzuki Burgman 400, Piaggio Beverly 400, Honda SH350i, Kymco AK550
  karşılaştırması.
- Güç/ağırlık oranı, otoyol konforu.
- Türkiye'de satılıyor mu, yedek parça erişimi.
- Yıllık MTV, sigorta, muayene fark.
- "Daha büyük her zaman daha iyi mi" sorgusunun objektif yanıtı.
```

### 11.4 XMAX vs küçük adventure motosiklet (CB300R, Duke 390, MT-03)
```
Scooter mı naked-bike mı? Profil bazlı karşılaştırma:
- XMAX 300 vs CB300R vs KTM Duke 390 vs MT-03.
- Konfor: sele, fizyolojik pozisyon, uzun yol yorgunluğu.
- Depolama: scooter'ın altyüz alanı + üst kasa avantajı.
- Otoyol kapasitesi: 130+ km/h sürdürülebilir mi?
- Yakıt ekonomisi.
- Türkiye trafik+ehliyet düzeninde A2 fark.
- Sürüş zevki: yarı-otomatik scooter vs el debriyajlı + 6-vites.
```

### 11.5 XMAX 250 vs XMAX 300 — iç jenerasyon karşılaştırma
```
Aynı modelin 250 ve 300 versiyonları arasında:
- Motor: 250 cc tek silindir, 21 hp vs 292 cc tek silindir, 28 hp.
- Yakıt sarfiyatı farkı (gerçek dünya).
- Üst hız ve hızlanma kabiliyeti (otoyola çıkar mı 250?).
- Türkiye'de bulunurluk + 2.el pazar derinliği.
- A2 ehliyet sınırı uygunluğu (35 kW'a uzak mı yakın mı).
- Fiyat farkı bugüne (yeni sıfır + 2-3 yaşlı 2.el).
- "250 yeterli mi" sorusunun cevabı: kullanıcı profili matrisi.
```

---

## 12. Türkiye'ye özel: mevzuat, sigorta, servis ağı

### 12.1 Yamaha Türkiye yetkili servis ağı + paralel servis
```
Türkiye'de XMAX servis ekosistemi:
- Yamaha Türkiye yetkili bayi/servis listesi (büyük şehirler).
- Yetkili servis vs paralel servis fiyat farkı (10K km bakım için).
- Yetkili servisin avantajı: garanti, yazılım güncelleme, orijinal parça.
- Paralel servis seçimi: hangi soruları sormalı, dolandırıcılık işaretleri.
- "Şüpheli parça": orijinal-paralel kutusu ile sahte parça ayrımı.
- Sürpriz yağ değişimi faturası rakamı + ortalama (TL, 2026).
- Servis randevu süreleri (büyük şehir vs taşra).
```

### 12.2 Trafik mevzuatı: ehliyet sınıfı, plaka, muayene
```
XMAX 250/300 ve TR trafik mevzuatı:
- Ehliyet sınıfı: A1 (125 cc'ye kadar) yetmez; A2 (35 kW altı) yeterli; A
  sınırsız.
- 18 yaş şartı, sınav, ödenecek harç.
- Plaka: önden plaka yok, arka plaka — boyut ve aydınlatma şartı.
- Muayene: 2 yılda bir, hangi noktalar bakılır, kalma sebepleri (egzoz dB,
  far ayarı, balata kalınlığı, lastik diş).
- Trafik cezaları: hız (otoyolda 130, şehirde 50), kask, sigorta.
- Hız sınırı muafiyeti yok — scooter da otoyol kuralına tabi.
- Çocuk yolcu yaşı + kask zorunluluğu.
```

### 12.3 Sigorta: trafik vs kasko, fiyatlama
```
XMAX için Türkiye sigorta detaylı:
- Trafik sigortası (zorunlu) yıllık ortalama TL (2026 dilim).
- Kasko (ihtiyari): ne kapar, hangi şirket scooter'a kasko verir.
- Hasarsızlık indirimi nasıl işler, transfer.
- Kaza durumu: tutanak, tutanak yoksa polis, ekspertiz, anlaşma.
- Yedek parça maliyetine göre kasko avantajı/dezavantajı (özellikle modifiyeli
  araçta).
- Çalıntı: kasko + GPS tracker kombinasyonu.
- Kira durumunda sigortayı kim öder (mototaksi/şirket kullanımı).
```

### 12.4 Vergiler: MTV, ÖTV, ek vergi
```
XMAX sahibi olmanın TR vergi yükü:
- MTV (Motorlu Taşıtlar Vergisi): 250 cc ve 300 cc dilimi, yaş etkisi.
- ÖTV: 1. el alımda saklı vergi; 2.el'de yok.
- Tüm vergileri 2026 itibarıyla rakamla.
- Vergi gecikmesinde ceza ve plaka el konulması.
- Yıllık tutar hesap aracı (yaş + cc).
- Vergi+sigorta+muayene+bakım = yıllık ortalama TL toplam.
```

### 12.5 Yedek parça temin: orijinal Yamaha, paralel, aliexpress
```
XMAX yedek parça satın alma stratejisi:
- Orijinal Yamaha parçası bayiden — fiyat aralığı + bekleme süresi.
- Paralel ithalat (italyan ithalatı, Şahinler vb.) — fiyat avantajı + risk.
- Aliexpress/Amazon: hangi parçalar güvenli (egzoz cam, ayna), hangileri
  asla (fren balata, kayış).
- Yamaha part finder kullanımı (online katalog).
- 2.el parça (söküm) pazarı: çıkma motor, çıkma varyatör.
- Sahte parça tespiti: paket, hologram, fatura.
```

---

## 13. Arıza, tanı ve hata kodları

### 13.1 XMAX hata kodları tam listesi
```
XMAX 250/300 LCD/TFT ekranda görülebilecek tüm hata kodları:
- "ER-X" formatında kodlar — her birinin anlamı + ilgili sensör/sistem.
- ECU kodları: P0XXX standardı vs Yamaha özel kodları.
- ABS hata kodları (12, 13, 14, ...).
- Immobilizer hatası: anahtar tanıma kaybı.
- Yağ basıncı ışığı: nedenler (sensör vs gerçek basınç düşüklüğü).
- Aşırı ısı uyarısı.
- Hata kodu okuma yöntemi: ev tipi diag aleti (Y-Cool, NMAX2 vs gerçek
  YDIS bayisi).
- Hata kodu silme prosedürü (gerçek arıza giderildikten sonra).
```

### 13.2 XMAX'ın 10 en yaygın arızası
```
Türkiye XMAX kullanıcı forumlarından derlenen en yaygın 10 arıza:
- Belirti, tipik kilometre, sebep, çözüm, tahmini maliyet (TL, 2026).
- Örneğin: regülatör arızası (akü şarj etmiyor) → ortalama 2500 TL.
- Yağ sızıntısı: krank keçesi vs final keçesi.
- Soğutma sıvısı kaçırma: termostat keçesi vs su pompası.
- Varyatör titreşimi: baga vs slider vs kayış.
- ABS sensör pisliği → uyarı ışığı.
- Elektrik panel kontağı sorunu (kontak switch).
- Stop ışığı yanmama (ampul vs anahtar mekanizması).
- Far sallanması (cam ayarı / titreşim).
- Soğuk start zorluğu (kış aylarında).
- Smart key tanımıyor (pil veya anten).
Her arıza için: kendi başına yapılabilir mi (DIY) yoksa servis mi.
```

### 13.3 OBD-II / Yamaha YDIS bağlantısı
```
XMAX'a OBD-II benzeri diagnostic bağlanma:
- Yamaha 3-pin / 6-pin diagnostic konnektör konumu (motor üstü, kontak yanı).
- YDIS (Yamaha Diagnostic System) — bayi yazılımı.
- Aftermarket: Healtech Speedohealer, OBDLink, Kruzer Tech, Healtech tools.
- ScanTool ile gerçek zamanlı veri okuma (TPS, MAP, sıcaklık, lambda).
- Hata kodu sıfırlama + adaptasyon (TPS reset).
- Y-Connect üzerinden veri okuma sınırları (sadece read, write yok).
- Türkçe arayüzlü diag aleti var mı?
```

### 13.4 Self-diagnostic ve servis modu
```
XMAX'ta gizli servis modu / self-test:
- Kontak açık + belirli tuş kombinasyonu → diag mod (varsa, model bazlı).
- TPS ayarı (Throttle Position Sensor) sıfırlama.
- ISC (Idle Speed Control) sıfırlama.
- ABS sensör eşleştirme.
- Saat / km / yakıt sarfiyat resetleme.
- Servis ışığı (spanner icon) silme — gerçek servis yapılmadan resetleme.
- Tehlike: gerçek servis ihtiyacının üstünü örtmemek için ışığı sadece bakım
  sonrası söndürmek.
```

---

## 14. Sürücü ekipmanı

### 14.1 Kask: full-face vs modular vs jet
```
XMAX sürücüsü için kask seçimi:
- Tipler: full-face (en güvenli), modular (jet/full hibrit), open-face (jet),
  half-helmet.
- ECE 22.06 vs 22.05 fark — TR mevzuatı durumu.
- Markalar: Shoei, Arai, AGV, Schuberth, Nolan, HJC, Bell, LS2.
- Kıs/yaz havalandırma, antifog visor, gözlük desteği.
- Bluetooth dahili kasklar (Sena, Cardo entegre).
- Türkiye'de fiyat aralıkları (3 segment: ekonomi 2-4K TL, orta 5-10K, premium
  15K+).
- Kask ömrü (5 yıl iç köpük).
- Düşme sonrası kaskın değişim zorunluluğu.
```

### 14.2 Sürüş ceket / pantolon / eldiven / çizme
```
XMAX için yıl boyu sürüş tekstili:
- Tekstil ceket (CE seviye A vs AA vs AAA) — Türkiye'de yaygın markalar
  (Macna, Held, Dainese, Alpinestars, Revit, RST, Spidi, IXS).
- Yaz mesh, kış termal, ara mevsim multi-layer.
- Su geçirmez teknolojileri (Gore-Tex, Hydratex, Hipora).
- Sırt korsajı (CE Level 2) eklenmesi.
- Pantolon: cordura, denim with kevlar, deri.
- Eldiven: yaz mesh, kış termal, kısa cuff vs uzun.
- Çizme: kısa şehir botu vs uzun touring/yarış.
- Türkiye iklim önerisi: 4 sezon takım örnekleri (toplam fiyat).
```

### 14.3 Yağmur ekipmanı
```
Yağmurda XMAX sürüşü için ekipman:
- Yağmurluk overall (ceket+pantolon) vs ceket-altı geçirimsiz astar.
- Eldiven yağmur kılıfı (over-gloves).
- Botluk (overshoe) — pratik mi?
- Visor anti-fog: Pinlock, ProGrip, sprey çözüm.
- Visor su yardımcısı (Rainshed, Rain-X aero) — gerçekten işe yarıyor mu.
- El sıyırıcı (visor wiper) küçük aksesuar.
- Yağmur takip protokolü: ekipman çıkarma sırası, çantada kuru kıyafet.
- Türkiye'de yağmur açan markalar: Spidi Rain Hurricane, Held Wet Tour, Revit
  Acid 3.
```

### 14.4 Kış sürüş ekipmanı (-5 °C senaryosu)
```
Türkiye kış (Ankara, Bursa, Kayseri, Erzurum gibi -5 °C iller) için XMAX
ekipmanı:
- Termal iç katman (merino yün, polartec).
- Isıtmalı yelek + el ısıtıcı (battery powered).
- Isıtmalı gidon (heated grips) — orijinal Yamaha kit vs Oxford.
- Kış eldiveni (Held Twin, Racer Carl Long, Alpinestars Cape Drystar).
- Termal balaclava + buz tutmayan visor.
- Kış öncesi motosiklet hazırlığı: akü, antifriz konsantrasyonu, lastik
  bileşim (winter scooter tire var mı?).
- 0 °C altında lastik tutuş gerçeği.
- Buzlu yolda asla sürüş (etik+pratik).
```

---

## 15. Kış / yaz / uzun yol senaryoları

### 15.1 Tam kış saklama prosedürü (3 ay+ park)
```
XMAX'ı kış aylarında uzun süre garajda saklama:
- Yakıt deposu: ağzına kadar dolu mu, boş mu, stabilizer (StaBil) eklenmeli mi.
- Akü: bağlantıyı ayır + akıllı şarj (CTEK, NOCO) ile bağlı bırakma.
- Lastik: hava arttır (+ 0.5 bar) veya yere temas etmesin (paddock).
- Yağ: kış öncesi temiz yağ, yoksa bahar başında değişim daha mı mantıklı.
- Antifriz konsantrasyonu kontrol (donma noktası).
- Karbüratör tahliyesi (varsa) — XMAX EFI, dolayısıyla N/A.
- Fareler/böcekler için: egzoz ağzı kapatma (sünger).
- Toz örtüsü.
- 2 haftada bir motor çalıştırma — gerekli mi tartışması.
```

### 15.2 Yaz sıcağı (40+ °C) sürüş hazırlığı
```
Türkiye yaz sıcağında XMAX sürüşü:
- Motor termal stres: durmadan trafik, fan sürekli çalışıyor — zarar mı verir?
- Sürücü ısı stresi: mesh ceket, su yelek (evaporative cooling vest).
- Lastik basıncı sıcakta — hangi yönde sapma + ayar.
- Asfalt 60-70 °C → lastik bileşim sınırı.
- Hidrasyon: hydration pack (Camelbak), su molası sıklığı.
- Kask havalandırma maksimum açık → ses + boyun gerginliği.
- Eldiven yaz: kısa cuff mesh + parmak ucu hava kanalı.
- Akşam saatlerine kayan rota planlama.
```

### 15.3 Uzun yol (500+ km) hazırlığı ve günlük plan
```
XMAX ile uzun yol turu (örn. İstanbul → Antalya, İzmir → Çanakkale, Ankara →
Trabzon):
- Pre-trip checklist: lastik, yağ, fren, fren hidroliği seviyesi, akü volt,
  far ayarı, anahtar yedek.
- Yedek parça çantası (kit): yedek ampul, sigorta, kemer (kanalizasyon kemeri
  emergency), conta lastiği.
- Çanta yükü: ön/arka denge, ağırlık limit (top case 5-7 kg).
- Mola sıklığı: 90-120 dakikada bir, 15 dakika.
- Günlük km kapasitesi: 400-600 km idealen.
- Yakıt ikmali planlama: rezerv (3 L) kaç km gider.
- Konaklama: motel/oto otel park güvenlik.
- Acil durum: telefonun anten ekme, 112, AA Yol Yardım.
- Türkiye'de scooter tur fotoğraf rotaları (alternatif kullanıcı içerik tetik).
```

### 15.4 Yağışlı yol — yağmurda sürüş tam protokol
```
XMAX yağmurda sürüş:
- İlk dakikalarda en kaygan: yağ + lastik aşınma artığı su ile karışır.
- Frenleme: %20 daha uzun mesafe, ön/arka eşit dağılım.
- Tramvay rayı, kanal kapağı, beyaz çizgi → düz ve dik geçiş.
- Yağmurda lane filtering — yapma.
- Yaprak/parke + ıslak → kaza yüksek olasılıklı.
- Visor antifog gerçek — Pinlock yok ise sürüş zor.
- Yağmur sonrası: motor üzerinde su damlası, elektrik konnektör kontrol.
- 2 saat sonra disk paslandı → ilk fren tıslaması normal.
```

### 15.5 Çift kişi (pillion) sürüş
```
XMAX 250/300 çift kişi sürüş tam rehber:
- Yolcu kapasitesi (Yamaha tablo: maksimum yük).
- Süspansiyon preload artırımı (arka çift amortisör adjuster).
- Lastik basınç ayarı (çift kişi tablosu).
- Kalkış: yolcu pozisyon (footboard üzeri, sırt desteği).
- Frenleme mesafesi artışı.
- Kornering — yolcuya "yaslan ben yaslandığımda" eğitimi.
- Yolcu için kask + sürüş ceketi.
- Çift kişi otoyol — XMAX 250 yeterli mi vs 300.
- Yağmurda + çift kişi → fren mesafesi katlanır.
```

---

## 16. Kurye, mototaksi, ticari kullanım

### 16.1 Kurye olarak XMAX — gerçek kullanıcı raporu
```
Türkiye'de XMAX ile kurye işi yapanlar için derinlemesine analiz:
- Günlük 200-400 km kullanım profili.
- Yağ değişim aralığı kısaltma (örn. 3000 km).
- Kayış ömrü ticari kullanımda (orijinal 24K km'lik servis aralığı kısalır).
- Lastik ömrü (3K-5K km tipik kurye).
- Akü 1-2 yıl ömür.
- Sigortada "ticari kullanım" beyanı zorunluluğu — beyan etmemenin riski.
- Aylık bakım maliyeti tablosu (TL, 2026).
- Yedek parça stoku önerisi (sıklıkla değiştirilen 5 parça).
- "5 yıl kurye kullanımı sonrası XMAX'ın hali" - kaza+kullanım yorgunluğu.
```

### 16.2 Mototaksi / yolcu taşıma — yasal mı?
```
Türkiye'de scooter ile yolcu taşıma:
- Yasal durum: ücretli yolcu taşıma için K1/T2 belge gerekir mi?
- Mototaksi mevzuat boşluğu (İstanbul, Antalya, İzmir).
- Sigorta kapsamı: ticari taşıma için kasko yaptırma.
- Yolcu güvenliği yükümlülüğü: kask, vergi mevzuat.
- Gerçek mototaksiler hangi araçları kullanır (XMAX nedir?).
- Trafik denetimi durumunda risk.
```

### 16.3 Yiyecek teslimat (Yemeksepeti, Trendyol Go, Getir Su) profilinde XMAX
```
Online teslimat ile XMAX kullanımı:
- Termal çanta montajı (top case yerine veya üst case içine).
- Lastik aşınması — duraklamak yerine sürekli dur-kalk şehir trafik.
- Yakıt sarfiyatı yüksek (sürekli kalkış).
- Saat ücreti vs araç amortismanı hesabı.
- 5K km kullanımdan sonra yenileme yatırımı tablo.
- Kendi aracın mı şirket aracı mı?
```

---

## 17. İleri seviye: ECU, tuning, yarış hazırlığı

### 17.1 ECU flash: Malossi Force Master, RapidBike, Power Commander
```
XMAX 300 için ECU tuning derin teknik:
- Stock ECU map sınırı (lambda kapalı döngü, hız limiti).
- Malossi Force Master 2/3: piggy-back vs full flash; ne kadar hp kazandırır.
- RapidBike Evo + Easy Race Module — autotune özelliği.
- Power Commander V (Dynojet): destek bant XMAX için var mı?
- ECU flash sonrası garanti durumu, yeniden bayide diagnostic akış.
- "Stage 1 map" satan tuner'lar — gerçek dyno + AFR ile mi, jenerik mi.
- Yan etki: yakıt sarfiyatı +%5-15, soğuk start zorluğu, hata kodu olasılığı.
- Tunerin güvenilirliği nasıl test edilir.
```

### 17.2 Dyno test — Türkiye'de nerede, ne anlama gelir
```
Şasi dyno (dynamometer) Türkiye'de XMAX için:
- İstanbul, Ankara, Bursa, İzmir'deki bilinen scooter dyno noktaları.
- Dyno saat ücreti (2026 ortalama).
- Test öncesi hazırlık: tam depo yakıt, yeni buji, yeni hava filtresi, yağ
  taze, lastik basıncı standart.
- Test sonrası grafik okuma: hp/torque eğrisi, AFR eğrisi, sıcaklık, RPM.
- "Şüpheli rakamlar" — bayilerin abartılı hp iddiası.
- 4WD scooter dyno mu, 2WD mi — fark.
- Tuning sonrası before/after karşılaştırma.
```

### 17.3 Yarış varyatörü ve trafiğe çıkmayan setup
```
"Sadece pist" XMAX setup:
- Yarış varyatör (Polini Hi-Speed, Malossi MHR Overrange) — orijinal nesli
  geçer.
- Yarış kayışı (Malossi MHR X-K Belt, Polini Kevlar).
- Yarış debriyajı (clutch) — clutch bell yarış uyumlu.
- Performans amortisör (Öhlins, Bitubo) + uzatma.
- Yarış lastiği (Pirelli Diablo Rosso Corsa Scooter, Bridgestone BT-S20).
- TCS off + ABS sökme — yarış güvenliği.
- Cam söküm + light fairings → ağırlık tasarrufu.
- Pist günü kuralları: kupon, kask FIM, sırt korsajı.
- Türkiye scooter yarış serisi (TOSFED, ÖTSB ne sunuyor)?
```

### 17.4 Decel popping, anti-lag, motor fren ayarı
```
Modifiye XMAX'ta motor fren karakterini şekillendirme:
- Yakıt kesme (deceleration fuel cut) ECU'da nasıl ayarlanır.
- "Anti-lag" turbo terimi — atmosferik scooter'da anlamı yok ama benzer
  efekt için ne yapılır.
- Egzoz patlama (popping) — ECU mapinde decel çayında zengin karışım.
- TCS açıkken motor fren karakteri.
- Gaz boşken devir düşüş hızı — varyatör ayarı (rampa eğrisi) etkisi.
- "Engine braking" güç bandı eğitim için yararı.
```

---

## Bonus: Ekstra fikir havuzu (kısa promptlar)

Bu bölümdeki promptlar daha kısa ama tek başlarına makale olabilir:

- "XMAX'ta debriyaj balatası set halinde mi tek tek mi değişmeli?"
- "XMAX 300 Tech Max TFT ekran ayarları — gizli menü ve kişiselleştirme."
- "XMAX'ın ortalama 100.000 km'ye kadar güvenilir kullanımı için yapılması
  gerekenler — kilometresine göre yatırım planı."
- "Otomatik vites motosikletlerin (DCT - Honda, Y-AMT - Yamaha) XMAX'a karşı
  konumu."
- "XMAX'ta 'kayış kaymıyor ama hızlanma yok' problemi — torque driver
  greasing teknik."
- "DiASil silindir teknolojisi nedir ve neden Yamaha'nın küçük motorlu
  scooter'larında üstün?" (Rodaj sayfasıyla bağlantılı.)
- "Blue Core motor felsefesi — yakıt ekonomisi mi performans mı?"
- "VVA (Variable Valve Actuation) XMAX'ta var mı ve ne katar?" (NMAX'ta var,
  XMAX'ta yok netliği.)
- "Motosiklet satış vergi muafiyeti — engelli/şehit/gazi aileleri için XMAX."
- "Bayan sürücüler için XMAX kurulumu — sele yükseklik, kavrama gücü, baga
  hafifletme."
- "Çocuklarla aile sürüş kuralları — Türkiye yasası + güvenlik."
- "İnsurance ile claim: kaza sonrası adım adım rehber."
- "Şarjlı (Yamaha E01 / NEO's) gelecek — XMAX elektrikli olur mu?"
- "Termal kamera ile motor sorun teşhisi — bayide var mı, evde alternatif?"
- "Tek başına garaj kurma — gerekli ekipman, alet seti minimum."
- "XMAX kara muayene kontrolü hangi sırayla yapılır — TÜVTÜRK iç işleyişi."
- "Modifikasyon piyasasının haritası — Türkiye'deki en bilinen XMAX
  modifiyecileri / tuner'lar (objektif liste, sponsorsuz)."

---

## Promptu yazma kuralı (kendin için hatırlatma)

Yeni bir araştırma promptu yazarken şu yapıyı kullan:

1. **Bağlam** — "Yamaha XMAX 250/300, Türkiye pazarı, 2017+ ve 2023+
   jenerasyonları" gibi açık çerçeve.
2. **Spesifik istek** — "X markası ile Y markasını karşılaştır" veya "Adım
   adım yap-bunu rehberi".
3. **İstenecek format** — tablo, madde liste, "kırmızı bayraklar", maliyet.
4. **Kaynak şartı** — "üretici teknik dokümanları, forum gerçek-dünya
   gözlemleri (XMAX Forum, MaxiScooters.net, ScooterUnderground)".
5. **TR-özgül vurgu** — fiyat aralığı (TL, 2026), mevzuat, iklim, servis ağı.
6. **Çıktının site bölümü** — bilgi / nasıl-yapılır / performans / aksesuar /
   sürüş — Gemini'a "site bölümü için 1500-3000 kelime" gibi uzunluk emri.

> Promptları **uzun ve spesifik** tut. Gemini Deep Research, geniş ve
> belirsiz isteklere yüzeysel cevap, dar ve teknik isteklere uzun ve değerli
> cevap üretir. Her promptun çıktısını site adına SEO başlığı + meta
> description ile birlikte iste; yayınlamadan önce parça numaralarını ve
> tork değerlerini Yamaha resmi servis manualından çapraz doğrula.
