import { NextResponse } from "next/server";

export function middleware(request) {
    if (process.env.MAINTENANCE === "1") {
        const { pathname } = request.nextUrl;

        if (
            !pathname.startsWith("/_next") &&
            pathname !== "/maintenance" &&
            !pathname.includes(".")
        ) {
            return NextResponse.redirect(new URL("/maintenance", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/:path*",
};
