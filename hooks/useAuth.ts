import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn, signOut } from "next-auth/react";
import { registerUser } from "@/lib/pocketbase";

export const useLogin = () => {
   return useMutation({
      mutationFn: async (credentials: { email: string; password: string }) => {
         const result = await signIn("credentials", {
            redirect: false,
            email: credentials.email,
            password: credentials.password,
         });

         if (result?.error) {
            throw new Error(result.error);
         }

         return result;
      },
   });
};

export const useRegister = () => {
   return useMutation({
      mutationFn: async (userData: {
         email: string;
         password: string;
         passwordConfirm: string;
         name?: string;
      }) => {
         // First, register in PocketBase
         const newUser = await registerUser(userData);

         // Then sign in
         const result = await signIn("credentials", {
            redirect: false,
            email: userData.email,
            password: userData.password,
         });

         if (result?.error) {
            throw new Error(result.error);
         }

         return newUser;
      },
   });
};

export const useLogout = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async () => {
         await signOut({ redirect: false });
         queryClient.clear();
      },
   });
};
