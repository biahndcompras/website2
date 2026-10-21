"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useLang } from "@/components/layout/LanguageProvider";
import { MariposaPill } from "@/components/ui/MariposaPill";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import type { CopyKey } from "@/data/copy";

/* -------------------------------------------------------------------------
   Portada: secciones sin estado, solo estructura y animaciones.
   ------------------------------------------------------------------------- */

function Arrow({ className = "h-4 w-4" }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7" />
        </svg>
    );
}

const STARS = Array.from({ length: 5 }, (_, i) => (
    <svg
        key={i}
        className="h-4 w-4 fill-current"
        viewBox="0 0 20 20"
        aria-hidden="true"
    >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
));

/* -------------------------------------------------------------------------
   1. Hero
   ------------------------------------------------------------------------- */
export function Hero() {
    const { t } = useLang();

    return (
        <section className="bg-dots px-4 pb-24 pt-36 xs:px-6 xs:pt-44 lg:pt-56 md:pb-32">
            <div className="shell grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
                <div className="flex flex-col justify-center lg:col-span-6">
                    <Reveal from="left">
                        <MariposaPill className="mb-7" />

                        <h1 className="hero-title mb-6">
                            <span className="block">{t("hero.titulo")}</span>
                            <span className="block">
                                <span className="whitespace-nowrap">
                                    {t("hero.tituloLine2")}
                                </span>{" "}
                                <span className="block font-serif italic text-brand md:inline">
                                    {t("hero.tituloItalic")}
                                </span>
                            </span>
                        </h1>

                        <p className="mb-8 max-w-xl leading-relaxed text-base text-gray-600 xs:text-lg">
                            {t("hero.subtitulo")}
                        </p>

                        <div className="mb-9 flex flex-col items-stretch gap-3 xs:flex-row xs:items-center">
                            <Link
                                href="/reclutamiento#vacantes"
                                className="btn inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-semibold text-white shadow-lg shadow-brand/25 hover:bg-brand-dark"
                            >
                                {t("hero.ctaVacantes")}
                                <Arrow />
                            </Link>
                            <Link
                                href="/nosotros"
                                className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-4 text-base font-semibold text-dark hover:bg-gray-50"
                            >
                                {t("hero.ctaConocer")}
                            </Link>
                        </div>

                        <div className="flex max-w-xl items-center gap-4 border-t border-gray-200/70 pt-6">
                            <div className="flex -space-x-2.5 shrink-0">
                                {["avatar-1", "avatar-2", "avatar-3"].map((a) => (
                                    <Image
                                        key={a}
                                        src={`/${a}.webp`}
                                        alt=""
                                        width={36}
                                        height={36}
                                        className="h-9 w-9 rounded-full border-2 border-white object-cover"
                                    />
                                ))}
                            </div>
                            <div className="text-sm leading-tight">
                                <div className="flex items-center gap-1.5">
                                    <span className="flex text-amber-400" aria-hidden="true">
                                        {STARS}
                                    </span>
                                    <span className="font-semibold text-dark">4.9</span>
                                </div>
                                <div className="text-xs text-gray-500">
                                    {t("hero.pruebaSocial")}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                <Reveal from="right" className="lg:col-span-6">
                    {/* La foto marca la altura del bloque: sin min-height fijo en
                        escritorio, las dos columnas quedan a la misma altura. */}
                    <figure className="group relative h-full min-h-[440px] overflow-hidden rounded-[2rem] shadow-xl shadow-brand/10 lg:min-h-[620px]">
                        <Image
                            src="/hero-planta.jpg"
                            alt={t("hero.imagenAlt")}
                            fill
                            priority
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                        <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                            <div>
                                <div className="mb-1 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-white/70">
                                    {t("hero.imagenEtiqueta")}
                                </div>
                                <div className="text-sm font-semibold">
                                    {t("hero.ubicacion")}
                                </div>
                            </div>
                            <span className="shrink-0 px-3">12 centros</span>
                        </figcaption>
                    </figure>
                </Reveal>
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------
   2. Cultura & Beneficios
   ------------------------------------------------------------------------- */
const PILLARS: {
    key: CopyKey;
    desc: CopyKey;
    foot: CopyKey;
    icon: "pin" | "layers" | "people";
}[] = [
    { key: "cultura.p1.titulo", desc: "cultura.p1.desc", foot: "cultura.p1.pie", icon: "pin" },
    { key: "cultura.p2.titulo", desc: "cultura.p2.desc", foot: "cultura.p2.pie", icon: "layers" },
    { key: "cultura.p3.titulo", desc: "cultura.p3.desc", foot: "cultura.p3.pie", icon: "people" },
];

const PILLAR_ICON = {
    pin: (
        <>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-4.35-7-9a7 7 0 1114 0c0 4.65-7 9-7 9z" />
            <circle cx="12" cy="12" r="2.5" />
        </>
    ),
    layers: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 5-9 5-9-5 9-5zm-9 10l9 5 9-5M3 17l9 5 9-5" />
    ),
    people: (
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.36-1.86M17 20H7m10 0v-2c0-.66-.13-1.3-.36-1.86M7 20H2v-2a3 3 0 015.36-1.86M7 20v-2c0-.66.13-1.3.36-1.86m0 0a5.002 5.002 0 019.28 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
    ),
};

export function Culture() {
    const { t } = useLang();

    return (
        <section id="cultura" className="bg-surface px-4 py-20 xs:px-6 md:py-28">
            <div className="shell">
                <Reveal className="mx-auto mb-14 max-w-3xl text-center">
                    <p className="kicker mb-4 justify-center">{t("cultura.kicker")}</p>
                    <h2 className="text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                        {t("cultura.titulo")}
                        <br />
                        <span className="font-serif italic text-brand">
                            {t("cultura.tituloItalic")}
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600">{t("cultura.subtitulo")}</p>
                </Reveal>

                <RevealGroup
                    stagger={0.14}
                    className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3"
                >
                    {PILLARS.map((pillar) => (
                        <article
                            key={pillar.key}
                            className="stack-card card-hover group flex flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm"
                        >
                            <div className="relative h-52 overflow-hidden">
                                <Image
                                    src="/hero-planta.jpg"
                                    alt={t("cultura.imagenAlt")}
                                    fill
                                    sizes="(min-width: 768px) 33vw, 100vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <span className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/95 text-brand shadow-sm backdrop-blur-sm">
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        {PILLAR_ICON[pillar.icon]}
                                    </svg>
                                </span>
                            </div>

                            <div className="flex flex-1 flex-col p-8 xs:p-10">
                                <h3 className="mb-3 text-2xl font-medium">{t(pillar.key)}</h3>
                                <p className="mb-6 leading-relaxed text-gray-600">
                                    {t(pillar.desc)}
                                </p>
                                <p
                                    className={`mt-auto border-t border-gray-100 pt-5 text-sm font-medium ${
                                        pillar.key === "cultura.p1.titulo"
                                            ? "text-cafe"
                                            : pillar.key === "cultura.p3.titulo"
                                              ? "text-green-600"
                                              : "text-brand"
                                    }`}
                                >
                                    {t(pillar.foot)}
                                </p>
                            </div>
                        </article>
                    ))}
                </RevealGroup>

                <Reveal className="rounded-[2rem] border border-gray-100 bg-white p-8 xs:p-10 md:rounded-[2.5rem] md:p-12">
                    <h3 className="mb-8 text-2xl font-medium md:text-3xl">
                        {t("cultura.beneficios")}
                    </h3>
                    <ul className="grid grid-cols-1 gap-x-8 gap-y-5 xs:grid-cols-2 lg:grid-cols-3">
                        {(
                            [
                                "cultura.beneficio1",
                                "cultura.beneficio2",
                                "cultura.beneficio3",
                                "cultura.beneficio4",
                                "cultura.beneficio5",
                                "cultura.beneficio6",
                            ] as CopyKey[]
                        ).map((key) => (
                            <li key={key} className="flex items-start gap-3">
                                <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-brand" />
                                <span className="text-gray-600">{t(key)}</span>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------
   3. Presencia & Operaciones
   ------------------------------------------------------------------------- */
const OPS: {
    num: string;
    img: string;
    key: CopyKey;
    desc: CopyKey;
    flip: boolean;
    /** Número en azul de marca o en café, según el bloque. */
    accent: "brand" | "cafe";
    foot?: CopyKey;
    chips?: { key: CopyKey; strong?: boolean }[];
}[] = [
    {
        num: "01",
        img: "/ops-planta.svg",
        key: "operaciones.b1.titulo",
        desc: "operaciones.b1.desc",
        flip: false,
        accent: "brand",
        foot: "operaciones.b1.puntos",
    },
    {
        num: "02",
        img: "/ops-calidad.svg",
        key: "operaciones.b2.titulo",
        desc: "operaciones.b2.desc",
        flip: true,
        accent: "brand",
        chips: [
            { key: "marcas.sensorial.qgrader", strong: true },
            { key: "marcas.sensorial.laboratorio" },
            { key: "marcas.sensorial.cata" },
        ],
    },
    {
        num: "03",
        img: "/ops-cafetal.svg",
        key: "operaciones.b3.titulo",
        desc: "operaciones.b3.desc",
        flip: false,
        accent: "cafe",
        foot: "operaciones.b3.pie",
    },
];

export function Operations() {
    const { t } = useLang();

    return (
        <section id="operaciones" className="bg-surface px-4 py-20 xs:px-6 md:py-28">
            {/* El espacio va en el contenedor: las cards son sus hijas directas */}
            <div className="shell space-y-10 xs:space-y-12">
                <Reveal className="mb-14 max-w-3xl">
                    <p className="kicker mb-4">{t("operaciones.kicker")}</p>
                    <h2 className="text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                        {t("operaciones.titulo")}{" "}
                        <span className="font-serif italic text-brand">
                            {t("operaciones.tituloItalic")}
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        {t("operaciones.subtitulo")}
                    </p>
                </Reveal>

                {OPS.map((op) => (
                    <Reveal
                        key={op.num}
                        from={op.flip ? "right" : "left"}
                        className="stack-card flex flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-white md:rounded-[2.5rem] lg:flex-row"
                    >
                        <div
                            className={`relative h-[260px] overflow-hidden lg:h-auto lg:w-1/2 ${
                                // La card del medio invierte el orden: imagen a la
                                // derecha y texto a la izquierda en escritorio.
                                op.flip ? "lg:order-2" : ""
                            } ${op.accent === "cafe" ? "bg-cafe/10" : "bg-brand-light"}`}
                        >
                            {/* Sin `fill`: la ilustración mantiene su proporción
                                3:2 y es ella la que da altura a la tarjeta, como
                                en el diseño de referencia. */}
                            <Image
                                src={op.img}
                                alt=""
                                width={1200}
                                height={800}
                                unoptimized
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                className="h-full w-full object-cover lg:h-auto"
                            />
                        </div>
                        <div
                            className={`flex flex-col justify-center p-8 xs:p-10 md:p-14 lg:w-1/2 ${
                                op.flip ? "lg:order-1" : ""
                            }`}
                        >
                            <span
                                className={`mb-4 text-xs font-bold uppercase tracking-widest ${
                                    op.accent === "cafe" ? "text-cafe" : "text-brand"
                                }`}
                            >
                                {op.num}
                            </span>
                            <h3 className="mb-4 text-2xl font-medium xs:text-3xl">
                                {t(op.key)}
                            </h3>
                            <p className="mb-6 leading-relaxed text-gray-600">
                                {t(op.desc)}
                            </p>

                            {op.chips && (
                                <div className="flex flex-wrap gap-2">
                                    {op.chips.map((chip) => (
                                        <span
                                            key={chip.key}
                                            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                                                chip.strong
                                                    ? "bg-brand-light text-brand"
                                                    : "bg-gray-100 text-gray-600"
                                            }`}
                                        >
                                            {t(chip.key)}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {op.foot && (
                                <p
                                    className={
                                        op.accent === "cafe"
                                            ? "text-sm font-medium text-cafe"
                                            : "text-xs font-bold uppercase tracking-widest text-gray-400"
                                    }
                                >
                                    {t(op.foot)}
                                </p>
                            )}
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------
   4. Voces — marquesina horizontal
   ------------------------------------------------------------------------- */
const VOICES = [
    {
        img: "avatar-4",
        name: "Karla Zelaya",
        role: { es: "Coordinadora de Calidad · Planta San Pedro Sula", en: "Quality Coordinator · San Pedro Sula Plant" },
        quote: {
            es: "Entré como operaria de empaque y hoy soy coordinadora de calidad. Aquí te dan la oportunidad de aprender y te la tomas.",
            en: "I started as a packaging operator and today I am a quality coordinator. Here they give you the chance to learn, and you take it.",
        },
    },
    {
        img: "avatar-5",
        name: "Josué Discua",
        role: { es: "Jefe de Turno · Planta Tegucigalpa", en: "Shift Lead · Tegucigalpa Plant" },
        quote: {
            es: "Llevo cuatro años en la planta de Tegucigalpa. Aprendí el oficio completo y hoy lidero un equipo de nueve personas.",
            en: "Four years at the Tegucigalpa plant. I learned the whole craft and today I lead a team of nine.",
        },
    },
    {
        img: "avatar-6",
        name: "María Sandoval",
        role: { es: "Analista de Aseguramiento de Calidad · San Pedro Sula", en: "Quality Assurance Analyst · San Pedro Sula" },
        quote: {
            es: "La Universidad Apex me permitió certificarme en control de calidad sin dejar mi puesto. Eso no pasa en muchos lugares.",
            en: "Universidad Apex let me certify in quality control without leaving my job. That does not happen in many places.",
        },
    },
    {
        img: "avatar-1",
        name: "Daniel Cruz",
        role: { es: "Representante de Ventas · Valle de Ángeles", en: "Sales Representative · Valle de Ángeles" },
        quote: {
            es: "En bia vendemos marcas que están en la casa de mi mamá desde que era niña. Eso da un orgullo que no se explica.",
            en: "At bia we sell brands that have been in my mother's house since I was a child. That pride is hard to explain.",
        },
    },
];

/** Cuántas copias hacen falta para cubrir el ancho de la ventana. */
function copiesNeeded(viewport: number, copyWidth: number) {
    if (!viewport || !copyWidth) return 2;
    return Math.min(6, Math.max(2, Math.ceil((viewport + copyWidth) / copyWidth)));
}

export function Voices() {
    const { t, pick } = useLang();
    const trackRef = useRef<HTMLDivElement>(null);
    const [copies, setCopies] = useState(2);

    // Con dos copias fijas la cinta se queda corta en pantallas anchas
    // (monitor 4K, zoom bajo) y se ve un hueco a la derecha. Se repite el
    // grupo hasta cubrir el ancho disponible y se recalcula al redimensionar.
    useEffect(() => {
        const measure = () => {
            const track = trackRef.current;
            const copy = track?.firstElementChild;
            if (!track || !copy) return;
            setCopies(copiesNeeded(window.innerWidth, copy.getBoundingClientRect().width));
        };

        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    return (
        <section
            id="voces"
            className="overflow-hidden border-t border-gray-200 bg-white py-20 md:py-28"
        >
            <Reveal className="mx-auto mb-14 max-w-3xl px-6 text-center">
                <p className="kicker mb-4 justify-center">{t("voces.kicker")}</p>
                <h2 className="text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                    {t("voces.titulo")}{" "}
                    <span className="font-serif italic text-brand">
                        {t("voces.tituloItalic")}
                    </span>
                </h2>
            </Reveal>

            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent sm:w-40" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent sm:w-40" />

                <div
                    ref={trackRef}
                    className="marquee-track flex w-max motion-safe:animate-marquee"
                    style={
                        {
                            "--copias": copies,
                            "--duracion": `${22.5 * copies}s`,
                        } as React.CSSProperties
                    }
                    aria-label={t("voces.kicker")}
                >
                    {/* Copias idénticas: al desplazarse una entera el bucle
                        es continuo y siempre hay contenido en toda la pantalla. */}
                    {Array.from({ length: copies }, (_, copy) => (
                        <div key={copy} className="flex shrink-0 gap-6 pr-6">
                            {VOICES.map((v) => (
                                <figure
                                    key={`${v.name}-${copy}`}
                                    className="marquee-item w-[340px] shrink-0 rounded-2xl border border-gray-100 bg-surface p-8 xs:w-[380px]"
                                    aria-hidden={copy > 0}
                                >
                                    <div
                                        className="mb-4 flex space-x-1 text-brand"
                                        role="img"
                                        aria-label={t("voces.estrellas")}
                                    >
                                        {STARS}
                                    </div>
                                    <blockquote className="mb-6 font-medium leading-relaxed text-gray-700">
                                        “{pick(v.quote)}”
                                    </blockquote>
                                    <figcaption className="flex items-center">
                                        <Image
                                            src={`/${v.img}.webp`}
                                            alt=""
                                            width={44}
                                            height={44}
                                            className="mr-3 h-11 w-11 shrink-0 rounded-full object-cover"
                                        />
                                        <div className="min-w-0">
                                            <div className="text-sm font-bold">
                                                {v.name}
                                            </div>
                                            <div className="truncate text-xs text-gray-500">
                                                {pick(v.role)}
                                            </div>
                                        </div>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
