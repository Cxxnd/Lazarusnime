import Link from "next/link";
import { authUserSession } from "@/libs/authlibs";
import Image from "next/image";
import Prisma from "@/libs/prisma";
import ButtonBack from "@/components/Navbar/ButtonBack";
import DeleteCollectionButton from "@/components/AnimeList/deleteCollectionsButton";

const Page = async () => {
    const user = await authUserSession();
    const collections = await Prisma.collection.findMany({
        where: {
            user_email: user?.email || "",
        },
    });
    if (!collections || collections.length === 0) {
        return (
            <section className="mt-4 px-4 w-full">
                <Header title={"My Collection"} />
                <div className="text-center py-8">
                    <p className="text-color-primary text-lg">
                        You don't have any collections yet
                    </p>
                    <Link
                        href="/"
                        className="text-color-secondary hover:underline mt-4 inline-block"
                    >
                        Browse Anime
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="mt-4 px-4 w-full">
            <ButtonBack />
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-blue-400">
                    My Collection
                </h1>
                <p className="text-color-secondary">
                    Here are the anime you've added to your collection.
                </p>
            </header>
            <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
                {collections.map((item) => (
                    <Link
                        href={`/anime/${item.slug}`}
                        key={item.slug}
                        className="group relative bg-gray-900/60 border border-gray-800 hover:border-purple-600 rounded-2xl overflow-hidden shadow-md hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-1"
                    >
                        <DeleteCollectionButton slug={item.slug} />
                        {/* Poster */}
                        <div className="relative aspect-[3/4] overflow-hidden">
                            <Image
                                src={item.poster}
                                alt={item.slug}
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        </div>

                        {/* Info */}
                        <div className="p-3">
                            <h3 className="text-sm font-semibold line-clamp-2 text-white group-hover:text-blue-400 transition-colors duration-300">
                                {item.slug}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};
export default Page;
