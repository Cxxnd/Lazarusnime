import Image from "next/image";
import Link from "next/link";
import { getAnime } from "@/libs/service-api";
export const dynamic = "force-dynamic";

const Jadwal = async () => {
    const res = await getAnime({ resource: "schedule" });
    const jadwal = res?.data;

    if (!Array.isArray(jadwal) || jadwal.length === 0) {
        return (
            <p className="text-center text-gray-400">
                Data jadwal tidak tersedia
            </p>
        );
    }

    return (
        <div className="space-y-12">
            {jadwal.map((dayGroup, dayIndex) => (
                <section key={dayIndex} className="space-y-4">
                    <h2 className="text-2xl font-bold text-white border-l-4 border-blue-500 pl-3">
                        {dayGroup.day}
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                        {dayGroup.anime_list?.map((anime, index) => (
                            <Link
                                key={index}
                                href={`${anime.url}`}
                                className="group block rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-purple-600/60 transition"
                            >
                                <div className="relative aspect-[3/4] overflow-hidden">
                                    <Image
                                        src={anime.poster}
                                        alt={anime.title}
                                        fill
                                        unoptimized
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                </div>

                                <div className="p-2">
                                    <h3 className="text-sm font-medium text-white line-clamp-2 group-hover:text-blue-400 transition">
                                        {anime.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Jadwal;
