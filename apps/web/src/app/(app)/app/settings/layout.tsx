import { AppHeader } from "@/components/custom/app-header";
import { SidebarNav } from "@/components/custom/sidebar-settings-nav";
import { Separator } from "@/components/ui/separator";
import { PropsWithChildren } from "react";

const sidebarNavItems = [
  {
    title: "Account",
    href: "/app/settings/account",
  },
  {
    title: "Notification",
    href: "/app/settings/notification",
  },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AppHeader />
      <div className="sticky top-20 container max-w-screen-xl hidden space-y-6 px-10 pt-8 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="sticky flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
