
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:shadow-md hover:translate-y-[-1px]",
        destructive: "bg-destructive text-destructive-foreground shadow hover:shadow-md hover:translate-y-[-1px]",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        glass: "bg-white/20 backdrop-blur-md border border-white/30 text-foreground shadow hover:bg-white/30 dark:bg-black/20 dark:border-white/10 dark:hover:bg-black/30",
        subtle: "bg-secondary/50 text-foreground hover:bg-secondary/80",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-11 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonCustomProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  asChild?: boolean;
}

const ButtonCustom = React.forwardRef<HTMLButtonElement, ButtonCustomProps>(
  ({ className, variant, size, isLoading, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // When using asChild, we need to use the regular Button component
    // which already implements Slot functionality
    if (asChild) {
      return (
        <Button
          className={cn(
            buttonVariants({ variant, size, className }),
            isLoading && "opacity-80 pointer-events-none",
            "transition-all duration-200 ease-in-out flex items-center gap-2"
          )}
          ref={ref}
          disabled={isLoading || props.disabled}
          asChild={asChild}
          {...props}
        >
          {children}
        </Button>
      );
    }
    
    // For regular button usage without asChild
    return (
      <Button
        className={cn(
          buttonVariants({ variant, size, className }),
          isLoading && "opacity-80 pointer-events-none",
          "transition-all duration-200 ease-in-out flex items-center gap-2"
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        ) : null}
        <span className={isLoading ? "invisible" : ""}>{children}</span>
      </Button>
    );
  }
);

ButtonCustom.displayName = "ButtonCustom";

export { ButtonCustom, buttonVariants };
