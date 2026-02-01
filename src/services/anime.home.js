import { animeRepository } from '@/repositories/anime.repositories'
import { AnimeCard } from '@/domain/anime.model'

export async function getAnimeHome() {
    const res = await animeRepository.getHome()

    return {
        ongoingAnime:
            res?.data?.ongoing?.animeList?.map(AnimeCard) ?? [],
        completeAnime:
            res?.data?.completed?.animeList?.map(AnimeCard) ?? [],
        linkOngoingAnime: res?.data?.ongoing?.href || '/ongoing-anime',
        linkCompleteAnime: res?.data?.completed?.href || '/animeFull'
    }
}
