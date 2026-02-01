export function AnimeCard(data = {}) {
    return {
        animeId: data.animeId ?? data.id,
        title: data.title ?? '-',
        poster: data.poster ?? '',
        episode: data.episode_count ?? data.current_episode ?? '-',
        rating: data.rating ?? data.score ?? '',
        lastReleaseDate: data.lastReleaseDate ?? '',
        episodes: data.episodes ?? '',
        latestReleaseDate: data.latestReleaseDate ?? '',
        releaseDay: data.releaseDay ?? '',
    }
}

export function AnimeDetails(data = {}) {
    return {
        title: data.title ?? '-',
        japanese: data.japanese ?? '-',
        poster: data.poster ?? '',
        score: data.score ?? null,
        studios: data.studios ?? '-',
        type: data.type ?? '-',
        status: data.status ?? '-',
        episodes: data.episodes ?? null,
        duration: data.duration ?? '-',
        aired: data.aired ?? '-',
        synopsis: data.synopsis?.paragraphs ?? [],
        genres: data.genreList?.map(g => ({
            title: g.title,
            genreId: g.genreId,
        })) ?? [],
        episodesList:
            data.episodeList?.map(ep => ({
                title: ep.title,
                eps: ep.eps,
                episodeId: ep.episodeId,
                date: ep.date,
            })) ?? [],

        batch: data.batch
            ? {
                title: data.batch.title,
                batchId: data.batch.batchId,
            }
            : null,
        producers: data.producers ?? '-',
        recommendedAnimeList: data.recommendedAnimeList?.map(anime => ({
            animeId: anime.animeId,
            title: anime.title,
            poster: anime.poster,
        })) ?? [],
    }
}