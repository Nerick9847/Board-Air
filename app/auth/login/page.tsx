"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PocketBase from "pocketbase";
import bcrypt from "bcryptjs";

import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Initialize PocketBase
const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

// Schema for both login and signup
const authSchema = z
   .object({
      email: z
         .string()
         .email({ message: "Please enter a valid email address" }),
      password: z
         .string()
         .min(6, { message: "Password must be at least 6 characters" }),
      name: z.string().optional(),
      businessName: z.string().optional(),
      contactNumber: z.string().optional(),
      confirmPassword: z.string().optional(),
   })
   .refine(
      (data) => {
         // Only validate confirmPassword during signup
         if (data.confirmPassword && data.password !== data.confirmPassword) {
            return false;
         }
         return true;
      },
      {
         message: "Passwords do not match",
         path: ["confirmPassword"],
      }
   );

type AuthFormValues = z.infer<typeof authSchema>;

export default function BillboardOwnerAuthPage() {
   const { toast } = useToast();
   const queryClient = useQueryClient();

   const router = useRouter();
   const searchParams = useSearchParams();
   const callbackUrl = searchParams.get("callbackUrl") || "/owner/bookings";
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [authMode, setAuthMode] = useState<"login" | "signup">("login");

   // Create mutation for billboard owners
   const createBillboardOwnerMutation = useMutation({
      mutationFn: async (data: {
         email: string;
         password: string;
         passwordConfirm: string;
         name: string;
         business_name?: string;
         contact_number?: string;
      }) => {
         //remove passwordConfirm
         const { passwordConfirm, ...rest } = data;

         // Hash the password before saving
         const hashedPassword = await bcrypt.hash(rest.password, 10);

         return await pb.collection("billboard_owners").create({
            ...rest,
            password: hashedPassword, // Save the hashed password
         });
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["billboard-owners"] });
         toast({
            title: "Account created",
            description:
               "Your billboard owner account has been created successfully.",
         });
         setAuthMode("login"); 
      },
      onError: (error) => {
         console.error("Error creating billboard owner:", error);
         toast({
            title: "Error",
            description: "Failed to create account. Please try again.",
            variant: "destructive",
         });
      },
   });

   // Form for both login and signup
   const form = useForm<AuthFormValues>({
      resolver: zodResolver(authSchema),
      defaultValues: {
         email: "",
         password: "",
         name: "",
         businessName: "",
         contactNumber: "",
         confirmPassword: "",
      },
   });

   async function onSubmit(data: AuthFormValues) {
      setIsLoading(true);

      try {
         if (authMode === "signup") {
            const { confirmPassword, ...rest } = data;
            createBillboardOwnerMutation.mutate({
               email: rest.email,
               password: rest.password,
               passwordConfirm: rest.password, 
               name: rest.name || "",
               business_name: rest.businessName,
               contact_number: rest.contactNumber,
            });
            setIsLoading(false);
            return;
         }

         // For login, use the consolidated auth endpoint with specific provider ID
         const result = await signIn("billboard-owner-credentials", {
            email: data.email,
            password: data.password,
            isSignup: "false",
            redirect: false,
            callbackUrl,
         });

         if (result?.error) {
            toast({
               title: "Login failed",
               description:
                  result.error || "Please check your credentials and try again",
               variant: "destructive",
            });
            setIsLoading(false);
            return;
         }
         if (result?.ok) {
            router.push(callbackUrl);
         } else {
            toast({
               title: "Login failed",
               description:
                  result?.error ||
                  "Please check your credentials and try again",
               variant: "destructive",
            });
         }
      } catch (error) {
         console.error(`${authMode} error:`, error);
         toast({
            title: "Something went wrong",
            description: "Please try again later",
            variant: "destructive",
         });
      } finally {
         setIsLoading(false);
      }
   }

 
   return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
         <div className="w-full max-w-md">
            <div className="text-center mb-6">
               <h1 className="text-3xl font-bold">Billboard Owner Portal</h1>
               <p className="text-gray-600">
                  Sign in to your account or create a new one
               </p>
            </div>

            <Tabs
               defaultValue="login"
               className="w-full"
               value={authMode}
               onValueChange={(value) =>
                  setAuthMode(value as "login" | "signup")
               }
            >
               <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
               </TabsList>

               <Card>
                  <CardHeader>
                     <CardTitle>
                        {authMode === "login" ? "Login" : "Create an Account"}
                     </CardTitle>
                     <CardDescription>
                        {authMode === "login"
                           ? "Enter your credentials to access your billboard owner account"
                           : "Enter your details to create a new billboard owner account"}
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <Form {...form}>
                        <form
                           onSubmit={form.handleSubmit(onSubmit)}
                           className="space-y-4"
                        >
                           {/* Name field - only shown during signup */}
                           {authMode === "signup" && (
                              <FormField
                                 control={form.control}
                                 name="name"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>Name</FormLabel>
                                       <FormControl>
                                          <Input
                                             placeholder="Nerick Shrestha"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           )}

                           {/* Business Name field - only shown during signup */}
                           {authMode === "signup" && (
                              <FormField
                                 control={form.control}
                                 name="businessName"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>Business Name</FormLabel>
                                       <FormControl>
                                          <Input
                                             placeholder="BoardAir"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           )}

                           {/* Contact Number field - only shown during signup */}
                           {authMode === "signup" && (
                              <FormField
                                 control={form.control}
                                 name="contactNumber"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>Contact Number</FormLabel>
                                       <FormControl>
                                          <Input
                                             placeholder="9847361122"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           )}

                           <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                       <Input
                                          placeholder="name@example.com"
                                          type="email"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={form.control}
                              name="password"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                       <Input
                                          type="password"
                                          placeholder="••••••••"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           {/* Confirm Password field - only shown during signup */}
                           {authMode === "signup" && (
                              <FormField
                                 control={form.control}
                                 name="confirmPassword"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>Confirm Password</FormLabel>
                                       <FormControl>
                                          <Input
                                             type="password"
                                             placeholder="••••••••"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           )}

                           <Button
                              type="submit"
                              className="w-full col bg-red-500 text-white"
                              disabled={isLoading}
                           >
                              {isLoading ? (
                                 <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {authMode === "login"
                                       ? "Logging in..."
                                       : "Creating account..."}
                                 </>
                              ) : authMode === "login" ? (
                                 "Login"
                              ) : (
                                 "Create Account"
                              )}
                           </Button>
                        </form>
                     </Form>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                     <Button
                        variant="link"
                        onClick={() =>
                           setAuthMode(
                              authMode === "login" ? "signup" : "login"
                           )
                        }
                     >
                        {authMode === "login"
                           ? "Don't have an account? Sign up"
                           : "Already have an account? Login"}
                     </Button>
                  </CardFooter>
               </Card>
            </Tabs>
         </div>
      </div>
   );
}
