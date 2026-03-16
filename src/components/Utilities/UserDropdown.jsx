"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const UserDropdown = ({ user }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const activationLabel = user ? "Sign Out" : "Sign In";
    const activationUrl = user ? "/api/auth/signout" : "/api/auth/signin";

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
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
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 font-bold hover:text-color-primary whitespace-nowrap"
            >
                {user.name}
                <Image
                    src={user.image}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-xl shadow-xl z-[9999] overflow-hidden min-w-[180px]">
                    <div className="px-4 py-2 border-b border-gray-700 rounded-xl">
                        <Link
                            href="/maintenece"
                            className="block px-4 py-2 hover:bg-gray-800"
                        >
                            Profile
                        </Link>
                        <Link
                            href="/maintenece"
                            className="block px-4 py-2 hover:bg-gray-800"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={activationUrl}
                            className="block px-4 py-2 hover:bg-gray-800 text-red-400"
                        >
                            {activationLabel}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;
