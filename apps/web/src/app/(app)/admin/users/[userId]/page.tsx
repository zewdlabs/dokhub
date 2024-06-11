import { File, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserTableList from "@/components/custom/users-table-list";

export default async function AdminUserDashboard() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
        <Tabs defaultValue="verified">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="verified">Verified</TabsTrigger>
              <TabsTrigger value="not-verified">Not Verified</TabsTrigger>
            </TabsList>
          </div>
          <UserTableList />
          <UserTableList tag="not-verified" />
        </Tabs>
      </div>
    </main>
  );
}
