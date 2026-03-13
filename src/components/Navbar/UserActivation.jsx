import Link from "next/link";
import { authUserSession } from "@/libs/authlibs";
import Image from "next/image";

const UserActivation = async () => {
    const user = await authUserSession();
    const activationLabel = user ? "Sign Out" : "Sign In";
    const activationUrl = user ? "/api/auth/signout" : "/api/auth/signin";

    return (
        <div className="flex justify-between gap-2">
            {user ? (
                <Link
                    href="/maintenece"
                    className="py-1 hover:text-color-primary font-bold flex flex-row items-center gap-2"
                >
                    {user.name}
                    <Image
                        src={user.image}
                        alt="User Avatar"
                        className="rounded-full ml-2"
                        width={32}
                        height={32}
                    />
                </Link>
            ) : null}
            <Link
                href={activationUrl}
                className="bg-color-dark text-color-accent py-1 px-22 inline-block rounded hover:text-color-primary font-bold transition-all"
            >
                {activationLabel}
            </Link>
        </div>
    );
};
export default UserActivation;
