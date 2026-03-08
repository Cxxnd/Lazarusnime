import { episodeModel } from "@/domain/anime.episode.model";
import { animeRepository } from "@/repositories/anime.repositories";

export async function getEpisodeDetail(slug) {
    const response = await animeRepository.getEpisode(slug);
    return episodeModel(response?.data);
}