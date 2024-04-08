import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://andererseits.org/wahlinfos",
      lastModified: new Date(),
    },
    {
      url: "https://andererseits.org/wahlinfos/kabine",
      lastModified: new Date(),
    },
    {
      url: "https://andererseits.org/wahlinfos/impressum",
      lastModified: new Date(),
    },
    {
      url: "https://andererseits.org/wahlinfos/datenschutz",
      lastModified: new Date(),
    },
    {
      url: "https://andererseits.org/wahlinfos/kalkulation",
      lastModified: new Date(),
    },
  ];
}
