import { Globe } from "@/components/custom/globe";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

export function GlobalCollaborationCard() {
  return (
    <div
      id="features"
      className={cn(
        "border-border w-full rounded-lg border px-3 py-4 backdrop-blur-sm md:p-6 max-w-screen-xl mx-auto",
        "flex flex-col gap-6 bg-gradient-to-br from-[hsl(var(--muted))] from-0% to-transparent to-20%",
      )}
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="border-border rounded-full border p-2">
          <Icons.activity className="h-5 w-5" />
        </div>
        <h3 className="font-cal bg-gradient-to-tl from-[hsl(var(--muted))] from-0% to-[hsl(var(--foreground))] to-40% bg-clip-text text-center text-3xl text-transparent">
          What we offer
        </h3>
      </div>
      <div
        className={cn(
          "grid grid-cols-none md:grid-cols-2 lg:flex mx-auto gap-24",
        )}
      >
        <Globe />
        <ul className="gap-4 md:gap-6 flex flex-col">
          <li>
            <p className="flex flex-col">
              <span>
                <Icons.teamwork className="text-foreground/80 mb-1 mr-3 inline-flex h-6 w-6" />
                <span className="text-foreground font-medium">
                  Collaborate with others all over the world
                </span>{" "}
              </span>
              <span className="text-muted-foreground max-w-md">
                You can collaborate with other doctors and medical experts from
                all over the world.
              </span>
            </p>
          </li>
          <li>
            <p className="flex flex-col">
              <span>
                <Icons.chat className="text-foreground/80 mr-3 inline-flex h-6 w-6" />
                <span className="text-foreground font-medium">
                  Converse with state-of-the-art AI models
                </span>{" "}
              </span>
              <span className="text-muted-foreground max-w-md">
                Get access to a state-of-the-art AI system that can help you
                with diagnosing patients.
              </span>
            </p>
          </li>
          <li>
            <p className="flex flex-col">
              <span>
                <Icons.share className="text-foreground/80 mb-1 mr-3 inline-flex h-6 w-6" />
                <span className="text-foreground font-medium">
                  Share your knowledge, stories, and learn together
                </span>{" "}
              </span>
              <span className="text-muted-foreground max-w-md">
                Get access to a community of doctors and medical experts where
                you can share your knowledge, stories, and learn together.
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
