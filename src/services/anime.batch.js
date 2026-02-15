import { animeRepository } from "@/repositories/anime.repositories";
import { batchDetail } from "@/domain/anime.batch.model";

export async function getBatchDetail(slug) {
    const res = await animeRepository.getBatchDetail(slug);
    return batchDetail(res?.data ?? {})
}