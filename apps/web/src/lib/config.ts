import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Feedbacks",
      href: "/dashboard/feedbacks",
    },
    {
      title: "Sites",
      href: "/dashboard/sites",
    },
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
};
