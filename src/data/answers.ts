import { QuestionType } from "@prisma/client";

export const options = [
  {
    label: "garnicht zu",
    value: -2,
  },
  {
    label: "eher nicht zu",
    value: -1,
  },
  {
    label: "eher zu",
    value: 1,
  },
  {
    label: "voll zu",
    value: 2,
  },
];

export const yesNoOptions = [
  {
    label: "Nein",
    value: -3, // Settings a different value to be able to differnentiate. Can normalise afterwards.
  },
  {
    label: "Ja",
    value: 3, // Settings a different value to be able to differnentiate. Can normalise afterwards.
  },
];

export const wahlrechtOptions = [
  {
    label: "Nein nie",
    value: -10, // Settings a different value to be able to differnentiate. Can normalise afterwards.
  },
  {
    label: "ja nach 10 Jahren Hauptwohnsitz",
    value: -9,
  },
  {
    label: "ja nach 5 Jahren Hauptwohnsitz",
    value: -8,
  },
  {
    label: "ja sofort",
    value: -7,
  },
];

export const getOptionsBasedOnType = (type: QuestionType) => {
  switch (type) {
    case "YesNo":
      return yesNoOptions;
    case "Wahlrecht":
      return wahlrechtOptions;
    case "Range":
      return options;
    default:
      return options;
  }
};

export const wahlrechtLabelForValue = (value: number) => {
  const option = wahlrechtOptions.find((option) => option.value === value);
  return option ? option.label : "";
};

export const optionLabelForValue = (value: number) => {
  const option = options.find((option) => option.value === value);
  return option ? option.label : "";
};

export const optionLabelForYesNoValue = (value: number) => {
  const option = yesNoOptions.find((option) => option.value === value);
  return option ? option.label : "";
};

export const weightings = [
  {
    label: "garnicht wichtig",
    value: 0,
  },
  {
    label: "eher nicht wichtig",
    value: 1,
  },
  {
    label: "eher wichtig",
    value: 2,
  },
  {
    label: "sehr wichtig",
    value: 3,
  },
];

export const weightingLabelForValue = (value: number) => {
  const weighting = weightings.find((weighting) => weighting.value === value);
  return weighting ? weighting.label : "";
};

export const CATEGORIES = [
  {
    label: "Klima & Umwelt",
    hex: "#38be23",
  },
  {
    label: "Frauen",
    hex: "#2766d4",
  },
  {
    label: "Demokratie & Mitbestimmung",
    hex: "#EB5757",
  },
  {
    label: "Arbeit & Soziales",
    hex: "#e8ce26",
  },
  {
    label: "Internes",
    hex: "#6FCF97",
  },
  {
    label: "Europa & Internationales",
    hex: "#BB6BD9",
  },
  {
    label: "Bildung",
    hex: "#c16926",
  },
];

export const categoryHexForLabel = (label: string) => {
  const category = CATEGORIES.find((category) => category.label === label);
  return category ? category.hex : "";
};
