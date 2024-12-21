"use client";

import { Search, SendHorizontal } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { Input } from '@/components/ui/input';
// import { parseAsBoolean, useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import PublicLayout from "./layouts/public";

// import SetupAccountDialog from "./auth/login/components/setup-dialog";

export default function Home() {
  // const [setup, setSetup] = useQueryState("setup", parseAsBoolean);

  return (
    <PublicLayout title="Home">
      <main className="container my-10 flex items-center justify-center">
        <div className="flex items-center justify-between space-x-[10vw]">
          <div>
            <h1 className="mb-6 max-w-[600px] text-5xl font-bold">
              Need help?
            </h1>
            <div className="max-w-[570px]">
              <p className="max-w-[520px] text-lg text-gray-600">
                Ask a question here. Santa's little helpers are here to help you.
              </p>
              <div className="mt-4 flex flex-col items-end space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                <form className="relative hidden md:block">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search..." className="w-72 pl-8" />
                </form>
                <Button variant="default">
                  <Link href="/opportunities">Send</Link><SendHorizontal/>
                </Button>
              </div>
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