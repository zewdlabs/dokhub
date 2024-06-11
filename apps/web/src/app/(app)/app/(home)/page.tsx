import PostList from "@/components/custom/post-list";
import SearchForm from "@/components/custom/search-form";
import ToFollowPeople from "@/components/custom/to-follow";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function HomePage() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="xl:col-span-2 space-y-4 md:space-y-6">
        <SearchForm />
        <div className="md:container w-full">
          <div className="flex gap-4">
            <Tabs
              defaultValue="foryou"
              className="flex flex-col items-start gap-4 w-full"
            >
              <TabsList className="z-40 bg-transparent w-full flex justify-start">
                {/* TODO: think about this button. try to implement it last*/}
                <Button variant="outline" className="px-3">
                  <Icons.add className="w-4 h-4" />
                </Button>
                <TabsTrigger
                  value="foryou"
                  className="px-3 py-2 bg-transparent"
                >
                  For You
                </TabsTrigger>
                <Separator orientation="vertical" />
                <TabsTrigger
                  value="following"
                  className="px-3 py-2 bg-transparent"
                >
                  Following
                </TabsTrigger>
              </TabsList>
              <PostList tag="foryou" />
              <PostList tag="following" />
              <PostList tag="following" />
            </Tabs>
          </div>
        </div>
      </div>
      <div>
        <div className="sticky top-20 flex flex-col gap-6">
          <ToFollowPeople />
        </div>
      </div>
    </div>
  );
}
