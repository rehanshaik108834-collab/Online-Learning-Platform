import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aria-invalid:border-[0.5px] dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border-[0.5px] bg-transparent px-4 py-3 text-base shadow-sm transition-all duration-200 outline-none focus-visible:ring-[2px] focus-visible:shadow-md hover:border-input/80 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props} />
  );
}

export { Textarea }
