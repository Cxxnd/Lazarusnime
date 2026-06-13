import prisma from "@/libs/prisma";
import { authUserSession } from "@/libs/authlibs";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    const user = await authUserSession();

    if (!user) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    const { slug } = await request.json();

    await prisma.collection.delete({
        where: {
            slug_user_email: {
                slug,
                user_email: user.email,
            },
        },
    });

    return NextResponse.json({
        status: 200,
        message: "Collection deleted",
    });
}