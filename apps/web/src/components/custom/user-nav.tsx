import Link from "next/link";
import { useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function UserNav() {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();

  //TODO: uncomment and make this work after implementing sign in
  // if (!isLoaded || !isSignedIn) {
  //   return <Skeleton className="h-8 w-8 rounded-full" />;
  // }
  //
  const user = {
    imageUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fullName: "Nathnael Mekonnen",
    emailAddress: "nmktadesse@gmail.com",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.imageUrl} alt={`${user.fullName}`} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="truncate text-sm font-medium leading-none">
              {user.fullName}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {user.emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href={`/app/${workspaceSlug}/settings/user`}
              className="flex items-center gap-2 w-full"
            >
              <Icons.user className="w-4 h-4" />
              <span className="truncate">Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`/app/${workspaceSlug}/settings/billing`}
              className="flex items-center gap-2 w-full"
            >
              <Icons.creditCard className="w-4 h-4" />
              <span className="truncate">Billing</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => alert("Please implement this")}>
          <Link
            href={"/auth/signout"}
            className="flex items-center gap-2 w-full"
          >
            <Icons.logOut className="w-4 h-4" />
            <span className="truncate">Sign out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
