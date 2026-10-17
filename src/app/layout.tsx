import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Outfit } from "next/font/google";

import ApplyModal from "@/components/ui/ApplyModal";
import { ApplyProvider } from "@/components/ui/ApplyProvider";
import { LanguageProvider } from "@/components/layout/LanguageProvider";
import RevealReady from "@/components/motion/RevealReady";
import SmoothScroll from "@/components/motion/SmoothScroll";

import "./globals.css";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

const instrumentSerif = Instrument_Serif({
    subsets: ["latin"],
    weight: "400",
    style: ["normal", "italic"],
    variable: "--font-instrument",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://bia.hn"),
    title: {
        default: "bia Honduras · Café que une",
        template: "%s · bia Honduras",
    },
    description:
        "Vacantes y cultura laboral de bia Honduras, parte de Grupo Mariposa: Café Maya, El Indio, Oro y Medalla. Producción, calidad y distribución en San Pedro Sula y Tegucigalpa.",
    keywords: [
        "bia Honduras",
        "Café Maya",
        "Café El Indio",
        "Café Oro",
        "Café Medalla",
        "empleo Honduras",
        "vacantes",
        "Grupo Mariposa",
    ],
    openGraph: {
        locale: "es_HN",
        type: "website",
        siteName: "bia Honduras",
        title: "bia Honduras · Café que une",
        description:
            "Vacantes, cultura y beneficios de bia Honduras. Cada taza empieza con alguien como tú.",
        images: ["/hero-planta.jpg"],
    },
};

export const viewport: Viewport = {
    themeColor: "#4a88fa",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="es"
            // `reveal-pending` evita que los bloques animados se vean antes de
            // tiempo; <RevealReady> lo quita cuando todo está montado.
            className={`${outfit.variable} ${instrumentSerif.variable} reveal-pending`}
        >
            <body className="min-h-dvh bg-surface text-dark antialiased">
                <LanguageProvider>
                    <ApplyProvider>
                        <SmoothScroll>
                            {children}
                            <ApplyModal />
                        </SmoothScroll>
                    </ApplyProvider>
                </LanguageProvider>
                <RevealReady />
            </body>
        </html>
    );
}