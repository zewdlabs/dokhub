import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import google from "next-auth/providers/google";
import type { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch("http://localhost:4231" + "/api/auth/refresh", {
    cache: "no-store",
    method: "POST",
    headers: {
      authorization: `Refresh ${token.tokens.refreshToken}`,
    },
  });

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
    google,
    credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (credentials.email && credentials.password) {
          try {
            const res = await fetch(
              `${process.env.BACKEND_URL}/api/auth/login`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
              },
            );

            if (res.ok) {
              return await res.json();
            } else if (res.status === 401) {
              return { error: "Unauthorized: Incorrect email or password." };
            } else if (res.status === 400) {
              return { error: "Bad Request: Missing or invalid parameters." };
            } else if (res.status === 500) {
              return {
                error: "Internal Server Error: Please try again later.",
              };
            } else {
              return { error: `Error: ${res.statusText}` };
            }
          } catch (error) {
            console.error("Network or other error:", error);
            return {
              error:
                "Network error: Please check your connection and try again.",
            };
          }
        }

        return { message: "wrong credentials " };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      if (new Date().getTime() < token.tokens.expiresIn) return token;

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = { ...session.user, ...token.user };
      session.tokens = token.tokens;

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});

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
    user: {
      onboardingStatus: boolean;
      role: string;
      id: string;
      bio: string;
      prefix?: string;
      yearsOfExperience: number;
      name: string;
      email: string;
      followingCount: number;
      followedByCount: number;
      posts: any[];
      occupation?: string;
      createdAt: string;
      updatedAt: string;
      profileUrl: string | null;
      medicalLicenseNumber?: string;
      verificationStatus: string;
    } & DefaultSession["user"];

    tokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    user: {
      onboardingStatus: boolean;
      role: string;
      id: string;
      bio: string;
      prefix?: string;
      yearsOfExperience: number;
      name: string;
      email: string;
      followingCount: number;
      followedByCount: number;
      posts: any[];
      occupation?: string;
      createdAt: string;
      updatedAt: string;
      profileUrl: string | null;
      medicalLicenseNumber?: string;
      verificationStatus: string;
    } & DefaultSession["user"];

    tokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
