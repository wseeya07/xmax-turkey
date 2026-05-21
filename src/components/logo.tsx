import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      className={cn("", className)}
    >
      <defs>
        <linearGradient id="xmax-g" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path
        d="M5 6h7l8 13L28 6h7L23 24v10h-6V24L5 6Z"
        fill="url(#xmax-g)"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <circle cx="34" cy="8" r="2.2" fill="currentColor" />
    </svg>
  );
}
