"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { useLang } from "@/components/layout/LanguageProvider";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { BrandPackshot } from "@/components/sections/BrandPackshot";
import type { Brand } from "@/data/types";

/* -------------------------------------------------------------------------
   Galería: carrusel horizontal con scroll-snap. La primera diapositiva es el
   empaque de la marca; el resto son imágenes de proceso que ya existen en el
   sitio. Sirve como estructura para ir añadiendo fotos reales de producto.
   ------------------------------------------------------------------------- */

/** Imágenes genéricas cuando la marca no tiene fotos propias. */
const RESPALDO = {
    field: "/cafeoro.jpg",
    plant: "/hero-planta.jpg",
    growers: "/cafetal.jpg",
};

const DIAPOSITIVAS = [
    {
        clave: "field" as const,
        titulo: { es: "En el cafetal", en: "In the coffee field" },
        texto: {
            es: "Origen y paisaje de las zonas cafetaleras hondureñas.",
            en: "Origin and landscape of the Honduran coffee regions.",
        },
    },
    {
        clave: "plant" as const,
        titulo: { es: "En la planta", en: "At the plant" },
        texto: {
            es: "Empaque y control de calidad en San Pedro Sula.",
            en: "Packaging and quality control in San Pedro Sula.",
        },
    },
    {
        clave: "growers" as const,
        titulo: { es: "Con los productores", en: "With the growers" },
        texto: {
            es: "Compra directa y acompañamiento a las comunidades.",
            en: "Direct purchasing and support for the communities.",
        },
    },
];

export function BrandGallery({ brand }: { brand: Brand }) {
    const { pick } = useLang();
    const rail = useRef<HTMLDivElement>(null);

    const mover = (delta: number) => {
        const el = rail.current;
        if (!el) return;
        const paso = el.clientWidth * 0.8;
        el.scrollBy({ left: delta * paso, behavior: "smooth" });
    };

    return (
        <section id="galeria" className="bg-white px-4 py-20 xs:px-6 md:py-28">
            <div className="shell">
                <Reveal className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                    <div className="max-w-2xl">
                        <p className="kicker mb-4">
                            {pick({ es: "La marca en imágenes", en: "The brand in images" })}
                        </p>
                        <h2 className="text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                            {brand.name}{" "}
                            <span className="font-serif italic text-brand">
                                {pick({ es: "de cerca", en: "up close" })}
                            </span>
                        </h2>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => mover(-1)}
                            aria-label={pick({ es: "Anterior", en: "Previous" })}
                            className="grid h-11 w-11 place-items-center rounded-full border border-gray-200 bg-white text-dark transition-colors hover:border-brand hover:text-brand"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" d="M15 5l-7 7 7 7" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => mover(1)}
                            aria-label={pick({ es: "Siguiente", en: "Next" })}
                            className="grid h-11 w-11 place-items-center rounded-full border border-gray-200 bg-white text-dark transition-colors hover:border-brand hover:text-brand"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </Reveal>

                <div
                    ref={rail}
                    className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] xs:-mx-6 xs:px-6 [&::-webkit-scrollbar]:hidden"
                >
                    {/* Empaque */}
                    <figure className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[30%]">
                        {brand.gallery?.packshot ? (
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-brand-light">
                                <Image
                                    src={brand.gallery.packshot}
                                    alt={brand.name}
                                    fill
                                    sizes="(min-width: 1024px) 30vw, 78vw"
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="rounded-[2rem] bg-surface p-6">
                                <div className="mx-auto max-w-[13rem]">
                                    <BrandPackshot
                                        brand={brand}
                                        formato={pick({ es: "Edición de casa", en: "House edition" })}
                                    />
                                </div>
                            </div>
                        )}
                        <figcaption className="mt-4">
                            <div className="text-sm font-semibold">{brand.name}</div>
                            <p className="text-sm text-gray-500">
                                {pick({
                                    es: "El empaque que llega a tu mesa.",
                                    en: "The package that reaches your table.",
                                })}
                            </p>
                        </figcaption>
                    </figure>

                    {DIAPOSITIVAS.map((item) => (
                        <figure
                            key={item.clave}
                            className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[30%]"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-brand-light">
                                <Image
                                    src={brand.gallery?.[item.clave] ?? RESPALDO[item.clave]}
                                    alt=""
                                    fill
                                    sizes="(min-width: 1024px) 30vw, 78vw"
                                    className="object-cover"
                                />
                                <div
                                    className="absolute inset-0 opacity-25 mix-blend-multiply"
                                    style={{ backgroundColor: brand.color }}
                                    aria-hidden="true"
                                />
                            </div>
                            <figcaption className="mt-4">
                                <div className="text-sm font-semibold">{pick(item.titulo)}</div>
                                <p className="text-sm text-gray-500">{pick(item.texto)}</p>
                            </figcaption>
                        </figure>
                    ))}
                </div>

                <p className="mt-2 text-xs text-gray-400">
                    {pick({
                        es: "Desliza o usa las flechas para ver más.",
                        en: "Swipe or use the arrows to see more.",
                    })}
                </p>
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------
   Presentaciones: tres formatos con el empaque al frente. El tamaño de cada
   bolsa cambia para sugerir la diferencia entre presentaciones.
   ------------------------------------------------------------------------- */

/** Presentaciones de respaldo cuando la marca no tiene catálogo propio. */
const PRESENTACIONES = [
    { formato: { es: "Molido · 250 g", en: "Ground · 250 g" }, escala: "max-w-[9rem]" },
    { formato: { es: "Grano entero · 500 g", en: "Whole bean · 500 g" }, escala: "max-w-[11rem]" },
    { formato: { es: "Molido · 500 g", en: "Ground · 500 g" }, escala: "max-w-[10rem]" },
];

export function BrandPresentations({ brand }: { brand: Brand }) {
    const { pick } = useLang();

    return (
        <section id="presentaciones" className="bg-surface px-4 py-20 xs:px-6 md:py-28">
            <div className="shell">
                <Reveal className="mx-auto mb-14 max-w-3xl text-center">
                    <p className="kicker mb-4 justify-center">
                        {pick({ es: "Presentaciones", en: "Presentations" })}
                    </p>
                    <h2 className="text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                        {pick({ es: "Elige tu", en: "Choose your" })}{" "}
                        <span className="font-serif italic text-brand">
                            {pick({ es: "favorito", en: "favorite" })}
                        </span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        {pick({
                            es: "Distintos tamaños para distintos momentos del día.",
                            en: "Different sizes for different moments of the day.",
                        })}
                    </p>
                </Reveal>

                {brand.products ? (
                    <RevealGroup
                        stagger={0.08}
                        className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6"
                    >
                        {brand.products.map((producto) => (
                            <article
                                key={producto.name}
                                className="card-hover flex flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-white"
                            >
                                <div className="relative aspect-square overflow-hidden bg-white">
                                    <Image
                                        src={producto.img}
                                        alt={producto.name}
                                        fill
                                        sizes="(min-width: 640px) 30vw, 50vw"
                                        className="object-contain transition-transform duration-500 hover:scale-[1.04]"
                                    />
                                </div>
                                <h3 className="border-t border-gray-100 px-5 py-4 text-center text-base font-semibold">
                                    {producto.name}
                                </h3>
                            </article>
                        ))}
                    </RevealGroup>
                ) : (
                    <RevealGroup
                        stagger={0.1}
                        className="grid grid-cols-1 gap-6 sm:grid-cols-3"
                    >
                        {PRESENTACIONES.map((p) => (
                            <article
                                key={p.formato.es}
                                className="card-hover flex flex-col items-center rounded-[2rem] border border-gray-100 bg-white p-8 text-center"
                            >
                                <div className="flex h-56 w-full items-end justify-center">
                                    <div className={`w-full ${p.escala}`}>
                                        <BrandPackshot brand={brand} />
                                    </div>
                                </div>
                                <h3 className="mt-6 text-lg font-semibold">
                                    {pick(p.formato)}
                                </h3>
                            </article>
                        ))}
                    </RevealGroup>
                )}
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------
   Cómo prepararlo: tres métodos con icono. Añade cuerpo a la ficha sin
   depender de fotografías nuevas.
   ------------------------------------------------------------------------- */

const METODOS = [
    {
        nombre: { es: "Filtro o V60", en: "Filter or V60" },
        texto: {
            es: "Agua a 92 °C y vertido en espiral. Resalta las notas más limpias.",
            en: "Water at 92 °C and a spiral pour. Brings out the cleanest notes.",
        },
        icono: "M5 4h14l-2 16H7L5 4zM8 10h8",
    },
    {
        nombre: { es: "Prensa francesa", en: "French press" },
        texto: {
            es: "Cuatro minutos de infusión y prensado lento. Cuerpo redondo.",
            en: "Four minutes of steeping and a slow press. Round body.",
        },
        icono: "M8 3h8v14a3 3 0 01-3 3h-2a3 3 0 01-3-3V3zM6 21h12",
    },
    {
        nombre: { es: "Espresso", en: "Espresso" },
        texto: {
            es: "Molienda fina y 25 segundos de extracción. Dulzor concentrado.",
            en: "Fine grind and a 25-second extraction. Concentrated sweetness.",
        },
        icono: "M4 8h13v6a4 4 0 01-4 4H8a4 4 0 01-4-4V8zM17 9h2a2 2 0 010 4h-2M4 21h13",
    },
];

export function BrandBrewing() {
    const { pick } = useLang();

    return (
        <section id="preparacion" className="bg-white px-4 py-20 xs:px-6 md:py-28">
            <div className="shell">
                <Reveal className="mb-14 max-w-2xl">
                    <p className="kicker mb-4">
                        {pick({ es: "Cómo prepararlo", en: "How to brew it" })}
                    </p>
                    <h2 className="text-3xl font-medium leading-tight xs:text-4xl md:text-5xl">
                        {pick({ es: "Tres formas de", en: "Three ways to" })}{" "}
                        <span className="font-serif italic text-brand">
                            {pick({ es: "sacarle el sabor", en: "bring out the flavor" })}
                        </span>
                    </h2>
                </Reveal>

                <RevealGroup
                    stagger={0.1}
                    className="grid grid-cols-1 gap-6 md:grid-cols-3"
                >
                    {METODOS.map((m) => (
                        <article
                            key={m.nombre.es}
                            className="card-hover rounded-[2rem] border border-gray-100 bg-surface p-8"
                        >
                            <div className="mb-6 grid h-12 w-12 place-items-center rounded-full bg-brand-light text-brand">
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d={m.icono} />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">{pick(m.nombre)}</h3>
                            <p className="leading-relaxed text-gray-500">{pick(m.texto)}</p>
                        </article>
                    ))}
                </RevealGroup>

                <div className="mt-10 flex justify-center">
                    <Link
                        href="/reclutamiento#vacantes"
                        className="btn inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 font-semibold text-white shadow-lg shadow-brand/25 hover:bg-brand-dark"
                    >
                        {pick({ es: "Trabaja en esta marca", en: "Work at this brand" })}
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
            </div>
        </section>
    );
}