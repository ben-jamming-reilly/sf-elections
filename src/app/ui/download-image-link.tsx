import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

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
    <a
      className="px-3 py-2 active:scale-95 hover:bg-brand border text-brand hover:text-white border-brand relative transition-all  rounded-md focus-visible:outline-brand  outline-offset-2 selection:text-white items-center flex justify-center gap-2 selection:bg-brand "
      download={title}
      target="_blank"
      href={href}
    >
      <ArrowDownTrayIcon className="h-4 w-4 stroke-2" />
      Bild herunterladen
    </a>
  );
};
