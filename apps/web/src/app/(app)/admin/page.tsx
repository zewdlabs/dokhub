import { Overview } from "@/components/custom/overview-admin";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>New Users</CardDescription>
              <CardTitle className="text-4xl">10</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +100% from last week
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={100} aria-label="100% increase" />
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>New Posts</CardDescription>
              <CardTitle className="text-4xl">25</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +100% from last month
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={100} aria-label="100% increase" />
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>New Organizations</CardDescription>
              <CardTitle className="text-4xl">2</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +100% from last month
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={100} aria-label="100% increase" />
            </CardFooter>
          </Card>
        </div>
        <div className="max-w-screen-md">
          <Overview />
        </div>
      </div>
    </main>
  );
}
