"use client";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

const InputSearch = () => {
    const searchRef = useRef();
    const containerRef = useRef();
    const router = useRouter();

    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSearch = (event) => {
        event.preventDefault();

        const trimmedKeyword = searchRef.current.value.trim();
        if (!trimmedKeyword) {
            setError(true);
            setTimeout(() => setError(false), 2000);
            return;
        }

        const encoded = encodeURIComponent(trimmedKeyword);
        router.push(`/search/${encoded}`);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") handleSearch(event);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative flex items-center justify-end"
        >
            {open && (
                <div className="flex flex-col">
                    <input
                        autoFocus
                        placeholder="Cari anime..."
                        className={`w-72 md:w-96 p-3 pr-12 rounded-xl bg-zinc-900/70 text-white placeholder-gray-400 border ${
                            error ? "border-red-500" : "border-transparent"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                        ref={searchRef}
                        onKeyDown={handleKeyDown}
                    />

                    {error && (
                        <p className="text-red-500 text-xs mt-1 animate-pulse">
                            Isi dulu kata kunci pencarian 🔍
                        </p>
                    )}
                </div>
            )}

            <button
                onClick={(e) => {
                    if (open) {
                        handleSearch(e);
                    } else {
                        setOpen(true);
                    }
                }}
                className="ml-2 text-gray-300 hover:text-white transition"
            >
                <MagnifyingGlass size={26} weight="bold" />
            </button>
        </div>
    );
};

export default InputSearch;
