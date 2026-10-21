"use client";

import Image from "next/image";
import Link from "next/link";

import BrandExplorer from "@/components/sections/BrandExplorer";
import StatsBar, { type StatItem } from "@/components/sections/StatsBar";
import { Timeline } from "@/components/sections/Timeline";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { useLang } from "@/components/layout/LanguageProvider";
import { MariposaPill } from "@/components/ui/MariposaPill";
import { useApply } from "@/components/ui/ApplyProvider";
import type { CopyKey } from "@/data/copy";

export const STATS: StatItem[] = [
    { to: 500, prefix: "+", key: "stats.colaboradores" },
    { to: 12, key: "stats.centros" },
    { to: 4, key: "nosotros.marcas" },
    { to: 90, suffix: "+", key: "stats.anos", tone: "crema" },
];

/* ------------------------------------------------------------------ Hero */
function Hero() {
    const { t } = useLang();

    return (
        <section className="bg-dots px-4 pb-16 pt-32 xs:px-6 xs:pt-40 md:pb-24">
            <div className="shell grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <Reveal className="lg:col-span-7">
                    <p className="kicker mb-5">{t("nav.nosotros")}</p>
                    <h1 className="hero-title mb-6">
                        <span className="block">{t("nosotros.h1a")}</span>
                        <span className="block font-serif italic text-brand">
                            {t("nosotros.h1b")}
                        </span>
                    </h1>
                    <p className="max-w-xl text-lg leading-relaxed text-gray-600">
                        {t("nosotros.subtitulo")}
                    </p>

                    <div className="mt-9 flex flex-col gap-3 xs:flex-row">
                        <Link
                            href="/cultura-beneficios"
                            className="btn inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-semibold text-white shadow-xl shadow-brand/30 hover:bg-brand-dark"
                        >
                            {t("nosotros.ctaCultura")}
                        </Link>
                        <Link
                            href="/reclutamiento"
                            className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-4 text-base font-semibold text-dark hover:bg-gray-50"
                        >
                            {t("nav.reclutamiento")}
                        </Link>
                    </div>
                </Reveal>

                <Reveal from="right" className="lg:col-span-5">
                    <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-brand-light shadow-2xl shadow-brand/10">
                        <Image
                            src="/nosotros-planta.svg"
                            alt="Planta de bia Honduras en San Pedro Sula"
                            width={1200}
                            height={800}
                            unoptimized
                            sizes="(min-width: 1024px) 42vw, 100vw"
                            className="h-auto w-full"
                        />
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* -------------------------------------------------------------- Historia */
function Historia() {
    const { t } = useLang();

    return (
        <section id="historia" className="bg-white px-4 py-20 xs:px-6 md:py-28">
            <div className="shell">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
                    <Reveal className="lg:col-span-5">
                        <p className="kicker mb-4">{t("nosotros.historiaKicker")}</p>
                        <h2 className="mb-6 text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                            {t("nosotros.historiaH2a")}
                            <br />
                            <span className="font-serif italic text-brand">
                                {t("nosotros.historiaH2b")}
                            </span>
                        </h2>
                        <p className="text-lg leading-relaxed text-gray-600">
                            {t("nosotros.historiaP")}
                        </p>

                        <Link href="/#marcas" className="link-arrow mt-8">
                            {t("marcas.verVacantes")}
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" d="M14 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </Reveal>

                    <Reveal from="right" className="lg:col-span-7">
                        <Timeline />
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* --------------------------------------------------------------- Centros */
const CENTROS: { img: string; label: string; key: CopyKey; desc: CopyKey }[] = [
    {
        img: "/ops-planta.svg",
        label: "San Pedro Sula · Cortés",
        key: "operaciones.b1.titulo",
        desc: "operaciones.b1.desc",
    },
    {
        img: "/ops-calidad.svg",
        label: "Todos los centros",
        key: "operaciones.b2.titulo",
        desc: "operaciones.b2.desc",
    },
    {
        img: "/ops-cafetal.svg",
        label: "Comunidades cafetaleras",
        key: "operaciones.b3.titulo",
        desc: "operaciones.b3.desc",
    },
];

function Centros() {
    const { t } = useLang();

    return (
        <section id="centros" className="bg-white px-4 py-20 xs:px-6 md:py-28">
            <div className="shell">
                <Reveal className="mb-14 max-w-3xl">
                    <p className="kicker mb-4">{t("operaciones.kicker")}</p>
                    <h2 className="mb-5 text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                        {t("nosotros.centrosH2a")}
                        <span className="font-serif italic text-brand">
                            {" "}
                            {t("nosotros.centrosH2b")}
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600">{t("operaciones.subtitulo")}</p>
                </Reveal>

                <RevealGroup
                    stagger={0.14}
                    className="grid grid-cols-1 gap-6 md:grid-cols-3"
                >
                    {CENTROS.map((c) => (
                        <article
                            key={c.key}
                            className="card-hover overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm"
                        >
                            <div className="relative h-48 overflow-hidden bg-brand-light">
                                <Image
                                    src={c.img}
                                    alt=""
                                    fill
                                    unoptimized
                                    sizes="(min-width: 768px) 33vw, 100vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-8">
                                <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-brand">
                                    {c.label}
                                </span>
                                <h3 className="mb-2 text-xl font-medium">{t(c.key)}</h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    {t(c.desc)}
                                </p>
                            </div>
                        </article>
                    ))}
                </RevealGroup>
            </div>
        </section>
    );
}

/* --------------------------------------------------------- Grupo Mariposa */
function GrupoMariposa() {
    const { t } = useLang();
    const { open } = useApply();

    return (
        <section id="grupo-mariposa" className="bg-surface px-4 py-20 xs:px-6 md:py-28">
            <div className="shell">
                <Reveal className="mx-auto max-w-3xl text-center">
                    <MariposaPill className="mb-6" />
                    <h2 className="mb-6 text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                        {t("nosotros.grupoH2")}
                    </h2>
                    <p className="text-lg leading-relaxed text-gray-600">
                        {t("nosotros.grupoP")}
                    </p>
                    <div className="mt-9 flex justify-center">
                        <button
                            type="button"
                            onClick={() => open("ppl-partner")}
                            className="btn inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-semibold text-white shadow-xl shadow-brand/30 hover:bg-brand-dark"
                        >
                            {t("nav.vacantesCta")}
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" d="M14 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default function Nosotros() {
    return (
        <>
            <Hero />
            <StatsBar items={STATS} />
            <Historia />
            <BrandExplorer />
            <Centros />
            <GrupoMariposa />
        </>
    );
}
