import clsx from "clsx";
import { categoryHexForLabel } from "~/data/answers";

export const QuestionCategoryLabel = ({ category }: { category: string }) => {
  const hex = categoryHexForLabel(category);

  return (
    <span
      data-hex={hex}
      className={clsx(
        "font-sans leading-5 flex-shrink-0 whitespace-nowrap uppercase inline-block px-3 py-1.5 text-base h-[2em] rounded-[22px] selection:bg-white data-[hex=#066700]:selection:text-[#066700] data-[hex=#2766d4]:selection:text-[#2766d4] data-[hex=#e8ce26]:selection:text-[#e8ce26]  data-[hex=#6FCF97]:selection:text-[#6FCF97] data-[hex=#BB6BD9]:selection:text-[#BB6BD9]  data-[hex=#c16926]:selection:text-[#c16926]",
        category && "text-white"
      )}
      style={{
        backgroundColor: hex,
      }}
    >
      {category}
    </span>
  );
};
