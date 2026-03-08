export function genreItem(data = {}) {
    return {
        title: data?.title ?? "",
        genreId: data?.genreId ?? "",
        href: data?.href ?? "",
        otakudesuUrl: data?.otakudesuUrl ?? "",
    };
}

export function episodeItem(data = {}) {
    return {
        title: data?.title ?? "",
        eps: data?.eps ?? 0,
        date: data?.date ?? "",
        episodeId: data?.episodeId ?? "",
        href: data?.href ?? "",
        otakudesuUrl: data?.otakudesuUrl ?? "",
    };
}

export function serverItem(data = {}) {
    return {
        title: data?.title ?? "",
        serverId: data?.serverId ?? "",
        href: data?.href ?? "",
    };
}

export function qualityItem(data = {}) {
    return {
        title: data?.title ?? "",
        serverList: data?.serverList?.map(serverItem) ?? [],
    };
}

export function downloadUrlItem(data = {}) {
    return {
        title: data?.title ?? "",
        url: data?.url ?? "",
    };
}

export function downloadQualityItem(data = {}) {
    return {
        title: data?.title ?? "",
        size: data?.size ?? "",
        urls: data?.urls?.map(downloadUrlItem) ?? [],
    };
}

export function episodeInfo(data = {}) {
    return {
        credit: data?.credit ?? "",
        encoder: data?.encoder ?? "",
        duration: data?.duration ?? "",
        type: data?.type ?? "",
        genreList: data?.genreList?.map(genreItem) ?? [],
        episodeList: data?.episodeList?.map(episodeItem) ?? [],
    };
}

export function prevEpisode(data = {}) {
    return {
        title: data?.title ?? "",
        episodeId: data?.episodeId ?? "",
    };
}

export function nextEpisode(data = {}) {
    return {
        title: data?.title ?? "",
        episodeId: data?.episodeId ?? "",
    };
}

export function episodeServer(data = {}) {
    return {
        qualities: data?.qualities?.map(qualityItem) ?? [],
    };
}

export function episodeDownload(data = {}) {
    return {
        qualities: data?.qualities?.map(downloadQualityItem) ?? [],
    };
}

export function episodeModel(data = {}) {
    return {
        title: data?.title ?? "",
        animeId: data?.animeId ?? "",
        releaseTime: data?.releaseTime ?? "",
        defaultStreamingUrl: data?.defaultStreamingUrl ?? "",
        prevEpisode: data?.prevEpisode ? prevEpisode(data.prevEpisode) : null,
        nextEpisode: data?.nextEpisode ? nextEpisode(data.nextEpisode) : null,
        server: episodeServer(data?.server),
        downloadUrl: episodeDownload(data?.downloadUrl),
        info: data?.info ? episodeInfo(data.info) : null,
    };
}