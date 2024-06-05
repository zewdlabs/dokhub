import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import google from "next-auth/providers/google";
import type { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

async function refreshToken(token: JWT): Promise<JWT> {
  console.log(token.tokens.refreshToken);
  const res = await fetch("http://localhost:4231" + "/api/auth/refresh", {
    cache: "no-store",
    method: "POST",
    headers: {
      authorization: `Refresh ${token.tokens.refreshToken}`,
    },
    // body: JSON.stringify(token.user)
  });
  console.log("refreshed");

  const response = await res.json();
  console.log("===============", response);
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
          // console.log("Entered the credentials:", credentials);
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
              const data = await res.json();
              console.log(data);
              return data;
            } else if (res.status === 401) {
              // Unauthorized
              return { error: "Unauthorized: Incorrect email or password." };
            } else if (res.status === 400) {
              // Bad Request, possibly missing parameters
              return { error: "Bad Request: Missing or invalid parameters." };
            } else if (res.status === 500) {
              // Internal Server Error
              return {
                error: "Internal Server Error: Please try again later.",
              };
            } else {
              // Other error responses
              return { error: `Error: ${res.statusText}` };
            }
          } catch (error) {
            // Network or other errors
            console.error("Network or other error:", error);
            return {
              error:
                "Network error: Please check your connection and try again.",
            };
          }
        }

        return { message: "wrong creds " };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials, email }) {
      if (account?.provider === "google") {
        // Perform nest backend call to check if the user is in the database
        // if the user exists in the database, return the user object
        // if not, create the user on the backend with the information from the google account and return the user object
        console.log("google triggered");

        console.log(account);
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
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      // console.log("---------------------------");
      console.log("---------------------------", token);
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
      id: string;
      email: string;
      name: string;
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
      id: string;
      email: string;
      name: string;
    } & DefaultSession["user"];

    tokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
