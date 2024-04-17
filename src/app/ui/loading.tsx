import Image from "next/image";

export const Loading = () => {
  return (
    <div className="inline-flex items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full  border-4 border-t-brand"></div>
    </div>
  );
};
