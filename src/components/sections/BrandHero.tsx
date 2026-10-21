"use client";

import Image from "next/image";
import Link from "next/link";

import { useLang } from "@/components/layout/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import type { Brand } from "@/data/types";

/** Reemplaza los marcadores {marca} y {year} de un texto del diccionario. */
function fill(template: string, values: Record<string, string | number>) {
    return Object.entries(values).reduce(
        (acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)),
        template,
    );
}

/**
 * Encabezado de la ficha de marca: migras de pan, logo con el año, nombre,
 * lema y la fotografía de la planta.
 */
export function BrandHero({ brand }: { brand: Brand }) {
    const { t } = useLang();

    return (
        <section className="bg-dots px-4 pb-16 pt-32 xs:px-6 xs:pt-36 lg:pt-44 md:pb-20">
            <div className="shell grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
                <Reveal from="left" className="flex flex-col justify-center lg:col-span-6">
                    <nav
                        className="mb-7 flex items-center gap-2 text-xs text-gray-500"
                        aria-label="Migas de pan"
                    >
                        <Link href="/" className="transition-colors hover:text-brand">
                            {t("nav.inicio")}
                        </Link>
                        <span aria-hidden="true">/</span>
                        <Link href="/#marcas" className="transition-colors hover:text-brand">
                            {t("marcas.kicker")}
                        </Link>
                        <span aria-hidden="true">/</span>
                        <span className="font-semibold text-dark">{brand.name}</span>
                    </nav>

                    <div className="mb-7 flex items-center gap-5">
                        <Image
                            src={brand.logo}
                            alt={`Logo de ${brand.name}`}
                            width={brand.logoSize.width}
                            height={brand.logoSize.height}
                            className="h-20 w-20 shrink-0 rounded-full object-cover shadow-lg ring-4 ring-white xs:h-24 xs:w-24"
                        />
                        <div>
                            <div className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                                {t("marca.desde")}
                            </div>
                            <div className="text-3xl font-medium leading-none text-dark xs:text-4xl">
                                {brand.since}
                            </div>
                        </div>
                    </div>

                    <h1 className="hero-title mb-6">
                        {brand.name}
                    </h1>

                    <p className="mb-9 max-w-xl text-lg leading-relaxed text-gray-600">
                        {brand.tagline.es}
                    </p>

                    <div className="flex flex-col items-stretch gap-3 xs:flex-row xs:items-center">
                        <Link
                            href="/reclutamiento#vacantes"
                            className="btn inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-semibold text-white shadow-lg shadow-brand/25 hover:bg-brand-dark"
                        >
                            {fill(t("marca.ctaVacantes"), {
                                marca: brand.name.replace("Café ", ""),
                            })}
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                        <Link
                            href="/#marcas"
                            className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-4 text-base font-semibold text-dark hover:bg-gray-50"
                        >
                            {t("marca.ctaOtras")}
                        </Link>
                    </div>
                </Reveal>

                <Reveal from="right" className="lg:col-span-6">
                    <figure className="group relative h-full min-h-[340px] overflow-hidden rounded-[2rem] shadow-xl shadow-brand/10 lg:min-h-0">
                        <Image
                            src={brand.hero}
                            alt={fill(t("marca.imgAlt"), {
                                marca: brand.name.replace("Café ", ""),
                            })}
                            fill
                            priority
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                        <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                            <div>
                                <div className="mb-1 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-white/70">
                                    {t("marca.produccion")}
                                </div>
                                <div className="text-sm font-semibold">
                                    {t("hero.ubicacion")}
                                </div>
                            </div>
                            <span className="shrink-0 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[0.6875rem] font-semibold backdrop-blur-sm">
                                {fill(t("marca.desdeSello"), { year: brand.since })}
                            </span>
                        </figcaption>
                    </figure>
                </Reveal>
            </div>
        </section>
    );
}
