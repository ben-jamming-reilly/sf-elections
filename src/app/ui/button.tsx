import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { ComponentProps } from "react";

// TODO: fix this type to be more discriminate

type ButtonProps = {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  roundness?: "none" | "small" | "large" | "full";
  buttonRef?: React.Ref<HTMLButtonElement> | React.Ref<HTMLAnchorElement>;
  className?: string;
} & (
  | (ComponentProps<"button"> & {
      as: "button";
    })
  | (ComponentProps<"a"> & {
      as: "a";
    })
  | (LinkProps & {
      as: "Link";
    })
  | (ComponentProps<"summary"> & { as: "summary" })
);

export const Button = ({
  className,
  variant,
  roundness = "none",
  as = "button",
  children,
  buttonRef,
  ...rest
}: ButtonProps) => {
  const Element = as === "Link" ? Link : as;

  return (
    <Element
      ref={buttonRef}
      className={clsx(
        "inline-flex cursor-pointer items-center justify-center gap-3 border border-black px-4 py-1 text-center font-medium text-black outline-offset-4  transition-all focus-visible:outline-black active:scale-95 disabled:cursor-not-allowed disabled:active:!scale-100",
        variant === "primary" &&
          "bg-black text-white disabled:bg-black/70 notouch:hover:bg-white notouch:hover:text-black notouch:disabled:hover:bg-black/70 notouch:disabled:hover:text-white",
        variant === "secondary" &&
          "border-2 bg-white text-black disabled:bg-white/70 notouch:hover:bg-black notouch:hover:text-white notouch:disabled:hover:bg-white/70 notouch:disabled:hover:text-black",
        roundness === "small" && "rounded-md",
        roundness === "large" && "rounded-[100px]",
        roundness === "full" && "rounded-full",
        className,
      )}
      {...rest}
    >
      {children}
    </Element>
  );
};
