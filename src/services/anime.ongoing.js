import { ongoingAnime } from "@/domain/anime.ongoing.model";
import { animeRepository } from "@/repositories/anime.repositories";

export async function getOngoingAnime(page = 1) {
    const res = await animeRepository.getOngoingAnime(page);

    const mapped = ongoingAnime({
        animeList: res?.data?.animeList,
        pagination: res?.pagination,
    });

    return {
        list: mapped.animeList,
        pagination: mapped.pagination,
    };
}