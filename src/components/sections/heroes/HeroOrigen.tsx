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

    const datos = [
        { value: "+540", label: pick({ es: "personas en el equipo", en: "people on the team" }) },
        { value: "12", label: pick({ es: "centros y plantas", en: "centers and plants" }) },
        { value: "4", label: pick({ es: "marcas que hacemos", en: "brands we make" }) },
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
                    src="/cafeoro-hero.jpg"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-[78%_center] motion-safe:animate-[hero-zoom_30s_ease-in-out_infinite_alternate] lg:object-center"
                />
                {/* Velo general: la foto se lee como atmósfera, no compite
                    con el texto ni con los CTA */}
                {/* Mitad izquierda azul, transición al centro y la foto
                    despejada a la derecha */}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,#0B1B33_0%,#0B1B33_50%,rgba(11,27,51,0.96)_53%,rgba(11,27,51,0.68)_56%,rgba(11,27,51,0.3)_59%,rgba(11,27,51,0)_63%)]" />
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0B1B33]/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0B1B33]/60 to-transparent" />
            </div>

            <div className="shell relative z-10 flex flex-1 items-center px-4 pb-8 pt-24 xs:px-6 md:pt-32">
                <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12">
                    <Reveal from="left" className="lg:col-span-7 xl:col-span-6">
                        <p className="kicker kicker--light mb-5">
                            {pick({ es: "Las personas detrás", en: "The people behind" })}
                        </p>

                        <h1 className="hero-title mb-6 text-white">
                            <span className="block">{pick({ es: "Cada taza tiene", en: "Every cup has" })}</span>
                            <span className="block">{pick({ es: "nombre, manos", en: "a name, hands" })}</span>
                            <span className="block font-serif italic text-brand">
                                {pick({ es: "y una historia", en: "and a story" })}
                            </span>
                        </h1>

                        <p className="mb-9 max-w-xl text-lg leading-relaxed text-white/80">
                            {pick({
                                es: "Más de 540 personas siembran, tuestan, empacan y sirven este café. Detrás de cada taza hay un nombre, unas manos y una historia que empieza en el cafetal hondureño.",
                                en: "More than 540 people grow, roast, pack and serve this coffee. Behind every cup there is a name, a pair of hands and a story that begins in the Honduran coffee fields.",
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
                                href="/nosotros"
                                className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20"
                            >
                                {pick({ es: "Conoce sus historias", en: "Meet their stories" })}
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
                        <div className="mt-8 hidden max-w-lg border-t border-white/15 pt-6 lg:block">
                            <p className="mb-3 text-[0.6875rem] uppercase tracking-wider text-white/40">
                                {pick({ es: "Nuestras marcas", en: "Our brands" })}
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