"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { useLang } from "@/components/layout/LanguageProvider";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRANDS } from "@/data/brands";
import type { I18nText } from "@/data/types";

type Hito = {
    year: string;
    title: I18nText;
    text: I18nText;
    /** Logo de la marca que nace en ese año; se omite en el hito "hoy". */
    brand?: string;
};

const HITOS: Hito[] = [
    {
        year: "1935",
        title: { es: "Nace Café Maya", en: "Café Maya is born" },
        text: {
            es: "La marca insignia de la casa, seleccionada en las tierras altas del occidente de Honduras.",
            en: "The house flagship brand, selected in the highlands of western Honduras.",
        },
        brand: "maya",
    },
    {
        year: "1948",
        title: { es: "Café El Indio", en: "Café El Indio" },
        text: {
            es: "El café con que despierta Honduras: tres generaciones despachándolo cada mañana.",
            en: "The coffee Honduras wakes up to: three generations delivering it every morning.",
        },
        brand: "indio",
    },
    {
        year: "1972",
        title: { es: "Café Oro", en: "Café Oro" },
        text: {
            es: "Cosecha de altura para clientes que buscan origen, trazabilidad y un dulzor limpio.",
            en: "High-altitude lots for clients who look for origin, traceability and a clean sweetness.",
        },
        brand: "oro",
    },
    {
        year: "1985",
        title: { es: "Café Medalla", en: "Café Medalla" },
        text: {
            es: "Fuerza, energía y consistencia para el canal de mayor consumo del país.",
            en: "Strength, energy and consistency for the country's highest-volume channel.",
        },
        brand: "medalla",
    },
    {
        year: "hoy",
        title: { es: "bia Honduras", en: "bia Honduras" },
        text: {
            es: "12 centros y plantas operativas, más de 500 colaboradores y un compromiso redondo con las comunidades cafetaleras.",
            en: "12 operating centers and plants, more than 500 team members and a firm commitment to coffee-growing communities.",
        },
    },
];

/**
 * Línea de tiempo de la casa.
 *
 * El trazo vertical se pinta a medida que los hitos entran en pantalla y
 * cada punto se enciende cuando la línea llega a su altura (y se queda
 * encendido: es una narrativa, no un estado reversible).
 */
export function Timeline() {
    const { pick, lang } = useLang();
    const listRef = useRef<HTMLOListElement>(null);
    const railRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const list = listRef.current;
        const rail = railRef.current;
        if (!list || !rail) return;

        const items = Array.from(list.querySelectorAll<HTMLElement>(".timeline-item"));

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            rail.style.height = "100%";
            items.forEach((item) => item.classList.add("is-lit"));
            return;
        }

        const ctx = gsap.context(() => {
            gsap.to(rail, {
                height: list.offsetHeight,
                ease: "none",
                scrollTrigger: {
                    trigger: list.parentElement,
                    start: "top 78%",
                    end: "bottom 70%",
                    scrub: 0.4,
                },
            });

            items.forEach((item) => {
                const light = () => item.classList.add("is-lit");
                ScrollTrigger.create({ trigger: item, start: "top 78%", onEnter: light, onEnterBack: light });

                const logo = item.querySelector(".timeline-logo");
                if (!logo) return;
                gsap.fromTo(
                    logo,
                    { scale: 0.92 },
                    {
                        scale: 1,
                        duration: 0.6,
                        ease: "back.out(1.8)",
                        scrollTrigger: { trigger: item, start: "top 78%", once: true },
                    },
                );
            });
        }, list);

        // Al cambiar de idioma el texto cambia de alto: hay que recalcular
        // dónde caen el trazo y los disparadores.
        const refresh = () => ScrollTrigger.refresh();
        const id = window.setTimeout(refresh, 120);

        return () => {
            window.clearTimeout(id);
            ctx.revert();
            items.forEach((item) => item.classList.remove("is-lit"));
        };
    }, [lang]);

    return (
        <ol ref={listRef} className="relative space-y-8 xs:space-y-10">
            {/* Trazo del eje y avance */}
            <span
                className="absolute bottom-6 left-7 top-6 w-0.5 -translate-x-1/2 rounded-full bg-gray-100"
                aria-hidden="true"
            />
            <span
                ref={railRef}
                className="absolute left-7 top-6 h-0 w-0.5 -translate-x-1/2 rounded-full bg-brand"
                aria-hidden="true"
            />

            {HITOS.map((hito) => {
                const brand = BRANDS.find((b) => b.id === hito.brand);

                return (
                    <li
                        key={hito.year}
                        className="timeline-item relative flex items-start gap-5 xs:gap-6"
                    >
                        <div className="timeline-marker relative w-14 shrink-0 xs:w-16">
                            {brand ? (
                                <Image
                                    src={brand.logo}
                                    alt={`Logo ${brand.name}`}
                                    width={brand.logoSize.width}
                                    height={brand.logoSize.height}
                                    className="timeline-logo relative z-10 h-14 w-14 rounded-full object-cover xs:h-16 xs:w-16"
                                />
                            ) : (
                                <span className="timeline-logo timeline-logo--hoy relative z-10 grid h-14 w-14 place-items-center overflow-hidden rounded-full bg-white xs:h-16 xs:w-16">
                                    <Image
                                        src="/bia-main-white.png"
                                        alt="bia Honduras"
                                        width={3687}
                                        height={927}
                                        sizes="64px"
                                        className="h-auto w-9 xs:w-10"
                                    />
                                </span>
                            )}
                        </div>

                        <div className="min-w-0 flex-1 pt-1.5">
                            <div className="timeline-year mb-2 text-lg font-semibold leading-none xs:text-xl">
                                {hito.year === "hoy"
                                    ? pick({ es: "Hoy", en: "Today" })
                                    : hito.year}
                            </div>
                            <h3 className="timeline-title mb-2 text-base font-semibold xs:text-lg">
                                {pick(hito.title)}
                            </h3>
                            <p className="text-sm leading-relaxed xs:text-base">
                                {pick(hito.text)}
                            </p>
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}
