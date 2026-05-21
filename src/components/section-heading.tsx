import { Reveal } from "@/components/reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: Props) {
  return (
    <Reveal>
      <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="mt-3 h-display text-balance text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-tighter-display tracking-tightest text-white">
          {title}
        </h2>
        {description && (
          <p className="mt-5 text-pretty text-base leading-relaxed text-carbon-200">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
