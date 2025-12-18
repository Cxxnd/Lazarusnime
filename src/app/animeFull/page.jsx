import AnimeList from "@/components/AnimeList";
import { getAnime } from "@/libs/service-api";
export const dynamic = "force-dynamic";
import ButtonBack from "@/components/Navbar/ButtonBack";

const animeFull = async () => {
    const data = await getAnime({ resource: "unlimited" });
    const res = data?.data?.list || {};
    return (
        <div className="p-4 max-w-7xl mx-auto">
            <ButtonBack />
            <AnimeList api={res} mode="az" />
        </div>
    );
};
export default animeFull;
