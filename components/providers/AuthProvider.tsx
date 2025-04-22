// "use client";
// import { SessionProvider } from "next-auth/react";

// export default function AuthProvider({
//    children,
// }: {
//    children: React.ReactNode;
// }) {
//    return <SessionProvider>{children}</SessionProvider>;
// }
"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({
   children,
   session,
}: {
   children: React.ReactNode;
   session?: Session | null;
}) {
   return <SessionProvider session={session}>{children}</SessionProvider>;
}
