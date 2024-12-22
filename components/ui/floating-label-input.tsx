import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface FloatingLabelInputProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
}

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = Boolean(props.value || props.defaultValue);

    return (
      <div className="relative">
        <Input
          {...props}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "peer h-10 w-full rounded-md border bg-transparent px-3 pt-5 pb-1 text-sm focus:ring-1 focus:ring-primary focus:outline-none",
            className
          )}
        />
        <label
          className={cn(
            "absolute left-3 top-2 text-sm text-muted-foreground transition-all duration-200",
            isFocused || hasValue
              ? "text-xs text-primary -translate-y-3"
              : "text-muted-foreground"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

FloatingLabelInput.displayName = "FloatingLabelInput";