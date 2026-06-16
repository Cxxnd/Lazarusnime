import Prisma from "@/libs/prisma";
import { authUserSession } from "@/libs/authlibs";
import Link from "next/link";
import Image from "next/image";
import ButtonBack from "@/components/Navbar/ButtonBack";

const Page = async () => {
    const user = await authUserSession();

    const history = await Prisma.history.findMany({
        where: {
            user_email: user?.email || "",
        },
        orderBy: {
            watchedAt: "desc",
        },
    });

    return (
        <section className="mt-4 px-4">
            <ButtonBack />

            <h1 className="text-2xl font-bold mb-6">Watch History</h1>

            <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
                {history.map((item) => (
                    <Link
                        key={item.id}
                        href={`/episode/${item.slug}`}
                        className="group"
                    >
                        {item.poster && (
                            <Image
                                src={item.poster}
                                alt={item.title}
                                width={300}
                                height={400}
                                className="rounded-lg object-cover"
                            />
                        )}

                        <h3 className="mt-2 text-sm font-medium">
                            {item.title}
                        </h3>

                        <p className="text-xs text-gray-400">
                            {new Date(item.watchedAt).toLocaleString()}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Page;
