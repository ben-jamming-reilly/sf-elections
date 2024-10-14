import { QuestionTypes } from "~/app/utils.index";

export type ScaleOptionValueType = (typeof options)[number]["value"];

export const options = [
  {
    label: "fully",
    value: 2,
  },
  {
    label: "rather too",
    value: 1,
  },
  {
    label: "rather not",
    value: -1,
  },
  {
    label: "not at all",
    value: -2,
  },
] as const;

export const yesNoOptions = [
  {
    label: "Yes",
    value: 1, // Settings a different value to be able to differnentiate. Can normalise afterwards.
  },
  { label: "I am not sure", value: 0 },
  {
    label: "No",
    value: -1, // Settings a different value to be able to differnentiate. Can normalise afterwards.
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

export type WeightingValueType = (typeof weightings)[number]["value"];

export const weightings = [
  {
    label: "very important",
    value: 3,
  },
  {
    label: "important",
    value: 2,
  },
  {
    label: "not so important",
    value: 1,
  },
  {
    label: "does not matter",
    value: 0,
  },
] as const;

export const weightingLabelForValue = (value: number) => {
  const weighting = weightings.find((weighting) => weighting.value === value);
  return weighting ? weighting.label : "";
};

export const CATEGORIES = [
  {
    label: "Environment and climate protection",
    hex: "#066700",
  },
  {
    label: "Work and inclusion",
    hex: "#D51414",
  },
  {
    label: "Flight and asylum",
    hex: "#BB6BD9",
  },
  {
    label: "War and defense",
    hex: "#005CB9",
  },
  {
    label: "Other",
    hex: "#CC00CC",
  },
];

export const categoryHexForLabel = (label: string) => {
  const category = CATEGORIES.find((category) => category.label === label);
  return category ? category.hex : "";
};
