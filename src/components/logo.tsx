import Image from "next/image";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/yamaha-logo.png"
      alt="Yamaha"
      width={64}
      height={64}
      priority
      className={cn("object-contain", className)}
    />
  );
}
