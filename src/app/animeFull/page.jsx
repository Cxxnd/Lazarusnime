import AnimeList from "@/components/AnimeList";
import { getAnime } from "@/libs/service-api";
export const dynamic = "force-dynamic";

const animeFull = async () => {
    const data = await getAnime({ resource: "unlimited" });
    const res = data?.data?.list || {};
    return <AnimeList api={res} mode="az" />;
};
export default animeFull;
