import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://mitentscheiden.at",
      lastModified: new Date(),
    },
    {
      url: "https://mitentscheiden.at/kabine",
      lastModified: new Date(),
    },
    {
      url: "https://mitentscheiden.at/impressum",
      lastModified: new Date(),
    },
    {
      url: "https://mitentscheiden.at/datenschutz",
      lastModified: new Date(),
    },
    {
      url: "https://mitentscheiden.at/kalkulation",
      lastModified: new Date(),
    },
    {
      url: "https://mitentscheiden.at/pamela-rendi-wagner",
      lastModified: new Date(),
    },
    {
      url: "https://mitentscheiden.at/hans-peter-doskozil",
      lastModified: new Date(),
    },
    {
      url: "https://mitentscheiden.at/andreas-babler",
      lastModified: new Date(),
    },
    {
      url: "https://mitentscheiden.at/vergleich/andreas-babler/hans-peter-doskozil/pamela-rendi-wagner",
      lastModified: new Date(),
    },
  ];
}
