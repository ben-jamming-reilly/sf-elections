import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const PartyLogo = ({
  src,
  href,
  prefetch = false,
  priority = false,
  className,
  title,
  alt = "",
}: {
  src: string;
  href: string;
  prefetch?: boolean;
  priority?: boolean;
  className?: string;
  title?: string;
  alt?: string;
}) => {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      title={title}
      className={twMerge(
        clsx(
          " group relative z-10 block h-[100px] w-[100px] max-w-full overflow-clip rounded-2xl border border-black bg-white outline-offset-4 outline-black transition-all focus-visible:outline-2",
          className,
        ),
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="rounded-2xl border-2 object-contain p-1 transition-all group-focus-visible:scale-105 notouch:group-hover:scale-105"
      />
    </Link>
  );
};
