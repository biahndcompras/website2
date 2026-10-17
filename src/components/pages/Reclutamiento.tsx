"use client";

import { useLang } from "@/components/layout/LanguageProvider";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import JobBoard from "@/components/sections/JobBoard";
import { Counter } from "@/components/sections/StatsBar";
import type { CopyKey } from "@/data/copy";
import type { I18nText } from "@/data/types";

/* ---------------------------------------------------------------- Datos */

const TARJETAS_HERO: {
    to: number;
    prefix?: string;
    suffix?: string;
    key: CopyKey;
    tone: string;
}[] = [
    { to: 500, prefix: "+", key: "stats.colaboradores", tone: "bg-brand" },
    { to: 12, key: "stats.centros", tone: "bg-cafe" },
    { to: 98, suffix: "%", key: "stats.orgullo", tone: "bg-dark" },
];

const PROCESO = [
    {
        num: "01",
        title: { es: "Postulación", en: "Application" },
        text: {
            es: "Llenas el formulario y subes tu CV. Recibirás un correo de confirmación con el folio.",
            en: "You fill in the form and upload your CV. You get a confirmation email with your reference number.",
        },
        tone: "bg-brand-light text-brand",
    },
    {
        num: "02",
        title: { es: "Filtro inicial", en: "Initial screening" },
        text: {
            es: "People revisa tu perfil contra los requisitos del puesto. Respondemos en un máximo de 10 días hábiles.",
            en: "People reviews your profile against the role requirements. We answer within 10 working days.",
        },
        tone: "bg-brand-light text-brand",
    },
    {
        num: "03",
        title: { es: "Entrevistas", en: "Interviews" },
        text: {
            es: "Una o dos entrevistas con el área y con People. Para planta, incluye una visita y una práctica observada.",
            en: "One or two interviews with the team and with People. For plant roles, it includes a visit and an observed practice.",
        },
        tone: "bg-cafe/10 text-cafe",
    },
    {
        num: "04",
        title: { es: "Oferta e inducción", en: "Offer and onboarding" },
        text: {
            es: "Te entregamos la oferta por escrito y arrancamos tu inducción con Universidad Apex.",
            en: "You receive the offer in writing and start your induction with Universidad Apex.",
        },
        tone: "bg-green-100 text-green-600",
    },
];

const POR_QUE = [
    {
        title: { es: "Proceso completo", en: "The full process" },
        text: {
            es: "Participas en la cadena entera: Beneficio, tostado, empaque y distribución.",
            en: "You take part in the whole chain: processing, roasting, packaging and distribution.",
        },
        tone: "bg-brand-light text-brand",
        icon: "M4 7h16M4 12h16M4 17h10",
    },
    {
        title: { es: "Estándares de exportación", en: "Export standards" },
        text: {
            es: "Laboratorio sensorial y Q-Grader: aprendes el oficio con estándar mundial.",
            en: "Sensory lab and Q-Grader: you learn the craft to a world-class standard.",
        },
        tone: "bg-cafe/10 text-cafe",
        icon: "M9 3h6l-1 8 4 4v2H6v-2l4-4-1-8z",
    },
    {
        title: { es: "Carrera real", en: "A real career" },
        text: {
            es: "Muchos jefes de planta empezaron como operarios de empaque.",
            en: "Many plant managers started as packaging operators.",
        },
        tone: "bg-brand-light text-brand",
        icon: "M4 19h16M4 19V7l8-4 8 4v12M9 19v-6h6v6",
    },
    {
        title: { es: "Turnos planificados", en: "Planned shifts" },
        text: {
            es: "Rotación de turnos con descanso semanal, transporte y alimentación.",
            en: "Shift rotation with weekly rest, transport and meals.",
        },
        tone: "bg-green-100 text-green-600",
        icon: "M12 7v5l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
        title: { es: "Seguro desde el día 1", en: "Insurance from day one" },
        text: {
            es: "Cobertura médica privada para ti y tus dependientes sin periodos de espera largos.",
            en: "Private medical cover for you and your dependents, with no long waiting periods.",
        },
        tone: "bg-brand-light text-brand",
        icon: "M12 3l7 4v5c0 4.5-3 8.4-7 9-4-.6-7-4.5-7-9V7l7-4z",
    },
    {
        title: { es: "Formación continua", en: "Continuous training" },
        text: {
            es: "Universidad Apex con diplomados, workshops y certificaciones con beca.",
            en: "Universidad Apex with diplomas, workshops and funded certifications.",
        },
        tone: "bg-cafe/10 text-cafe",
        icon: "M4 19h16M6 17V7a2 2 0 012-2h8a2 2 0 012 2v10",
    },
];

const FAQ: { key: Parameters<ReturnType<typeof useLang>["t"]>[0]; a: I18nText }[] = [
    {
        key: "recl.faq1",
        a: {
            es: "No para todas las vacantes. En operaciones damos prioridad a la actitud y a la disposición a aprender el oficio; en marketing, comercial y people sí evaluamos la experiencia previa. Si tienes menos de dos años, postula igual: varias de nuestras gerentes empezaron como operarias de planta.",
            en: "Not for every opening. In operations we prioritise attitude and willingness to learn the craft; in marketing, commercial and people we do assess previous experience. If you have under two years, apply anyway: several of our managers started as plant operators.",
        },
    },
    {
        key: "recl.faq2",
        a: {
            es: "Entre dos y cuatro semanas desde tu postulación, según la vacante y la disponibilidad de los equipos. Para puestos de planta puede haber una semana adicional si la práctica observada coincide con temporada alta.",
            en: "Between two and four weeks from your application, depending on the role and team availability. Plant roles may take an extra week when the observed practice falls in high season.",
        },
    },
    {
        key: "recl.faq3",
        a: {
            es: "Sí. Postula a todas las que te interesen. Si avanzas en dos a la vez, coordina con tu recruiter para definir cuál sigue; el proceso interno da prioridad a la vacante donde ya estás más avanzado.",
            en: "Yes. Apply to every role that interests you. If you get two processes going at once, coordinate with your recruiter; internally we prioritise the role where you are further along.",
        },
    },
    {
        key: "recl.faq4",
        a: {
            es: "Solo tu currículum en PDF. En la segunda entrevista verificamos referencias y, para planta, requisas médicas y prueba de aptitud física. No pedimos documentos extra al postular.",
            en: "Only your CV in PDF. At the second interview we check references and, for plant roles, medical forms and a fitness test. No extra documents are needed to apply.",
        },
    },
    {
        key: "recl.faq5",
        a: {
            es: "Las rutas cubren las zonas principales de San Pedro Sula y Tegucigalpa. Si vives en otro municipio, indícanos tu ciudad en el formulario y lo revisamos con el equipo de People.",
            en: "Routes cover the main areas of San Pedro Sula and Tegucigalpa. If you live elsewhere, tell us your city in the form and we will review it with the People team.",
        },
    },
    {
        key: "recl.faq6",
        a: {
            es: "Tu perfil queda en nuestra base y te contactamos cuando abra una vacante afín. Ochenta de cada cien personas que nos escriben vuelven a postular en los siguientes seis meses.",
            en: "Your profile stays in our database and we contact you when a matching opening appears. Eighty out of every hundred people who write to us apply again within six months.",
        },
    },
];

/* ------------------------------------------------------------- Secciones */

function Hero() {
    const { t, pick } = useLang();

    return (
        <section className="bg-dots px-4 pb-14 pt-32 xs:px-6 xs:pt-40 md:pb-20">
            <div className="shell grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <Reveal className="lg:col-span-7">
                    <p className="kicker mb-5">{t("nav.reclutamiento")}</p>
                    <h1 className="mb-6 text-4xl font-medium leading-[1.05] tracking-tight xs:text-5xl sm:text-6xl lg:text-7xl">
                        {t("recl.h1a")}
                        <br />
                        <span className="font-serif italic text-brand">{t("recl.h1b")}</span>
                    </h1>
                    <p className="max-w-xl text-lg leading-relaxed text-gray-600">
                        {t("recl.subtitulo")}
                    </p>

                    <div className="mt-9 flex flex-col gap-3 xs:flex-row">
                        <a
                            href="#vacantes"
                            className="btn inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-semibold text-white shadow-xl shadow-brand/30 hover:bg-brand-dark"
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
                        </a>
                        <a
                            href="#proceso"
                            className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-4 text-base font-semibold text-dark hover:bg-gray-50"
                        >
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
                                    d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            {t("recl.ctaProceso")}
                        </a>
                    </div>
                </Reveal>

                <Reveal from="right" className="lg:col-span-5">
                    <div className="grid grid-cols-2 gap-4">
                        {TARJETAS_HERO.map((c) => (
                            <div
                                key={c.key}
                                className={`rounded-[2rem] p-7 text-white shadow-xl ${
                                    c.tone === "bg-cafe" ? "shadow-cafe/25" : "shadow-brand/25"
                                } ${c.tone}`}
                            >
                                <div className="stat-value mb-1 text-4xl font-medium">
                                    <Counter to={c.to} prefix={c.prefix} suffix={c.suffix} />
                                </div>
                                <div className="text-xs font-medium text-white/75">{t(c.key)}</div>
                            </div>
                        ))}

                        <div className="rounded-[2rem] border border-gray-200 bg-white p-7">
                            <div className="stat-value mb-1 text-4xl font-medium text-brand">4</div>
                            <div className="text-xs font-medium text-gray-500">
                                {pick({ es: "Áreas de trabajo", en: "Areas of work" })}
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

function Proceso() {
    const { t, pick } = useLang();

    return (
        <section id="proceso" className="bg-surface px-4 py-20 xs:px-6 md:py-28">
            <div className="shell">
                <Reveal className="mx-auto mb-14 max-w-3xl text-center">
                    <p className="kicker mb-4 justify-center">{t("recl.procesoKicker")}</p>
                    <h2 className="text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                        {t("recl.procesoH2a")}
                        <span className="font-serif italic text-brand">
                            {" "}
                            {t("recl.procesoH2b")}
                        </span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">{t("recl.procesoP")}</p>
                </Reveal>

                <RevealGroup
                    stagger={0.12}
                    className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
                >
                    {PROCESO.map((p) => (
                        <article
                            key={p.num}
                            className="card-hover relative rounded-[2rem] border border-gray-100 bg-white p-8"
                        >
                            <span className="absolute right-7 top-6 text-5xl font-medium leading-none text-gray-100">
                                {p.num}
                            </span>
                            <div
                                className={`relative mb-6 grid h-12 w-12 place-items-center rounded-full ${p.tone}`}
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
                                    <path d="M9 12l2 2 4-4" />
                                    <circle cx="12" cy="12" r="9" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">{pick(p.title)}</h3>
                            <p className="leading-relaxed text-gray-500">{pick(p.text)}</p>
                        </article>
                    ))}
                </RevealGroup>
            </div>
        </section>
    );
}

function Preguntas() {
    const { t } = useLang();

    return (
        <section id="preguntas" className="bg-surface px-4 py-20 xs:px-6 md:py-28">
            <div className="mx-auto max-w-3xl">
                <Reveal className="mb-14 text-center">
                    <p className="kicker mb-4 justify-center">{t("recl.preguntasKicker")}</p>
                    <h2 className="mb-5 text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                        {t("recl.faqH2a")}
                        <span className="font-serif italic text-brand">
                            {" "}
                            {t("recl.faqH2b")}
                        </span>
                    </h2>
                </Reveal>

                <Accordion items={FAQ.map((f) => ({ question: t(f.key), answer: f.a }))} />
            </div>
        </section>
    );
}

function PorQue() {
    const { t, pick } = useLang();

    return (
        <section id="por-que" className="bg-surface px-4 py-20 xs:px-6 md:py-28">
            <div className="shell">
                <Reveal className="mx-auto mb-14 max-w-3xl text-center">
                    <p className="kicker mb-4 justify-center">{t("recl.porqueKicker")}</p>
                    <h2 className="text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                        {t("recl.porqueH2a")}
                        <span className="font-serif italic text-brand">
                            {" "}
                            {t("recl.porqueH2b")}
                        </span>
                    </h2>
                </Reveal>

                <RevealGroup
                    stagger={0.07}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {POR_QUE.map((p) => (
                        <article
                            key={pick(p.title)}
                            className="card-hover rounded-[2rem] border border-gray-100 bg-white p-8"
                        >
                            <div
                                className={`mb-6 grid h-12 w-12 place-items-center rounded-full ${p.tone}`}
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
                                    <path d={p.icon} />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">{pick(p.title)}</h3>
                            <p className="leading-relaxed text-gray-500">{pick(p.text)}</p>
                        </article>
                    ))}
                </RevealGroup>
            </div>
        </section>
    );
}

/* ----------------------------------------------------------------- Página */

export default function Reclutamiento() {
    return (
        <>
            <Hero />
            <JobBoard />
            <Proceso />
            <Preguntas />
            <PorQue />
        </>
    );
}