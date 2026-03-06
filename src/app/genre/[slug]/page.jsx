"use client";

import React, { useState, useEffect } from "react";
import { getAnime } from "@/libs/service-api";
import { getGenreDetail } from "@/services/anime.genredetail";
import ButtonBack from "@/components/Navbar/ButtonBack";
import Pagination from "@/components/Utilities/Pagination";
import AnimeList from "@/components/AnimeList";
import Loading from "@/components/Utilities/loading";
import { useRouter, useSearchParams } from "next/navigation";

const GenreDetailPage = ({ params }) => {
    const { slug } = React.use(params);
    const searchParams = useSearchParams();
    const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);
    const [animeData, setAnimeData] = useState({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!searchParams.get("page")) {
            router.replace("?page=1", { scroll: false });
        }
    }, [searchParams, router]);

    useEffect(() => {
        const newPage = parseInt(searchParams.get("page")) || 1;
        setPage(newPage);
    }, [searchParams]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { list, pagination } = await getGenreDetail(slug, page);
                setAnimeData({ list, pagination });
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
                <Loading />
            ) : animeData?.list?.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    Tidak ada anime ditemukan di genre ini
                </div>
            ) : (
                <>
                    <AnimeList api={animeData?.list} />
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
                </>
            )}
        </div>
    );
};

export default GenreDetailPage;
