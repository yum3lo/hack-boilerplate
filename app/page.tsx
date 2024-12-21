"use client";

import Image from "next/image";
import Link from "next/link";
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
              {/* <Image
                alt="heart"
                src="/heart-icon.svg"
                className="ml-3 mt-[-24px] inline-block"
                height={57}
                width={48}
              /> */}
            </h1>
            <div className="max-w-[570px]">
              <p className="max-w-[520px] text-lg text-gray-600">
                Conectăm oamenii care vor să se implice cu organizațiile care creează oportunități
                de voluntariat.
              </p>
              <div className="mt-12 flex justify-end">
                <Button variant="default">
                  <Link href="/opportunities">Vezi oportunitățile</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="w-auto">
            {/* <Image
              width={458}
              height={446}
              src="/home-page.webp"
              alt="Hands joining together"
              className="rounded-lg"
            /> */}
          </div>
        </div>
      </main>

      {/* <SetupAccountDialog open={!!setup} onOpenChange={setSetup} /> */}
    </PublicLayout>
  );
}