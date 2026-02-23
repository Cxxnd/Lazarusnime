export function ongoingItem(data) {
    return {
        animeId: data.animeId,
        title: data.title,
        poster: data.poster,
        episodes: data.episodes,
        releaseDay: data.releaseDay,
        latestReleaseDate: data.latestReleaseDate,
    }
}

export function ongoingAnime(data = {}) {
    return {
        animeList: data?.animeList?.map(ongoingItem) ?? [],
        pagination: {
            currentPage: data?.pagination?.currentPage ?? 1,
            totalPages: data?.pagination?.totalPages ?? 1,
        }
    }
}