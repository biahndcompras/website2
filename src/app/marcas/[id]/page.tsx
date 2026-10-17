import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { BrandHero } from "@/components/sections/BrandHero";
import { BrandProfile, OtherBrands } from "@/components/sections/BrandProfile";
import { BRANDS } from "@/data/brands";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
    return BRANDS.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const brand = BRANDS.find((b) => b.id === id);

    if (!brand) return { title: "Marca no encontrada" };

    return {
        title: brand.name,
        description: `${brand.tagline.es}. Perfil sensorial, historia y vacantes de ${brand.name} en bia Honduras.`,
        openGraph: { images: [brand.hero] },
    };
}

export default async function BrandPage({ params }: Props) {
    const { id } = await params;
    const brand = BRANDS.find((b) => b.id === id);

    if (!brand) notFound();

    return (
        <>
            <Navbar />

            <main id="main">
                <BrandHero brand={brand} />
                <BrandProfile brand={brand} />
                <OtherBrands current={brand.id} />
            </main>

            <Footer />
        </>
    );
}