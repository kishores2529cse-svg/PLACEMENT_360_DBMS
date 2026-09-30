import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({ children, variant = 'default', className, ...props }) {
  const variants = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-[#e5f0ff] text-[#0043ce] border-[#e5f0ff]',
    success: 'bg-[#defbe6] text-[#24a148] border-[#defbe6]',
    warning: 'bg-[#fcf4d6] text-[#f1c21b] border-[#fcf4d6]',
    danger: 'bg-[#fff1f1] text-[#da1e28] border-[#fff1f1]',
    outline: 'border-slate-300 text-slate-700',
  };

  return (
    <span 
      className={cn(
        "inline-flex items-center px-2 py-0.5 border text-xs font-medium",
        variants[variant],
        className
      )} 
      {...props}
    >
      {children}
    </span>
  );
}
