import { AnimeDetails } from "@/domain/anime.model";
import { animeRepository } from "@/repositories/anime.repositories";

export async function getAnimeDetail(slug) {
    const res = await animeRepository.getAnimeDetail(slug);
    return AnimeDetails(res?.data ?? {});
}