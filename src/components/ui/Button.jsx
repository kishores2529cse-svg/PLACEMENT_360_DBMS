import React from 'react';
import { cn } from '../../lib/utils';

export function Button({ 
  className, 
  variant = 'default', 
  size = 'default', 
  children, 
  ...props 
}) {
  const variants = {
    default: 'bg-black text-white hover:bg-slate-800',
    destructive: 'bg-[#da1e28] text-white hover:bg-[#b81922]',
    outline: 'border border-slate-300 bg-transparent hover:bg-slate-100 text-slate-700',
    secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300',
    ghost: 'hover:bg-slate-100 text-slate-700',
    link: 'text-black underline-offset-4 hover:underline',
  };

  const sizes = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 px-3 text-xs',
    lg: 'h-10 px-8',
    icon: 'h-9 w-9',
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
