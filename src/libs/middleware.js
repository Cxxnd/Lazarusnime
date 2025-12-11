import { NextResponse } from "next/server";

export function middleware(request) {
    // Jalan hanya saat mode maintenance diaktifkan
    if (process.env.MAINTENANCE === "1") {
        const { pathname } = request.nextUrl;

        // Jangan redirect untuk file internal dan halaman maintenance
        if (
            !pathname.startsWith("/_next") &&
            pathname !== "/maintenence"
        ) {
            return NextResponse.redirect(new URL("/maintenance", request.url));
        }
    }
    return NextResponse.next();
}
