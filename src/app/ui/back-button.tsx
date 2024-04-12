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
      className="border-brand  border active:scale-95 px-3 py-2 hover:bg-brand  hover:text-white inline-flex items-center justify-center transition-all rounded-md gap-2"
    >
      <ArrowLeftCircleIcon className="w-5 h-5 stroke-2" />
      {children}
    </Link>
  );
};
