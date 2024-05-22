import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

// Function to refresh JWT token
async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch("http://localhost:4231/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.tokens.refreshToken}`,
    },
  });
  console.log("refreshed");

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const res = await fetch("http://localhost:4231/api/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 401) {
          console.log(res.statusText);
          return null;
        }
        const user = await res.json();
        // Include all required fields here
        return {
          ...user,
          emailVerified: null, // Set to null or appropriate value based on your application's logic
        } as any;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials, email }) {
      if (account?.provider === "google") {
        // Perform nest backend call to check if the user is in the database
        // if the user exists in the database, return the user object
        // if not, create the user on the backend with the information from the google account and return the user object
      }

      console.log(">>> signIn callback called");
      console.log({ user });
      profile && console.log({ profile });
      account && console.log({ account });
      credentials && console.log({ credentials });
      email && console.log({ email });

      return true;
    },
    async jwt({ token, user, account, profile, trigger }) {
      console.log("JWT callback called");
      if (user) {
        return { ...token, ...user };
      }
      console.log({ token });
      console.log({ user });
      console.log({ trigger });
      account && console.log({ account });
      profile && console.log({ profile });

      if (new Date().getTime() < token.tokens.expiresIn) {
        return token;
      }

      return await refreshToken(token);
    },
    async session({ session, token, user, trigger }) {
      console.log(">>> Session callback called");
      console.log({ session });
      console.log({ token });
      console.log({ user });
      console.log({ trigger });
      // @ts-expect-error
      session.user = token.user;
      session.tokens = token.tokens;

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

// TypeScript type declarations
import type { DefaultSession } from "next-auth";
// import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      fullName: string;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      email: string;
      fullName: string;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
