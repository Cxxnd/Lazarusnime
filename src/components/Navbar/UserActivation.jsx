import { authUserSession } from "@/libs/authlibs";
import UserDropdown from "../Utilities/UserDropdown";
import Link from "next/link";

const UserActivation = async () => {
    const user = await authUserSession();

    return (
        <div className="flex justify-between gap-4 items-center">
            {user ? (
                <UserDropdown user={user} />
            ) : (
                <Link
                    href="/api/auth/signin"
                    className="flex items-center gap-2 font-bold hover:text-color-primary"
                >
                    Sign In
                </Link>
            )}
        </div>
    );
};

export default UserActivation;
