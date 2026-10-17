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
export function MariposaPill({ className = "" }: { className?: string }) {
    const { t } = useLang();

    return (
        <span
            className={`inline-flex w-max items-center gap-2.5 rounded-full border border-gray-200 bg-surface py-2 pl-2.5 pr-4 ${className}`}
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
            <span className="text-xs text-gray-600">
                {t("footer.parteDe")}{" "}
                <strong className="font-semibold text-dark">Grupo Mariposa</strong>
            </span>
        </span>
    );
}