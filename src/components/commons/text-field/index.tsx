import cn from "@/lib/tailwind-cn";
import { forwardRef, InputHTMLAttributes, PropsWithChildren } from "react";

export default function TextField({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn("flex flex-col gap-1", className)}>{children}</div>;
}

TextField.Label = ({
  children,
  className,
  htmlFor,
  status = "default",
}: PropsWithChildren<{ className?: string; htmlFor?: string; status?: "default" | "success" | "error" }>) => {
  const labelStyle = {
    default: "text-gray-700",
    success: "text-primary",
    error: "text-error",
  };
  return (
    <label htmlFor={htmlFor} className={cn("text-xs font-semibold", labelStyle[status], className)}>
      {children}
    </label>
  );
};

TextField.Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { status?: "default" | "success" | "error" }
>(({ className, status = "default", value = "", maxLength, id, ...props }, ref) => {
  const inputStyle = {
    default: "border-gray-200 focus:ring-gray-500 focus:border-gray-500",
    success: "border-primary focus:ring-blue-500 focus:border-blue-500",
    error: "border-gray-800 text-error focus:ring-red-500 focus:border-red-500",
  };

  return (
    <div className="relative w-full">
      <input
        ref={ref}
        id={id}
        maxLength={maxLength}
        className={cn("w-full border-b-2 px-1 py-2 font-semibold focus:outline-none", inputStyle[status], className)}
        {...props}
      />
      {maxLength && value && (
        <span className="absolute right-1 top-1/2 -translate-y-1/2 text-xs text-gray-500">
          {String(value).length}/{maxLength}
        </span>
      )}
    </div>
  );
});
TextField.Input.displayName = "TextField.Input";

TextField.HelperText = ({
  children,
  className,
  status = "default",
}: PropsWithChildren<{ className?: string; status?: "default" | "success" | "error" }>) => {
  const helperTextStyle = {
    default: "text-gray-500",
    success: "text-gray-500",
    error: "text-error",
  };
  return <span className={cn("mt-1 text-xs", helperTextStyle[status], className)}>{children}</span>;
};
