import { SocialIcon } from "react-social-icons";
import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

const socialGroups = [
  {
    type: "website",
    link: "https://benjaminreilly.com/",
  },

  {
    type: "twitter",
    link: "https://twitter.com/benjamin_really",
  },
] as const;

export const SocialBar = ({ className }: { className?: string }) => {
  return (
    <ul
      aria-label="Links zu Facebook, Twitter, Instagram und LinkedIn"
      className={clsx("flex items-center gap-x-1 gap-y-1 ", className)}
    >
      {socialGroups.map((social) => (
        <li key={social.type} className="group relative">
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                {social.type === "website" ? (
                  <Link href={social.link}>
                    <div
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                      }}
                    >
                      <Image fill src="/globe.svg" alt="" />
                    </div>
                  </Link>
                ) : (
                  <SocialIcon
                    url={social.link}
                    bgColor="#fff"
                    fgColor="#000"
                    className="rounded-full outline-black"
                    network={social.type}
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                    }}
                  />
                )}
              </Tooltip.Trigger>

              <Tooltip.Portal>
                <Tooltip.Content className="z-50 select-none rounded-[4px] bg-black px-[15px] py-[10px] text-[15px] text-sm leading-none text-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade">
                  <span className="">
                    {social.type.slice(0, 1).toUpperCase() +
                      social.type.slice(1)}
                  </span>

                  <Tooltip.Arrow className="fill-black" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </li>
      ))}
    </ul>
  );
};
