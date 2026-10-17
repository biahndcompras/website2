import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BrandExplorer from "@/components/sections/BrandExplorer";
import JobBoard from "@/components/sections/JobBoard";
import StatsBar, { type StatItem } from "@/components/sections/StatsBar";
import { Culture, Hero, Operations, Voices } from "@/components/sections/HomeSections";

const STATS: StatItem[] = [
    { to: 500, prefix: "+", key: "stats.colaboradores" },
    { to: 12, key: "stats.centros" },
    { to: 98, suffix: "%", key: "stats.orgullo" },
    { to: 90, suffix: "+", key: "stats.anos", tone: "crema" },
];

export default function Home() {
    return (
        <>
            <Navbar current="inicio" />

            <main id="main">
                <Hero />
                <BrandExplorer />
                <Culture />
                <JobBoard featuredOnly />
                <StatsBar items={STATS} />
                <Operations />
                <Voices />
            </main>

            <Footer />
        </>
    );
}