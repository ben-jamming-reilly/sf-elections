import { QuestionType } from "@prisma/client";

export type ScaleOptionValueType = typeof options[number]["value"];

export const getScaleOptionTendency = (option: ScaleOptionValueType) => {
  return option > 0 ? "positive" : "negative";
};

export const options = [
  {
    label: "voll zu",
    value: 2,
  },
  {
    label: "eher zu",
    value: 1,
  },
  {
    label: "eher nicht zu",
    value: -1,
  },
  {
    label: "gar nicht zu",
    value: -2,
  },
] as const;

export const yesNoOptions = [
  {
    label: "Ja",
    value: 3, // Settings a different value to be able to differnentiate. Can normalise afterwards.
  },
  {
    label: "Nein",
    value: -3, // Settings a different value to be able to differnentiate. Can normalise afterwards.
  },
] as const;

export const getOptionsBasedOnType = (type: QuestionType) => {
  switch (type) {
    case "YesNo":
      return yesNoOptions;
    case "Range":
      return options;
    default:
      return options;
  }
};

export const optionLabelForValue = (value: number) => {
  const option = options.find((option) => option.value === value);
  return option ? option.label : "";
};

export const optionLabelForYesNoValue = (value: number) => {
  const option = yesNoOptions.find((option) => option.value === value);
  return option ? option.label : "";
};

export const getWeightingTendency = (weighting: WeightingValueType) => {
  if (weighting === 0 || weighting === 1) return "negative";
  if (weighting === 2 || weighting === 3) return "positive";
};

export type WeightingValueType = typeof weightings[number]["value"];

export const weightings = [
  {
    label: "sehr wichtig",
    value: 3,
  },
  {
    label: "eher wichtig",
    value: 2,
  },
  {
    label: "eher nicht wichtig",
    value: 1,
  },
  {
    label: "gar nicht wichtig",
    value: 0,
  },
] as const;

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
  {
    label: "Zusatz",
    hex: "#485d7c",
  },
];

export const categoryHexForLabel = (label: string) => {
  const category = CATEGORIES.find((category) => category.label === label);
  return category ? category.hex : "";
};
