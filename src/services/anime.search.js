import { searchAnime } from "@/domain/anime.search.model";
import { animeRepository } from "@/repositories/anime.repositories";

export async function getSearchAnime(keyword) {
    const res = await animeRepository.getSearch(keyword);
    return searchAnime(res?.data ?? []);
}