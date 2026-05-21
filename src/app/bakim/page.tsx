import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Bakım",
  description: "Periyodik bakım planlayıcı, sıvılar, filtreler, fren ve lastik.",
  alternates: { canonical: "/periyodik-bakim" }
};

export default function MaintenanceIndex() {
  redirect("/periyodik-bakim");
}
