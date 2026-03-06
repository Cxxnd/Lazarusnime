export function genreItem(data) {
    return {
        title: data.title,
        genreId: data.genreId,
    }
}

export function genreList(data = {}) {
    return {
        genreList: data?.genreList?.map(genreItem) ?? [],
    }
}