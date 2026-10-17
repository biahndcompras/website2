import type { Brand } from "./types";

/** Portafolio de marcas de bia Honduras. */
export const BRANDS: Brand[] = [
    {
        id: "maya",
        i18n: "maya",
        logo: "/marca-maya.jpeg",
        logoSize: { width: 554, height: 554 },
        hero: "/hero-planta.jpg",
        name: "Café Maya",
        since: 1935,
        tagline: { es: "Tradición centenario desde 1935", en: "A century-old tradition since 1935" },
        story: { es: "Marca insignia de la casa desde 1935. Lotes seleccionados en las tierras altas del occidente de Honduras.", en: "The house flagship brand since 1935. Selected lots from the highlands of western Honduras." },
        roast: 45,
        roastLabel: { es: "Tueste medio", en: "Medium roast" },
        altitude: 1250,
        altitudeRange: "1,100 – 1,600",
        color: "#7A4B23",
        notes: { es: ["Chocolate", "Nuez", "Caramelo", "Cacao suave"], en: ["Chocolate", "Walnut", "Caramel", "Soft cocoa"] },
        occasions: { es: ["El desayuno de toda la familia", "Recetas de casa con sabor a café", "Momentos que merecen calma"], en: ["The family breakfast", "Home recipes with a coffee touch", "Moments that deserve calm"] },
        channels: { es: ["Supermercados", "Tiendas de barrio", "Hogar"], en: ["Supermarkets", "Local stores", "Home"] },
    },
    {
        id: "indio",
        i18n: "indio",
        logo: "/marca-indio.jpeg",
        logoSize: { width: 554, height: 554 },
        hero: "/hero-planta.jpg",
        name: "Café El Indio",
        since: 1948,
        tagline: { es: "El café con que despierta Honduras desde 1948", en: "The coffee Honduras wakes up to since 1948" },
        story: { es: "Tres generaciones despachando el café que acompaña el desayuno y la tarde de todo el país.", en: "Three generations serving the coffee that accompanies breakfast and the afternoon of the whole country." },
        roast: 70,
        roastLabel: { es: "Tueste medio oscuro", en: "Medium-dark roast" },
        altitude: 1150,
        altitudeRange: "900 – 1,450",
        color: "#A9713F",
        notes: { es: ["Cacao", "Espresso", "Dulce de leche", "Avellana"], en: ["Cocoa", "Espresso", "Caramel", "Hazelnut"] },
        occasions: { es: ["La mañana que no se puede perder", "Colaciones de oficina", "Café fuerte para jornadas largas"], en: ["The morning you can't miss", "Office break times", "A strong cup for long shifts"] },
        channels: { es: ["Supermercados", "Tiendas de barrio", "Restaurantes"], en: ["Supermarkets", "Local stores", "Restaurants"] },
    },
    {
        id: "oro",
        i18n: "oro",
        logo: "/marca-oro.jpeg",
        logoSize: { width: 447, height: 447 },
        hero: "/cafeoro.jpg",
        name: "Café Oro",
        since: 1972,
        tagline: { es: "Calidad premium de altura desde 1972", en: "Premium high-altitude quality since 1972" },
        story: { es: "Cosecha de altura seleccionada para clientes que buscan origen, trazabilidad y un dulzor limpio.", en: "Selected high-altitude harvest for clients who seek origin, traceability and sweetness." },
        roast: 25,
        roastLabel: { es: "Tueste claro", en: "Light roast" },
        altitude: 1700,
        altitudeRange: "1,500 – 1,950",
        color: "#C8963E",
        notes: { es: ["Cítricos", "Floral", "Jazmín", "Frutos rojos"], en: ["Citrus", "Floral", "Jasmine", "Red berries"] },
        occasions: { es: ["Catas y sesiones de café de especialidad", "Preparados de filtro y V60", "Postres que piden un fondo limpio"], en: ["Cupping and specialty sessions", "Filter and V60 brewing", "Desserts that need a clean base"] },
        channels: { es: ["Cafeterías", "Restaurantes", "Tienda en línea"], en: ["Coffee shops", "Restaurants", "Online store"] },
    },
    {
        id: "medalla",
        i18n: "medalla",
        logo: "/marca-medalla.jpeg",
        logoSize: { width: 449, height: 445 },
        hero: "/hero-planta.jpg",
        name: "Café Medalla",
        since: 1985,
        tagline: { es: "Fuerza, energía y consistencia desde 1985", en: "Strength, energy and consistency since 1985" },
        story: { es: "Tueste intenso y estable para el canal de mayor consumo del país, sin perder trazabilidad de origen.", en: "Intense and consistent roast for the country's high-volume channel, without losing origin traceability." },
        roast: 88,
        roastLabel: { es: "Tueste oscuro", en: "Dark roast" },
        altitude: 1050,
        altitudeRange: "800 – 1,350",
        color: "#4A2C12",
        notes: { es: ["Tueste intenso", "Cacao amargo", "Cítrico", "Final largo"], en: ["Intense roast", "Bitter cocoa", "Citrus", "Long finish"] },
        occasions: { es: ["Turnos de planta y trabajo en campo", "Raciones altas de energía", "Toda la jornada, sin paradas"], en: ["Plant shifts and field work", "High-energy servings", "All day, no breaks"] },
        channels: { es: ["Supermercados", "Estaciones de servicio", "Distribuidoras"], en: ["Supermarkets", "Gas stations", "Distributors"] },
    },
];

export function getBrand(id: string | null): Brand | undefined {
    return BRANDS.find((b) => b.id === id);
}

/** Rango de la escala de altitud, usado para posicionar el marcador. */
export const ALTITUDE_MIN = 800;
export const ALTITUDE_MAX = 2000;

export function altitudePosition(meters: number): number {
    const pct = ((meters - ALTITUDE_MIN) / (ALTITUDE_MAX - ALTITUDE_MIN)) * 100;
    return Math.min(96, Math.max(4, pct));
}
