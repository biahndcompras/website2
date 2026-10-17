/* Tipos de dominio de bia Honduras. Fuente única para marcas y vacantes. */

export type Lang = "es" | "en";

/** Texto disponible en los dos idiomas del sitio. */
export type I18nText = Record<Lang, string>;

export type Brand = {
    id: string;
    /** Prefijo de las claves de traducción propias de la marca (oro, maya…). */
    i18n: string;
    logo: string;
    /** Tamaño real del archivo de logo, para que la optimizer no lo invente. */
    logoSize: { width: number; height: number };
    /** Fotografía del encabezado de la ficha de marca. */
    hero: string;
    name: string;
    since: number;
    tagline: I18nText;
    story: I18nText;
    /** Nivel de tueste, 0–100. */
    roast: number;
    roastLabel: I18nText;
    /** Altitud representativa de cosecha, en metros sobre el nivel del mar. */
    altitude: number;
    /** Rango textual de altitud que se muestra al usuario. */
    altitudeRange: string;
    color: string;
    notes: Record<Lang, string[]>;
    occasions: Record<Lang, string[]>;
    channels: Record<Lang, string[]>;
};

export type JobArea = "marketing" | "operaciones" | "comercial" | "people";

export type Job = {
    id: string;
    area: JobArea;
    /** Marca del portafolio a la que pertenece, o null si es transversal. */
    brand: string | null;
    featured: boolean;
    title: I18nText;
    city: string;
    type: I18nText;
    salary: string;
    color: string;
};
