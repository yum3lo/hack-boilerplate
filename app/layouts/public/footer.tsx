"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className="mt-12 flex h-full flex-col">
      <footer className="mt-auto bg-muted-foreground">
        <div className="container grid grid-cols-5 py-12">
          <div className="col-span-4 grid grid-rows-2 items-center justify-between">
            <Link className="w-fit" href={isAdmin ? "/admin" : "/"}>
              <Image src="/logo-w.svg" alt="Voluntariat Moldova" width={238} height={48} priority />
            </Link>
            {isAdmin && (
              <span className="font-heading text-sm font-semibold text-accent">admin</span>
            )}
            <p className="text-muted">© voluntariat.md {new Date().getFullYear()}</p>
          </div>
          <ul className="flex flex-col space-y-3">
            <li>
              <a href="/" className="text-muted hover:text-gray-800">
                Acasă
              </a>
            </li>
            <li>
              <a href="/opportunities" className="text-muted hover:text-gray-800">
                Oportunități
              </a>
            </li>
            <li>
              <a href="/organizations" className="text-muted hover:text-gray-800">
                Organizații
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};