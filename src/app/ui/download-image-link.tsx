import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import { Button } from "./button";

export const DownloadImageLink = ({
  children,
  href,
  title,
}: {
  children: ReactNode;
  href: string;
  title: string;
}) => {
  return (
    <Button
      as="a"
      variant="secondary"
      roundness="small"
      download={title}
      target="_blank"
      href={href}
    >
      <ArrowDownTrayIcon className="h-4 w-4 stroke-2" />
      {children}
    </Button>
  );
};
