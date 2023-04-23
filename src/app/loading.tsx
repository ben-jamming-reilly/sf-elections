import Image from "next/image";
export default function VoterWahlkabineLoading() {
  return (
    <div className="w-full flex justify-center items-center mt-20">
      <Image
        alt="loading"
        priority
        className="animate-spin"
        style={{
          animationDuration: "3s",
        }}
        src="/icon.png"
        width={100}
        height={100}
      />
    </div>
  );
}
