import { Snowflake, SquareLibrary, Folder, LayoutTemplate, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth'; // Import custom hook
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
  const router = useRouter();
  const { user, logout } = useAuth(); // Use custom hook for auth
  const isAuthenticated = true;

  const handleLogout = async () => {
    try {
      await logout(); // Call logout from useAuth
      router.push('/'); // Redirect to home after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Snowflake className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Fairy Desk</span>
          </Link>
        </div>

        {/* Navigation Section */}
        <div className="flex items-center space-x-4">
          <Link href="/glossary">
            <Button variant="ghost">
              <SquareLibrary className="h-5 w-5" />
              Glossary
            </Button>
          </Link>
          {isAuthenticated && (
            <Link href="/docs">
              <Button variant="ghost">
                <Folder className="h-5 w-5" />
                My Docs
              </Button>
            </Link>
          )}
          <Link href="/templates">
            <Button variant="ghost">
              <LayoutTemplate className="h-5 w-5" />
              Templates
            </Button>
          </Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar || '/avatar.png'} alt={user?.name || 'Avatar'} />
                    <AvatarFallback>{user?.name?.[0] || 'A'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{"Maria"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{"maria@email.com"}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account" className="flex w-full cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default">
              <Link href="/login">Login</Link>
              <User className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}