import cn from "@/lib/tailwind-cn";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, PropsWithChildren } from "react";

type ButtonVariant = "primary";
type ButtonSize = "sm" | "md" | "lg";

const buttonVariants = cva(
  `inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-150`,
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-blue-300 active:bg-blue-500",
      },
      size: {
        sm: "px-4 py-[6px] text-xs",
        md: "px-6 py-[10px] text-sm",
        lg: "px-8 py-[14px] text-lg",
      },
      fullWidth: {
        true: "w-full",
      },
      disabled: {
        true: "cursor-not-allowed ",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        disabled: true,
        className: "bg-gray-200 text-opacity-[0.38] hover:bg-gray-200 active:bg-gray-200",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type HTMLButtonProps = Pick<ComponentProps<"button">, "onClick" | "disabled" | "type" | "className" | "children">;

type ButtonProps = Omit<ButtonVariantProps, "variant" | "size" | "fullWidth"> &
  HTMLButtonProps & {
    variant: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
  };

export default function Button({
  variant,
  size,
  fullWidth,
  disabled,
  children,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const buttonClassName = buttonVariants({ variant, size, fullWidth, disabled });
  return (
    <button
      className={cn(buttonClassName, className)}
      disabled={disabled}
      aria-disabled={disabled ? "true" : undefined}
      {...props}
    >
      {children}
    </button>
  );
}

Button.displayName = "Button";
