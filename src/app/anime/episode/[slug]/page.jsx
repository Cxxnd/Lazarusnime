import { getAnime } from "@/libs/service-api";
import Link from "next/link";
import VideoPlayer from "@/components/Player/VideoPlayer";
import ButtonBack from "@/components/Navbar/ButtonBack";

const Page = async ({ params }) => {
    const { slug } = await params;
    const episode = await getAnime({ resource: `episode/${slug}` });

    const data = episode?.data;
    const downloads = data?.downloadUrl;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white px-6 py-10 space-y-20">
            <div className="max-w-6xl mx-auto space-y-10">
                <ButtonBack />
                <div className="bg-black text-white p-6 rounded-xl">
                    {/* PLAYER */}
                    <div className="my-30">
                        <VideoPlayer streamServers={data.server.qualities} />

                        {/* Navigasi Episode */}
                        <div className="flex justify-between align-items-center mt-15">
                            {data.prevEpisode && (
                                <Link
                                    href={`${data.prevEpisode.href}`}
                                    className="px-4 py-2 bg-blue-600 rounded"
                                >
                                    ⬅ Sebelumnya
                                </Link>
                            )}

                            {data.nextEpisode && (
                                <Link
                                    href={`${data.nextEpisode.href}`}
                                    className="px-4 py-2 bg-blue-600 rounded"
                                >
                                    Selanjutnya ➡
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Anime */}
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
                <h2 className="text-2xl font-bold text-blue-400 mb-4">
                    🎬 Info Anime
                </h2>
                <p className="text-gray-300 mb-3">
                    <span className="font-semibold text-white">Judul:</span>{" "}
                    {(() => {
                        try {
                            const parts = data.title.split("/");
                            const lastPart = parts.filter(Boolean).pop();
                            return lastPart.replace(/-/g, " ");
                        } catch {
                            return "Tidak diketahui";
                        }
                    })()}
                </p>
                <p className="text-gray-300">
                    <span className="font-semibold text-white">Direlease:</span>{" "}
                    {data.releaseTime}
                </p>
                <p className="text-gray-300">
                    <span className="font-semibold text-white">Credit:</span>{" "}
                    {data.info.credit || "Tidak diketahui"}
                </p>
            </div>

            {/* Tombol Download */}
            <div className="space-y-10">
                <h2 className="text-2xl font-bold text-blue-400">
                    💾 Download Links
                </h2>

                {Object.entries(downloads).map(([format, list]) => (
                    <div key={format}>
                        <h3 className="text-xl capitalize mb-4 font-semibold text-gray-200">
                            Format {format}
                        </h3>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {list.map((res, resIndex) => (
                                <div
                                    key={`${format}-${res.resolution}-${resIndex}`}
                                    className="bg-gray-800 p-4 rounded-xl border border-gray-700"
                                >
                                    <h2 className="text-lg font-bold text-blue-300 mb-2">
                                        {res.title}
                                    </h2>
                                    <h4 className="text-lg font-bold text-blue-300 mb-2">
                                        {res.size}
                                    </h4>

                                    <div className="space-y-2">
                                        {res.urls.map((link, i) => (
                                            <a
                                                key={i}
                                                href={link.url}
                                                target="_blank"
                                                className="block bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-sm text-center transition"
                                            >
                                                {link.title}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
