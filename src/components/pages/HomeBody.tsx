import BrandExplorer from "@/components/sections/BrandExplorer";
import JobBoard from "@/components/sections/JobBoard";
import StatsBar, { type StatItem } from "@/components/sections/StatsBar";
import { Culture, Operations, Voices } from "@/components/sections/HomeSections";

const STATS: StatItem[] = [
    { to: 500, prefix: "+", key: "stats.colaboradores" },
    { to: 12, key: "stats.centros" },
    { to: 98, suffix: "%", key: "stats.orgullo" },
    { to: 90, suffix: "+", key: "stats.anos", tone: "crema" },
];

/**
 * Todo lo que va después del hero en la portada. Se comparte entre la
 * versión original y las variantes para poder comparar solo el hero.
 */
export function HomeBody() {
    return (
        <>
            <BrandExplorer />
            <Culture />
            <JobBoard featuredOnly />
            <StatsBar items={STATS} />
            <Operations />
            <Voices />
        </>
    );
}
