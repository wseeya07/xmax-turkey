import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={cn("", className)}>
      <defs>
        <linearGradient id="xmax-logo-g" x1="2" y1="4" x2="38" y2="36">
          <stop offset="0" stopColor="#9ef0ff" />
          <stop offset="0.45" stopColor="#56a0ff" />
          <stop offset="1" stopColor="#8a6bff" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="11" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
      <path
        d="M9 11h5l6 9 6-9h5l-8.3 12.4V31h-5.4v-7.6L9 11Z"
        fill="url(#xmax-logo-g)"
      />
      <circle cx="30.5" cy="10.5" r="1.7" fill="#26e8ff" />
    </svg>
  );
}
