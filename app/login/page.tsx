'use client';
// src/app/login/LoginPage.tsx
import { useState } from "react";
import { useLoginMutation } from './queries';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from '@/lib/store';  // Import dispatch hook
import { loginSuccess } from '@/lib/store/userSlice';  // Import the loginSuccess action
import PublicLayout from "../layouts/public";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, isSuccess, isError }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      console.log("Login successful", response);

      // Dispatch loginSuccess to update user state
      dispatch(loginSuccess(response));
    } catch (err) {
      console.error("Login failed", err);
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
                        placeholder="•••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                    {isError && (
                      <p className="text-red-500 text-sm mt-2">
                        {"Login failed. Please try again."}
                      </p>
                    )}
                    {isSuccess && <p className="text-green-500 text-sm mt-2">Login successful!</p>}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="w-auto">
            <img
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
