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
        "border dark:text-white active:scale-95 dark:hover:opacity-90 dark:bg-brand-purple hover:bg-brand-purple text-brand-purple hover:text-white border-brand-purple transition-all  px-4 py-2 rounded-md",
        className
      )}
    >
      {children}
    </Link>
  );
};
