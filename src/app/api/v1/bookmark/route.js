import prisma from '@/libs/prisma'

export async function POST(request) {
    try {
        const { slug, user_email, poster} = await request.json()

    const data = {
    slug, user_email, poster
    }

    const collection = await prisma.Bookmark.create({ data })
        return Response.json(collection, { status: 200 })
    } catch (error) {
    console.error('Prisma error:', error)
    return Response.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        )
    }
}