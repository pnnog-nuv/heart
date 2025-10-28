"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center gap-2 text-sm mb-6", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-foreground/60 hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  "font-medium",
                  isLast ? "text-foreground" : "text-foreground/60"
                )}
              >
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className="w-4 h-4 text-foreground/30" />}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
