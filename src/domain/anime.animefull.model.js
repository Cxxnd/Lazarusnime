export function animeItem(data) {
    return {
        title: data.title,
        animeId: data.animeId,
    }
}

export function animeGroup(data) {
    return {
        startWith: data.startWith,
        animeList: data.animeList?.map(animeItem) ?? [],
    }
}