"use client";

import { Icons } from "@/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MarketingFooter() {
  const pathname = usePathname();

  if (pathname.includes("pitch") || pathname.includes("pricing")) {
    return null;
  }

  return (
    <footer className="backdrop-blur-sm border-t-[1px] border-border pt-10 md:pt-16">
      <div className="container">
        <div className="flex justify-between items-center border-border border-b-[1px] pb-10 md:pb-16 mb-12">
          <Link href="/" className="scale-50 -ml-[52px] md:ml-0 md:scale-100">
            <Icons.logoLarge />
            <span className="sr-only">Dokhub</span>
          </Link>

          <span className="font-normal max-w-prose md:text-lg text-right">
            Collaborate with others assisted by state-of-the-art AI
          </span>
        </div>

        <div className="flex flex-col md:flex-row w-full mb-10 md:mb-20">
          <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:w-6/12 justify-between leading-8">
            <div>
              <span className="font-medium">Product</span>
              <ul>
                <li className="text-primary transition-colors">
                  <Link
                    href="#features"
                    className="text-primary hover:text-primary/70"
                  >
                    Features
                  </Link>
                </li>
                <li className="text-primary transition-colors">
                  <Link
                    className="text-primary hover:text-primary/70"
                    href="#testimonials"
                  >
                    Story
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <span>Resources</span>
              <ul>
                <li className="text-primary transition-colors">
                  <Link
                    className="text-primary hover:text-primary/70"
                    href="/support"
                  >
                    Support
                  </Link>
                </li>
                <li className="text-primary transition-colors">
                  <Link
                    href="/policy"
                    className="text-primary hover:text-primary/70"
                  >
                    Privacy policy
                  </Link>
                </li>
                <li className="text-primary transition-colors">
                  <Link
                    className="text-primary hover:text-primary/70"
                    href="/terms"
                  >
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:w-6/12 flex mt-8 md:mt-0 md:justify-end">
            <div className="flex justify-between md:items-end flex-col space-y-14">
              <div className="flex items-center">
                <ul className="flex space-x-2 items-center md:ml-5">
                  <li>
                    <a target="_blank" rel="noreferrer" href="#">
                      <span className="sr-only">Twitter</span>
                      <Icons.twitterX className="w-8 h-8" />
                    </a>
                  </li>
                  <li>
                    <a target="_blank" rel="noreferrer" href="#">
                      <span className="sr-only">LinkedIn</span>
                      <Icons.linkedIn className="w-8 h-8" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs mb-12">
          Dokhub.co&reg; is a registered trademark by Dokhub.co, Inc. All rights
          reserved. Apple.com® is a registered trademark by Apple.com, Inc. All
          rights reserved. Discord.com® is a registered trademark by
          Discord.com, Inc. All rights reserved. Github.com® is a registered
          trademark by Github.com, Inc. All rights reserved. Notion.com® is a
          registered trademark by Notion.com, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export function AppFooter() {
  return (
    <footer className="backdrop-blur-sm border-t-[1px] border-border pt-10 md:pt-16">
      <div className="container">
        <p className="text-xs mb-12">
          Dokhub.co&reg; is a registered trademark by Dokhub.co, Inc. All rights
          reserved. Apple.com® is a registered trademark by Apple.com, Inc. All
          rights reserved. Discord.com® is a registered trademark by
          Discord.com, Inc. All rights reserved. Github.com® is a registered
          trademark by Github.com, Inc. All rights reserved. Notion.com® is a
          registered trademark by Notion.com, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
