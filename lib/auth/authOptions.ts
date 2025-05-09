import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/lib/auth/User";

declare module "next-auth" {
    interface Session {
        user: User;
    }
}

// Đảm bảo luôn có API URL
const API_BASE_URL = process.env.API_URL || "https://localhost:7178/api";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    console.log("Received credentials:", credentials);

                    if (!credentials?.username || !credentials?.password) {
                        console.log("Missing required credentials");
                        return null;
                    }

                    const { username, password } = credentials;

                    // URL login không cần thêm tiền tố /api vì đã có trong API_BASE_URL
                    const response = await fetch(`${API_BASE_URL}/staff/login`, {
                        method: "POST",
                        body: JSON.stringify({ username, password }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    console.log("Login URL:", `${API_BASE_URL}/staff/login`);

                    if (!response.ok) {
                        console.error("Authentication failed - status:", response.status);
                        return null;
                    }

                    const data = await response.json();
                    console.log("Authentication response:", data);

                    if (!data.success) {
                        console.error("Authentication failed - invalid credentials");
                        return null;
                    }

                    const user = data.user;

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    } as User;
                } catch (error) {
                    console.error("Error authorizing user:", error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/signin",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const staff = user as User;
                token.id = staff.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user = {
                    ...session.user,
                    id: token.id as string,
                };
            }
            return session;
        },
    },
};
