import { cva, type VariantProps } from "class-variance-authority";
import React, { HtmlHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

const TextVariants = cva("text-sm font-normal", {
  variants: {
    variant: {
      normal: "font-normal",
      light: "font-light",
      emphased: "font-bold",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      large: "text-xl",
      extraLarge: "text-2xl",
    },
  },
  defaultVariants: {
    variant: "normal",
    size: "base",
  },
});

type UseTagProp = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface TextProp
  extends HtmlHTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof TextVariants> {
  useTag?: UseTagProp;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProp>(
  ({ className, children, useTag, variant, size, ...props }, ref) => {
    const Comp = useTag ? useTag : "p";
    return (
      <Comp
        className={cn(TextVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

export { Text };
