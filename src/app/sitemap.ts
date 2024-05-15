import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.wahlchecker.at",
      lastModified: new Date(),
    },
    {
      url: "https://www.wahlchecker.at/fragen",
      lastModified: new Date(),
    },
    {
      url: "https://www.wahlchecker.at/glossar",
      lastModified: new Date(),
    },
    {
      url: "https://www.wahlchecker.at/volt",
      lastModified: new Date(),
    },
    {
      url: "https://www.wahlchecker.at/spoe",
      lastModified: new Date(),
    },
    {
      url: "https://www.wahlchecker.at/oevp",
      lastModified: new Date(),
    },
    {
      url: "https://www.wahlchecker.at/gruene",
      lastModified: new Date(),
    },
    {
      url: "https://www.wahlchecker.at/dna",
      lastModified: new Date(),
    },
    {
      url: "https://www.wahlchecker.at/fpoe",
      lastModified: new Date(),
    },
    {
      url: "https://www.wahlchecker.at/kpoe",
      lastModified: new Date(),
    },
    {
      url: "https://www.wahlchecker.at/neos",
      lastModified: new Date(),
    },
    {
      url: "https://www.www.wahlchecker.at/vergleich/fpoe/neos/kpoe/volt/spoe/oevp/gruene/dna",
      lastModified: new Date(),
    },
  ];
}
