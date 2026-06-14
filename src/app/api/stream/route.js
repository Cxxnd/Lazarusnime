import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const path = searchParams.get("path");

        if (!path) {
            return NextResponse.json(
                { error: "Path required" },
                { status: 400 }
            );
        }

        const targetUrl = `${process.env.NEXT_PUBLIC_API_BASE}${path}`;

        const res = await fetch(targetUrl, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0.0.0 Safari/537.36",
                Referer: process.env.NEXT_PUBLIC_API_BASE,
            },
            cache: "no-store",
        });

        const text = await res.text();

        return new Response(text, {
            status: res.status,
            headers: {
                "Content-Type":
                    res.headers.get("content-type") ||
                    "application/json",
            },
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: "Failed to fetch stream",
            },
            {
                status: 500,
            }
        );
    }
}