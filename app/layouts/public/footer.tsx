"use client";

import { Snowflake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();

  return (
    <div className="mt-12 flex h-full flex-col">
      <footer className="mt-auto bg-black text-white">
        <div className="container grid grid-cols-5 py-12">
          <div className="col-span-4 grid grid-rows-2 items-center justify-between">
            <div>
              <Link href="/" className="flex items-center space-x-2 w-fit">
                <Snowflake className="h-6 w-6" />
                <span className="hidden font-bold sm:inline-block">Fairy Desk</span>
              </Link>
            </div>
            <p className="text-muted">© fairydesk.md {new Date().getFullYear()}</p>
          </div>
          <ul className="flex flex-col space-y-3">
            <li>
              <a href="/" className="text-white hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="/opportunities" className="text-white hover:text-gray-300">
                Glossary
              </a>
            </li>
            <li>
              <a href="/organizations" className="text-white hover:text-gray-300">
                Templates
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};