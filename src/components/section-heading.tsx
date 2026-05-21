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
        <span className="chip">
          <span className="size-1.5 rounded-full bg-yamaha-300" />
          {eyebrow}
        </span>
        <h2 className="mt-4 h-display text-balance text-3xl font-semibold leading-[1.05] text-white sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-pretty text-base leading-relaxed text-carbon-200 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
