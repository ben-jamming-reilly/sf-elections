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

export const optionLabelForValue = (value: number) => {
  const option = options.find((option) => option.value === value);
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
