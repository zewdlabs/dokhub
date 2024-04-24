import PostCard from "@/components/custom/post-card";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface Post {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  user: {
    avatarUrl: string;
    prefix?: string;
    name: string;
  };
  publishedAt: Date;
  minutesToRead: string;
}

export default function HomePage() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="xl:col-span-2 space-y-4 md:space-y-6">
        <form className="max-w-5xl px-2 mx-auto z-50">
          <div className="relative">
            <Icons.search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for posts..."
              className="pl-8 ring-1 ring-muted-foreground/20"
            />
          </div>
        </form>
        <div className="md:container w-full">
          <div className="flex gap-4">
            <Tabs
              defaultValue="foryou"
              className="flex flex-col items-start gap-4 w-full"
            >
              <TabsList className="z-40 sticky top-16 bg-white w-full flex justify-start">
                {/* TODO: think about this button. try to implement it last*/}
                <Button variant="outline" className="px-3">
                  <Icons.add className="w-4 h-4" />
                </Button>
                <TabsTrigger value="foryou" className="px-3 py-2">
                  For You
                </TabsTrigger>
                <Separator orientation="vertical" />
                <TabsTrigger value="following" className="px-3 py-2">
                  Following
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="foryou"
                className="space-y-2 md:space-y-4 w-full"
              >
                {posts.map((post) => (
                  <PostCard post={post} key={post.imageUrl} />
                ))}
              </TabsContent>
              <TabsContent
                value="following"
                className="space-y-2 md:space-y-4 w-full"
              >
                {posts.map((post) => (
                  <PostCard post={post} key={post.imageUrl} />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <div>
        <div className="sticky top-20 flex flex-col gap-6">
          <div className="bg-white rounded-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recommended Topics</h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Button variant={"ghost"} key={topic.title}>
                {topic.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const posts: Post[] = [
  {
    title: "How to check for stress in pregnant women",
    description:
      "Stress is a common problem for pregnant women. Here are some tips to help you check for stress in pregnant woman and how to manage it.",
    imageUrl:
      "https://images.unsplash.com/photo-1586778330662-5664632a7f2f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    publishedAt: new Date("2021-03-15T12:00:00Z"),
    minutesToRead: "5 min read",
    user: {
      avatarUrl:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "John Doe",
    },
  },
  {
    title: "How to break postpartum depression",
    description:
      "Postpartum depression is a common problem for new mothers. Here are some tips to help you break postpartum depression and how to manage it.",
    imageUrl:
      "https://images.unsplash.com/photo-1613312328068-c9b6b76c9e8a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    publishedAt: new Date("2021-05-17T12:00:00Z"),
    minutesToRead: "7 min read",
    user: {
      avatarUrl:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Jane Doe",
    },
  },
  {
    title: "Nutrition for women in pregnancy",
    description:
      "Nutrition is important for women in pregnancy. Here are some tips to help you manage nutrition that is important for the baby.",
    imageUrl:
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=2428&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    publishedAt: new Date("2022-12-26T12:00:00Z"),
    minutesToRead: "10 min read",
    user: {
      avatarUrl:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Jane Doe",
    },
  },
];

const topics: { title: string }[] = [
  {
    title: "Bioengineering",
  },
  {
    title: "Postpartum",
  },
  {
    title: "Epidemiology",
  },
  {
    title: "Genetic Engineering",
  },
  {
    title: "Medcare",
  },
  {
    title: "Prepartum",
  },
  {
    title: "Bioengineering",
  },
  {
    title: "Postpartum",
  },
  {
    title: "Epidemiology",
  },
  {
    title: "Genetic Engineering",
  },
  {
    title: "Medcare",
  },
  {
    title: "Prepartum",
  },
];
