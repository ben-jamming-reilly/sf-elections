import Image from "next/image";

export const Loading = ({ size = 40 }: { size?: number }) => {
  return (
    <div className="inline-flex items-center justify-center">
      <div
        style={{
          width: size,
          height: size,
        }}
        className="animate-spin rounded-full  border-4 border-t-brand"
      ></div>
    </div>
  );
};
