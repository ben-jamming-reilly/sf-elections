import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://andererseits.org/Wahl-Infos",
      lastModified: new Date(),
    },
    {
      url: "https://andererseits.org/Wahl-Infos/kabine",
      lastModified: new Date(),
    },
    {
      url: "https://andererseits.org/Wahl-Infos/impressum",
      lastModified: new Date(),
    },
    {
      url: "https://andererseits.org/Wahl-Infos/datenschutz",
      lastModified: new Date(),
    },
    {
      url: "https://andererseits.org/Wahl-Infos/kalkulation",
      lastModified: new Date(),
    },
  ];
}
