"use client";

import Image from "next/image";
import Link from "next/link";

import { useLang } from "@/components/layout/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import { useApply } from "@/components/ui/ApplyProvider";
import { BRANDS, altitudePosition } from "@/data/brands";
import { NOTE_COLORS, jobsForBrand } from "@/data/jobs";
import type { CopyKey } from "@/data/copy";
import type { Brand } from "@/data/types";

/** Construye la clave de la marca a partir de su prefijo (oro.perfilKicker). */
function k(brand: Brand, suffix: string): CopyKey {
    return `${brand.i18n}.${suffix}` as CopyKey;
}

/**
 * Perfil sensorial: notas de cata, nivel de tueste y altitud de cosecha,
 * más la ficha, las ocasiones y los canales de la marca.
 */
export function BrandProfile({ brand }: { brand: Brand }) {
    const { t, pick, pickList, lang } = useLang();

    const notes = pickList(brand.notes);
    const occasions = pickList(brand.occasions);
    const channels = pickList(brand.channels);
    const altitudePct = altitudePosition(brand.altitude);

    return (
        <section id="perfil" className="bg-white px-4 py-20 xs:px-6 md:py-28">
            <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                {/* Columna sensorial */}
                <Reveal className="lg:col-span-7">
                    <p className="kicker mb-4">{t(k(brand, "perfilKicker"))}</p>
                    <h2 className="mb-6 text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                        {t(k(brand, "perfilH2a"))}
                        <br />
                        <span className="font-serif italic text-brand">
                            {t(k(brand, "perfilH2b"))}
                        </span>
                    </h2>
                    <p className="mb-10 text-lg leading-relaxed text-gray-600">
                        {pick(brand.story)}
                    </p>

                    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                        {t(k(brand, "notas"))}
                    </p>
                    <div className="mb-10 flex flex-wrap gap-2">
                        {notes.map((note, i) => (
                            <span
                                key={note}
                                className="note-chip"
                                style={
                                    { "--note-dot": NOTE_COLORS[i % NOTE_COLORS.length] } as React.CSSProperties
                                }
                            >
                                {note}
                            </span>
                        ))}
                    </div>

                    {/* Nivel de tueste */}
                    <div className="mb-8">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                {t(k(brand, "tueste"))}
                            </span>
                            <span className="text-sm font-semibold text-brand">
                                {pick(brand.roastLabel)}
                            </span>
                        </div>
                        <div className="meter is-active">
                            <span style={{ width: `${brand.roast}%` }} />
                        </div>
                    </div>

                    {/* Altitud de cosecha */}
                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                {t(k(brand, "altitud"))}
                            </span>
                            <span className="text-sm font-semibold text-brand">
                                {brand.altitudeRange} msnm
                            </span>
                        </div>
                        <div className="altitude-track">
                            {[20, 40, 60, 80].map((pct) => (
                                <span key={pct} className="tick" style={{ left: `${pct}%` }} />
                            ))}
                            <span className="marker is-active" style={{ left: `${altitudePct}%` }}>
                                <span>{brand.altitude.toLocaleString("es-HN")}</span>
                            </span>
                        </div>
                        <div className="mt-1.5 flex justify-between text-[0.625rem] text-gray-400">
                            {[800, 1200, 1600, 2000].map((n) => (
                                <span key={n}>{n.toLocaleString("es-HN")}</span>
                            ))}
                        </div>
                    </div>
                </Reveal>

                {/* Columna de datos */}
                <div className="space-y-6 lg:col-span-5">
                    <Reveal className="card-surface p-8">
                        <p className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">
                            {t(k(brand, "ficha"))}
                        </p>
                        <dl className="space-y-5">
                            {[
                                {
                                    label: t(k(brand, "desde")),
                                    value: String(brand.since),
                                },
                                {
                                    label: t(k(brand, "perfil")),
                                    value: pick(brand.roastLabel),
                                },
                                {
                                    label: t(k(brand, "rango")),
                                    value: `${brand.altitudeRange} msnm`,
                                },
                                {
                                    label: t(k(brand, "origen")),
                                    value: lang === "en" ? "Honduras" : "Honduras",
                                },
                            ].map((row) => (
                                <div
                                    key={row.label}
                                    className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4"
                                >
                                    <dt className="text-sm text-gray-500">{row.label}</dt>
                                    <dd className="text-sm font-semibold text-dark">{row.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </Reveal>

                    <Reveal className="card-surface p-8">
                        <p className="mb-5 text-xs font-bold uppercase tracking-widest text-gray-400">
                            {t(k(brand, "ideal"))}
                        </p>
                        <ul className="space-y-3">
                            {occasions.map((o) => (
                                <li
                                    key={o}
                                    className="flex items-start gap-2.5 text-sm text-gray-600"
                                >
                                    <span
                                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                                        style={{ backgroundColor: brand.color }}
                                    />
                                    <span>{o}</span>
                                </li>
                            ))}
                        </ul>
                    </Reveal>

                    <Reveal className="card-surface p-8">
                        <p className="mb-5 text-xs font-bold uppercase tracking-widest text-gray-400">
                            {t(k(brand, "donde"))}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {channels.map((c) => (
                                <span
                                    key={c}
                                    className="rounded-full border border-gray-100 bg-surface px-3 py-1.5 text-xs font-medium text-gray-600"
                                >
                                    {c}
                                </span>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/** Las otras tres marcas, con acceso directo a su ficha. */
export function OtherBrands({ current }: { current: string }) {
    const { t, pick } = useLang();
    const { open } = useApply();
    const others = BRANDS.filter((b) => b.id !== current);
    const brand = BRANDS.find((b) => b.id === current)!;

    return (
        <section className="bg-surface px-4 py-20 xs:px-6 md:py-28">
            <div className="shell">
                <Reveal className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <p className="kicker mb-4">{t("marcas.kicker")}</p>
                        <h2 className="text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                            {t(k(brand, "otrasH2"))}
                        </h2>
                    </div>
                    <Link href="/#marcas" className="link-arrow text-sm">
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

                <div className="grid grid-cols-1 gap-6 xs:grid-cols-3">
                    {others.map((b) => {
                        const jobs = jobsForBrand(b.id);
                        return (
                            <Reveal
                                key={b.id}
                                className="card-hover group flex items-center gap-4 rounded-[2rem] border border-gray-100 bg-white p-7"
                            >
                                <Link href={`/marcas/${b.id}`} className="flex flex-1 items-center gap-4">
                                    <Image
                                        src={b.logo}
                                        alt={`Logo ${b.name}`}
                                        width={b.logoSize.width}
                                        height={b.logoSize.height}
                                        className="h-14 w-14 shrink-0 rounded-full object-cover shadow-sm ring-2 ring-white"
                                    />
                                    <div className="min-w-0">
                                        <div className="font-semibold transition-colors group-hover:text-brand">
                                            {b.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {pick(b.tagline)}
                                        </div>
                                        {jobs.length > 0 && (
                                            <div className="mt-1 text-[0.6875rem] font-semibold text-brand">
                                                {jobs.length}{" "}
                                                {jobs.length === 1
                                                    ? "vacante"
                                                    : "vacantes"}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                                {jobs.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => open(jobs[0].id)}
                                        aria-label={`Postular — ${jobs[0].title.es}`}
                                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-light text-brand transition-colors hover:bg-brand hover:text-white"
                                    >
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
                                )}
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}