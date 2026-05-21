import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Performans Modifikasyonları",
  description: "Varyatör, egzoz, hava akışı ve ECU modifikasyonları.",
  alternates: { canonical: "/varyator" }
};

export default function PerformanceIndex() {
  redirect("/varyator");
}
