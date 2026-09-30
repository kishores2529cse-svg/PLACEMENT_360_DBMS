import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "bg-white border border-slate-200 text-slate-900",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 px-5 py-4 border-b border-slate-200", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn("text-base font-semibold leading-none tracking-tight text-slate-800", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }) {
  return (
    <p
      className={cn("text-sm text-slate-500", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }) {
  return (
    <div className={cn("p-5", className)} {...props} />
  );
}

export function CardFooter({ className, ...props }) {
  return (
    <div
      className={cn("flex items-center px-5 py-4 border-t border-slate-200 bg-slate-50", className)}
      {...props}
    />
  );
}
