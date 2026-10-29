"use client";

import Image from "next/image";
import Link from "next/link";

import { useLang } from "@/components/layout/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import { BRANDS } from "@/data/brands";

/**
 * Home 3 · Origen
 *
 * Hero oscuro y de producto: cuenta la trazabilidad (altitud, tueste,
 * cata) con la fotografía del café en el cafetal. El azul marino de la
 * marca ocupa la mitad izquierda y la foto la derecha.
 */
export function HeroOrigen() {
    const { t, pick } = useLang();
    const oro = BRANDS.find((b) => b.id === "oro")!;

    const datos = [
        { value: oro.altitudeRange, label: pick({ es: "msnm de cosecha", en: "masl of harvest" }) },
        { value: pick(oro.roastLabel), label: pick({ es: "perfil de tueste", en: "roast profile" }) },
        { value: "Q-Grader", label: pick({ es: "cata certificada", en: "certified cupping" }) },
    ];

    return (
        <section
            id="hero"
            className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#0B1B33]"
        >
            {/* Una sola fotografía a sangre, sin partir el encuadre. El
                degradado azul de la izquierda da contraste al texto. */}
            <div className="absolute inset-0" aria-hidden="true">
                <Image
                    src="/cafeoro.jpg"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-[64%_center] motion-safe:animate-[hero-zoom_30s_ease-in-out_infinite_alternate]"
                />
                {/* Velo general: la foto se lee como atmósfera, no compite
                    con el texto ni con los CTA */}
                <div className="absolute inset-0 bg-[#0B1B33]/45" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,#0B1B33_0%,#0B1B33_40%,rgba(11,27,51,0.92)_52%,rgba(11,27,51,0.62)_68%,rgba(11,27,51,0.3)_84%,rgba(11,27,51,0.45)_100%)]" />
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0B1B33]/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0B1B33]/85 to-transparent" />
            </div>

            <div className="shell relative z-10 flex flex-1 items-center px-4 pb-8 pt-24 xs:px-6 md:pt-32">
                <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12">
                    <Reveal from="left" className="lg:col-span-7 xl:col-span-6">
                        <p className="kicker kicker--light mb-5">
                            {pick({ es: "Origen hondureño", en: "Honduran origin" })}
                        </p>

                        <h1 className="hero-title mb-6 text-white">
                            <span className="block">{pick({ es: "Del cafetal", en: "From the farm" })}</span>
                            <span className="block">
                                {pick({ es: "a tu taza,", en: "to your cup," })}{" "}
                                <span className="font-serif italic text-brand">
                                    {pick({ es: "sin atajos", en: "no shortcuts" })}
                                </span>
                            </span>
                        </h1>

                        <p className="mb-9 max-w-lg text-lg leading-relaxed text-white/75">
                            {pick({
                                es: "Compramos en las zonas cafetaleras de Honduras, tostamos en planta y evaluamos cada lote en nuestro laboratorio sensorial antes de que salga al mercado.",
                                en: "We buy in Honduras' coffee regions, roast at our plant and assess every batch in our sensory lab before it reaches the market.",
                            })}
                        </p>

                        <div className="mb-10 flex flex-col gap-3 xs:flex-row">
                            <Link
                                href="/reclutamiento#vacantes"
                                className="btn inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-brand-dark shadow-xl shadow-black/25 hover:bg-crema"
                            >
                                {t("hero.ctaVacantes")}
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link
                                href="/marcas/oro"
                                className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20"
                            >
                                {pick({ es: "Ver el portafolio", en: "See the portfolio" })}
                            </Link>
                        </div>

                        {/* Datos de trazabilidad */}
                        <dl className="grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6 [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
                            {datos.map((d) => (
                                <div key={d.label}>
                                    <dd className="text-lg font-semibold text-white">{d.value}</dd>
                                    <dt className="mt-0.5 text-[0.6875rem] uppercase tracking-wider text-white/50">
                                        {d.label}
                                    </dt>
                                </div>
                            ))}
                        </dl>
                        {/* Las cuatro marcas del portafolio */}
                        <div className="mt-8 max-w-lg border-t border-white/15 pt-6">
                            <p className="mb-3 text-[0.6875rem] uppercase tracking-wider text-white/40">
                                {pick({ es: "Nuestro portafolio", en: "Our portfolio" })}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {BRANDS.map((brand) => (
                                    <Link
                                        key={brand.id}
                                        href={`/marcas/${brand.id}`}
                                        className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1 pl-1 pr-3 transition-colors hover:bg-white/15"
                                    >
                                        <Image
                                            src={brand.logo}
                                            alt=""
                                            width={brand.logoSize.width}
                                            height={brand.logoSize.height}
                                            className="h-7 w-7 rounded-full object-cover ring-1 ring-white/25"
                                        />
                                        <span className="text-[0.6875rem] font-semibold text-white/80 group-hover:text-white">
                                            {brand.name.replace("Café ", "")}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </Reveal>

                </div>
            </div>
        </section>
    );
}