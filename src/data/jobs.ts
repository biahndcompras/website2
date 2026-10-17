import type { Job, JobArea } from "./types";

/** Catálogo de vacantes. Alimenta la portada, el listado completo y el formulario. */
export const JOBS: Job[] = [
    {
        id: "mkt-analista",
        area: "marketing" as JobArea,
        brand: "oro",
        featured: true,
        title: { es: "Analista de Marketing Digital", en: "Digital Marketing Analyst" },
        city: "San Pedro Sula",
        type: { es: "Tiempo completo", en: "Full time" },
        salary: "L 22,000",
        color: "#2563EB",
    },
    {
        id: "ops-supervisor",
        area: "operaciones" as JobArea,
        brand: "medalla",
        featured: true,
        title: { es: "Supervisor de Producción", en: "Production Supervisor" },
        city: "San Pedro Sula · Planta",
        type: { es: "Tiempo completo · Turnos rotativos", en: "Full time · Rotating shifts" },
        salary: "L 28,000",
        color: "#7A4B23",
    },
    {
        id: "com-analista",
        area: "comercial" as JobArea,
        brand: "indio",
        featured: true,
        title: { es: "Analista de Comercio Exterior", en: "Foreign Trade Analyst" },
        city: "Tegucigalpa",
        type: { es: "Tiempo completo", en: "Full time" },
        salary: "L 24,000",
        color: "#A9713F",
    },
    {
        id: "ppl-partner",
        area: "people" as JobArea,
        brand: null,
        featured: true,
        title: { es: "People Business Partner", en: "People Business Partner" },
        city: "San Pedro Sula",
        type: { es: "Tiempo completo", en: "Full time" },
        salary: "L 32,000",
        color: "#7A4B23",
    },
    {
        id: "ops-barista",
        area: "operaciones" as JobArea,
        brand: "maya",
        featured: true,
        title: { es: "Barista Q-Grader (Certificación)", en: "Q-Grader Barista (Certification)" },
        city: "San Pedro Sula · Laboratorio",
        type: { es: "Programa de certificación", en: "Certification program" },
        salary: "Sueldo + beca",
        color: "#C8963E",
    },
    {
        id: "com-representante",
        area: "comercial" as JobArea,
        brand: "medalla",
        featured: true,
        title: { es: "Representante de Ventas", en: "Sales Representative" },
        city: "San Pedro Sula",
        type: { es: "Tiempo completo", en: "Full time" },
        salary: "L 18,000 + comisiones",
        color: "#4A2C12",
    },
    {
        id: "ops-coordinador",
        area: "operaciones" as JobArea,
        brand: "indio",
        featured: false,
        title: { es: "Coordinador de Logística", en: "Logistics Coordinator" },
        city: "San Pedro Sula",
        type: { es: "Tiempo completo", en: "Full time" },
        salary: "L 26,000",
        color: "#A9713F",
    },
    {
        id: "mkt-trade",
        area: "marketing" as JobArea,
        brand: "maya",
        featured: false,
        title: { es: "Chef de Marca / Trade Marketing", en: "Brand Manager / Trade Marketing" },
        city: "Tegucigalpa",
        type: { es: "Tiempo completo", en: "Full time" },
        salary: "L 30,000",
        color: "#7A4B23",
    },
    {
        id: "com-distribuidor",
        area: "comercial" as JobArea,
        brand: "oro",
        featured: false,
        title: { es: "Analista de Distribución", en: "Distribution Analyst" },
        city: "Tegucigalpa",
        type: { es: "Tiempo completo", en: "Full time" },
        salary: "L 21,000",
        color: "#C8963E",
    },
];

export const AREAS: Record<JobArea, { es: string; en: string }> = {
    marketing: { es: "Marketing", en: "Marketing" },
    operaciones: { es: "Operaciones", en: "Operations" },
    comercial: { es: "Comercial", en: "Commercial" },
    people: { es: "People", en: "People" },
};

/** Etiquetas de las notas de cata, en el orden del paleta de marca. */
export const NOTE_COLORS = ["#7A4B23", "#A9713F", "#C8963E", "#4A2C12"];

export function jobsForBrand(brandId: string): Job[] {
    return JOBS.filter((j) => j.brand === brandId);
}
