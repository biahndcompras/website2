"use client";

import Image from "next/image";
import Link from "next/link";

import { useLang } from "@/components/layout/LanguageProvider";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";

/* -------------------------------------------------------------------------
   Secciones nuevas de /nosotros
   ------------------------------------------------------------------------- */

/**
 * Nuestra historia: imagen a la izquierda y el relato de la alianza a la
 * derecha. Es la presentación institucional de bia dentro de Grupo Mariposa.
 */
export function NuestraHistoria() {
    const { pick } = useLang();

    return (
        <section id="nuestra-historia" className="bg-white px-4 py-20 xs:px-6 md:py-28">
            <div className="shell grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <Reveal from="left" className="lg:col-span-6">
                    <figure className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl shadow-brand/10 sm:aspect-[5/4] lg:aspect-[4/5]">
                        <Image
                            src="/cafeoro.jpg"
                            alt={pick({
                                es: "Manos sosteniendo un paquete de Café Oro en el cafetal",
                                en: "Hands holding a Café Oro package in the coffee field",
                            })}
                            fill
                            sizes="(min-width: 1024px) 46vw, 100vw"
                            className="object-cover"
                        />
                        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
                            {pick({
                                es: "Cafetal · Honduras",
                                en: "Coffee field · Honduras",
                            })}
                        </figcaption>
                    </figure>
                </Reveal>

                <Reveal from="right" className="lg:col-span-6">
                    <p className="kicker mb-4">
                        {pick({ es: "Nuestra historia", en: "Our story" })}
                    </p>
                    <h2 className="mb-6 text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                        {pick({ es: "Una alianza que", en: "An alliance that" })}{" "}
                        <span className="font-serif italic text-brand">
                            {pick({ es: "nutre sueños", en: "nurtures dreams" })}
                        </span>
                    </h2>
                    <p className="mb-5 text-lg leading-relaxed text-gray-600">
                        {pick({
                            es: "bia Honduras nace de la transformación de Grupo Mariposa: una alianza de familias, talento y marcas que nutre sueños y lleva un legado de sabor por las Américas.",
                            en: "bia Honduras was born from the transformation of Grupo Mariposa: an alliance of families, talent and brands that nurtures dreams and carries a legacy of flavor across the Americas.",
                        })}
                    </p>
                    <p className="mb-8 text-lg leading-relaxed text-gray-600">
                        {pick({
                            es: "Este sitio es nuestro propio portal —independiente del corporativo— para Honduras: el lugar donde contamos quiénes somos, cómo trabajamos y qué oportunidades abrimos cada día.",
                            en: "This site is our own portal —independent from the corporate one— for Honduras: the place where we tell who we are, how we work and what opportunities we open every day.",
                        })}
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <Link href="/#marcas" className="link-arrow text-sm">
                            {pick({ es: "Conoce el portafolio", en: "Meet the portfolio" })}
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
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* ---------------------------------------------------- Momentos y logros */
const MOMENTOS = [
    {
        cifra: "2022",
        label: { es: "El punto de partida", en: "The starting point" },
        title: { es: "Nace bia Honduras", en: "bia Honduras is born" },
        text: {
            es: "La operación de café de Grupo Mariposa se integra en una sola compañía, con marcas propias y representadas bajo un mismo estándar.",
            en: "Grupo Mariposa's coffee operation comes together as a single company, with owned and represented brands under one standard.",
        },
    },
    {
        cifra: "4",
        label: { es: "Portafolio", en: "Portfolio" },
        title: { es: "Cuatro marcas en casa", en: "Four brands at home" },
        text: {
            es: "Café Maya, El Indio, Oro y Medalla: más de 90 años de sabor hondureño acompañando la mesa de las familias.",
            en: "Café Maya, El Indio, Oro and Medalla: over 90 years of Honduran flavor on family tables.",
        },
    },
    {
        cifra: "+540",
        label: { es: "Equipo", en: "Team" },
        title: { es: "Un equipo que crece", en: "A team that grows" },
        text: {
            es: "Más de 540 personas en 12 centros y plantas entre San Pedro Sula y Tegucigalpa sostienen la operación todos los días.",
            en: "More than 540 people across 12 centers and plants between San Pedro Sula and Tegucigalpa keep the operation running every day.",
        },
    },
];

/**
 * Momentos y logros: tres tarjetas verticales con una cifra grande, una
 * etiqueta y el relato del hito. El acento superior usa el azul de marca.
 */
export function Momentos() {
    const { pick } = useLang();

    return (
        <section id="momentos" className="bg-surface px-4 py-20 xs:px-6 md:py-28">
            <div className="shell">
                <Reveal className="mx-auto mb-14 max-w-3xl text-center">
                    <p className="kicker mb-4 justify-center">
                        {pick({ es: "Momentos y logros", en: "Moments and milestones" })}
                    </p>
                    <h2 className="text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                        {pick({ es: "Lo que hemos", en: "What we have" })}{" "}
                        <span className="font-serif italic text-brand">
                            {pick({ es: "construido", en: "built" })}
                        </span>
                    </h2>
                </Reveal>

                <RevealGroup
                    stagger={0.1}
                    className="grid grid-cols-1 gap-6 md:grid-cols-3"
                >
                    {MOMENTOS.map((m) => (
                        <article
                            key={m.cifra}
                            className="card-hover group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-8 xs:p-10"
                        >
                            <span
                                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-100 bg-gradient-to-r from-brand to-brand-dark"
                                aria-hidden="true"
                            />
                            <div className="mb-6 text-5xl font-medium tracking-tight text-brand xs:text-6xl">
                                {m.cifra}
                            </div>
                            <div className="mb-2 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-gray-400">
                                {pick(m.label)}
                            </div>
                            <h3 className="mb-3 text-xl font-semibold">{pick(m.title)}</h3>
                            <p className="leading-relaxed text-gray-500">{pick(m.text)}</p>
                        </article>
                    ))}
                </RevealGroup>
            </div>
        </section>
    );
}

/* ------------------------------------------------ Tres imágenes + texto */
const PILARES = [
    {
        img: "/cafeoro.jpg",
        title: { es: "Del origen a la taza", en: "From origin to cup" },
        text: {
            es: "Compramos en zonas cafetaleras hondureñas y cuidamos cada etapa: beneficio, tueste, empaque y distribución.",
            en: "We buy in Honduran coffee regions and care for every stage: processing, roasting, packaging and distribution.",
        },
        href: "/#marcas",
    },
    {
        img: "/ops-calidad.svg",
        title: { es: "Calidad que se cata", en: "Quality you can taste" },
        text: {
            es: "Laboratorio sensorial, catas formales y barismo Q-Grader: cada lote se evalúa antes de salir de planta.",
            en: "Sensory lab, formal cuppings and Q-Grader baristas: every batch is assessed before leaving the plant.",
        },
        href: "/cultura-beneficios",
    },
    {
        img: "/hero-planta.jpg",
        title: { es: "Personas que crecen", en: "People who grow" },
        text: {
            es: "Universidad Apex, certificaciones con beca y movilidad interna para que el talento hondureño se quede y crezca.",
            en: "Universidad Apex, funded certifications and internal mobility so Honduran talent stays and grows.",
        },
        href: "/cultura-beneficios",
    },
];

/**
 * Tres pilares con imagen, título y subtítulo. Cada tarjeta enlaza a la
 * sección donde se cuenta ese pilar con más detalle.
 */
export function Pilares() {
    const { pick } = useLang();

    return (
        <section id="pilares-bia" className="bg-white px-4 py-20 xs:px-6 md:py-28">
            <div className="shell">
                <Reveal className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div className="max-w-2xl">
                        <p className="kicker mb-4">
                            {pick({ es: "Lo que nos define", en: "What defines us" })}
                        </p>
                        <h2 className="text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                            {pick({ es: "Tres cosas que", en: "Three things that" })}{" "}
                            <span className="font-serif italic text-brand">
                                {pick({ es: "nos hacen bia", en: "make us bia" })}
                            </span>
                        </h2>
                    </div>
                    <Link href="/reclutamiento#vacantes" className="link-arrow shrink-0 text-sm">
                        {pick({ es: "Ver vacantes", en: "See openings" })}
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

                <RevealGroup
                    stagger={0.1}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {PILARES.map((p) => (
                        <Link
                            key={p.title.es}
                            href={p.href}
                            className="card-hover group flex flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-white"
                        >
                            <div className="relative h-52 overflow-hidden bg-brand-light">
                                <Image
                                    src={p.img}
                                    alt=""
                                    fill
                                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-1 flex-col p-8">
                                <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-brand">
                                    {pick(p.title)}
                                </h3>
                                <p className="leading-relaxed text-gray-500">{pick(p.text)}</p>
                                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                                    {pick({ es: "Saber más", en: "Learn more" })}
                                    <svg
                                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" d="M14 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </RevealGroup>
            </div>
        </section>
    );
}