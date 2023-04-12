import Image from "next/image";

export const Loading = () => {
  return (
    <div className="inline-flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-t-brand rounded-full animate-spin"></div>
    </div>
  );
};
