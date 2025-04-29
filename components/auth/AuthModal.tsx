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
import { useRouter } from "next/navigation";

const AuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = (isLogin: boolean) => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!name) {
        newErrors.name = "Name is required";
      }
      if (!confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(true)) return;

    try {
      const result = await loginMutation.mutateAsync({ email, password });

      if (result?.error) {
        alert(result.error);
        return;
      }

      alert("Login successful!");
      setIsOpen(false);
      router.refresh();
    } catch (error: any) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(false)) return;

    try {
      const result = await registerMutation.mutateAsync({
        email,
        password,
        passwordConfirm: confirmPassword,
        name,
      });

      if (result?.error) {
        alert(result.error);
        return;
      }

      alert("Registration successful! You can now login.");
      setIsOpen(false);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
      router.refresh();
    } catch (error: any) {
      console.error("Registration error:", error);
      alert(
        error.response?.data?.message || 
        "Registration failed. Please try again."
      );
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setErrors({});
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) resetForm();
      }}
    >
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
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
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
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
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
                  required
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
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
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
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
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
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