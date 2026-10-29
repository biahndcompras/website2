"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { useLang } from "@/components/layout/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Menciones de prensa y reconocimientos.
 *
 * Galería circular: la mención activa queda al frente y a tamaño completo;
 * las otras dos asoman a los lados, reducidas y atenuadas. Se puede navegar
 * con las flechas, con los puntos o haciendo clic en una medalla.
 */
const MENCIONES = [
    {
        medio: "Revista Summa",
        soporte: { es: "BrandLab", en: "BrandLab" },
        titulo: {
            es: "bia Honduras: la esencia del café hondureño",
            en: "bia Honduras: the essence of Honduran coffee",
        },
        detalle: {
            es: "Reportaje sobre cómo el portafolio conecta con la cultura, las tradiciones y el día a día de las familias hondureñas.",
            en: "A feature on how the portfolio connects with Honduran culture, traditions and everyday family life.",
        },
        year: "2026",
        img: "/cafeoro.jpg",
        tinte: "from-[#0B1B33]/85 via-[#1C3565]/55",
    },
    {
        medio: "E&N BrandLab",
        soporte: { es: "Revista Estrategia & Negocios", en: "Estrategia & Negocios" },
        titulo: {
            es: "bia Honduras impulsa talento, café e identidad regional",
            en: "bia Honduras drives talent, coffee and regional identity",
        },
        detalle: {
            es: "Con más de 540 colaboradores, la compañía articula tradición cafetera, desarrollo de talento y encadenamientos productivos.",
            en: "With more than 540 team members, the company links coffee tradition, talent development and local supply chains.",
        },
        year: "2026",
        img: "/hero-planta.jpg",
        tinte: "from-[#1C3565]/85 via-[#4A88FA]/50",
    },
    {
        medio: "LinkedIn",
        soporte: { es: "bia Honduras", en: "bia Honduras" },
        titulo: {
            es: "#OrgulloQueSeCultiva: cada taza cuenta una historia",
            en: "#OrgulloQueSeCultiva: every cup tells a story",
        },
        detalle: {
            es: "Reconocimiento a los colaboradores, clientes y aliados que mantienen vivo el legado de las cuatro marcas.",
            en: "Recognition for the team members, clients and partners who keep the legacy of the four brands alive.",
        },
        year: "2026",
        img: "/ops-planta.svg",
        tinte: "from-[#0A66C2]/85 via-[#1C3565]/55",
    },
];

export function Prensa() {
    const { pick } = useLang();
    const [activo, setActivo] = useState(0);
    const [pausado, setPausado] = useState(false);
    const total = MENCIONES.length;

    // Rotación automática: se detiene al pasar el cursor y con movimiento
    // reducido.
    useEffect(() => {
        if (pausado) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const id = window.setInterval(() => setActivo((i) => (i + 1) % total), 6000);
        return () => window.clearInterval(id);
    }, [pausado, total]);

    const ir = (delta: number) => setActivo((i) => (i + delta + total) % total);
    const mencion = MENCIONES[activo];

    return (
        <section id="prensa" className="overflow-hidden bg-surface px-4 py-20 xs:px-6 md:py-28">
            <div className="shell">
                <Reveal className="mx-auto mb-12 max-w-3xl text-center">
                    <p className="kicker mb-4 justify-center">
                        {pick({ es: "Prensa y reconocimientos", en: "Press and recognition" })}
                    </p>
                    <h2 className="mb-5 text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                        {pick({ es: "Reconocidos por lo que", en: "Recognised for what" })}{" "}
                        <span className="font-serif italic text-brand">
                            {pick({ es: "construimos juntos", en: "we build together" })}
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        {pick({
                            es: "Espacio para menciones como Revista Summa y otros reconocimientos recientes de bia y Grupo Mariposa.",
                            en: "A space for mentions such as Revista Summa and other recent recognition for bia and Grupo Mariposa.",
                        })}
                    </p>
                </Reveal>

                <div
                    className="relative mx-auto max-w-4xl"
                    onMouseEnter={() => setPausado(true)}
                    onMouseLeave={() => setPausado(false)}
                >
                    {/* Galería circular */}
                    <div className="relative mx-auto h-[19rem] w-full xs:h-[22rem] md:h-[26rem]">
                        {MENCIONES.map((m, i) => {
                            // 0 = al frente, 1 = derecha, 2 = izquierda
                            const posicion = (i - activo + total) % total;
                            const frente = posicion === 0;
                            const derecha = posicion === 1;

                            return (
                                <button
                                    key={m.medio}
                                    type="button"
                                    onClick={() => setActivo(i)}
                                    aria-pressed={frente}
                                    aria-label={m.medio}
                                    tabIndex={frente ? 0 : -1}
                                    style={{
                                        transform: `translate(-50%, -50%) translateX(${
                                            frente ? 0 : derecha ? 62 : -62
                                        }%) scale(${frente ? 1 : 0.68})`,
                                    }}
                                    className={`absolute left-1/2 top-1/2 aspect-square w-[62%] max-w-[19rem] overflow-hidden rounded-full border-4 border-white bg-brand-dark shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] xs:w-[54%] md:w-[46%] ${
                                        frente
                                            ? "z-30 opacity-100"
                                            : "z-20 opacity-45 hover:opacity-80"
                                    }`}
                                >
                                    <Image
                                        src={m.img}
                                        alt=""
                                        fill
                                        sizes="(min-width: 768px) 34vw, 60vw"
                                        className="object-cover"
                                    />
                                    <span
                                        className={`absolute inset-0 bg-gradient-to-t ${m.tinte} to-transparent`}
                                        aria-hidden="true"
                                    />
                                    <span className="absolute inset-0 grid place-items-center p-6 text-center">
                                        <span className="text-xl font-medium leading-tight text-white xs:text-2xl md:text-[1.75rem]">
                                            {m.medio}
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Texto de la mención activa */}
                    <div className="mx-auto mt-4 max-w-xl text-center md:mt-2">
                        <div
                            key={activo}
                            className="motion-safe:animate-[hero-in_0.6s_cubic-bezier(0.22,1,0.36,1)_both]"
                        >
                            <div className="mb-2 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-gray-400">
                                {pick(mencion.soporte)} · {mencion.year}
                            </div>
                            <h3 className="mb-3 text-xl font-medium leading-snug xs:text-2xl">
                                {pick(mencion.titulo)}
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-600 xs:text-base">
                                {pick(mencion.detalle)}
                            </p>
                        </div>

                        {/* Controles */}
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <button
                                type="button"
                                onClick={() => ir(-1)}
                                aria-label={pick({ es: "Anterior", en: "Previous" })}
                                className="grid h-11 w-11 place-items-center rounded-full border border-gray-200 bg-white text-dark transition-colors hover:border-brand hover:text-brand"
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

                            <div className="flex items-center gap-2">
                                {MENCIONES.map((m, i) => (
                                    <button
                                        key={m.medio}
                                        type="button"
                                        onClick={() => setActivo(i)}
                                        aria-label={m.medio}
                                        aria-pressed={activo === i}
                                        className={`h-2 rounded-full transition-all ${
                                            activo === i
                                                ? "w-8 bg-brand"
                                                : "w-2 bg-gray-300 hover:bg-gray-400"
                                        }`}
                                    />
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() => ir(1)}
                                aria-label={pick({ es: "Siguiente", en: "Next" })}
                                className="grid h-11 w-11 place-items-center rounded-full border border-gray-200 bg-white text-dark transition-colors hover:border-brand hover:text-brand"
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
                    </div>
                </div>
            </div>
        </section>
    );
}