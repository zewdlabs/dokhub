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
        if (credentials.email && credentials.password) {
          const res = await fetch(`${process.env.BACKEND_URL}/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          if (res.ok) {
            return await res.json();
          }
        }

        return null;
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

      if (credentials) {
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

      console.log({ token });
      console.log({ user });
      console.log({ trigger });
      account && console.log({ account });
      profile && console.log({ profile });

      return token;
    },

    async session({ session, token, user, trigger }) {
      console.log(">>> Session callback called");
      console.log({ session });
      console.log({ token });
      console.log({ user });
      console.log({ trigger });

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
  interface Session {}
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {}
}
