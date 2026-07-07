"use client";

export default function Error({ reset }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold">🚧 Server Sedang Down</h1>
                <p className="mt-4 text-gray-400">
                    Mohon maaf, server sedang mengalami gangguan.
                    <br />
                    Silakan coba lagi beberapa saat.
                </p>
            </div>
        </div>
    );
}
