"use client";

import AnimeList from "@/components/AnimeList";
import Pagination from "@/components/Utilities/Pagination";
import ButtonBack from "@/components/Navbar/ButtonBack";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getAnime } from "@/libs/service-api";

export default function Complete() {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const [page, setPage] = useState(currentPage);
    const [animeData, setAnimeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await getAnime({
                    resource: `complete-anime?page=${page}`,
                });
                setAnimeData(res);
            } catch (err) {
                console.error(err);
                setAnimeData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    const list = animeData?.data?.animeList || [];
    const pagination = animeData?.pagination;

    return (
        <div>
            {loading ? (
                <div className="text-center py-20 text-gray-400">
                    Sedang memuat data anime...
                </div>
            ) : list.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    Tidak ada anime yang ditemukan.
                </div>
            ) : (
                <div className="p-4 max-w-7xl mx-auto">
                    <ButtonBack />
                    {/* LIST */}
                    <AnimeList api={list} />

                    {/* PAGINATION */}
                    <div className="flex justify-center items-center gap-2 py-4 flex-col bg-black text-white">
                        <p className="text-gray-400">
                            Halaman{" "}
                            <span className="text-white font-semibold">
                                {pagination.currentPage}
                            </span>{" "}
                            dari{" "}
                            <span className="text-white font-semibold">
                                {pagination.totalPages}
                            </span>
                        </p>

                        <Pagination
                            page={page}
                            lastPage={pagination.totalPages}
                            setPage={setPage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
