import { AlertTriangle, Lightbulb } from "lucide-react";
import { Reveal } from "@/components/reveal";

export type GuideStep = {
  title: string;
  body: string;
  tip?: string;
  warning?: string;
};

export function GuideSteps({ steps }: { steps: GuideStep[] }) {
  return (
    <section className="mt-10">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-300">
        Adımlar
      </div>
      <ol className="mt-6 space-y-4">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.04}>
            <li className="glass gradient-edge p-6 sm:p-7">
              <div className="flex items-start gap-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-yamaha-400/30 bg-gradient-to-b from-yamaha-500/20 to-yamaha-700/10 font-mono text-sm font-semibold text-yamaha-100">
                  0{i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="h-display text-xl font-semibold leading-tight text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-carbon-100">
                    {s.body}
                  </p>
                  {s.tip && (
                    <div className="mt-4 flex gap-3 rounded-xl border border-yamaha-400/30 bg-yamaha-500/10 p-4 text-sm leading-relaxed text-yamaha-50">
                      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-yamaha-200" />
                      <span>
                        <span className="font-semibold text-yamaha-100">İpucu — </span>
                        {s.tip}
                      </span>
                    </div>
                  )}
                  {s.warning && (
                    <div className="mt-4 flex gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm leading-relaxed text-red-50">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                      <span>
                        <span className="font-semibold text-red-200">Uyarı — </span>
                        {s.warning}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
