"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { useLang } from "@/components/layout/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Galería del equipo.
 *
 * Carrusel que avanza solo cada 4,5 s: las fotos se funden y la que está al
 * frente hace un zoom lento al pasar el cursor. Se puede navegar con las
 * flechas o con las miniaturas y se pausa mientras el cursor está encima.
 */
const FOTOS = [
    {
        src: "/galeria-1.jpg",
        alt: {
            es: "Colaboradora de bia Honduras en la planta",
            en: "bia Honduras team member at the plant",
        },
    },
    {
        src: "/galeria-2.jpg",
        alt: {
            es: "Colaboradores durante el turno de producción",
            en: "Team members during a production shift",
        },
    },
    {
        src: "/galeria-3.jpg",
        alt: {
            es: "Equipo de bia Honduras en las oficinas",
            en: "bia Honduras team at the offices",
        },
    },
    {
        src: "/galeria-4.jpg",
        alt: {
            es: "Colaborador de bia Honduras en planta",
            en: "bia Honduras team member at the plant",
        },
    },
];

export function TeamGallery() {
    const { pick } = useLang();
    const [activa, setActiva] = useState(0);
    const [pausado, setPausado] = useState(false);
    const total = FOTOS.length;

    useEffect(() => {
        if (pausado) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const id = window.setInterval(() => setActiva((i) => (i + 1) % total), 4500);
        return () => window.clearInterval(id);
    }, [pausado, total]);

    const ir = (delta: number) => setActiva((i) => (i + delta + total) % total);

    return (
        <section id="galeria-equipo" className="bg-white px-4 py-20 xs:px-6 md:py-28">
            <div className="shell">
                <Reveal className="mx-auto mb-12 max-w-3xl text-center">
                    <p className="kicker mb-4 justify-center">
                        {pick({ es: "Nuestro equipo", en: "Our team" })}
                    </p>
                    <h2 className="mb-5 text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                        {pick({ es: "Más de 500 historias de", en: "More than 500 stories of" })}{" "}
                        <span className="font-serif italic text-brand">
                            {pick({ es: "talento y pasión", en: "talent and passion" })}
                        </span>
                    </h2>
                    <p className="text-lg leading-relaxed text-gray-600">
                        {pick({
                            es: "Desde nuestras plantas de producción en San Pedro Sula hasta las oficinas comerciales en Tegucigalpa, cada colaborador es el motor de nuestros cafés.",
                            en: "From our production plants in San Pedro Sula to the commercial offices in Tegucigalpa, every team member is the engine of our coffees.",
                        })}
                    </p>
                </Reveal>

                <div
                    className="group/gal relative"
                    onMouseEnter={() => setPausado(true)}
                    onMouseLeave={() => setPausado(false)}
                >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-brand-light shadow-xl shadow-brand/10 xs:aspect-[16/9] md:aspect-[21/9] md:rounded-[2.5rem]">
                        {FOTOS.map((foto, i) => (
                            <div
                                key={foto.src}
                                aria-hidden={i !== activa}
                                className={`absolute inset-0 transition-opacity duration-700 ${
                                    i === activa ? "opacity-100" : "opacity-0"
                                }`}
                            >
                                <Image
                                    src={foto.src}
                                    alt={pick(foto.alt)}
                                    fill
                                    priority={i === 0}
                                    sizes="(min-width: 1024px) 90vw, 100vw"
                                    className={`object-cover transition-transform duration-[1200ms] ease-out ${
                                        i === activa ? "scale-100" : "scale-105"
                                    } group-hover/gal:scale-[1.06]`}
                                />
                            </div>
                        ))}

                        {/* Degradado inferior para el pie de foto */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

                        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                            <div>
                                <div className="mb-1 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-white/70">
                                    {pick({ es: "bia Honduras", en: "bia Honduras" })}
                                </div>
                                <div className="text-sm font-semibold">
                                    {pick({
                                        es: "San Pedro Sula · Tegucigalpa",
                                        en: "San Pedro Sula · Tegucigalpa",
                                    })}
                                </div>
                            </div>
                            <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[0.6875rem] font-semibold backdrop-blur-sm">
                                {activa + 1} / {total}
                            </span>
                        </div>

                        {/* Flechas */}
                        <button
                            type="button"
                            onClick={() => ir(-1)}
                            aria-label={pick({ es: "Anterior", en: "Previous" })}
                            className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-black/45"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" d="M15 5l-7 7 7 7" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => ir(1)}
                            aria-label={pick({ es: "Siguiente", en: "Next" })}
                            className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-black/45"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Miniaturas */}
                    <div className="mt-4 grid grid-cols-4 gap-3">
                        {FOTOS.map((foto, i) => (
                            <button
                                key={foto.src}
                                type="button"
                                onClick={() => setActiva(i)}
                                aria-label={pick(foto.alt)}
                                aria-pressed={i === activa}
                                className={`relative aspect-[16/9] overflow-hidden rounded-xl transition-all duration-300 ${
                                    i === activa
                                        ? "ring-2 ring-brand ring-offset-2 ring-offset-white"
                                        : "opacity-60 hover:opacity-100"
                                }`}
                            >
                                <Image
                                    src={foto.src}
                                    alt=""
                                    fill
                                    sizes="20vw"
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}