"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({ children }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.05,
            smoothWheel: true,
            smoothTouch: true,
            easing: (t) => 1 - Math.pow(1 - t, 3),
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    return <div className="min-h-screen bg-gray-900">{children}</div>;
}
