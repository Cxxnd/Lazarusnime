import prisma from "@/libs/prisma";

export async function POST(request) {
    try {
        const { animeId, user_email, anime_title, anime_image } = await request.json();
        const data = {
            animeId: Number(animeId),
            user_email,
            anime_title,
            anime_image
        }
        const Collection = await prisma.Collection.create({
            data
        });
        return new Response(JSON.stringify(Collection), { status: 200 });
    } catch (error) {
        console.error("Error creating collection:", error);
        return new Response(JSON.stringify({ error: "Failed to create collection" }), { status: 500 });
    }
}