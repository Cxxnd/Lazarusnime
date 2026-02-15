export function DownloadUrl(data) {
    return {
        title: data.title,
        url: data.url
    }
}

export function DownloadQuality(data) {
    return {
        title: data.title,
        size: data.size,
        urls: data.urls?.map(DownloadUrl) ?? []
    }
}

export function DownloadFormat(data) {
    return {
        title: data.title,
        qualities: data.qualities?.map(DownloadQuality) ?? []
    }
}


export function batchDetail(data) {
    return {
        title: data.title,
        animeId: data.animeId,
        poster: data.poster,
        japanese: data.japanese ?? '-',
        type: data.type ?? '-',
        score: data.score ?? null,
        episodes: data.episodes ?? null,
        duration: data.duration ?? '-',
        studios: data.studios ?? '-',
        producers: data.producers ?? '-',
        aired: data.aired ?? '-',
        credit: data.credit ?? '-',
        genreList: data.genreList?.map(g => ({
            title: g.title,
            genreId: g.genreId,
        })) ?? [],
        downloadUrls: data.downloadUrl?.formats?.map(DownloadFormat),
    }
}