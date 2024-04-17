import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "./button";

export const BackButton = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <Button as="a" roundness="small" variant="secondary" href={href}>
      <ArrowLeftCircleIcon className="h-5 w-5 stroke-2" />
      {children}
    </Button>
  );
};
