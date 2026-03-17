import Link from "next/link";
import UserActivation from "./UserActivation";
import InputSearch from "./inputSearch";

const Navbar = () => {
    return (
        <header className="bg-gradient-to-r from-cyan-400 via-cyan-400 to-blue-600 shadow-lg rounded-2xl w-full">
            <nav className="max-w-7xl mx-auto px-4 items-center">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="font-extrabold text-2xl text-white whitespace-nowrap"
                    >
                        LAZARUSNIME
                    </Link>

                    {/* User */}
                    <UserActivation />

                    {/* Search */}
                    <InputSearch />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
