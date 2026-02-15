import AnimeList from "@/components/AnimeList";
import { getAnimeFull } from "@/services/anime.fullList";
export const dynamic = "force-dynamic";
import ButtonBack from "@/components/Navbar/ButtonBack";

const animeFull = async () => {
    const data = await getAnimeFull();
    return (
        <div className="p-4 max-w-7xl mx-auto">
            <ButtonBack />
            <AnimeList api={data} mode="az" />
        </div>
    );
};
export default animeFull;
