// "use client";
// import React from "react";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//    Dialog,
//    DialogContent,
//    DialogDescription,
//    DialogHeader,
//    DialogTitle,
//    DialogTrigger,
// } from "@/components/ui/dialog";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { UserCircle } from "lucide-react";

// const AuthModal = () => {
//    const [isOpen, setIsOpen] = useState(false);

//    return (
//       <Dialog open={isOpen} onOpenChange={setIsOpen}>
//          <DialogTrigger asChild>
//             <Button variant="ghost" size="icon" className="rounded-full">
//                <UserCircle className="h-6 w-6" />
//             </Button>
//          </DialogTrigger>
//          <DialogContent className="sm:max-w-md">
//             <DialogHeader>
//                <DialogTitle>Welcome</DialogTitle>
//                <DialogDescription>
//                   Sign in to your account or create a new one
//                </DialogDescription>
//             </DialogHeader>

//             <Tabs defaultValue="signin" className="w-full">
//                <TabsList className="grid w-full grid-cols-2">
//                   <TabsTrigger value="signin">Sign In</TabsTrigger>
//                   <TabsTrigger value="signup">Sign Up</TabsTrigger>
//                </TabsList>

//                <TabsContent value="signin">
//                   <form
//                      onSubmit={(e) => e.preventDefault()}
//                      className="space-y-4"
//                   >
//                      <div className="space-y-2">
//                         <Label htmlFor="email">Email</Label>
//                         <Input
//                            id="email"
//                            type="email"
//                            placeholder="Enter your email"
//                         />
//                      </div>
//                      <div className="space-y-2">
//                         <Label htmlFor="password">Password</Label>
//                         <Input
//                            id="password"
//                            type="password"
//                            placeholder="Enter your password"
//                         />
//                      </div>
//                      <Button type="submit" className="w-full">
//                         Sign In
//                      </Button>
//                   </form>
//                </TabsContent>

//                <TabsContent value="signup">
//                   <form
//                      onSubmit={(e) => e.preventDefault()}
//                      className="space-y-4"
//                   >
//                      <div className="space-y-2">
//                         <Label htmlFor="name">Full Name</Label>
//                         <Input id="name" placeholder="Enter your name" />
//                      </div>
//                      <div className="space-y-2">
//                         <Label htmlFor="signup-email">Email</Label>
//                         <Input
//                            id="signup-email"
//                            type="email"
//                            placeholder="Enter your email"
//                         />
//                      </div>
//                      <div className="space-y-2">
//                         <Label htmlFor="signup-password">Password</Label>
//                         <Input
//                            id="signup-password"
//                            type="password"
//                            placeholder="Create a password"
//                         />
//                      </div>
//                      <div className="space-y-2">
//                         <Label htmlFor="confirm-password">
//                            Confirm Password
//                         </Label>
//                         <Input
//                            id="confirm-password"
//                            type="password"
//                            placeholder="Confirm your password"
//                         />
//                      </div>
//                      <Button type="submit" className="w-full">
//                         Create Account
//                      </Button>
//                   </form>
//                </TabsContent>
//             </Tabs>
//          </DialogContent>
//       </Dialog>
//    );
// };

// export default AuthModal;


"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserCircle } from "lucide-react";
import { useLogin, useRegister } from "@/hooks/useAuth";
import { toast } from "sonner"; // Assuming you're using shadcn's sonner for toasts

const AuthModal = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [name, setName] = useState("");

   const loginMutation = useLogin();
   const registerMutation = useRegister();

   const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         await loginMutation.mutateAsync({ email, password });
         toast.success("Logged in successfully");
         setIsOpen(false);
      } catch (error) {
         toast.error("Login failed");
      }
   };

   const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      if (password !== confirmPassword) {
         toast.error("Passwords do not match");
         return;
      }

      try {
         await registerMutation.mutateAsync({
            email,
            password,
            passwordConfirm: password,
            name,
         });
         toast.success("Account created successfully");
         setIsOpen(false);
      } catch (error) {
         toast.error("Registration failed");
      }
   };

   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
               <UserCircle className="h-6 w-6" />
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-md">
            <DialogHeader>
               <DialogTitle className="text-center text-2xl font-bold">
                  Board<span className="text-red-600">AIR</span>
               </DialogTitle>
               <DialogDescription className="text-center text-gray-500 dark:text-gray-400">
                  Your journey begins here
               </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="signin" className="w-full">
               <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
               </TabsList>

               <TabsContent value="signin">
                  <form onSubmit={handleLogin} className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                           id="email"
                           type="email"
                           placeholder="Enter your email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                        />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                           id="password"
                           type="password"
                           placeholder="Enter your password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                        />
                     </div>
                     <Button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-colors duration-200"
                        disabled={loginMutation.isPending}
                     >
                        {loginMutation.isPending ? "Signing In..." : "Sign In"}
                     </Button>
                  </form>
               </TabsContent>

               <TabsContent value="signup">
                  <form onSubmit={handleRegister} className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                           id="name"
                           placeholder="Enter your name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                        />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                           id="signup-email"
                           type="email"
                           placeholder="Enter your email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                        />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                           id="signup-password"
                           type="password"
                           placeholder="Create a password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                        />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                           Confirm Password
                        </Label>
                        <Input
                           id="confirm-password"
                           type="password"
                           placeholder="Confirm your password"
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           required
                        />
                     </div>
                     <Button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-colors duration-200"
                        disabled={registerMutation.isPending}
                     >
                        {registerMutation.isPending
                           ? "Creating Account..."
                           : "Create Account"}
                     </Button>
                  </form>
               </TabsContent>
            </Tabs>
         </DialogContent>
      </Dialog>
   );
};

export default AuthModal;
