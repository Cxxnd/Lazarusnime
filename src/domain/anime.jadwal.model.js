export function jadwalItem(item = {}) {
    return {
        title: item.title ?? "",
        slug: item.slug ?? "",
        poster: item.poster ?? "",
    }
}

export function jadwalAnime(response = {}) {
    return {
        data: (response.data ?? []).map(day => ({
            day: day.day ?? "",
            anime_list: (day.anime_list ?? []).map(jadwalItem),
        })),
    }
}