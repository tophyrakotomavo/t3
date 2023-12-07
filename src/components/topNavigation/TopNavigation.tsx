import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import type { FC } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export const TopNavigation: FC = () =>  {
  const { data } = useSession();
  const { user } = { ...data };

  return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <Link href="/files">Files</Link>
          </MenubarTrigger>
        </MenubarMenu>
        {user && user.role === 'ADMIN' && (
          <MenubarMenu>
            <MenubarTrigger>
              <Link href="/users">Users</Link>
            </MenubarTrigger>
          </MenubarMenu>
        )}
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => signOut({ callbackUrl: '/' })}
            className="cursor-pointer text-red-700"
          >
            Logout
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    );
};
