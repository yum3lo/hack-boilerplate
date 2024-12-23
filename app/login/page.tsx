'use client';

import { useState } from "react";
import { useLoginMutation } from './queries';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PublicLayout from "../layouts/public";

export default function LoginPage() {
  const { login } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginMutation({ email, password }).unwrap();
      
      if (response.error === 0) {
        // Login successful
        login(response.data);
        
        toast({
          title: "Success",
          description: "Login successful!",
        });

        router.push('/');
      } else {
        // Login failed with error message
        toast({
          variant: "destructive",
          title: "Error",
          description: response.erorrMessage || "Login failed. Please try again.",
        });
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Login failed. Please check your credentials.",
      });
    }
  };

  return (
    <PublicLayout title="Login">
      <main className="container my-10 flex items-center justify-center">
        <div className="flex items-center justify-between space-x-[10vw]">
          <div>
            <h1 className="mb-6 max-w-[600px] text-5xl font-bold">
              Welcome back
            </h1>
            <div className="max-w-[570px]">
              <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold">Login</CardTitle>
                  <CardDescription>Enter your email and password to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
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
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="w-auto">
            <Image
              width={458}
              height={446}
              src="/skeleton.webp"
              alt="Skeleton"
              className="rounded-lg"
            />
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}