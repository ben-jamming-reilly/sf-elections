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
      className="relative flex items-center justify-center gap-2 rounded-md border border-brand px-3 py-2  text-brand outline-offset-2  transition-all selection:bg-brand selection:text-white focus-visible:outline-brand active:scale-95 notouch:hover:bg-brand notouch:hover:text-white "
      download={title}
      target="_blank"
      href={href}
    >
      <ArrowDownTrayIcon className="h-4 w-4 stroke-2" />
      Bild herunterladen
    </a>
  );
};
