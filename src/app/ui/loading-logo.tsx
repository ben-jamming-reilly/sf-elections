import Image from "next/image";

export const LoadingLogo = () => {
  return (
    <Image
      alt="loading"
      priority
      className="animate-spin"
      style={{
        animationDuration: "3s",
      }}
      src="/loading.svg"
      width={100}
      height={100}
    />
  );
};
