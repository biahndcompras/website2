"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useLang } from "@/components/layout/LanguageProvider";
import { useApply } from "@/components/ui/ApplyProvider";
import { Reveal } from "@/components/motion/Reveal";
import { BRANDS, altitudePosition } from "@/data/brands";
import { jobsForBrand, NOTE_COLORS } from "@/data/jobs";

/**
 * Explorador sensorial del portafolio.
 * El estado activo vive en React: antes se manipulaba el DOM a mano desde JS,
 * lo que obligaba a sincronizar clases y atributos a la vez.
 */
export default function BrandExplorer() {
    const { t, pick, pickList, lang } = useLang();
    const { open: openApply } = useApply();
    const [activeId, setActiveId] = useState(BRANDS[0].id);
    const meterRef = useRef<HTMLDivElement>(null);

    const active = BRANDS.find((b) => b.id === activeId) ?? BRANDS[0];

    // Los medidores crecen cuando el panel entra en pantalla
    useEffect(() => {
        const el = meterRef.current;
        if (!el) return;
        const frame = requestAnimationFrame(() => el.classList.add("is-active"));
        return () => cancelAnimationFrame(frame);
    }, [activeId]);

    function onTabKeyDown(e: React.KeyboardEvent) {
        const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!delta) return;
        e.preventDefault();
        const next = (BRANDS.indexOf(active) + delta + BRANDS.length) % BRANDS.length;
        setActiveId(BRANDS[next].id);
        document.getElementById(`tab-${BRANDS[next].id}`)?.focus();
    }

    const jobs = jobsForBrand(active.id);
    const notes = pickList(active.notes);
    const occasions = pickList(active.occasions);
    const channels = pickList(active.channels);

    return (
        <section id="marcas" className="bg-white px-4 py-20 md:py-28 xs:px-6">
            <div className="shell">
                <Reveal className="mx-auto mb-12 max-w-3xl text-center">
                    <p className="kicker mb-4 justify-center">{t("marcas.kicker")}</p>
                    <h2 className="text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                        {t("marcas.titulo")}{" "}
                        <span className="font-serif italic text-brand">
                            {t("marcas.tituloItalic")}
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600">{t("marcas.subtitulo")}</p>
                </Reveal>

                {/* Pestañas */}
                <div className="mb-10 rounded-[2rem] bg-brand bg-dots-brand p-4 xs:p-6 md:rounded-[2.5rem]">
                    <div
                        role="tablist"
                        aria-label={t("marcas.kicker")}
                        className="flex flex-col gap-3 xs:flex-row"
                    >
                        {BRANDS.map((brand) => {
                            const selected = brand.id === activeId;
                            return (
                                <button
                                    key={brand.id}
                                    id={`tab-${brand.id}`}
                                    role="tab"
                                    type="button"
                                    aria-selected={selected}
                                    aria-controls={`panel-${brand.id}`}
                                    tabIndex={selected ? 0 : -1}
                                    onClick={() => setActiveId(brand.id)}
                                    onKeyDown={onTabKeyDown}
                                    style={
                                        { "--tab-swatch": brand.color } as React.CSSProperties
                                    }
                                    className={`brand-tab ${selected ? "is-active" : ""}`}
                                >
                                    <Image
                                        src={brand.logo}
                                        alt=""
                                        aria-hidden="true"
                                        className="brand-tab__logo"
                                        width={brand.logoSize.width}
                                        height={brand.logoSize.height}
                                    />
                                    <span className="min-w-0 flex-1">
                                        <span className="flex items-baseline justify-between gap-2">
                                            <span className="brand-tab__name">
                                                {brand.name}
                                            </span>
                                            <span className="brand-tab__year">{brand.since}</span>
                                        </span>
                                        <span className="block text-[0.6875rem] leading-snug brand-tab__tagline">
                                            {pick(brand.tagline)}
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Panel de detalle */}
                <Reveal key={active.id} from="up">
                    <div
                        id={`panel-${active.id}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${active.id}`}
                        className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12"
                    >
                        {/* Perfil sensorial */}
                        <div className="md:pt-[50px]">
                            <div className="mb-5 flex items-center gap-4">
                                <span
                                    className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200"
                                    style={{ boxShadow: `0 0 0 2px ${active.color}22` }}
                                >
                                    <Image
                                        src={active.logo}
                                        alt={`Logo de ${active.name}`}
                                        width={active.logoSize.width}
                                        height={active.logoSize.height}
                                        className="h-full w-full object-cover"
                                    />
                                </span>
                                <div>
                                    <h3 className="text-2xl font-medium tracking-tight xs:text-3xl">
                                        <Link
                                            href={`/marcas/${active.id}`}
                                            className="group inline-flex items-center gap-2 transition-colors hover:text-brand"
                                        >
                                            {active.name}
                                            <svg
                                                className="h-4 w-4 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-brand"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    d="M14 5l7 7-7 7"
                                                />
                                            </svg>
                                        </Link>
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {pick(active.tagline)}
                                    </p>
                                </div>
                            </div>

                            <p className="mb-8 leading-relaxed text-gray-600">
                                {pick(active.story)}
                            </p>

                            {/* Notas de cata */}
                            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                                {lang === "en" ? "Cupping notes" : "Notas de cata"}
                            </p>
                            <div className="mb-6 flex flex-wrap gap-2">
                                {notes.map((note, i) => (
                                    <span
                                        key={note}
                                        className="note-chip"
                                        style={
                                            {
                                                "--note-dot": NOTE_COLORS[i % NOTE_COLORS.length],
                                            } as React.CSSProperties
                                        }
                                    >
                                        {note}
                                    </span>
                                ))}
                            </div>

                            {/* Nivel de tueste */}
                            <div className="mb-6">
                                <div className="mb-2.5 flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                        {lang === "en" ? "Roast level" : "Nivel de tueste"}
                                    </span>
                                    <span className="text-xs font-semibold text-brand">
                                        {pick(active.roastLabel)}
                                    </span>
                                </div>
                                <div ref={meterRef} className="meter">
                                    <span style={{ width: `${active.roast}%` }} />
                                </div>
                            </div>

                            {/* Altitud */}
                            <div>
                                <div className="mb-2.5 flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                        {lang === "en"
                                            ? "Harvest altitude"
                                            : "Altitud de cosecha"}
                                    </span>
                                    <span className="text-xs font-semibold text-brand">
                                        {active.altitudeRange} {lang === "en" ? "masl" : "msnm"}
                                    </span>
                                </div>
                                <div className="altitude-track">
                                    {[20, 40, 60, 80].map((left) => (
                                        <span key={left} className="tick" style={{ left: `${left}%` }} />
                                    ))}
                                    <span
                                        className="marker"
                                        style={{ left: `${altitudePosition(active.altitude)}%` }}
                                    >
                                        <span>{active.altitude.toLocaleString("es-HN")}</span>
                                    </span>
                                </div>
                                <div className="mt-1.5 flex justify-between text-[0.625rem] text-gray-400">
                                    <span>800</span>
                                    <span>1,200</span>
                                    <span>1,600</span>
                                    <span>2,000</span>
                                </div>
                            </div>
                        </div>

                        {/* Ficha del producto */}
                        <div className="flex flex-col rounded-[2rem] border border-gray-100 bg-white p-6 xs:p-8">
                            <div className="mb-6 flex items-center justify-between gap-3">
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                    {t("marcas.ficha")}
                                </p>
                                <span
                                    className="rounded-full px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wider"
                                    style={{
                                        backgroundColor: `${active.color}1A`,
                                        color: active.color,
                                    }}
                                >
                                    Honduras
                                </span>
                            </div>

                            <div className="flex gap-4 border-b border-gray-100 pb-6">
                                {[
                                    { value: String(active.since), label: lang === "en" ? "In market since" : "En el mercado desde" },
                                    { value: active.altitudeRange, label: lang === "en" ? "masl range" : "msnm de cosecha" },
                                    { value: pick(active.roastLabel), label: lang === "en" ? "Roast profile" : "Perfil de tueste" },
                                ].map((cell, i) => (
                                    <div key={cell.label} className="flex flex-1 items-center gap-4">
                                        {i > 0 && <span className="w-px bg-gray-100" />}
                                        <div className="min-w-0">
                                            <div className="mb-0.5 truncate text-xl font-medium tracking-tight">
                                                {cell.value}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {cell.label}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="mb-3 mt-6 text-xs font-bold uppercase tracking-widest text-gray-400">
                                {t("marcas.ideal")}
                            </p>
                            <ul className="mb-6 space-y-2.5">
                                {occasions.map((o) => (
                                    <li
                                        key={o}
                                        className="flex items-start gap-2.5 text-sm text-gray-600"
                                    >
                                        <span
                                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                                            style={{ backgroundColor: active.color }}
                                        />
                                        {o}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto">
                                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                                    {t("marcas.donde")}
                                </p>
                                <div className="mb-6 flex flex-wrap gap-2">
                                    {channels.map((c) => (
                                        <span
                                            key={c}
                                            className="rounded-full border border-gray-100 bg-surface px-3 py-1.5 text-xs font-medium text-gray-600"
                                        >
                                            {c}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {jobs.length > 0 ? (
                                <button
                                    type="button"
                                    onClick={() => openApply(jobs[0].id)}
                                    className="link-arrow border-t border-gray-100 pt-5 text-sm"
                                >
                                    {t("marcas.trabajaAqui")} · {jobs.length}
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
                            ) : (
                                <Link
                                    href="/reclutamiento#vacantes"
                                    className="link-arrow border-t border-gray-100 pt-5 text-sm"
                                >
                                    {t("marcas.trabajaAqui")}
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
                            )}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
