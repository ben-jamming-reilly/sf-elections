import clsx from "clsx";
import Link from "next/link";
import { HTMLAttributes, ReactNode } from "react";

export const SecondaryLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      className={clsx(
        "rounded-md border border-brand  px-4  py-2 text-brand  transition-all  active:scale-95 notouch:hover:bg-brand notouch:hover:text-white",
        className,
      )}
    >
      {children}
    </Link>
  );
};
