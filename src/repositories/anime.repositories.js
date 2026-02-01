import { fetchAPI } from "@/libs/fetcher";

export const animeRepository = {
    getHome() {
        return fetchAPI(`${process.env.NEXT_PUBLIC_API_BASE_URL}/home`);
    },
    getAnimeDetail(slug) {
        if (!slug) throw new Error('Slug is required');
        return fetchAPI(`${process.env.NEXT_PUBLIC_API_BASE_URL}/anime/${slug}`);
    },
}