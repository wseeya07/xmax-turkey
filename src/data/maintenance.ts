export type MaintenanceItem = {
  task: string;
  detail: string;
  priority: "kritik" | "yüksek" | "normal";
};

export type MaintenanceStop = {
  km: number;
  label: string;
  items: MaintenanceItem[];
  note?: string;
};

export const MAINTENANCE_SCHEDULE: MaintenanceStop[] = [
  {
    km: 1000,
    label: "Rodaj Servisi",
    note:
      "İlk 1000 km'de motor parçaları oturur — tüm yağ ve filtrelerin değişimi kritiktir.",
    items: [
      {
        task: "Motor yağı + filtre değişimi",
        detail: "Yamalube 4S 10W-40 1.5 L · filtre 5GH-13440-50",
        priority: "kritik"
      },
      {
        task: "Final dişli yağı kontrolü",
        detail: "0.25 L Yamalube Final Gear 80W — gerekirse değişim",
        priority: "yüksek"
      },
      {
        task: "Cıvata ve somun tork kontrolü",
        detail: "Aks, egzoz, motor bağlantıları",
        priority: "yüksek"
      },
      {
        task: "Fren balata aşınma kontrolü",
        detail: "Ön + arka balata kalınlığı min. 0.8 mm",
        priority: "normal"
      }
    ]
  },
  {
    km: 5000,
    label: "İkinci Servis",
    items: [
      {
        task: "Motor yağı + filtre değişimi",
        detail: "Yamalube 4S 10W-40",
        priority: "kritik"
      },
      {
        task: "Hava filtresi temizlik / kontrol",
        detail: "Toz birikimine göre değişim",
        priority: "normal"
      },
      {
        task: "Buji kontrolü",
        detail: "NGK LMAR8A-9 — elektrot aralığı 0.7 mm",
        priority: "normal"
      },
      {
        task: "Lastik basıncı + diş derinliği",
        detail: "Ön 2.0 bar / Arka 2.5 bar (tek kişi)",
        priority: "normal"
      }
    ]
  },
  {
    km: 10000,
    label: "Büyük Servis",
    note:
      "Varyatör bakımı bu kilometre etrafında başlamalı — slider ve baga aşınması incelenir.",
    items: [
      {
        task: "Motor yağı + filtre değişimi",
        detail: "Yamalube 4S 10W-40",
        priority: "kritik"
      },
      {
        task: "Hava filtresi değişimi",
        detail: "Orijinal B74-E5407-00",
        priority: "yüksek"
      },
      {
        task: "Final dişli yağı değişimi",
        detail: "0.25 L Yamalube Final Gear 80W",
        priority: "yüksek"
      },
      {
        task: "Varyatör temizlik + slider/baga kontrol",
        detail: "Aşınmış slider varsa değişim — bkz. how-to rehberi",
        priority: "yüksek"
      },
      {
        task: "Buji değişimi",
        detail: "NGK LMAR8A-9",
        priority: "normal"
      }
    ]
  },
  {
    km: 20000,
    label: "Geniş Kapsam Servis",
    items: [
      {
        task: "Motor yağı + filtre değişimi",
        detail: "Yamalube 4S 10W-40",
        priority: "kritik"
      },
      {
        task: "Antifriz (soğutma sıvısı) değişimi",
        detail: "1.45 L Yamaha Coolant — sistem havası alınmalı",
        priority: "kritik"
      },
      {
        task: "Varyatör tam revizyon",
        detail: "Slider seti + baga seti değişimi, kasnak yüzeyi temizliği",
        priority: "kritik"
      },
      {
        task: "Triger / kayış kontrolü",
        detail: "Drive belt çatlak ve aşınma kontrolü, gerekirse değişim",
        priority: "yüksek"
      },
      {
        task: "Fren hidroliği değişimi",
        detail: "DOT 4 — 2 yılda bir veya 20.000 km",
        priority: "yüksek"
      },
      {
        task: "Debriyaj balata kontrolü",
        detail: "Min. 1.0 mm kalınlık",
        priority: "normal"
      }
    ]
  },
  {
    km: 40000,
    label: "Tam Revizyon",
    items: [
      {
        task: "Tüm yağ + filtre değişimi",
        detail: "Motor, final, fren hidroliği, antifriz",
        priority: "kritik"
      },
      {
        task: "Kayış (drive belt) değişimi",
        detail: "Orijinal 1DK-E7641-00",
        priority: "kritik"
      },
      {
        task: "Debriyaj balata değişimi",
        detail: "Set halinde değişim önerilir",
        priority: "kritik"
      },
      {
        task: "Su pompası kontrol",
        detail: "Sızdırma + rulman sesi kontrolü",
        priority: "yüksek"
      },
      {
        task: "Şanzıman rulmanları kontrol",
        detail: "Final case açılarak rulman bakımı",
        priority: "yüksek"
      }
    ]
  }
];
