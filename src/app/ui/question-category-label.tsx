import clsx from "clsx";
import { categoryHexForLabel } from "~/data/answers";

export const QuestionCategoryLabel = ({ category }: { category: string }) => {
  const hex = categoryHexForLabel(category);

  return (
    <div
      className="border-b-2 mb-2"
      style={{
        borderColor: hex,
      }}
    >
      <span
        data-hex={hex}
        className={clsx(
          "font-brand leading-6 inline-block px-2 py-1 text-sm h-[2em] rounded-t-md selection:bg-white data-[hex=#38be23]:selection:text-[#38be23] data-[hex=#2766d4]:selection:text-[#2766d4] data-[hex=#e8ce26]:selection:text-[#e8ce26]  data-[hex=#6FCF97]:selection:text-[#6FCF97] data-[hex=#BB6BD9]:selection:text-[#BB6BD9]  data-[hex=#c16926]:selection:text-[#c16926]",
          category && "text-white"
        )}
        style={{
          backgroundColor: hex,
        }}
      >
        {category}
      </span>
    </div>
  );
};
