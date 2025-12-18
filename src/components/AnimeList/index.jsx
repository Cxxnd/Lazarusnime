import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

const AnimeList = ({ api, mode }) => {
    const animeData = api?.data?.anime || api?.data || api || [];

    if (mode === "az") {
        return (
            <div className="space-y-10">
                {animeData.map((group, groupIndex) => (
                    <div key={groupIndex}>
                        <h2 className="text-2xl font-bold mb-4">
                            {group.startWith}
                        </h2>

                        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                            {group.animeList.map((anime, index) => (
                                <Link
                                    key={index}
                                    href={anime.href}
                                    className="block rounded-lg bg-gray-950 hover:bg-gray-800 transition p-3"
                                >
                                    <p className="text-sm font-semibold line-clamp-2">
                                        {anime.title}
                                    </p>
                                    <span className="text-xs text-gray-400">
                                        {anime.animeId}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 bg-gray-900 min-h-screen p-4">
            {animeData?.map((anime, index) => (
                <Link
                    href={`${anime.href || ""}`}
                    key={index}
                    className="group relative bg-gray-900/60 border border-gray-800 hover:border-purple-600 rounded-2xl overflow-hidden shadow-md hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-1"
                >
                    {/* Gambar */}
                    {/* Gambar */}
                    <div className="relative w-full aspect-[2/3] overflow-hidden rounded-xl">
                        <Image
                            src={anime.poster}
                            alt={anime.title}
                            fill
                            sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 20vw"
                            unoptimized
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                        {/* Rating - kiri atas FIX */}
                        {(anime.rating || anime.score) && (
                            <div className="absolute top-2 left-2 z-10 bg-black/80 text-yellow-400 text-xs font-semibold px-2 py-1 rounded-lg flex items-center gap-1 backdrop-blur-sm">
                                <Star className="w-3 h-3" />
                                {anime.rating || anime.score}
                            </div>
                        )}
                    </div>

                    {/* Konten */}
                    <div className="p-3 flex flex-col justify-between h-auto">
                        <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {anime.title}
                        </h3>

                        <div className="mt-2 text-xs text-gray-400 space-y-1">
                            <p>
                                <span className="text-blue-400">
                                    {anime.season ||
                                        anime.release_day ||
                                        anime.releaseDay ||
                                        "-"}
                                </span>{" "}
                                •{" "}
                                {anime.studios ||
                                    anime.newest_release_date ||
                                    anime.latestReleaseDate ||
                                    anime.lastReleaseDate ||
                                    "-"}
                            </p>
                            <p>
                                Ep:{" "}
                                <span className="text-gray-300 font-medium">
                                    {anime.episode_count ||
                                        anime.current_episode ||
                                        anime.episodes ||
                                        anime.status ||
                                        "ongoing"}
                                </span>
                            </p>
                            {/* Genre 3 pertama */}
                            <div className="flex flex-wrap gap-1">
                                {anime.genreList
                                    ?.slice(0, 3)
                                    .map((genre, i) => (
                                        <span
                                            key={i}
                                            className="bg-zinc-800/70 text-gray-300 text-[10px] px-2 py-[2px] rounded-md"
                                        >
                                            {genre.title}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default AnimeList;
