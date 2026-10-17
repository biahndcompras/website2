"use client";

import { useEffect, useRef } from "react";

import { useLang } from "@/components/layout/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import type { CopyKey } from "@/data/copy";

/** Cifra que cuenta hacia arriba cuando entra en pantalla. */
export function Counter({
    to,
    prefix = "",
    suffix = "",
}: {
    to: number;
    prefix?: string;
    suffix?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);

    // Texto inicial en el servidor: si el JS no corre, la cifra es correcta
    const initial = `${prefix}${to.toLocaleString("es-HN")}${suffix}`;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const decimals = String(to).includes(".") ? 1 : 0;
        const render = (value: number) => {
            el.textContent =
                prefix +
                value.toLocaleString("es-HN", {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                }) +
                suffix;
        };

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            render(to);
            return;
        }

        render(0);

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries[0]?.isIntersecting) return;
                observer.disconnect();

                const start = performance.now();
                const DURATION = 1600;

                const tick = (now: number) => {
                    const p = Math.min(1, (now - start) / DURATION);
                    render(to * (1 - Math.pow(1 - p, 3)));
                    if (p < 1) requestAnimationFrame(tick);
                    else render(to);
                };
                requestAnimationFrame(tick);
            },
            { threshold: 0.4 },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [to, prefix, suffix]);

    return <span ref={ref}>{initial}</span>;
}

export type StatItem = {
    to: number;
    prefix?: string;
    suffix?: string;
    key: CopyKey;
    /** Color de la cifra: blanco o crema para destacar la última. */
    tone?: "white" | "crema";
};

/**
 * Franja de métricas: bloque azul de marca con el ancho del contenedor.
 * Se sitúa después de las vacantes destacadas.
 */
export default function StatsBar({ items }: { items: StatItem[] }) {
    const { t } = useLang();

    return (
        <section className="px-4 pb-4 xs:px-6 xs:pb-6">
            <Reveal
                from="scale"
                className="shell relative overflow-hidden rounded-[2rem] bg-brand bg-dots-brand px-6 py-10 shadow-2xl shadow-brand/20 md:rounded-[2.5rem] md:py-14 xs:px-10"
            >
                {/* Acento cálido de café que suaviza el bloque azul */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-cafe/25 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

                <dl className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
                    {items.map((item) => (
                        <div key={item.key} className="text-center lg:text-left">
                            <dd
                                className={`stat-value mb-2 text-4xl font-medium xs:text-5xl ${
                                    item.tone === "crema" ? "text-crema" : "text-white"
                                }`}
                            >
                                <Counter
                                    to={item.to}
                                    prefix={item.prefix}
                                    suffix={item.suffix}
                                />
                            </dd>
                            <dt className="text-xs font-medium text-white/75 xs:text-sm">
                                {t(item.key)}
                            </dt>
                        </div>
                    ))}
                </dl>
            </Reveal>
        </section>
    );
}
