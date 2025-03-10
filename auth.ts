import { createCustomerAccessToken } from "lib/shopify";
import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
    interface Session {
        user: {
            shopifyToken: string;
        } & DefaultSession["user"];
    }
    interface User {
        shopifyToken: string;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.shopifyToken = user.shopifyToken;
            }
            return token
        },
        session({ session, token }) {
            session.user.shopifyToken = token.shopifyToken as string;
            return session;
        },
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                console.log("Credentials in authorize:", credentials);

                const { email, password } = credentials as { email: string, password: string };

                const { customerAccessToken, customerUserErrors } = await createCustomerAccessToken({ email, password });

                if (customerUserErrors.length > 0) {
                    console.error("Customer user errors:", customerUserErrors);
                    return null;
                }

                const user = {
                    name: email,
                    email: email,
                    shopifyToken: customerAccessToken.accessToken,
                };

                return user;
            }
        })
    ],
})