"use client";

import Image from "next/image";

import { useLang } from "@/components/layout/LanguageProvider";

/** Logotipo de Grupo Mariposa, parte de bia Honduras. */
export const MARIPOSA_LOGO = "/mariposa.png";

/** Tamaño real del archivo: 1477×1461. */
const MARIPOSA_SIZE = { width: 1477, height: 1461 };

/**
 * Píldora "Parte de Grupo Mariposa".
 * Se usa en el encabezado de la portada y en el pie; es el mismo bloque en
 * ambos lugares para que la marca se lea igual arriba y abajo.
 */
export function MariposaPill({
    className = "",
    variant = "default",
}: {
    className?: string;
    /** `light` para fondos oscuros (hero con video). */
    variant?: "default" | "light";
}) {
    const { t } = useLang();

    return (
        <span
            className={`inline-flex w-max items-center gap-2.5 rounded-full border py-2 pl-2.5 pr-4 ${
                variant === "light"
                    ? "border-white/25 bg-white/10 backdrop-blur-sm"
                    : "border-gray-200 bg-surface"
            } ${className}`}
        >
            <Image
                src={MARIPOSA_LOGO}
                alt="Grupo Mariposa"
                width={MARIPOSA_SIZE.width}
                height={MARIPOSA_SIZE.height}
                sizes="26px"
                style={{ width: 26, height: 26 }}
                className="shrink-0"
            />
            <span
                className={`text-xs ${
                    variant === "light" ? "text-white/80" : "text-gray-600"
                }`}
            >
                {t("footer.parteDe")}{" "}
                <strong
                    className={
                        variant === "light" ? "font-semibold text-white" : "font-semibold text-dark"
                    }
                >
                    Grupo Mariposa
                </strong>
            </span>
        </span>
    );
}