import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dokhub - Collaboration and AI powered platform for doctors",
    short_name: "Dokhub.co",
    description:
      "Dokhub is a collaboration and AI powered platform for doctors",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/android-chrome-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
