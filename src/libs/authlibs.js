import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const authUserSession = async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return null;
    }
    return {
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
        provider: session.user.provider
    }
}