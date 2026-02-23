"use client";

import AnimeList from "@/components/AnimeList";
import Pagination from "@/components/Utilities/Pagination";
import { useState, useEffect } from "react";
import { getAnime } from "@/libs/service-api";
import { getOngoingAnime } from "@/services/anime.ongoing";
import ButtonBack from "@/components/Navbar/ButtonBack";
import Loading from "@/components/Utilities/loading";
import { useRouter, useSearchParams } from "next/navigation";

export default function Ongoing() {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const [page, setPage] = useState(currentPage);
    const [animeData, setAnimeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!searchParams.get("page")) {
            router.replace("?page=1", { scroll: false });
        }
    }, [searchParams, router]);

    // Fetch Effect
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { list, pagination } = await getOngoingAnime(page);
                setAnimeData({ list, pagination });
            } catch (err) {
                console.error(err);
                setAnimeData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    useEffect(() => {
        const newPage = Number(searchParams.get("page")) || 1;
        setPage(newPage);
    }, [searchParams]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);
    return (
        <div>
            {loading ? (
                <Loading />
            ) : animeData?.list?.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    Tidak ada anime yang ditemukan.
                </div>
            ) : (
                <div className="p-4 max-w-7xl mx-auto">
                    <ButtonBack />
                    {/* LIST */}
                    <AnimeList api={animeData?.list} />

                    {/* PAGINATION */}
                    <div className="flex justify-center items-center gap-2 py-4 flex-col bg-gray-900 text-white">
                        <p className="text-gray-400">
                            Halaman{" "}
                            <span className="text-white font-semibold">
                                {animeData?.pagination?.currentPage}
                            </span>{" "}
                            dari{" "}
                            <span className="text-white font-semibold">
                                {animeData?.pagination?.totalPages}
                            </span>
                        </p>

                        <Pagination
                            page={page}
                            lastPage={animeData?.pagination?.totalPages}
                            setPage={setPage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
