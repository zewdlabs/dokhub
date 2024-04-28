import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    google,
    credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        console.log(">>> Authorizing credentials", credentials);

        if (!credentials.email || !credentials.password) return null;

        const res = await fetch(`${process.env.BACKEND_URL}/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        if (res.ok) {
          return await res.json();
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      //:TODO: I think this is where we handle google sign in
      if (account) {
        token.auth_token = await signJwt({
          sub: token.sub,
          id_token: account.id_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
        });
      }

      if (profile) {
        console.log(">>> Profile", profile);
      }

      console.log(">>> Trigger", trigger);

      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.exp!) return token;

      return await (
        await fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Refresh ${token.backendTokens.refreshToken}`,
          },
        })
      ).json();
    },

    async session({ session, token, user }) {
      session.user = { ...token.user, ...user };
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

import type { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {}
  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account {}

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: {} & DefaultSession["user"];
    backendTokens: { accessToken: string; refreshToken: string };
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    user: {} & DefaultSession["user"];
    backendTokens: { accessToken: string; refreshToken: string };
  }
}
