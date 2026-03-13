import NextAuth from "next-auth";
import githubAuth from "next-auth/providers/github"
import GoogleAuth from "next-auth/providers/google";


export const authOptions = {
    providers: [
        githubAuth({
            clientId: process.env.GITHUB_CLIENT,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleAuth({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account }) {
            // saat login pertama
            if (account) {
                token.provider = account.provider;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.provider = token.provider;
            }

            return session;
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };