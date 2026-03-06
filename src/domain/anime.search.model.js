export function genreItem(data = {}) {
    return {
        title: data?.title ?? "",
        genreId: data?.genreId ?? "",
    };
}

export function searchItem(data = {}) {
    return {
        title: data?.title ?? "",
        poster: data?.poster ?? "",
        status: data?.status ?? "",
        score: data?.score ?? "",
        animeId: data?.animeId ?? "",
        genreList: data?.genreList?.map(genreItem) ?? [],
    };
}

export function searchAnime(data = {}) {
    return {
        animeList: data?.animeList?.map(searchItem) ?? [],
    };
}