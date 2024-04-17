// ChatGippity wrote this – I wash my hands clean
export const mergeHyphenatedWords = (array: string[]): string[] => {
  const result: string[] = [];
  for (let i = 0; i < array.length; i++) {
    if (
      array[i] === "-" &&
      i > 0 &&
      array[i - 1] !== " " &&
      i < array.length - 1 &&
      array[i + 1] !== " "
    ) {
      result[result.length - 1] += array[i] + array[i + 1];
      i++; // Skip the next word as it is already added
    } else {
      if (array[i] !== "-") {
        // Only add non-dash elements, or standalone dashes surrounded by spaces
        result.push(array[i]);
      }
    }
  }
  return result;
};
