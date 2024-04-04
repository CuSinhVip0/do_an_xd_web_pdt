import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { HOST } from "@/Data"
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials, req) {
                try {
                    if (credentials.submit && credentials.submit2) {
                        const user = await fetch(
                            HOST + "/api/Authentication/login/training-room",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    code: credentials.dataUser,
                                    password: credentials.dataPass,
                                }),
                            }
                        ).then((res) => res.json())

                        if (user.title == "Unauthorized") {
                            return null
                        }
                        return { name: user.token }
                    } else {
                        return null
                    }
                } catch (error) {
                    console.log(error)
                }
            },
        }),
    ],
    session: {
        stratery: "jwt",
        maxAge: 8 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
}
export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
