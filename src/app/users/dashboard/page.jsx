import { authUserSession } from "@/libs/authlibs";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
    const user = await authUserSession();

    return (
        <div className="mt-8 flex flex-col justify-center items-center text-color-primary gap-2">
            <h5 className="text-2xl font-bold flex-col bottom-0">DASHBOARD</h5>
            <h3 className="text-2xl font-semibold p-3">
                Welcome, {user?.name}!
            </h3>
            <Image
                src={user?.image}
                alt="..."
                width={250}
                height={250}
                className="rounded-full"
            />
            <div className="py-8  flex flex-wrap gap-4">
                <Link
                    className="bg-blue-600 text-white font-bold px-4 py-2 text-xl rounded-lg hover:bg-blue-700 transition-colors"
                    href="/users/dashboard/colections"
                >
                    My Colection
                </Link>
            </div>
        </div>
    );
};

export default page;
