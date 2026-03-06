import { completeAnime } from "@/domain/anime.complete.model";
import { animeRepository } from "@/repositories/anime.repositories";

export async function getCompleteAnime(page = 1) {
    const res = await animeRepository.getCompleteAnime(page);
    const mapped = completeAnime({
        animeList: res?.data?.animeList,
        pagination: res?.pagination,
    });

    return {
        list: mapped.animeList,
        pagination: mapped.pagination,
    }
}