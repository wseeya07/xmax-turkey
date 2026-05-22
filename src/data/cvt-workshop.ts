export type WorkshopTechnique = {
  slug: string;
  title: string;
  origin: string;
  difficulty: "atölye" | "ileri" | "uzman";
  summary: string;
  steps: string[];
  warning?: string;
  benefit: string;
};

export const WORKSHOP_TECHNIQUES: WorkshopTechnique[] = [
  {
    slug: "bubut-derajat",
    title: "Bubut Derajat — Kasnak Yanak Açısı Modifikasyonu",
    origin: "Endonezya",
    difficulty: "uzman",
    summary:
      "Ön varyatör yanaklarının torna tezgahında 14°'den daha dik bir açıya çekilmesi. Kasnak açısı dikleştikçe kayışın yanal sıkışma oranı artar, motor torku daha kayıpsız iletilir.",
    steps: [
      "Orijinal açı XMAX 250 ve 300 modellerinde 14.0°'dir",
      "13.8° modifikasyonu: şehir içi 'stop-and-go' kullanımı + orta devir ivmelenmesi için ideal",
      "13.5° modifikasyonu: yarış / otoyol kurulumu — kayışın kasnak tepesine çıkmasını kolaylaştırır, son hız artar"
    ],
    warning:
      "Geri dönüşü olmayan bir işlem. Yalnızca CNC torna tezgahında, kasnak balansını koruyacak şekilde mikron hassasiyetiyle yapılmalıdır. Hatalı işlem krank balansını bozar.",
    benefit:
      "Motor torkunun kayışa kayıpsız iletilmesi — son hızda görülür kazanç."
  },
  {
    slug: "kerok-jalur",
    title: "Kerok Jalur — Baga Kanallarının Frezelenmesi",
    origin: "Endonezya / Tayland",
    difficulty: "uzman",
    summary:
      "Varyatör içindeki baga rampalarının CNC freze veya hassas el işçiliği ile 1.5–2.0 mm geriye doğru uzatılması. Stoper duvarı kaldırılarak baganın daha fazla dışarı fırlamasına izin verilir.",
    steps: [
      "Orijinal rampaların sonunda baganın daha fazla yükselmesini engelleyen bir güvenlik duvarı (stoper) bulunur",
      "Atölye bu kanalı 1.5–2.0 mm daha geriye doğru kazıyarak rampayı uzatır",
      "Sonuç: kayış ön kasnakta maksimum çapa ulaşır",
      "Motorun iç organlarına dokunmadan son hıza +10 ila +15 km/h ekler"
    ],
    warning:
      "Kazıma derinliği ölçülü olmalı. Aşırı frezeleme kasnak yüzeyini zayıflatır, yüksek devirde çatlama riski oluşturur.",
    benefit: "Son hıza +10–15 km/h kazanç, motora dokunmadan."
  },
  {
    slug: "sim-pulley-washer",
    title: "Şim (Pulley Washer / Spacer) Uygulaması",
    origin: "Genel",
    difficulty: "atölye",
    summary:
      "Ön varyatör burcu ile sabit kasnak yanağı arasına yerleştirilen ince çelik pul. İki yanak arasındaki başlangıç mesafesi fiziksel olarak genişler — kayış kasnağın en dibine oturur, kalkış torku belirgin artar.",
    steps: [
      "XMAX 300 için ideal şim kalınlığı 0.5 mm ila 0.8 mm arası",
      "Top Performances 15mm Shim (Ref 3409) yaygın kullanılan referans",
      "Bisikletteki en küçük ön dişliye geçmekle aynı etki — kalkış torku muazzam artar",
      "Debriyaja binen yük azalır"
    ],
    warning:
      "1.0 mm ve üzeri şimler kayışın plastik korumalara veya marş dişlisine sürtmesine sebep olur. Ayrıca krank mili somunun diş kapma payı azalır — somun çıkarsa krank mili tamamen parçalanır.",
    benefit: "Kalkış torkunda dramatik artış, debriyaj yükü azalır."
  },
  {
    slug: "sim-uyarisi",
    title: "Tehlikeli Hata: B74-12168-R0 Parçası ŞİM DEĞİL",
    origin: "Genel uyarı",
    difficulty: "atölye",
    summary:
      "Amatör modifikasyoncular parça kataloğunda 'Shim' olarak geçen B74-12168-R0 kodlu ürünü CVT şimi sanarak sipariş eder. Bu parça CVT şimi değil — motorun silindir kapağında yer alan 2.0 mm kalınlığındaki SUPAP AYAR ŞİMİDİR (valve tappet shim).",
    steps: [
      "B74-12168-R0 → Subap ayar şimi (motor kapağında)",
      "CVT şimi farklı parça koduyla satılır (Top Performances Ref 3409 vb.)",
      "Şim kalınlığı 0.5–0.8 mm arası olmalı, malzeme paslanmaz çelik"
    ],
    warning:
      "B74-12168-R0 ürününün varyatör miline takılmaya çalışılması motor bloğunda yıkıcı mekanik hasarlara davetiye çıkarır. Sipariş öncesi parça numarasını mutlaka doğrulayın.",
    benefit: "Doğru parça → doğru sonuç. Yanlış parça → motor hasarı."
  },
  {
    slug: "isi-yonetimi",
    title: "CVT Isı Yönetimi ve Havalandırma",
    origin: "Genel / Asya pazarı",
    difficulty: "atölye",
    summary:
      "CVT odasındaki aşırı ısınma kayışın yumuşamasına, bagaların erimesine, debriyaj balatasının camlaşarak tutunma kabiliyetini yitirmesine yol açar.",
    steps: [
      "CVT kapağındaki sünger filtre yüksek geçirgenlikli metal tel süzgeç ile değiştirilir → hava akışı %40 artar",
      "XMAX 250 ve eski bloklarda varyatör fan yanağının arkasına ek hava kanalları (YP250 CVT Variator Fan entegrasyonu)",
      "Şanzıman kapağına doğrudan delik açmak (drill) ısıyı düşürür ama yağmurda içeri su girer → kayış anında boşa döner"
    ],
    warning:
      "Şanzıman kapağına delik açmayın. Sokak motorlarında kesinlikle önerilmez. Sadece pist motoru için, kuru sürüş koşullarında uygulanabilir.",
    benefit: "CVT içi sıcaklık düşer, kayış ömrü ve performans korunur."
  },
  {
    slug: "yaglama-protokolu",
    title: "Yağlama Protokolü — Doğru Gres Seçimi",
    origin: "Genel",
    difficulty: "atölye",
    summary:
      "Performans varyatörlerinin burç içinde yüksek ısıya ve merkezkaç kuvvetine dayanıklı özel CVT gresleri kullanılmalıdır. Yanlış gres seçimi şanzımanın tamamen devre dışı kalmasına yol açar.",
    steps: [
      "Lityum sabunlu, poliüre bazlı veya teflon katkılı özel CVT gresleri kullanın",
      "Referans: Malossi 7.1 MHR Grease (Parça Kodu: 7615375b)",
      "Burç içindeki kanala sadece 0.5–1.0 gram gres sürün",
      "Fazla gres mutlaka temizlenmeli"
    ],
    warning:
      "Standart rulman gresleri yüksek sıcaklıkta sıvılaşır, varyatör yanaklarına akar. Bu durumda kayış yağlanır ve şanzıman tamamen kayar — aktarım çöker.",
    benefit: "Pürüzsüz burç hareketi, uzun ömür, sıcaklıkta stabil performans."
  }
];
