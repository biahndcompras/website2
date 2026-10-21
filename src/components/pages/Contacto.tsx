"use client";

import Link from "next/link";
import { useState } from "react";

import { useLang } from "@/components/layout/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { JOBS } from "@/data/jobs";
import type { I18nText } from "@/data/types";

/* ---------------------------------------------------------------- Datos */

const MOTIVOS = [
    { value: "vacante", es: "Duda sobre una vacante", en: "A question about a role" },
    {
        value: "proceso",
        es: "Consulta sobre el proceso de selección",
        en: "A question about the selection process",
    },
    { value: "empresa", es: "Postular desde mi empresa", en: "Apply from my company" },
    { value: "proveedores", es: "Proveedores y compras", en: "Suppliers and purchasing" },
    { value: "prensa", es: "Prensa y medios", en: "Press and media" },
    { value: "otro", es: "Otro", en: "Other" },
];

const FAQ: { q: I18nText; a: I18nText }[] = [
    {
        q: {
            es: "¿Cuánto tarda el equipo de People en responder?",
            en: "How long does the People team take to reply?",
        },
        a: {
            es: "Las postulaciones se revisan en orden de llegada y respondemos en un máximo de 10 días hábiles. Para consultas generales de esta página, el plazo es de 3 días hábiles.",
            en: "Applications are reviewed in order of arrival and we reply within 10 working days. For general enquiries from this page, the deadline is 3 working days.",
        },
    },
    {
        q: {
            es: "¿Necesito vivir en San Pedro Sula?",
            en: "Do I need to live in San Pedro Sula?",
        },
        a: {
            es: "No necesariamente. Las vacantes de operaciones y producción son en planta, con rutas de transporte, pero algunas áreas —comercial, marketing y people— son híbridas o remotas.",
            en: "Not necessarily. Operations and production roles are on site, with transport routes, but some areas —commercial, marketing and people— are hybrid or remote.",
        },
    },
    {
        q: {
            es: "¿Puedo postular a más de una vacante?",
            en: "Can I apply to more than one position?",
        },
        a: {
            es: "Sí, puedes postular a varias vacantes. Si resultas candidato en más de una, coordina con tu recruiter para definir cuál sigue. El proceso interno da prioridad a la vacante donde ya estás más avanzado.",
            en: "Yes, you can apply to several positions. If you are a candidate for more than one, coordinate with your recruiter; internally we prioritise the role where you are further along.",
        },
    },
    {
        q: {
            es: "¿Ofrecen transporte desde otras ciudades?",
            en: "Is transport offered from other cities?",
        },
        a: {
            es: "Las rutas de transporte cubren las zonas principales de San Pedro Sula y Tegucigalpa. Para otros municipios, indícanos tu ciudad en el formulario y lo revisamos con el equipo.",
            en: "Transport routes cover the main areas of San Pedro Sula and Tegucigalpa. For other municipalities, tell us your city in the form and we will review it with the team.",
        },
    },
    {
        q: { es: "¿Qué formatos de CV aceptan?", en: "Which CV formats do you accept?" },
        a: {
            es: "El formulario acepta PDF de hasta 5 MB. Si tienes tu CV en Word, puedes convertirlo a PDF o escribirnos y te ayudamos.",
            en: "The form accepts PDFs up to 5 MB. If you have your CV in Word, you can convert it to PDF or write to us and we will help.",
        },
    },
];

/* ------------------------------------------------------------- Secciones */

function Hero() {
    const { t } = useLang();

    return (
        <section className="bg-dots px-4 pb-14 pt-32 xs:px-6 xs:pt-40">
            <div className="shell text-center">
                <Reveal>
                    <p className="kicker mb-5 justify-center">{t("nav.contacto")}</p>
                    <h1 className="hero-title mb-6">
                        {t("contacto.h1a")}
                        <span className="font-serif italic text-brand">
                            {" "}
                            {t("contacto.h1b")}
                        </span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">
                        {t("contacto.subtitulo")}
                    </p>
                </Reveal>
            </div>
        </section>
    );
}

function Formulario() {
    const { t, lang, pick } = useLang();
    const [sent, setSent] = useState(false);
    const [errors, setErrors] = useState<Record<string, boolean>>({});

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const nombre = String(data.get("nombre") ?? "").trim();
        const email = String(data.get("email") ?? "").trim();
        const motivo = String(data.get("motivo") ?? "").trim();
        const mensaje = String(data.get("mensaje") ?? "").trim();
        const ok_email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

        const next = {
            nombre: !nombre,
            email: email !== "" && !ok_email,
            motivo: !motivo,
            mensaje: !mensaje,
        };
        setErrors(next);
        if (Object.values(next).some(Boolean)) return;

        // Punto de integración con el backend de atención.
        console.info("[bia] Mensaje de contacto listo para enviar:", {
            motivo,
            nombre,
            email,
            vacante: data.get("vacante"),
            empresa: data.get("empresa"),
            mensaje,
        });

        setSent(true);
    }

    return (
        <section id="formulario" className="px-4 xs:px-6">
            <div className="shell grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
                {/* Formulario */}
                <div className="lg:col-span-7">
                    <Reveal className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm md:rounded-[2.5rem] md:p-12 xs:p-10">
                        <h2 className="mb-2 text-2xl font-medium tracking-tight xs:text-3xl">
                            {t("contacto.formTitulo")}
                        </h2>
                        <p className="mb-8 text-gray-500">{t("contacto.formSub")}</p>

                        {sent ? (
                            <div className="py-10 text-center">
                                <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-brand-light text-brand">
                                    <svg
                                        className="h-7 w-7"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-2xl font-medium">
                                    {t("contacto.exito")}
                                </h3>
                                <p className="mb-8 text-gray-500">{t("contacto.exitoDesc")}</p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSent(false);
                                        setErrors({});
                                    }}
                                    className="btn rounded-full bg-dark px-8 py-4 font-semibold text-white transition-colors hover:bg-brand"
                                >
                                    {t("contacto.otroMensaje")}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                                <div>
                                    <label
                                        htmlFor="c-motivo"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        {t("contacto.motivo")}
                                    </label>
                                    <select
                                        id="c-motivo"
                                        name="motivo"
                                        className="field"
                                        defaultValue=""
                                        aria-invalid={!!errors.motivo}
                                    >
                                        <option value="">
                                            {lang === "en"
                                                ? "Select an option…"
                                                : "Selecciona una opción…"}
                                        </option>
                                        {MOTIVOS.map((m) => (
                                            <option key={m.value} value={m.value}>
                                                {pick(m)}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.motivo && (
                                        <p role="alert" className="mt-1.5 text-xs text-red-600">
                                            {t("modal.requerido")}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="c-nombre"
                                            className="mb-2 block text-sm font-medium text-gray-700"
                                        >
                                            {t("modal.nombre")}
                                        </label>
                                        <input
                                            id="c-nombre"
                                            name="nombre"
                                            type="text"
                                            autoComplete="name"
                                            className="field"
                                            placeholder={t("modal.nombrePh")}
                                            aria-invalid={!!errors.nombre}
                                        />
                                        {errors.nombre && (
                                            <p role="alert" className="mt-1.5 text-xs text-red-600">
                                                {t("modal.requerido")}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="c-email"
                                            className="mb-2 block text-sm font-medium text-gray-700"
                                        >
                                            {t("modal.email")}
                                        </label>
                                        <input
                                            id="c-email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className="field"
                                            placeholder={t("modal.emailPh")}
                                            aria-invalid={!!errors.email}
                                        />
                                        {errors.email && (
                                            <p role="alert" className="mt-1.5 text-xs text-red-600">
                                                {pick({
                                                    es: "Revisa el correo electrónico",
                                                    en: "Check the email address",
                                                })}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="c-telefono"
                                            className="mb-2 block text-sm font-medium text-gray-700"
                                        >
                                            {t("modal.telefono")}
                                        </label>
                                        <input
                                            id="c-telefono"
                                            name="telefono"
                                            type="tel"
                                            autoComplete="tel"
                                            className="field"
                                            placeholder={t("modal.telefonoPh")}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="c-ciudad"
                                            className="mb-2 block text-sm font-medium text-gray-700"
                                        >
                                            {t("modal.ciudad")}
                                        </label>
                                        <input
                                            id="c-ciudad"
                                            name="ciudad"
                                            type="text"
                                            className="field"
                                            placeholder={t("modal.ciudadPh")}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="c-vacante"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        {t("contacto.vacanteRelacionada")}
                                    </label>
                                    <select
                                        id="c-vacante"
                                        name="vacante"
                                        className="field"
                                        defaultValue=""
                                    >
                                        <option value="">
                                            {lang === "en"
                                                ? "None in particular"
                                                : "Ninguna en particular"}
                                        </option>
                                        {JOBS.map((j) => (
                                            <option key={j.id} value={j.id}>
                                                {pick(j.title)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="c-empresa"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        {t("contacto.empresa")}
                                    </label>
                                    <input
                                        id="c-empresa"
                                        name="empresa"
                                        type="text"
                                        className="field"
                                        placeholder={pick({
                                            es: "Nombre de la empresa (opcional)",
                                            en: "Company name (optional)",
                                        })}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="c-mensaje"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        {t("contacto.mensaje")} *
                                    </label>
                                    <textarea
                                        id="c-mensaje"
                                        name="mensaje"
                                        rows={5}
                                        className="field"
                                        placeholder={pick({
                                            es: "Cuéntanos tu duda o tu motivo de contacto…",
                                            en: "Tell us your question or reason for contacting us…",
                                        })}
                                        aria-invalid={!!errors.mensaje}
                                    />
                                    {errors.mensaje && (
                                        <p role="alert" className="mt-1.5 text-xs text-red-600">
                                            {t("modal.requerido")}
                                        </p>
                                    )}
                                </div>

                                <label className="flex items-start gap-3 text-sm text-gray-600">
                                    <input
                                        type="checkbox"
                                        name="consentimiento"
                                        required
                                        className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 accent-[var(--color-brand)]"
                                    />
                                    {t("contacto.consentimiento")}
                                </label>

                                <button
                                    type="submit"
                                    className="btn inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 font-semibold text-white shadow-lg shadow-brand/30 hover:bg-brand-dark"
                                >
                                    {t("contacto.enviar")}
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
                            </form>
                        )}
                    </Reveal>
                </div>

                {/* Datos de contacto */}
                <div className="space-y-6 lg:col-span-5">
                    <Reveal className="relative overflow-hidden rounded-[2rem] bg-brand bg-dots-brand p-8 text-white shadow-xl shadow-brand/20 xs:p-10">
                        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cafe/30 blur-3xl" />
                        <div className="relative z-10">
                            <h2 className="mb-6 text-xl font-medium">
                                {t("contacto.atencionTitle")}
                            </h2>
                            <ul className="space-y-5">
                                <li className="flex items-start gap-4">
                                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15">
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <rect
                                                x="3"
                                                y="5"
                                                width="18"
                                                height="14"
                                                rx="2"
                                            />
                                            <path d="m3 7 9 6 9-6" />
                                        </svg>
                                    </span>
                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-white/60">
                                            {t("contacto.vacantes")}
                                        </div>
                                        <a
                                            href="mailto:talento@bia.hn"
                                            className="font-medium hover:underline"
                                        >
                                            talento@bia.hn
                                        </a>
                                    </div>
                                </li>

                                <li className="flex items-start gap-4">
                                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15">
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"
                                            />
                                        </svg>
                                    </span>
                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-white/60">
                                            {pick({
                                                es: "Teléfono central",
                                                en: "Main phone",
                                            })}
                                        </div>
                                        <a
                                            href="tel:+50400000000"
                                            className="font-medium hover:underline"
                                        >
                                            +504 0000-0000
                                        </a>
                                    </div>
                                </li>

                                <li className="flex items-start gap-4">
                                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15">
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <circle cx="12" cy="12" r="9" />
                                            <path
                                                strokeLinecap="round"
                                                d="M12 7v5l3 2"
                                            />
                                        </svg>
                                    </span>
                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-white/60">
                                            {t("contacto.horario")}
                                        </div>
                                        <div className="font-medium">
                                            {pick({
                                                es: "Lunes a viernes · 8:00 – 17:00",
                                                en: "Monday to Friday · 8:00 – 17:00",
                                            })}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Reveal>

                    <Reveal className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm xs:p-10">
                        <h2 className="mb-6 text-xl font-medium">{t("contacto.sedes")}</h2>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-light text-brand">
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 21s-7-4.35-7-9a7 7 0 1114 0c0 4.65-7 9-7 9z"
                                        />
                                        <circle cx="12" cy="12" r="2.5" />
                                    </svg>
                                </span>
                                <div>
                                    <div className="mb-1 font-semibold">
                                        {t("operaciones.b1.titulo")}
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-500">
                                        San Pedro Sula, Cortés, Honduras
                                        <br />
                                        {pick({
                                            es: "Planta principal y centro de distribución",
                                            en: "Main plant and distribution center",
                                        })}
                                    </p>
                                </div>
                            </li>

                            <li className="flex gap-4">
                                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cafe/10 text-cafe">
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"
                                        />
                                    </svg>
                                </span>
                                <div>
                                    <div className="mb-1 font-semibold">
                                        {pick({
                                            es: "Planta Tegucigalpa",
                                            en: "Tegucigalpa plant",
                                        })}
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-500">
                                        Tegucigalpa, Francisco Morazán, Honduras
                                        <br />
                                        {pick({
                                            es: "Producción y centro de distribución",
                                            en: "Production and distribution center",
                                        })}
                                    </p>
                                </div>
                            </li>
                        </ul>

                        <div className="mt-6 border-t border-gray-100 pt-6">
                            <Link href="/nosotros#centros" className="link-arrow text-sm">
                                {t("contacto.todosCentros")}
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

                    <Reveal className="relative overflow-hidden rounded-[2rem] bg-dark bg-dots-brand p-8 text-white xs:p-10">
                        <div className="relative z-10">
                            <div className="mb-5 grid h-11 w-11 place-items-center rounded-full bg-white/15">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 20h5v-2a3 3 0 00-5.36-1.86M17 20H7m10 0v-2c0-.66-.13-1.3-.36-1.86M7 20H2v-2a3 3 0 015.36-1.86M7 20v-2c0-.66.13-1.3.36-1.86m0 0a5.002 5.002 0 019.28 0"
                                    />
                                </svg>
                            </div>
                            <h2 className="mb-2 text-xl font-medium">{t("contacto.peopleH2")}</h2>
                            <p className="mb-6 text-sm leading-relaxed text-white/70">
                                {t("contacto.peopleP")}
                            </p>
                            <a
                                href="mailto:talento@bia.hn"
                                className="btn inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-dark hover:bg-crema"
                            >
                                talento@bia.hn
                            </a>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

function Faq() {
    const { t, pick } = useLang();

    return (
        <section id="faq" className="bg-surface px-4 py-20 xs:px-6 md:py-28">
            <div className="mx-auto max-w-3xl">
                <Reveal className="mb-14 text-center">
                    <p className="kicker mb-4 justify-center">FAQ</p>
                    <h2 className="text-3xl font-medium xs:text-4xl md:text-5xl">
                        {t("cultura.faqH2")}
                    </h2>
                </Reveal>

                <Accordion items={FAQ.map((f) => ({ question: pick(f.q), answer: f.a }))} />
            </div>
        </section>
    );
}

/* ----------------------------------------------------------------- Página */

export default function Contacto() {
    return (
        <>
            <Hero />
            <Formulario />
            <Faq />
        </>
    );
}