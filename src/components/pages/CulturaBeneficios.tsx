"use client";

import Image from "next/image";
import Link from "next/link";

import { useLang } from "@/components/layout/LanguageProvider";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { Voices } from "@/components/sections/HomeSections";
import type { I18nText } from "@/data/types";

/* --------------------------------------------------------------- Datos */

const PILARES: {
    key: "cultura.p1.titulo" | "cultura.p2.titulo" | "cultura.p3.titulo";
    desc: "cultura.p1.desc" | "cultura.p2.desc" | "cultura.p3.desc";
    bullets: string[];
    dot: string;
    icon: "pin" | "layers" | "people";
}[] = [
    {
        key: "cultura.p1.titulo",
        desc: "cultura.p1.desc",
        bullets: [
            "Marca con 90+ años de presencia en los hogares",
            "Producción y desarrollo en Honduras",
            "Apoyo directo a comunidades cafetaleras",
        ],
        dot: "bg-cafe",
        icon: "pin",
    },
    {
        key: "cultura.p2.titulo",
        desc: "cultura.p2.desc",
        bullets: [
            "Planes de formación por área y nivel",
            "Certificaciones Q-Grader con beca",
            "Itinerarios de carrera con nombramientos internos",
        ],
        dot: "bg-brand",
        icon: "layers",
    },
    {
        key: "cultura.p3.titulo",
        desc: "cultura.p3.desc",
        bullets: [
            "Líneas de reporte abiertas y trato directo",
            "Evaluaciones de desempeño cuatrimestrales",
            "Seguro médico privado desde el primer día",
        ],
        dot: "bg-green-600",
        icon: "people",
    },
];

const ICONOS = {
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
            d="M17 20h5v-2a3 3 0 00-5.36-1.86M17 20H7m10 0v-2c0-.66-.13-1.3-.36-1.86M7 20H2v-2a3 3 0 015.36-1.86M7 20v-2c0-.66.13-1.3.36-1.86m0 0a5.002 5.002 0 019.28 0"
        />
    ),
} as const;

const BENEFICIOS: { title: string; text: string; icon: string; tone: string }[] = [
    {
        title: "Seguro médico privado",
        text: "Cobertura para ti y tu familia desde el primer día.",
        icon: "M12 3l7 4v5c0 4.5-3 8.4-7 9-4-.6-7-4.5-7-9V7l7-4z",
        tone: "bg-brand-light text-brand",
    },
    {
        title: "Plan de carrera",
        text: "Itinerarios claros con nombramientos internos y movilidad entre plantas y áreas.",
        icon: "M4 19h16M4 19V7l8-4 8 4v12M9 19v-6h6v6",
        tone: "bg-brand-light text-brand",
    },
    {
        title: "Bonos por desempeño",
        text: "Bonos cuatrimestrales atados a resultados reales, no a decisiones de la dirección.",
        icon: "M12 3v18M5 8h9a3 3 0 010 6H8m0 0l3-3m-3 3l3 3",
        tone: "bg-yellow-100 text-yellow-600",
    },
    {
        title: "Transporte y alimentación",
        text: "Rutas de transporte y comedor-subsidio en planta para los turnos de operación.",
        icon: "M5 17h14M5 17a2 2 0 104 0m10 0a2 2 0 104 0M5 17V7h10v10",
        tone: "bg-green-100 text-green-600",
    },
    {
        title: "Certificaciones Q-Grader",
        text: "Programa de barismo y catas con beca interna para que puedas certificarte sin costo.",
        icon: "M9 3h6l-1 8 4 4v2H6v-2l4-4-1-8z",
        tone: "bg-purple-100 text-purple-600",
    },
    {
        title: "Descuento en productos bia",
        text: "Tarjeta de colaboradores con descuento en las cuatro marcas y en la tienda de la planta.",
        icon: "M20 12v9H4v-9M2 7h20v5H2zM12 20V7M12 7H7.5a2.5 2.5 0 110-5C11 2 12 7 12 7zm0 0h4.5a2.5 2.5 0 100-5C13 2 12 7 12 7z",
        tone: "bg-orange-100 text-orange-600",
    },
];

const APEX_CIFRAS = [
    { value: "4", text: "Niveles de formación, desde inducción hasta liderazgo" },
    { value: "Q-Grader", text: "Certificación en barismo y catas con beca" },
    { value: "12", text: "Centros con sala de capacitación" },
    { value: "Interno", text: "La movilidad se prioriza antes que la contratación externa" },
];

const FAQ: { q: "cultura.faq1" | "cultura.faq2" | "cultura.faq3" | "cultura.faq4" | "cultura.faq5"; a: I18nText }[] = [
    {
        q: "cultura.faq1",
        a: {
            es: "Sí. La cobertura de seguro médico privado se activa desde tu primer día laborando, e incluye a las personas dependientes que registres.",
            en: "Yes. Private health insurance starts on your first working day and covers the dependents you register.",
        },
    },
    {
        q: "cultura.faq2",
        a: {
            es: "Sí. La Universidad Apex gestiona diplomados, certificaciones y workshops dentro de la jornada, con horas protegidas de formación. Las certificaciones Q-Grader se financian con beca.",
            en: "Yes. Universidad Apex runs diplomas, certifications and workshops inside working hours, with protected study time. Q-Grader certifications are fully funded.",
        },
    },
    {
        q: "cultura.faq3",
        a: {
            es: "Las vacantes internas se publican primero para el personal activo. Las solicitudes se revisan con la misma meritocracia que las externas, contra los requisitos del puesto y el historial de desempeño.",
            en: "Internal openings are published first for active team members. Applications follow the same meritocracy as external ones, measured against the role requirements and performance record.",
        },
    },
    {
        q: "cultura.faq4",
        a: {
            es: "Sí. Los centros de San Pedro Sula y Tegucigalpa cuentan con rutas de transporte y con servicio de comedor con subsidio para el personal de planta y de turnos.",
            en: "Yes. The San Pedro Sula and Tegucigalpa centers run transport routes and a subsidised canteen for plant and shift staff.",
        },
    },
    {
        q: "cultura.faq5",
        a: {
            es: "Las evaluaciones de desempeño son cuatrimestrales. Sus resultados se conversan con tu jefe de planta y son la base para los bonos, los itinerarios de carrera y las vacantes internas.",
            en: "Performance reviews happen every four months. Results are discussed with your plant manager and drive bonuses, career paths and internal openings.",
        },
    },
];

/* --------------------------------------------------------------- Secciones */

function Hero() {
    const { t } = useLang();

    return (
        <section className="bg-dots px-4 pb-16 pt-32 xs:px-6 xs:pt-40 md:pb-20">
            <div className="mx-auto max-w-4xl text-center">
                <Reveal>
                    <p className="kicker mb-5 justify-center">{t("cultura.kicker")}</p>
                    <h1 className="mb-6 text-4xl font-medium leading-[1.05] tracking-tight xs:text-5xl sm:text-6xl lg:text-7xl">
                        {t("cultura.h1a")}
                        <br />
                        <span className="font-serif italic text-brand">{t("cultura.h1b")}</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">
                        {t("cultura.subtitulo")}
                    </p>
                </Reveal>
            </div>
        </section>
    );
}

function Pilares() {
    const { t } = useLang();

    return (
        <section id="pilares" className="px-4 pb-20 xs:px-6 md:pb-28">
            <RevealGroup
                stagger={0.12}
                className="shell grid grid-cols-1 gap-6 md:grid-cols-3"
            >
                {PILARES.map((p) => (
                    <article
                        key={p.key}
                        className="card-hover group flex flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm"
                    >
                        <div className="relative h-60 overflow-hidden">
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
                                    {ICONOS[p.icon]}
                                </svg>
                            </span>
                        </div>

                        <div className="flex flex-1 flex-col p-8 xs:p-10">
                            <h2 className="mb-3 text-2xl font-medium">{t(p.key)}</h2>
                            <p className="mb-6 leading-relaxed text-gray-600">{t(p.desc)}</p>
                            <ul className="mt-auto space-y-2.5 border-t border-gray-100 pt-5 text-sm text-gray-600">
                                {p.bullets.map((b) => (
                                    <li key={b} className="flex items-start gap-2.5">
                                        <span
                                            className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${p.dot}`}
                                        />
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>
                ))}
            </RevealGroup>
        </section>
    );
}

function Beneficios() {
    const { t } = useLang();

    return (
        <section id="beneficios" className="bg-surface px-4 py-20 xs:px-6 md:py-28">
            <div className="shell">
                <Reveal className="mx-auto mb-14 max-w-3xl text-center">
                    <p className="kicker mb-4 justify-center">Beneficios</p>
                    <h2 className="text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                        {t("cultura.beneficiosTitulo")}
                        <span className="font-serif italic text-brand">
                            {" "}
                            {t("cultura.beneficiosItalic")}
                        </span>
                    </h2>
                </Reveal>

                <RevealGroup
                    stagger={0.08}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {BENEFICIOS.map((b) => (
                        <article
                            key={b.title}
                            className="card-hover rounded-[2rem] border border-gray-100 bg-white p-8"
                        >
                            <div
                                className={`mb-6 grid h-12 w-12 place-items-center rounded-full ${b.tone}`}
                            >
                                <svg
                                    className="h-6 w-6"
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
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">{b.title}</h3>
                            <p className="leading-relaxed text-gray-500">{b.text}</p>
                        </article>
                    ))}
                </RevealGroup>
            </div>
        </section>
    );
}

function UniversidadApex() {
    const { t } = useLang();

    return (
        <section id="universidad-apex" className="bg-white px-4 py-20 xs:px-6 md:py-28">
            <div className="shell">
                <Reveal className="relative overflow-hidden rounded-[2rem] bg-dark bg-dots-brand p-8 md:rounded-[2.5rem] md:p-16 xs:p-12">
                    <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-brand/40 blur-3xl" />

                    <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-6">
                            <p className="kicker mb-4 !text-brand-light">Universidad Apex</p>
                            <h2 className="mb-6 text-3xl font-medium leading-tight text-white xs:text-4xl md:text-5xl">
                                {t("cultura.apexH2a")}
                                <br />
                                <span className="font-serif italic text-brand-light">
                                    {t("cultura.apexH2b")}
                                </span>
                            </h2>
                            <p className="mb-2 leading-relaxed text-white/80">
                                {t("cultura.apexP")}
                            </p>
                            <Link
                                href="/reclutamiento#vacantes"
                                className="btn-ghost mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-dark shadow-lg transition-colors hover:bg-crema"
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
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:col-span-6">
                            {APEX_CIFRAS.map((c) => (
                                <div
                                    key={c.value}
                                    className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm"
                                >
                                    <div className="mb-1 text-3xl font-semibold text-white">
                                        {c.value}
                                    </div>
                                    <div className="text-sm leading-snug text-white/70">
                                        {c.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

function Faq() {
    const { t } = useLang();

    return (
        <section id="faq" className="bg-surface px-4 py-20 xs:px-6 md:py-28">
            <div className="mx-auto max-w-3xl">
                <Reveal className="mb-14 text-center">
                    <p className="kicker mb-4 justify-center">FAQ</p>
                    <h2 className="text-3xl font-medium xs:text-4xl md:text-5xl">
                        {t("cultura.faqH2")}
                    </h2>
                </Reveal>

                <Accordion
                    items={FAQ.map((f) => ({ question: t(f.q), answer: f.a }))}
                />
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ Página */

export default function CulturaBeneficios() {
    return (
        <>
            <Hero />
            <Pilares />
            <Beneficios />
            <UniversidadApex />
            <Faq />
            <Voices />
        </>
    );
}