import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export const authOptions: NextAuthOptions = {
   providers: [
      // Regular user credentials provider
      CredentialsProvider({
         id: "user-credentials",
         name: "User Account",
         credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
            console.log("User authorization attempt:", {
               email: credentials?.email,
               passwordProvided: !!credentials?.password,
            });

            if (!credentials?.email || !credentials?.password) {
               console.error("Missing credentials");
               return null;
            }

            try {
               const authData = await pb
                  .collection("users")
                  .authWithPassword(credentials.email, credentials.password);

               console.log("User authentication successful:", {
                  id: authData.record.id,
                  email: authData.record.email,
               });

               return {
                  id: authData.record.id,
                  email: authData.record.email,
                  name: authData.record.name,
                  role: "user",
               };
            } catch (error) {
               console.error("User authentication error:", error);
               return null;
            }
         },
      }),

      // Billboard owner credentials provider

      CredentialsProvider({
         id: "billboard-owner-credentials",
         name: "Billboard Owner",
         credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
            isSignup: { label: "Is Sign Up", type: "text" },
         },
         async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
               console.error("Missing credentials");
               return null;
            }

            try {
               // Fetch the billboard owner by email
               const record = await pb
                  .collection("billboard_owners")
                  .getFirstListItem(`email="${credentials.email}"`);

               if (!record) {
                  console.log("Billboard owner not found");
                  return null;
               }

               // password verification
               const passwordMatch = await bcrypt.compare(
                  credentials.password,
                  record.password
               );

               if (!passwordMatch) {
                  console.log("Invalid password");
                  return null;
               }

               console.log("Billboard owner authentication successful:", {
                  id: record.id,
                  email: record.email,
                  name: record.name,
               });

               return {
                  id: record.id,
                  email: record.email,
                  name: record.name,
                  role: "billboard-owner",
               };
            } catch (error) {
               console.error("Billboard owner authentication error:", error);
               return null;
            }
         },
      }),
   ],

   session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60, // 30 days
   },

   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.id = user.id;
            token.name = user.name;

            token.email = user.email;
            token.role = user.role;
         }
         return token;
      },
      async session({ session, token }) {
         if (session.user) {
            session.user.id = token.id as string;
            session.user.role = token.role as string;
            session.user.email = token.email;
         }
         return session;
      },
   },

   pages: {
      signIn: "/auth/signin", // Default sign-in page
      error: "/auth/error", // Default error page
   },

   debug: process.env.NODE_ENV === "development",
};
