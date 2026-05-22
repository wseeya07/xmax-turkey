export type BoreUpRow = {
  model: "XMAX 250" | "XMAX 300" | "XMAX 400";
  variant: string;
  isStock: boolean;
  pistonDiameter: number;
  strokeLength: number;
  netVolume: number;
  growth: string;
  note?: string;
};

export const BORE_UP_TABLE: BoreUpRow[] = [
  { model: "XMAX 250", variant: "Stok", isStock: true, pistonDiameter: 70.0, strokeLength: 64.9, netVolume: 249.76, growth: "—" },
  { model: "XMAX 250", variant: "Bore-up 76 mm", isStock: false, pistonDiameter: 76.0, strokeLength: 64.9, netVolume: 294.43, growth: "+17.88%", note: "Stok XMAX 300 sınıfına yaklaşır" },
  { model: "XMAX 250", variant: "Bore-up 78 mm", isStock: false, pistonDiameter: 78.0, strokeLength: 64.9, netVolume: 310.12, growth: "+24.17%" },
  { model: "XMAX 250", variant: "Bore-up 80 mm", isStock: false, pistonDiameter: 80.0, strokeLength: 64.9, netVolume: 326.25, growth: "+30.62%" },
  { model: "XMAX 250", variant: "Bore-up 82 mm", isStock: false, pistonDiameter: 82.0, strokeLength: 64.9, netVolume: 342.78, growth: "+37.24%" },

  { model: "XMAX 300", variant: "Stok", isStock: true, pistonDiameter: 70.0, strokeLength: 75.9, netVolume: 292.08, growth: "—" },
  { model: "XMAX 300", variant: "Bore-up 76 mm", isStock: false, pistonDiameter: 76.0, strokeLength: 75.9, netVolume: 344.12, growth: "+17.82%", note: "BRT / TDR'nin en popüler 344 cc geçiş kiti" },
  { model: "XMAX 300", variant: "Bore-up 78 mm", isStock: false, pistonDiameter: 78.0, strokeLength: 75.9, netVolume: 362.47, growth: "+24.10%" },
  { model: "XMAX 300", variant: "Bore-up 82 mm", isStock: false, pistonDiameter: 82.0, strokeLength: 75.9, netVolume: 400.48, growth: "+37.11%", note: "S90 Billet Sleeved radikal yarış kiti" },

  { model: "XMAX 400", variant: "Stok", isStock: true, pistonDiameter: 83.0, strokeLength: 73.0, netVolume: 394.97, growth: "—" },
  { model: "XMAX 400", variant: "Bore-up 86 mm", isStock: false, pistonDiameter: 86.0, strokeLength: 73.0, netVolume: 423.99, growth: "+7.35%", note: "Custom gömlek + termal güvenli oran" },
  { model: "XMAX 400", variant: "Bore-up 90 mm", isStock: false, pistonDiameter: 90.0, strokeLength: 73.0, netVolume: 464.36, growth: "+17.57%" }
];

export const BORE_UP_PRINCIPLES = [
  {
    title: "Strok sabit, çap büyür",
    body: "XMAX serisinde hacim artışı strok değiştirilmeden silindir çapı (bore) büyütülerek elde edilir. V = π × (D/2)² × S formülü çapın karesiyle hacmi katlar — 70 → 76 mm ~%18 hacim getirir."
  },
  {
    title: "Seramik (Ni-SiC) kaplama",
    body: "Döküm demir gömlek yerine alüminyum blok üzerine nikel-silikon karbür kaplama; termal iletkenliği ~3× artırır. 12.5:1 — 12.8:1 sıkıştırma oranlarında dahi şişmesini engeller, sekman sürtünmesini düşürür."
  },
  {
    title: "Dövme (forged) piston",
    body: "Yüksek basınç altında şekillendirilmiş, gözeneksiz tane yapısı. Döküm pistona göre çok daha yüksek çekme/akma mukavemeti, ince et kalınlığı sayesinde düşük kütle — krank atalet kuvvetini azaltır, devirlenme keskinleşir."
  }
];
