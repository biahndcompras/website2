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
    const visible = jobs.filter((j) => filter === "todos" || j.area === filter);

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
