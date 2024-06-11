"use client";
import React, { useState } from "react";
import PostList from "@/components/custom/post-list";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Post {
  title: string;
}

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Post[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      fetch(`http://localhost:4231/api/search?name=${value}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setResults(data);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
        });
    } else {
      setResults([]);
    }
  };

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
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>
        </form>
        <div>
          {results.map((result, index) => (
            <div key={index}>{result.title}</div>
          ))}
        </div>
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
            </Tabs>
          </div>
        </div>
      </div>
      <div>
        <div className="sticky top-20 flex flex-col gap-6">
          <div className="bg-transparent rounded-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recommended Topics</h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <Button variant={"ghost"} key={index}>
                {topic.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

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
