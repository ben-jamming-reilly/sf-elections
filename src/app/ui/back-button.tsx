import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ReactNode } from "react";

export const BackButton = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="inline-flex  items-center justify-center gap-2 rounded-md border  border-brand px-3 py-2 transition-all active:scale-95 notouch:hover:bg-brand notouch:hover:text-white"
    >
      <ArrowLeftCircleIcon className="h-5 w-5 stroke-2" />
      {children}
    </Link>
  );
};
