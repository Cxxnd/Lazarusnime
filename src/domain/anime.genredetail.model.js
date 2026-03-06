export function genreListItem(data) {
    return {
        genreId: data.genreId,
        title: data.title,
    }
}

export function genreList(data) {
    return {
        title: data.title,
        poster: data.poster,
        score: data.score,
        episodes: data.episodes,
        season: data.season,
        animeId: data.animeId,
        paragraphs: data.synopsis?.paragraphs ?? [],
        genreList: data?.genreList?.map(genreListItem) ?? [],
    }
}

export function genreDetail(data) {
    return {
        animeList: data?.animeList?.map(genreList) ?? [],
        pagination: {
            currentPage: data?.pagination?.currentPage ?? 1,
            totalPages: data?.pagination?.totalPages ?? 1,
        }
    }
}