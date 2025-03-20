"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef(
  ({ className, value = 0, ...props }, ref) => {
    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full bg-primary transition-all"
          style={{ width: `${value}%` }} // Use `width` instead of `transform`
        />
      </ProgressPrimitive.Root>
    );
  }
);

// Ensure the display name is correctly assigned
Progress.displayName = "Progress";

export { Progress };
