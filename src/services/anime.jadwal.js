import { jadwalAnime } from "@/domain/anime.jadwal.model";
import { animeRepository } from "@/repositories/anime.repositories";

export async function getJadwalAnime() {
    const res = await animeRepository.getJadwal();
    return jadwalAnime(res ?? {});
}