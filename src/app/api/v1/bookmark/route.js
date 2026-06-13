import prisma from '@/libs/prisma'

export async function POST(request) {
    try {
        const { slug, user_email, poster, provider } = await request.json()

    const data = {
    slug, user_email, poster, provider
    }

    const existing = await prisma.collection.findUnique({
    where: {
        slug_user_email: {
            slug,
            user_email,
        },
    },
});

if (existing) {
    return Response.json(
        { message: "Anime sudah dibookmark" },
        { status: 409 }
    );
}

    const collection = await prisma.collection.create({ data })
        return Response.json(collection, { status: 200 })
    } catch (error) {
    console.error('Prisma error:', error)
    return Response.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        )
    }
}