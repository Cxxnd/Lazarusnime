import { genreDetail } from "@/domain/anime.genredetail.model";
import { animeRepository } from "@/repositories/anime.repositories";

export async function getGenreDetail(slug, page = 1) {
    const res = await animeRepository.getGenreDetail(slug, page);
    const mapped = genreDetail({
        animeList: res?.data?.animeList,
        pagination: res?.pagination,
    });
    return {
        list: mapped.animeList,
        pagination: mapped.pagination
    };
}