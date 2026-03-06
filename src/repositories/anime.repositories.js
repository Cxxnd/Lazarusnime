import { fetchAPI } from "@/libs/fetcher";

export const animeRepository = {
    getHome() {
        return fetchAPI(`${process.env.NEXT_PUBLIC_API_BASE_URL}/home`);
    },
    getAnimeDetail(slug) {
        if (!slug) throw new Error('Slug is required');
        return fetchAPI(`${process.env.NEXT_PUBLIC_API_BASE_URL}/anime/${slug}`);
    },
    getAnimeFull() {
        return fetchAPI(`${process.env.NEXT_PUBLIC_API_BASE_URL}/unlimited`);
    },
    getBatchDetail(slug) {
        if (!slug) throw new Error('Slug is required');
        return fetchAPI(`${process.env.NEXT_PUBLIC_API_BASE_URL}/batch/${slug}`);
    },
    getOngoingAnime(page = 1) {
        if (page < 1) throw new Error('Page number must be greater than 0');
        return fetchAPI(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ongoing-anime?page=${page}`);
    },
    getCompleteAnime(page = 1) {
        if (page < 1) throw new Error('Page number must be greater than 0');
        return fetchAPI(`${process.env.NEXT_PUBLIC_API_BASE_URL}/complete-anime?page=${page}`);
    },
    getGenreList() {
        return fetchAPI(`${process.env.NEXT_PUBLIC_API_BASE_URL}/genre`);
    },
    getGenreDetail(slug, page = 1) {
        if (!slug) throw new Error('Slug is required');
        if (page < 1) throw new Error('Page number must be greater than 0');
        return fetchAPI(`${process.env.NEXT_PUBLIC_API_BASE_URL}/genre/${slug}?page=${page}`);
    },
    getJadwal() {
        return fetchAPI(`${process.env.NEXT_PUBLIC_API_BASE_URL}/schedule`);
    },
    getSearch(keyword = "") {
        if (!keyword.trim()) {
            return { data: [] };
        }
        const encoded = encodeURIComponent(keyword);
        return fetchAPI(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/search/${encoded}`
        );
    }
}