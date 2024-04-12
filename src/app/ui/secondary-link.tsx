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
        "border active:scale-95 hover:bg-brand  text-brand  hover:text-white border-brand  transition-all  px-4 py-2 rounded-md",
        className
      )}
    >
      {children}
    </Link>
  );
};
