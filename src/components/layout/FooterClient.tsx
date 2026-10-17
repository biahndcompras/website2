"use client";

import Image from "next/image";
import Link from "next/link";

import { useLang } from "./LanguageProvider";
import { Logo } from "./Navbar";
import { MariposaPill } from "@/components/ui/MariposaPill";
import { BRANDS } from "@/data/brands";

const SITE_LINKS = [
    { href: "/", key: "nav.inicio" },
    { href: "/nosotros", key: "nav.nosotros" },
    { href: "/cultura-beneficios", key: "nav.cultura" },
    { href: "/reclutamiento", key: "nav.reclutamiento" },
    { href: "/contacto", key: "nav.contacto" },
] as const;

const SOCIALS = [
    {
        label: "LinkedIn",
        path: "M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3V9zm7 0h3.8v1.71h.05c.53-1 1.83-2.06 3.76-2.06C21.4 8.65 22 11.1 22 14.3V21h-4v-6c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V21h-4V9z",
    },
    {
        label: "Instagram",
        path: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.59-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.59-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.59 2.16 15.21 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z",
    },
    {
        label: "TikTok",
        path: "M16.6 5.82A4.28 4.28 0 0115.54 3h-3.09v12.4a2.59 2.59 0 01-2.59 2.5 2.59 2.59 0 01-2.59-2.59 2.59 2.59 0 013.3-2.48v-3.15a5.76 5.76 0 00-6.39 5.75 5.76 5.76 0 006.27 5.73 5.76 5.76 0 005.68-5.76V9.01a7.35 7.35 0 004.29 1.37V7.3a4.28 4.28 0 01-3.32-1.48z",
    },
];

type FooterClientProps = {
    /** Año calculado en el servidor para que la página siga siendo estática. */
    year: number;
};

export default function FooterClient({ year }: FooterClientProps) {
    const { t } = useLang();

    return (
        <>
            {/* Llamado a la acción final */}
            <section className="bg-surface px-4 py-16 xs:px-6 md:py-24">
                <div className="shell relative overflow-hidden rounded-[2rem] bg-brand bg-dots-brand p-8 shadow-2xl shadow-brand/25 xs:p-12 md:rounded-[2.5rem] md:p-16">
                    <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-cafe/25 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative z-10 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
                        <div className="text-white lg:w-1/2">
                            <h2 className="mb-6 text-3xl font-medium leading-tight xs:text-4xl sm:text-5xl lg:text-6xl">
                                {t("cta.titulo")}
                                <br />
                                <span className="font-serif italic text-white/90">
                                    {t("cta.tituloItalic")}
                                </span>
                            </h2>
                            <p className="mb-10 max-w-md text-lg text-white/80">
                                {t("cta.subtitulo")}
                            </p>
                            <div className="flex flex-col gap-3 xs:flex-row">
                                <Link
                                    href="/reclutamiento#vacantes"
                                    className="btn inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-brand shadow-lg hover:bg-crema"
                                >
                                    {t("cta.boton")}
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
                                            d="M14 5l7 7-7 7"
                                        />
                                    </svg>
                                </Link>
                                <Link
                                    href="/contacto"
                                    className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-4 text-base font-semibold text-white hover:bg-white/10"
                                >
                                    {t("cta.botonSecundario")}
                                </Link>
                            </div>
                        </div>

                        <figure className="group relative w-full lg:w-5/12">
                            <div className="relative h-[240px] overflow-hidden rounded-[1.5rem] shadow-2xl shadow-black/20 ring-1 ring-white/20 md:h-[340px] md:rounded-[2rem] xs:h-[300px]">
                                <Image
                                    src="/hero-planta.jpg"
                                    alt={t("cta.imagenAlt")}
                                    fill
                                    sizes="(min-width: 1024px) 40vw, 100vw"
                                    className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                                />
                            </div>
                            <figcaption className="absolute bottom-4 left-4 right-4 flex w-max max-w-[calc(100%-2rem)] items-center gap-2.5 rounded-full border border-white/15 bg-black/35 px-4 py-2 backdrop-blur-md">
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-light" />
                                <span className="truncate text-[0.6875rem] font-semibold uppercase tracking-widest text-white">
                                    {t("cta.imagenEtiqueta")}
                                </span>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            {/* Pie */}
            <footer className="border-t border-gray-200 bg-white px-4 pb-8 pt-16 xs:px-6">
                <div className="shell">
                    <div className="grid grid-cols-1 gap-10 pb-12 md:grid-cols-12">
                        <div className="md:col-span-4">
                            <Link href="/" className="group mb-5 inline-block">
                                <Logo height={38} />
                            </Link>
                            <p className="max-w-xs text-sm leading-relaxed text-gray-500">
                                {t("footer.descripcion")}
                            </p>

                            <MariposaPill className="mt-6" />

                            <div className="mt-6 flex gap-3">
                                {SOCIALS.map((s) => (
                                    <a
                                        key={s.label}
                                        href="#"
                                        aria-label={s.label}
                                        className="grid h-10 w-10 place-items-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-brand hover:bg-brand-light hover:text-brand"
                                    >
                                        <svg
                                            className="h-4 w-4"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path d={s.path} />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <nav className="md:col-span-2" aria-labelledby="f-sitio">
                            <h2
                                id="f-sitio"
                                className="mb-5 text-xs font-bold uppercase tracking-widest text-gray-400"
                            >
                                {t("footer.sitio")}
                            </h2>
                            <ul className="space-y-3 text-sm">
                                {SITE_LINKS.map((l) => (
                                    <li key={l.href}>
                                        <Link
                                            href={l.href}
                                            className="text-gray-600 transition-colors hover:text-brand"
                                        >
                                            {t(l.key)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="md:col-span-3">
                            <h2 className="mb-5 text-xs font-bold uppercase tracking-widest text-gray-400">
                                {t("footer.marcas")}
                            </h2>
                            <ul className="space-y-3 text-sm">
                                {BRANDS.map((b) => (
                                    <li key={b.id}>
                                        <Link
                                            href={`/marcas/${b.id}`}
                                            className="text-gray-600 transition-colors hover:text-brand"
                                        >
                                            {b.name} <span className="text-gray-400">· {b.since}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="md:col-span-3">
                            <h2 className="mb-5 text-xs font-bold uppercase tracking-widest text-gray-400">
                                {t("footer.contacto")}
                            </h2>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li>
                                    <span className="block text-xs uppercase tracking-wider text-gray-400">
                                        {t("footer.planta")}
                                    </span>
                                    San Pedro Sula, Cortés, Honduras
                                </li>
                                <li>
                                    <span className="block text-xs uppercase tracking-wider text-gray-400">
                                        Tel.
                                    </span>
                                    +504 0000-0000
                                </li>
                                <li>
                                    <span className="block text-xs uppercase tracking-wider text-gray-400">
                                        Email
                                    </span>
                                    <a
                                        href="mailto:talento@bia.hn"
                                        className="transition-colors hover:text-brand"
                                    >
                                        talento@bia.hn
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="h-px bg-gray-100" />

                    <div className="flex flex-col items-start justify-between gap-4 pt-6 text-xs text-gray-400 md:flex-row md:items-center">
                        <p>
                            &copy; {year} bia Honduras. {t("footer.derechos")}
                        </p>
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                            <Link
                                href="/privacidad"
                                className="transition-colors hover:text-dark"
                            >
                                {t("footer.privacidad")}
                            </Link>
                            <Link
                                href="/terminos"
                                className="transition-colors hover:text-dark"
                            >
                                {t("footer.terminos")}
                            </Link>
                            <Link
                                href="/reclutamiento#proceso"
                                className="transition-colors hover:text-dark"
                            >
                                {t("footer.proceso")}
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
