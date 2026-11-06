"use client";

import Image from "next/image";

import type { Brand } from "@/data/types";

/** Oscurece un color hexadecimal para el degradado del empaque. */
function shade(hex: string, amount = 0.35) {
    const n = parseInt(hex.replace("#", ""), 16);
    const r = Math.round(((n >> 16) & 255) * (1 - amount));
    const g = Math.round(((n >> 8) & 255) * (1 - amount));
    const b = Math.round((n & 255) * (1 - amount));
    return `rgb(${r} ${g} ${b})`;
}

/**
 * Empaque de muestra.
 *
 * Mientras no existan fotos de producto por marca, este componente dibuja
 * una bolsa con el color y el logo de la marca: sirve para maquetar la
 * galería y las presentaciones. Cuando lleguen los packshots reales, se
 * sustituye el contenido por la foto y el resto del layout no cambia.
 */
export function BrandPackshot({
    brand,
    formato,
    className = "",
}: {
    brand: Brand;
    formato?: string;
    className?: string;
}) {
    return (
        <div
            className={`relative aspect-[3/4] w-full overflow-hidden rounded-t-[2.25rem] rounded-b-[1.25rem] shadow-2xl ${className}`}
            style={{
                background: `linear-gradient(155deg, ${brand.color} 0%, ${shade(
                    brand.color,
                    0.45,
                )} 100%)`,
            }}
        >
            {/* Sello superior */}
            <div className="absolute inset-x-4 top-3 h-1.5 rounded-full bg-black/20" />
            <div className="absolute inset-x-6 top-6 h-px bg-white/20" />

            {/* Etiqueta con el logo */}
            <div className="absolute inset-x-[18%] top-[28%] grid aspect-square place-items-center rounded-[1.25rem] bg-white p-4 shadow-lg">
                <Image
                    src={brand.logo}
                    alt=""
                    width={brand.logoSize.width}
                    height={brand.logoSize.height}
                    sizes="120px"
                    className="h-full w-full object-contain"
                />
            </div>

            {/* Pie del empaque */}
            <div className="absolute inset-x-0 bottom-4 text-center">
                <div className="text-[0.5625rem] font-bold uppercase tracking-[0.22em] text-white/70">
                    {brand.name.replace("Café ", "")}
                </div>
                {formato && (
                    <div className="mt-0.5 text-[0.625rem] font-semibold text-white/85">
                        {formato}
                    </div>
                )}
            </div>

            {/* Brillo lateral */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white/15 to-transparent" />
        </div>
    );
}