import Link from "next/link";
import InputSearch from "./inputSearch";

const Navbar = () => {
    return (
        <header className=" bg-gradient-to-r from-cyan-400 via-cyan-400 to-blue-600 shadow-lg sticky top-0 z-50 rounded-2xl w-full">
            <div className="flex flex-col md:flex-row justify-between items-center p-4 gap-4">
                {/* Logo/Brand Name */}
                <Link
                    href="/"
                    className="font-extrabold text-2xl text-white hover:text-gray-300 transition-colors duration-300"
                >
                    LAZARUSNIME
                </Link>

                {/* Search Input */}
                <InputSearch className="w-full md:w-auto" />

                <Link
                    href="/maintenece"
                    className="flex items-center gap-4 bg-gray-400/20 px-4 py-2 rounded-full"
                >
                    Login
                </Link>
            </div>
        </header>
    );
};

export default Navbar;
