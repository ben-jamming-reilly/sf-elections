import { Candidate } from "@prisma/client";

export const constructComparision = (candidates: Candidate[]): {
    slug: string,
    name: string,
}[] => {
      const comboPairs = candidates.map((item, idx) => {
    const left = candidates[idx];
    const right = candidates.length - 1 !== idx ? candidates[idx + 1] : candidates[0];

    return {
      slug: `${left.slug}/${right.slug}`,
      name: `${left.name} und ${right.name}`,
    }
  });

  const comboAll = candidates.reduce((acc, item) => ({
    slug: acc.slug ? `${acc.slug}/${item.slug}`: `${item.slug}`,
    name: acc.name ? `${acc.name} und ${item.name}` : item.name,
  }), {} as Record<'slug' | 'name', string>);

    return [
        ...comboPairs,
        comboAll,
    ];
}