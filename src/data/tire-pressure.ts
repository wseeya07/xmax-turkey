export type TirePressureRow = {
  model: string;
  generations: string[];
  front: { solo: number; pillion: number };
  rear: { solo: number; pillion: number };
  unit: "bar";
  size: { front: string; rear: string };
  note?: string;
};

export const TIRE_PRESSURE: TirePressureRow[] = [
  {
    model: "XMAX 250",
    generations: ["xmax-250-2014", "xmax-250-2018", "xmax-250-2023", "xmax-250-2025"],
    front: { solo: 2.0, pillion: 2.0 },
    rear: { solo: 2.25, pillion: 2.5 },
    unit: "bar",
    size: { front: "120/70-15", rear: "140/70-14" },
    note: "Soğuk lastik değeri — sürüşten önce ölçün."
  },
  {
    model: "XMAX 300",
    generations: ["xmax-300-2018", "xmax-300-2023", "xmax-300-2025"],
    front: { solo: 2.0, pillion: 2.0 },
    rear: { solo: 2.25, pillion: 2.5 },
    unit: "bar",
    size: { front: "120/70-15", rear: "140/70-14" },
    note: "Soğuk lastik değeri — sürüşten önce ölçün."
  },
  {
    model: "XMAX 400",
    generations: ["xmax-400-2013", "xmax-400-2018"],
    front: { solo: 2.0, pillion: 2.0 },
    rear: { solo: 2.25, pillion: 2.5 },
    unit: "bar",
    size: { front: "120/70-15", rear: "150/70-13" },
    note: "DOHC maksi şasi için arka lastik taban genişliği 150 mm'dir."
  }
];

export const TIRE_TIPS = [
  {
    title: "Soğuk değerle ölç",
    body:
      "Lastik basıncı sıcaklığa göre 0.3–0.5 bar oynar. Ölçüm garajda, sürüşten önce yapılmalı. Yol kenarındaki sıcak okuma yanıltır."
  },
  {
    title: "Çift kişi = arka +0.25 bar",
    body:
      "Pillion + yük durumunda arka lastik basıncı önerilen değere çekilmeli. Eksik basınç jant darbesi ve sırt çatlaması riskini artırır."
  },
  {
    title: "Aşınma deseni okuma",
    body:
      "Orta diş aşınmışsa basınç fazla, kenarlardan aşınmışsa basınç düşük. Düzensiz deseninde sallantı / amortisör kontrolü yapılmalı."
  }
];
