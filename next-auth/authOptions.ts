import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'myLogin',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Enter Your Email' },
                password: { label: 'Password', type: 'password', placeholder: 'Enter Your Password' }
            },
            async authorize(credentials) {
              console.log("API VALUE:", process.env.API);

const response = await fetch(`${process.env.API}auth/signin`, {
    method: 'POST',
    body: JSON.stringify({
        email: credentials?.email,
        password: credentials?.password
    }),
    headers: { 'Content-Type': 'application/json' },
});

const text = await response.text();
console.log("LOGIN RESPONSE:", response.status, text);

if (!response.ok) {
    throw new Error(text || response.statusText);
}

const payload = JSON.parse(text);
                const userData: { id: string } = jwtDecode(payload.token);

                return {
                    id: userData.id,
                    email: payload.user.email,
                    name: payload.user.name,
                    token: payload.token
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.token = user.token;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (token) {
                session.user.id = token.id;
                session.token = token.token; 
            }
            return session;
        }
    },
    pages: {
        signIn: '/login'
    }
};