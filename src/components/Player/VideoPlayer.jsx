"use client";

import { useState, useEffect, useMemo, useRef } from "react";

export default function VideoPlayer({ streamServers = [] }) {
    const API_BASE = "https://www.sankavollerei.com";
    const iframeRef = useRef(null);
    const initialized = useRef(false);

    /* ================= FULLSCREEN ORIENTATION ================= */
    useEffect(() => {
        const handleFullscreen = () => {
            if (!screen.orientation?.lock) return;

            if (document.fullscreenElement) {
                screen.orientation.lock("landscape").catch(() => {});
            } else {
                screen.orientation.lock("portrait").catch(() => {});
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreen);
        return () =>
            document.removeEventListener("fullscreenchange", handleFullscreen);
    }, []);

    /* ================= GROUP SERVER ================= */
    const grouped = useMemo(() => {
        const map = {};

        if (!Array.isArray(streamServers)) return map;

        streamServers.forEach((q) => {
            if (!Array.isArray(q.serverList)) return;

            map[q.title] = q.serverList.map((srv) => ({
                id: srv.href,
                name: srv.title,
            }));
        });

        return map;
    }, [streamServers]);

    const qualities = Object.keys(grouped);

    /* ================= STATE ================= */
    const [currentQuality, setCurrentQuality] = useState(null);
    const [currentServer, setCurrentServer] = useState(null);
    const [streamUrl, setStreamUrl] = useState("");

    /* ================= INIT DEFAULT (JALAN SEKALI) ================= */
    useEffect(() => {
        if (initialized.current) return;

        if (qualities.length > 0) {
            setCurrentQuality(qualities[0]);
            setCurrentServer(grouped[qualities[0]][0]?.id ?? null);
            initialized.current = true;
        }
    }, [qualities, grouped]);

    /* ================= FETCH STREAM ================= */
    useEffect(() => {
        if (!currentServer) return;

        setStreamUrl(""); // reset biar reload

        const fetchStream = async () => {
            try {
                const res = await fetch(`${API_BASE}${currentServer}`, {
                    cache: "no-store",
                });
                const json = await res.json();

                const url =
                    json?.data?.url || json?.data?.iframe || json?.url || "";

                if (!url) {
                    console.error("URL stream kosong", json);
                    return;
                }

                setStreamUrl(url);
            } catch (err) {
                console.error("Gagal load stream:", err);
            }
        };

        fetchStream();
    }, [currentServer]);

    /* ================= RENDER ================= */
    return (
        <div className="w-full space-y-6">
            {/* VIDEO */}
            <div className="w-full aspect-video rounded-lg overflow-hidden bg-black">
                {streamUrl ? (
                    <iframe
                        key={currentServer} // ⬅️ WAJIB
                        ref={iframeRef}
                        src={streamUrl}
                        allow="fullscreen"
                        allowFullScreen
                        className="w-full h-full"
                    />
                ) : (
                    <div className="text-white flex justify-center items-center h-full">
                        Loading...
                    </div>
                )}
            </div>

            {/* RESOLUSI */}
            <div className="flex gap-2 flex-wrap">
                {qualities.map((q) => (
                    <button
                        key={q}
                        onClick={() => {
                            if (q === currentQuality) return;
                            setCurrentQuality(q);
                            setCurrentServer(grouped[q][0]?.id);
                        }}
                        className={`px-4 py-2 rounded-lg text-sm ${
                            currentQuality === q
                                ? "bg-blue-600 text-white"
                                : "bg-gray-800 text-gray-300"
                        }`}
                    >
                        {q}
                    </button>
                ))}
            </div>

            {/* SERVER */}
            <div className="flex flex-wrap gap-2">
                {grouped[currentQuality]?.map((srv, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            if (srv.id === currentServer) return;
                            setCurrentServer(srv.id);
                        }}
                        className={`px-4 py-2 rounded-lg border text-sm ${
                            currentServer === srv.id
                                ? "bg-blue-500 border-blue-400 text-white"
                                : "bg-gray-800 border-gray-700 text-gray-300"
                        }`}
                    >
                        {srv.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
