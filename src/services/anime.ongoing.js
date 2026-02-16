import { ongoingAnime } from "@/domain/anime.ongoing.model";
import { animeRepository } from "@/repositories/anime.repositories";

export async function getOngoingAnime(page = 1) {
    const res = await animeRepository.getOngoingAnime(page);

    return {
        list: ongoingAnime(res?.data)?.animeList ?? [],
        pagination: ongoingAnime(res?.data)?.pagination ?? {},
    }
}