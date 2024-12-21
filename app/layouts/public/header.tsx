import { Snowflake, Menu, Search, User, FilePenLine, SquareLibrary, Folder, LayoutTemplate } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export function Header() {
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Snowflake className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Fairy Desk</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost"> 
            <SquareLibrary className="h-5 w-5"/>
            <Link href="/glossary">Glossary</Link>
          </Button>
          <Button variant="ghost"> 
            <Folder className="h-5 w-5"/>
            <Link href="/docs">My docs</Link>
          </Button>
          <Button variant="ghost">
            <LayoutTemplate className="h-5 w-5"/>
            <Link href="/template">Templates</Link>
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="default"> 
            <Link href="/login">Log In</Link><User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}