

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn, signOut } from "next-auth/react";
import { registerUser } from "@/lib/pocketbase";
import { useRouter } from "next/navigation";

export const useLogin = () => {
   const router = useRouter();

   return useMutation({
      mutationFn: async (credentials: { email: string; password: string }) => {
         // Updated to use the correct provider ID "user-credentials" instead of "credentials"
         const result = await signIn("user-credentials", {
            redirect: false,
            email: credentials.email,
            password: credentials.password,
         });

         if (result?.error) {
            throw new Error(result.error);
         }

         // Force a refresh to update session state
         router.refresh();

         return result;
      },
   });
};

export const useRegister = () => {
   const router = useRouter();

   return useMutation({
      mutationFn: async (userData: {
         email: string;
         password: string;
         passwordConfirm: string;
         name?: string;
      }) => {
         // Register in PocketBase
         const newUser = await registerUser(userData);

         // Updated to use the correct provider ID "user-credentials" instead of "credentials"
         const result = await signIn("user-credentials", {
            redirect: false,
            email: userData.email,
            password: userData.password,
         });

         if (result?.error) {
            throw new Error(result.error);
         }

         // Force a refresh to update session state
         router.refresh();

         return newUser;
      },
   });
};

export const useLogout = () => {
   const queryClient = useQueryClient();
   const router = useRouter();

   return useMutation({
      mutationFn: async () => {
         await signOut({ redirect: false });
         queryClient.clear();
         router.refresh(); // Force a refresh to update session state
      },
   });
};
