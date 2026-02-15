import { animeRepository } from "@/repositories/anime.repositories";
import { animeGroup } from "@/domain/anime.animefull.model";

export async function getAnimeFull() {
    const res = await animeRepository.getAnimeFull();
    return res?.data?.list.map(animeGroup) ?? [];
}