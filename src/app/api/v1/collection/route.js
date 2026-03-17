import prisma from "@/libs/prisma";

export async function GET(request) {
    try {
        const { slug, poster, title, user_email, provider } = await request.json();
        const data = {
            slug,
            poster,
            title,
            user_email,
            provider
        }
        const collection = await prisma.Collection.create({ data })
        return Response.json(collection, { status: 200 })
    } catch (error) {
        console.error('Prisma error:', error)
        return Response.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        )
    }
}