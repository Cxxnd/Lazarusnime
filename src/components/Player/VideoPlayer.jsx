"use client";

import { useState, useEffect, useMemo, useRef } from "react";

export default function VideoPlayer({ streamServers }) {
    const API_BASE = "https://www.sankavollerei.com";

    const iframeRef = useRef(null);
    let wakeLock = useRef(null);

    const requestWakeLock = async () => {
        try {
            if ("wakeLock" in navigator) {
                wakeLock.current = await navigator.wakeLock.request("screen");
                console.log("Wake Lock aktif");

                wakeLock.current.addEventListener("release", () => {
                    console.log("Wake Lock dilepas");
                });
            }
        } catch (err) {
            console.warn("Wake Lock gagal:", err);
        }
    };

    useEffect(() => {
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible" && wakeLock.current) {
                requestWakeLock();
            }
        });
    }, []);

    useEffect(() => {
        requestWakeLock();
    }, []);

    const grouped = useMemo(() => {
        const map = {};

        streamServers.forEach((group) => {
            group.servers.forEach((server) => {
                const quality =
                    server.id.match(/(\d{3,4}p)$/)?.[0] || "unknown";

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

    useEffect(() => {
        const fetchStream = async () => {
            try {
                const res = await fetch(`${API_BASE}${currentServer}`);
                const data = await res.json();
                setStreamUrl(data.url);
            } catch (err) {
                console.error(err);
            }
        };
        fetchStream();
    }, [currentServer]);

    return (
        <div className="w-full space-y-6">
            {/* VIDEO */}
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                {streamUrl ? (
                    <iframe
                        ref={iframeRef}
                        src={streamUrl}
                        allow="fullscreen"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
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
                            setCurrentQuality(q);
                            setCurrentServer(grouped[q][0].id);
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
                {grouped[currentQuality].map((srv, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentServer(srv.id)}
                        className={`px-4 py-2 rounded-lg border text-sm ${
                            currentServer === srv.id
                                ? "bg-blue-500 border-blue-400"
                                : "bg-gray-800 border-gray-700"
                        }`}
                    >
                        {srv.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
