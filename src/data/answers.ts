import { QuestionType, QuestionTypes } from "~/app/utils.index";

export type ScaleOptionValueType = (typeof options)[number]["value"];

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
  { label: "Ich weiß es nicht", value: 0 },
  {
    label: "Nein",
    value: -3, // Settings a different value to be able to differnentiate. Can normalise afterwards.
  },
] as const;

export const getOptionsBasedOnType = (type: string) => {
  switch (type) {
    case QuestionTypes.YesNo:
      return yesNoOptions;
    default:
      return yesNoOptions;
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

export type WeightingValueType = (typeof weightings)[number]["value"];

export const weightings = [
  {
    label: "sehr wichtig",
    value: 3,
  },
  {
    label: "wichtig",
    value: 2,
  },
  {
    label: "nicht so wichtig",
    value: 1,
  },
  {
    label: "egal",
    value: 0,
  },
] as const;

export const weightingLabelForValue = (value: number) => {
  const weighting = weightings.find((weighting) => weighting.value === value);
  return weighting ? weighting.label : "";
};

export const CATEGORIES = [
  {
    label: "Umwelt und Klima-Schutz",
    hex: "#066700",
  },
  {
    label: "Arbeit und Inklusion",
    hex: "#b1ae1f",
  },
  {
    label: "Flucht und Asyl",
    hex: "#BB6BD9",
  },
  {
    label: "Krieg und Verteidigung",
    hex: "#6FCF97",
  },
  {
    label: "Die Zukunft der EU",
    hex: "#c16926",
  },
];

export const categoryHexForLabel = (label: string) => {
  const category = CATEGORIES.find((category) => category.label === label);
  return category ? category.hex : "";
};
