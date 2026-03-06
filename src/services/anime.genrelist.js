import { genreList } from "@/domain/anime.genrelist.model";
import { animeRepository } from "@/repositories/anime.repositories";

export async function getGenreList() {
    const res = await animeRepository.getGenreList();
    return genreList(res?.data ?? {});
}