import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";

export const authOPtions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,     
        })
    ],
    callbacks: {
        async session({
            session, token
        }) {
            session.user.id = token.sub!;
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET!,
}

const handler = NextAuth(authOPtions)

export { handler as GET, handler as POST}