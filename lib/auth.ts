

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export const authOptions: NextAuthOptions = {
   providers: [
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
            // Comprehensive logging for debugging
            console.log("Authorization attempt:", {
               email: credentials?.email,
               passwordProvided: !!credentials?.password,
            });

            if (!credentials?.email || !credentials?.password) {
               console.error("Missing credentials");
               return null;
            }

            try {
               // Attempt authentication with PocketBase
               const authData = await pb
                  .collection("users")
                  .authWithPassword(credentials.email, credentials.password);

               console.log("Authentication successful:", {
                  id: authData.record.id,
                  email: authData.record.email,
               });

               return {
                  id: authData.record.id,
                  email: authData.record.email,
                  name: authData.record.name,
               };
            } catch (error) {
               console.error("Authentication error:", error);
               return null;
            }
         },
      }),
   ],

   // Enhanced error handling and debugging
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.id = user.id;
            token.email = user.email;
         }
         return token;
      },
      async session({ session, token }) {
         session.user.id = token.id as string;
         return session;
      },
   },

   // Debugging options
   debug: process.env.NODE_ENV === "development",
   logger: {
      error(code, metadata) {
         console.error("NextAuth Error:", code, metadata);
      },
      warn(code) {
         console.warn("NextAuth Warning:", code);
      },
      debug(code, metadata) {
         console.debug("NextAuth Debug:", code, metadata);
      },
   },

   // Custom pages (optional)
   pages: {
      signIn: "/auth/signin",
      error: "/auth/error",
   },
};
