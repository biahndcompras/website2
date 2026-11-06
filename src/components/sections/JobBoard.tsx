"use client";

import Link from "next/link";
import { useState } from "react";

import { useLang } from "@/components/layout/LanguageProvider";
import { useApply } from "@/components/ui/ApplyProvider";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import type { CopyKey } from "@/data/copy";
import { AREAS, JOBS } from "@/data/jobs";
import type { JobArea } from "@/data/types";

type Filter = JobArea | "todos";

const FILTERS: { value: Filter; key: CopyKey }[] = [
    { value: "todos", key: "vacantes.filtroTodos" },
    { value: "marketing", key: "vacantes.filtroMarketing" },
    { value: "operaciones", key: "vacantes.filtroOperaciones" },
    { value: "comercial", key: "vacantes.filtroComercial" },
    { value: "people", key: "vacantes.filtroPeople" },
];

/**
 * Tarjeta de carrera.
 *
 * Ocupa la primera columna de las vacantes destacadas. Al pasar el cursor el
 * degradado se desplaza, la tarjeta se eleva y los cuatro beneficios entran
 * escalonados; en móvil (sin hover) se ven desde el principio.
 */
function CareerCard({ className = "" }: { className?: string }) {
    const { pick } = useLang();

    const beneficios = [
        {
            icon: "M4 19h16M4 19V7l8-4 8 4v12M9 19v-6h6v6",
            text: { es: "Oportunidades de liderazgo", en: "Leadership opportunities" },
        },
        {
            icon: "M4 19h16M6 17V7a2 2 0 012-2h8a2 2 0 012 2v10",
            text: {
                es: "Formación con Universidad Apex",
                en: "Training with Universidad Apex",
            },
        },
        {
            icon: "M12 3l7 4v5c0 4.5-3 8.4-7 9-4-.6-7-4.5-7-9V7l7-4z",
            text: { es: "Cobertura médica integral", en: "Comprehensive medical cover" },
        },
        {
            icon: "M12 3l8 4v6c0 5-3.5 8-8 8s-8-3-8-8V7l8-4zM9 12l2 2 4-4",
            text: {
                es: "Seguridad y bienestar en el trabajo",
                en: "Safety and wellbeing at work",
            },
        },
    ];

    return (
        <Link
            href="/reclutamiento#vacantes"
            className={`group/career relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-[#0B1B33] p-8 text-white shadow-xl shadow-brand/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/25 xs:p-10 ${className}`}
        >
            {/* Degradado animado + retícula de puntos */}
            <span
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(135deg,#1C3565_0%,#0B1B33_45%,#4A88FA_140%)] bg-[length:200%_200%] bg-left transition-[background-position] duration-700 group-hover/career:bg-right"
            />
            <span
                aria-hidden="true"
                className="absolute inset-0 bg-dots-brand opacity-40"
            />
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/30 blur-3xl transition-opacity duration-700 group-hover/career:opacity-80"
            />

            <div className="relative z-10">
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
                    {pick({ es: "Tu carrera", en: "Your career" })}
                </p>

                <h3 className="mb-4 text-2xl font-medium leading-tight xs:text-3xl">
                    {pick({
                        es: "Construye tu carrera en bia Honduras",
                        en: "Build your career at bia Honduras",
                    })}
                </h3>

                <p className="mb-7 text-sm leading-relaxed text-white/70">
                    {pick({
                        es: "Ofrecemos oportunidades de liderazgo, formación especializada mediante Universidad Apex, cobertura médica integral y un entorno enfocado en la seguridad y el bienestar.",
                        en: "We offer leadership opportunities, specialised training through Universidad Apex, comprehensive medical cover and an environment focused on safety and wellbeing.",
                    })}
                </p>

                <ul className="space-y-3">
                    {beneficios.map((b, i) => (
                        <li
                            key={b.text.es}
                            style={{ transitionDelay: `${i * 70}ms` }}
                            className="flex items-center gap-3 text-sm text-white/85 opacity-100 transition-all duration-500 md:translate-x-0 md:opacity-70 md:group-hover/career:translate-x-1 md:group-hover/career:opacity-100"
                        >
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-brand-light transition-transform duration-500 md:group-hover/career:scale-110">
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d={b.icon} />
                                </svg>
                            </span>
                            {pick(b.text)}
                        </li>
                    ))}
                </ul>
            </div>

            <span className="relative z-10 mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">
                {pick({ es: "Ver todas las vacantes", en: "See all openings" })}
                <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover/career:translate-x-1.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" d="M14 5l7 7-7 7" />
                </svg>
            </span>
        </Link>
    );
}

type Props = {
    /** Si se activa, solo muestra las vacantes destacadas. */
    featuredOnly?: boolean;
};

/**
 * Listado de vacantes con filtros por área.
 * Cada tarjeta abre el modal de postulación con la vacante ya seleccionada.
 */
export default function JobBoard({ featuredOnly = false }: Props) {
    const { t, pick } = useLang();
    const { open } = useApply();
    const [filter, setFilter] = useState<Filter>("todos");

    const jobs = JOBS.filter((j) => (featuredOnly ? j.featured : true));
    const visibles = jobs.filter((j) => filter === "todos" || j.area === filter);
    // En la portada se muestran cuatro: la tarjeta de carrera ocupa el resto.
    const visible = featuredOnly ? visibles.slice(0, 4) : visibles;

    return (
        <section id="vacantes" className="bg-white px-4 py-20 xs:px-6 md:py-28">
            <div className="shell">
                <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                    <Reveal className="max-w-2xl">
                        <p className="kicker mb-4">{t("vacantes.kicker")}</p>
                        <h2 className="text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                            {t("vacantes.titulo")}{" "}
                            <span className="font-serif italic text-brand">
                                {t("vacantes.tituloItalic")}
                            </span>
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            {t("vacantes.subtitulo")}
                        </p>
                    </Reveal>

                    <Reveal from="right">
                        <div
                            className="flex flex-wrap gap-2"
                            role="group"
                            aria-label={t("vacantes.filtroLabel")}
                        >
                            {FILTERS.map((f) => {
                                const active = f.value === filter;
                                return (
                                    <button
                                        key={f.value}
                                        type="button"
                                        aria-pressed={active}
                                        onClick={() => setFilter(f.value)}
                                        className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                                            active
                                                ? "bg-dark text-white"
                                                : "bg-gray-100 text-gray-500 hover:text-dark"
                                        }`}
                                    >
                                        {t(f.key)}
                                    </button>
                                );
                            })}
                        </div>
                    </Reveal>
                </div>

                <RevealGroup
                    stagger={0.07}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {featuredOnly && <CareerCard className="sm:col-span-2 lg:col-span-1 lg:row-span-2" />}

                    {visible.map((job) => (
                        <article
                            key={job.id}
                            className="card-hover group relative flex flex-col rounded-[2rem] border border-gray-100 bg-white p-8"
                            style={{ "--job-accent": job.color } as React.CSSProperties}
                        >
                            <span
                                className="absolute inset-x-8 top-0 h-[3px] origin-left scale-x-0 rounded-b-full transition-transform duration-500 group-hover:scale-x-100 group-focus-within:scale-x-100"
                                style={{ backgroundColor: job.color }}
                            />

                            <div className="mb-5 flex items-start justify-between gap-3">
                                <span className="rounded-full bg-gray-100 px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-wider text-gray-600">
                                    {pick(AREAS[job.area])}
                                </span>
                                <span className="text-[0.6875rem] font-semibold text-gray-400">
                                    {job.salary}
                                </span>
                            </div>

                            <h3 className="mb-2 text-xl font-medium tracking-tight">
                                {pick(job.title)}
                            </h3>

                            <ul className="mb-7 space-y-1.5 text-sm text-gray-500">
                                <li className="flex items-center gap-2">
                                    <svg
                                        className="h-4 w-4 shrink-0 text-gray-300"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    {job.city}
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg
                                        className="h-4 w-4 shrink-0 text-gray-300"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    {pick(job.type)}
                                </li>
                            </ul>

                            <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-5">
                                <span className="truncate text-xs text-gray-400">
                                    {job.brand
                                        ? (job.brand === "maya" && "Café Maya") ||
                                          (job.brand === "indio" && "Café El Indio") ||
                                          (job.brand === "oro" && "Café Oro") ||
                                          (job.brand === "medalla" && "Café Medalla")
                                        : "bia Honduras"}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => open(job.id)}
                                    className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand transition-all hover:gap-2.5"
                                >
                                    {t("vacantes.aplicar")}
                                    <span aria-hidden="true">→</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </RevealGroup>

                {visible.length === 0 && (
                    <p className="py-10 text-center text-sm text-gray-400">
                        {t("vacantes.vacio")}
                    </p>
                )}

                <Reveal className="mt-12 flex justify-center">
                    <Link
                        href="/reclutamiento#vacantes"
                        className="btn inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-semibold text-white shadow-xl shadow-brand/30 hover:bg-brand-dark"
                    >
                        {t("vacantes.todasCta")}
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
            </div>
        </section>
    );
}
