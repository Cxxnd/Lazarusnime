import Link from "next/link";
import UserActivation from "./UserActivation";

const Navbar = () => {
    return (
        <header className="bg-gradient-to-r from-cyan-400 via-cyan-400 to-blue-600 shadow-lg z-50 rounded-2xl w-full items-center justify-center">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="font-extrabold text-2xl text-white hover:text-gray-300 transition-colors duration-300"
                    >
                        LAZARUSNIME
                    </Link>

                    {/* User + Search */}
                    <UserActivation />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
