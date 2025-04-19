
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  helperText?: string;
  examples?: string[];
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, helperText, examples, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full">
        <textarea
          className={cn(
            "flex h-full w-full rounded-md border border-input bg-transparent px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
        {helperText && <p className="text-sm text-muted-foreground">{helperText}</p>}
        {examples && examples.length > 0 && (
          <div className="space-y-1 mt-2">
            <p className="text-sm font-medium text-foreground/80">Examples of what to include:</p>
            <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
              {examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
