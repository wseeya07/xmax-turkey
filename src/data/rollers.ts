export type RollerSpec = {
  modelGroup: string;
  generations: string[];
  size: string;
  oemWeight: string;
  rollerCount: number;
  partCode: string;
  belt: string;
};

export const OEM_ROLLERS: RollerSpec[] = [
  {
    modelGroup: "XMAX 250 (Eski Nesil / Majesty Tabanlı)",
    generations: ["xmax-250-2014"],
    size: "20 × 12 mm",
    oemWeight: "11.0 g × 8 adet",
    rollerCount: 8,
    partCode: "1C0-E7620-00",
    belt: "5GM176200000"
  },
  {
    modelGroup: "XMAX 250 (Blue Core)",
    generations: ["xmax-250-2018", "xmax-250-2023", "xmax-250-2025"],
    size: "23 × 18 mm",
    oemWeight: "15.0 – 17.0 g × 6 adet",
    rollerCount: 6,
    partCode: "B74-E7620-00",
    belt: "B74-E7641-00"
  },
  {
    modelGroup: "XMAX 300 (Tüm Blue Core)",
    generations: ["xmax-300-2018", "xmax-300-2023", "xmax-300-2025"],
    size: "23 × 18 mm",
    oemWeight: "17.5 g × 6 adet",
    rollerCount: 6,
    partCode: "B74-E7632-00",
    belt: "B5X-E7641-00 (Euro 5+ güncel)"
  },
  {
    modelGroup: "XMAX 400 (Majesty Tabanlı)",
    generations: ["xmax-400-2013", "xmax-400-2018"],
    size: "25 × 15 mm",
    oemWeight: "16.0 – 17.0 g × 6 adet",
    rollerCount: 6,
    partCode: "5RU-17632-00",
    belt: "5RU-17641-00"
  }
];

export type SlidingRollerNote = {
  title: string;
  body: string;
};

export const SLIDING_ROLLER: SlidingRollerNote[] = [
  {
    title: "Köşeli/kayar geometri",
    body:
      "Dr. Pulley sliding rollerlar yuvarlanmaz, rampa üzerinde kayarak hareket eder. Sürtünme yüzeyi daha geniştir — geleneksel bagalardan çok daha geç aşınır, flat spot (düzleşme) yapmaz."
  },
  {
    title: "Genişletilmiş dişli oranı",
    body:
      "Girintili tasarım rampa plakasının varyatör gövdesine normalden fazla yaklaşmasını sağlar. Sonuç: kalkışta kayış burca daha fazla oturur (kısa 1. vites) + üst devirde kasnak çapı dışına taşar (uzun overdrive vitesi)."
  },
  {
    title: "Şim koruması zorunlu",
    body:
      "Dr. Pulley kayışı normalden dışarı taşıdığı için, kalın performans kayışları (Malossi Kevlar) ile birlikte 0.5 mm şim eklenmelidir. Aksi halde kayış şanzıman gövdesine sürtebilir."
  }
];

export const MIXING_RULES = {
  intro:
    "Yarış atölyelerinde (Tayland, Endonezya) farklı ağırlıkta bagaların aynı varyatörde kullanılması bir 'atölye sırrıdır'. Doğru uygulandığında ara devir karakteristiğini optimize eder; yanlış uygulandığında krank rulmanı hasarına yol açar.",
  rules: [
    {
      title: "Dairesel simetri zorunlu",
      body:
        "Ağırlıklar varyatöre kesinlikle ardışık değil, simetrik dizilmeli. 6 bagada 3×14g + 3×16g kullanılacaksa: 14-16-14-16-14-16. Yan yana iki aynı ağırlık statik dengeyi bozar, yüksek devirde aşırı titreşim yaratır."
    },
    {
      title: "Maksimum 2 gram fark",
      body:
        "Karıştırılan iki grup arasındaki ağırlık farkı 2.0 g'ı geçmemeli. Daha yüksek farklar hafif bagaların erken aşınmasına ve rampalarda düzleşmelere neden olur."
    },
    {
      title: "Set halinde değişim",
      body:
        "Bir adetin bile aşınması balansı bozar. Tüm seti aynı anda değiştirin. Karışık marka kullanmayın — burç çapları farklı olabilir."
    }
  ]
};
