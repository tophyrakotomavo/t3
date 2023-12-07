import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { type Role } from "@/server/db/type";
import { db } from "./db";
import { findByEmailUserServices } from "@/services/user";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role | null;
      email: string;
    };
  }

  interface User {
    role: Role | null;
    email: string;
    id: number;
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    jwt: ({ user, token }) => {
      return { ...token, ...user };
    },
    session: ({ session, token }) => {
      return ({
        ...session,
        user: {
          id: token.id,
          role: token.role,
          email: token.email,
        }
      })
    },
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await findByEmailUserServices({
          ctx: { db },
          input: { email: credentials.email, password: credentials.password },
        });

        if (user) {
          return user;
        }

        return null;
      },
    }),
  ],
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
