"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useLang } from "./LanguageProvider";
import type { CopyKey } from "@/data/copy";
import type { Lang } from "@/data/types";

const LINKS: { href: string; key: CopyKey; page: string }[] = [
    { href: "/", key: "nav.inicio", page: "inicio" },
    { href: "/nosotros", key: "nav.nosotros", page: "nosotros" },
    { href: "/cultura-beneficios", key: "nav.cultura", page: "cultura" },
    { href: "/reclutamiento", key: "nav.reclutamiento", page: "reclutamiento" },
    { href: "/contacto", key: "nav.contacto", page: "contacto" },
];

/**
 * Logotipo de bia Honduras.
 * Archivo oficial: public/bia-main-white.png (3687×927). El texto "bia" va en
 * #1C3565 y el icono en #4A88FA, los dos colores de marca.
 */
export const LOGO_SRC = "/bia-main-white.png";
export const LOGO_SRC_LIGHT = "/bia-logo-light.png";

/** Proporción del archivo original, para no deformarlo. */
const LOGO_RATIO = 3687 / 927;

export function Logo({
    className = "",
    height = 26,
    light = false,
}: {
    className?: string;
    /** Alto en píxeles; el ancho sale de la proporción del archivo. */
    height?: number;
    /** Versión con el texto en blanco para fondos oscuros. */
    light?: boolean;
}) {
    const width = Math.round(height * LOGO_RATIO);

    return (
        // width/height van también en el estilo: si solo se declaran como
        // atributos, el navegador usa el tamaño real del archivo optimizado
        // (p. ej. 128px en lugar de los 103px pedidos).
        <Image
            src={light ? LOGO_SRC_LIGHT : LOGO_SRC}
            alt="bia Honduras"
            width={width}
            height={height}
            priority
            style={{ width, height }}
            className={className}
        />
    );
}

/**
 * Selector ES / EN.
 *
 * Ambos botones miden lo mismo y el fondo activo es una "píldora" que se
 * desliza con transform: cambiar de idioma no mueve nada del layout.
 */
function LanguageSwitch({ light = false }: { light?: boolean }) {
    const { lang, setLang } = useLang();
    const active = lang === "es" ? 0 : 1;

    return (
        <div
            className={`relative flex items-center rounded-full p-1 ${
                light ? "bg-white/15 backdrop-blur-sm" : "bg-gray-100"
            }`}
            role="group"
            aria-label="Idioma"
        >
            <span
                aria-hidden="true"
                className={`absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    light ? "bg-white" : "bg-brand"
                }`}
                style={{ transform: `translateX(${active * 100}%)` }}
            />

            {(["es", "en"] as Lang[]).map((code) => (
                <button
                    key={code}
                    type="button"
                    onClick={() => setLang(code)}
                    aria-pressed={lang === code}
                    className={`relative z-10 w-11 rounded-full py-1.5 text-xs font-bold transition-colors ${
                        lang === code
                            ? light
                                ? "text-brand-dark"
                                : "text-white"
                            : light
                              ? "text-white/70 hover:text-white"
                              : "text-gray-500 hover:text-dark"
                    }`}
                >
                    {code.toUpperCase()}
                </button>
            ))}
        </div>
    );
}

export default function Navbar({ current }: { current?: string }) {
    const { t } = useLang();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    /** El hero ocupa toda la pantalla: la barra va transparente sobre él. */
    const [onHero, setOnHero] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Solo en páginas con hero a pantalla completa (la portada). Se observa el
    // hero con un margen superior igual al alto de la barra para que el cambio
    // ocurra justo cuando el contenido empieza a pasar por debajo.
    useEffect(() => {
        const hero = document.getElementById("hero");
        if (!hero) return;

        const observer = new IntersectionObserver(
            ([entry]) => setOnHero(entry.isIntersecting),
            { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
        );
        observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    // El menú móvil se cierra al pasar a escritorio
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const close = (e: MediaQueryListEvent) => e.matches && setOpen(false);
        mq.addEventListener("change", close);
        return () => mq.removeEventListener("change", close);
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                scrolled ? "pt-0" : "pt-4 xs:pt-6"
            }`}
        >
            <div className="shell">
                <nav
                    className={`flex items-center justify-between gap-4 rounded-full border py-2.5 pl-5 pr-3 transition-all duration-300 xs:py-3 xs:pr-4 ${
                        onHero
                            ? "border-white/15 bg-white/10 shadow-lg shadow-black/10 backdrop-blur-md"
                            : "border-gray-200/60 bg-white/75 shadow-sm backdrop-blur-md"
                    }`}
                >
                    <Link href="/" className="group shrink-0" aria-label="bia Honduras — Inicio">
                        <Logo light={onHero} />
                    </Link>

                    {/* Enlaces de escritorio */}
                    <ul
                        className={`hidden items-center gap-8 text-sm font-medium lg:flex ${
                            onHero ? "text-white/85" : "text-gray-700"
                        }`}
                    >
                        {LINKS.map((link) => {
                            const active = link.page === current;
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        aria-current={active ? "page" : undefined}
                                        className={`relative py-1 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-right after:scale-x-0 after:rounded-full after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 ${
                                            onHero
                                                ? "hover:text-white after:bg-white"
                                                : "hover:text-brand after:bg-brand"
                                        } ${
                                            active
                                                ? onHero
                                                    ? "text-white after:origin-left after:scale-x-100"
                                                    : "text-brand after:origin-left after:scale-x-100"
                                                : ""
                                        }`}
                                    >
                                        {t(link.key)}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="flex items-center gap-2 xs:gap-3">
                        <div className="hidden sm:block">
                            <LanguageSwitch light={onHero} />
                        </div>

                        <Link
                            href="/reclutamiento#vacantes"
                            className={`btn hidden w-[7.75rem] items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold shadow-md transition-colors sm:inline-flex ${
                                onHero
                                    ? "bg-white text-brand-dark hover:bg-crema"
                                    : "bg-brand text-white hover:bg-brand-dark"
                            }`}
                        >
                            {t("nav.vacantes")}
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

                        <button
                            type="button"
                            onClick={() => setOpen((v) => !v)}
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            aria-label={open ? t("a11y.cerrarMenu") : t("a11y.menu")}
                            className={`grid h-10 w-10 place-items-center rounded-full transition-colors lg:hidden ${
                                onHero
                                    ? "bg-white/15 text-white backdrop-blur-sm"
                                    : "bg-gray-100 text-dark"
                            }`}
                        >
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                {open ? (
                                    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                                ) : (
                                    <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* Panel móvil */}
                <div
                    id="mobile-menu"
                    hidden={!open}
                    className="mt-2 overflow-hidden rounded-3xl border border-gray-200/60 bg-white/95 shadow-lg backdrop-blur-md lg:hidden"
                >
                    <ul className="flex flex-col p-3">
                        {LINKS.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    aria-current={link.page === current ? "page" : undefined}
                                    className={`block rounded-2xl px-4 py-3 font-medium transition-colors hover:bg-gray-50 hover:text-brand ${
                                        link.page === current
                                            ? "bg-gray-50 text-brand"
                                            : "text-gray-700"
                                    }`}
                                >
                                    {t(link.key)}
                                </Link>
                            </li>
                        ))}

                        <li className="my-2 h-px bg-gray-100" aria-hidden="true" />

                        <li className="flex items-center justify-between px-4 py-2 sm:hidden">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                {t("nav.idioma")}
                            </span>
                            <LanguageSwitch />
                        </li>

                        <li>
                            <Link
                                href="/reclutamiento#vacantes"
                                onClick={() => setOpen(false)}
                                className="btn mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3.5 font-semibold text-white shadow-md hover:bg-brand-dark"
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
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
