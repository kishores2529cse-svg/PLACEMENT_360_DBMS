import React from 'react';
import { cn } from '../../lib/utils';

export const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:border-black focus-visible:ring-1 focus-visible:ring-black disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";
