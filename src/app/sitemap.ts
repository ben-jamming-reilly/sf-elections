import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://wahlchecker.at",
      lastModified: new Date(),
    },
    {
      url: "https://wahlchecker.at/fragen",
      lastModified: new Date(),
    },
    {
      url: "https://wahlchecker.at/glossar",
      lastModified: new Date(),
    },
    {
      url: "https://wahlchecker.at/volt",
      lastModified: new Date(),
    },
    {
      url: "https://wahlchecker.at/spoe",
      lastModified: new Date(),
    },
    {
      url: "https://wahlchecker.at/oevp",
      lastModified: new Date(),
    },
    {
      url: "https://wahlchecker.at/gruene",
      lastModified: new Date(),
    },
    {
      url: "https://wahlchecker.at/dna",
      lastModified: new Date(),
    },
    {
      url: "https://wahlchecker.at/fpoe",
      lastModified: new Date(),
    },
    {
      url: "https://wahlchecker.at/kpoe",
      lastModified: new Date(),
    },
    {
      url: "https://wahlchecker.at/neos",
      lastModified: new Date(),
    },
    {
      url: "https://www.wahlchecker.at/vergleich/fpoe/neos/kpoe/volt/spoe/oevp/gruene/dna",
      lastModified: new Date(),
    },
  ];
}
