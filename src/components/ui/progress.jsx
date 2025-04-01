"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "../../lib/utils";

const Progress = React.forwardRef(
  // eslint-disable-next-line arrow-body-style
  ({ className, value = 0, ...props }, ref) => {


    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full bg-blue-500 transition-all"
          style={{ width: `${value}%` }} 
        />
      </ProgressPrimitive.Root>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
