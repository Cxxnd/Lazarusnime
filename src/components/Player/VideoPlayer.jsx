"use client";

import { useState, useEffect, useMemo, useRef } from "react";

export default function VideoPlayer({ streamServers }) {
    const API_BASE = "https://www.sankavollerei.com";
    const iframeRef = useRef(null);
    const containerRef = useRef(null);

    const [isFullscreen, setIsFullscreen] = useState(false);

    /* ===== FULLSCREEN DETECTION ===== */
    useEffect(() => {
        const onFsChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", onFsChange);
        return () =>
            document.removeEventListener("fullscreenchange", onFsChange);
    }, []);

    /* ===== GROUP BY RESOLUTION ===== */
    const grouped = useMemo(() => {
        const map = {};
        streamServers.forEach((group) => {
            group.servers.forEach((server) => {
                const quality =
                    server.id.match(/(\d{3,4}p)$/)?.[1] || "unknown";
                if (!map[quality]) map[quality] = [];
                map[quality].push(server);
            });
        });
        return map;
    }, [streamServers]);

    const qualities = Object.keys(grouped);
    const [currentQuality, setCurrentQuality] = useState(qualities[0]);
    const [currentServer, setCurrentServer] = useState(
        grouped[qualities[0]][0].id
    );
    const [streamUrl, setStreamUrl] = useState("");

    /* ===== FETCH STREAM ===== */
    useEffect(() => {
        fetch(`${API_BASE}${currentServer}`)
            .then((res) => res.json())
            .then((data) => setStreamUrl(data.url))
            .catch(() => setStreamUrl(""));
    }, [currentServer]);

    return (
        <div className="space-y-6">
            {/* VIDEO CONTAINER */}
            <div
                ref={containerRef}
                className={`bg-black overflow-hidden rounded-xl
                ${isFullscreen ? "fixed inset-0 z-50" : "w-full aspect-video"}
            `}
            >
                {streamUrl ? (
                    <iframe
                        ref={iframeRef}
                        src={streamUrl}
                        className="w-full h-full"
                        allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
                        autoplay
                        allowFullScreen
                        playsInline
                    />
                ) : (
                    <div className="text-white flex h-full items-center justify-center">
                        Loading...
                    </div>
                )}
            </div>

            {/* RESOLUTION */}
            <div className="flex gap-2 flex-wrap">
                {qualities.map((q) => (
                    <button
                        key={q}
                        onClick={() => {
                            setCurrentQuality(q);
                            setCurrentServer(grouped[q][0].id);
                        }}
                        className={`px-3 py-1 rounded text-sm
                            ${
                                currentQuality === q
                                    ? "bg-blue-600"
                                    : "bg-gray-800"
                            }
                        `}
                    >
                        {q}
                    </button>
                ))}
            </div>

            {/* SERVER */}
            <div className="flex gap-2 flex-wrap">
                {grouped[currentQuality].map((srv, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentServer(srv.id)}
                        className={`px-3 py-1 rounded text-sm border
                            ${
                                currentServer === srv.id
                                    ? "bg-blue-500 border-blue-400"
                                    : "bg-gray-800 border-gray-700"
                            }
                        `}
                    >
                        {srv.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
