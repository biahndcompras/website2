"use client";

import Image from "next/image";
import Link from "next/link";

import { useLang } from "@/components/layout/LanguageProvider";
import { MariposaPill } from "@/components/ui/MariposaPill";
import { BRANDS } from "@/data/brands";

/**
 * Ruta del video de fondo. Mientras esté vacía se usa la fotografía con un
 * zoom muy lento; al añadir el archivo (p. ej. "/hero-bia.mp4") el video entra
 * solo, con la foto como póster para no penalizar el LCP.
 */
const HERO_VIDEO = "";

/** Copias de la cinta de marcas: cubren pantallas anchas sin dejar huecos. */
const MARCAS_REPETIDAS = 6;

export function HeroVideo() {
  const { t } = useLang();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-dark"
    >
      {/* Fondo: video si existe, si no la fotografía con zoom lento */}
      <div className="absolute inset-0" aria-hidden="true">
        {HERO_VIDEO ? (
          <video
            className="h-full w-full object-cover"
            src={HERO_VIDEO}
            poster="/hero-planta.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          />
        ) : (
          <Image
            src="/hero-planta.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover motion-safe:animate-[hero-zoom_28s_ease-in-out_infinite_alternate]"
          />
        )}
      </div>

      {/* Capas de contraste: viñeta + azul de marca hacia la cinta */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/40 to-dark/75"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#081528] via-[#081528]/70 to-transparent"
        aria-hidden="true"
      />
      {/* Foco suave detrás del texto: sube el contraste sin oscurecer
                la fotografía entera */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_48%,rgba(8,21,40,0.55),rgba(8,21,40,0.15)_65%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Contenido: ocupa el espacio libre y deja la cinta siempre abajo */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 pb-8 pt-24 xs:px-6 md:pb-12 md:pt-36">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <div className="motion-safe:animate-[hero-in_0.9s_cubic-bezier(0.22,1,0.36,1)_both]">
            <MariposaPill variant="light" />
          </div>

          <p className="kicker kicker--light mt-5 mb-3 justify-center motion-safe:animate-[hero-in_0.9s_cubic-bezier(0.22,1,0.36,1)_0.12s_both]">
            {t("hero.kicker")}
          </p>

          <h1 className="hero-title mb-4 text-white motion-safe:animate-[hero-in_1s_cubic-bezier(0.22,1,0.36,1)_0.2s_both]">
            <span className="block">{t("hero.titulo")}</span>
            <span className="block">
              <span className="whitespace-nowrap">{t("hero.tituloLine2")}</span>{" "}
              <span className="block font-serif italic text-brand-light md:inline">
                {t("hero.tituloItalic")}
              </span>
            </span>
          </h1>

          <p className="mb-6 max-w-2xl text-base leading-relaxed text-white/80 xs:text-lg motion-safe:animate-[hero-in_1s_cubic-bezier(0.22,1,0.36,1)_0.32s_both]">
            {t("hero.subtitulo")}
          </p>

          <div className="flex w-full flex-col items-stretch justify-center gap-3 xs:w-auto xs:flex-row xs:items-center motion-safe:animate-[hero-in_1s_cubic-bezier(0.22,1,0.36,1)_0.44s_both]">
            <Link
              href="/reclutamiento#vacantes"
              className="btn inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand-dark shadow-xl shadow-black/20 hover:bg-crema md:py-4"
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7-7 7"
                />
              </svg>
            </Link>
            <Link
              href="/nosotros"
              className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20 md:py-4"
            >
              {t("hero.ctaConocer")}
            </Link>
          </div>
        </div>
      </div>

      {/* Cinta de marcas */}
      <div className="relative z-10 border-t border-white/15 bg-dark/35 py-3 backdrop-blur-md md:py-4">
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <ul
            className="marquee-track flex w-max items-center"
            style={
              {
                "--copias": MARCAS_REPETIDAS,
                "--duracion": "38s",
              } as React.CSSProperties
            }
            aria-label={t("marcas.kicker")}
          >
            {Array.from({ length: MARCAS_REPETIDAS }, (_, copia) =>
              BRANDS.map((brand) => (
                <li
                  key={`${brand.id}-${copia}`}
                  aria-hidden={copia > 0}
                  className="shrink-0 px-6 xs:px-9"
                >
                  <Link
                    href={`/marcas/${brand.id}`}
                    className="group flex items-center gap-3 opacity-80 transition-opacity hover:opacity-100"
                    tabIndex={copia > 0 ? -1 : undefined}
                  >
                    <Image
                      src={brand.logo}
                      alt=""
                      width={brand.logoSize.width}
                      height={brand.logoSize.height}
                      className="h-9 w-9 rounded-full object-cover ring-1 ring-white/40"
                    />
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/85 transition-colors group-hover:text-white xs:text-sm">
                      {brand.name.replace("Café ", "")}
                      <span className="ml-2 font-normal text-white/45">
                        {brand.since}
                      </span>
                    </span>
                  </Link>
                </li>
              )),
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
