"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getAnime } from "@/libs/service-api";
import ButtonBack from "@/components/Navbar/ButtonBack";
import Pagination from "@/components/Utilities/Pagination";
import AnimeList from "@/components/AnimeList";

const GenreDetailPage = ({ params }) => {
    const { slug } = React.use(params);
    const searchParams = useSearchParams();
    const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);
    const [animeData, setAnimeData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const newPage = parseInt(searchParams.get("page")) || 1;
        setPage(newPage);
    }, [searchParams]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await getAnime({
                    resource: `genre/${slug}?page=${page}`,
                });
                setAnimeData(res || {});
            } catch (error) {
                console.error("Error fetching data:", error);
                setAnimeData({});
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, slug]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    const animeList = animeData?.data?.animeList || [];
    const totalPages = animeData?.pagination?.totalPages || 1;

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <ButtonBack />
                <h1 className="text-3xl font-extrabold capitalize text-white tracking-wide text-center sm:text-left mt-4 sm:mt-0">
                    Genre:{" "}
                    <span className="text-blue-400">
                        {slug.replace(/-/g, " ")}
                    </span>
                </h1>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-400">
                    Memuat data...
                </div>
            ) : animeList.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    Tidak ada anime ditemukan di genre ini
                </div>
            ) : (
                <>
                    <AnimeList api={animeList} />
                    <div className="flex justify-center items-center gap-2 py-4 flex-col bg-black text-white">
                        <p className="text-gray-400">
                            Halaman{" "}
                            <span className="text-white font-semibold">
                                {page}
                            </span>{" "}
                            dari{" "}
                            <span className="text-white font-semibold">
                                {totalPages}
                            </span>
                        </p>
                        <Pagination
                            page={page}
                            lastPage={totalPages}
                            setPage={setPage}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default GenreDetailPage;
