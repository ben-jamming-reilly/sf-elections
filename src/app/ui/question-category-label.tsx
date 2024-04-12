import clsx from "clsx";
import { categoryHexForLabel } from "~/data/answers";

export const QuestionCategoryLabel = ({ category }: { category: string }) => {
  const hex = categoryHexForLabel(category);

  return (
    <span
      data-hex={hex}
      className={clsx(
        "inline-block h-[2em] flex-shrink-0 whitespace-nowrap rounded-[22px] px-3 py-1.5 font-sans text-base uppercase leading-5 selection:bg-white data-[hex=#066700]:selection:text-[#066700] data-[hex=#2766d4]:selection:text-[#2766d4] data-[hex=#6FCF97]:selection:text-[#6FCF97]  data-[hex=#BB6BD9]:selection:text-[#BB6BD9] data-[hex=#c16926]:selection:text-[#c16926]  data-[hex=#e8ce26]:selection:text-[#e8ce26]",
        category && "text-white",
      )}
      style={{
        backgroundColor: hex,
      }}
    >
      {category}
    </span>
  );
};
