'use client';
import { Header } from "../layouts/public/header";
import { Form, useForm } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PublicLayout from "../layouts/public";

export default function TemplatePage() {
  return (
    <PublicLayout title="Templates">
      <div>
      
      <main className="container my-10 flex flex-col items-center justify-center">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-6 max-w-[800px] text-5xl font-bold">
              Welcome to the template page
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 w-full">
          <div className="flex items-center justify-center">

          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input placeholder="Search..." />
            <Button type="submit">Search</Button>
          </div>

          </div>
          <div className="flex items-center justify-center">
            Cards
          </div>
        </div>
      </main>
    </div>
    </PublicLayout>
  );
}
