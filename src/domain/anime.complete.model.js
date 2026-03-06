export function completeItem(data) {
    return {
        animeId: data.animeId,
        title: data.title,
        poster: data.poster,
        episodes: data.episodes,
        score: data.score,
        lastReleaseDate: data.lastReleaseDate,
    }
}

export function completeAnime(data = {}) {
    return {
        animeList: data?.animeList?.map(completeItem) ?? [],
        pagination: {
            currentPage: data?.pagination?.currentPage ?? 1,
            totalPages: data?.pagination?.totalPages ?? 1,
        }
    }
}