import connectMongoDb from "@/libs/mongodb";
import Users from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { email, password } = credentials;
                await connectMongoDb();
                const user = await Users.findOne({ email });
                if (user && user.password === password) {
                    return {
                        id: user._id.toString(),
                        email: user.email,
                        username: user.username,
                        role: user.role,
                        dateOfJoining: user.dateOfJoining,
                    };
                } else {
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
            // First time JWT callback is run, include user data
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.username = user.username;
                token.role = user.role;
                token.dateOfJoining = user.dateOfJoining;
            }
            return token;
        },
        async session({ session, token }) {
            // Include custom user fields in the session
            session.user = {
                id: token.id,
                email: token.email,
                username: token.username,
                role: token.role,
                dateOfJoining: token.dateOfJoining,
            };
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
