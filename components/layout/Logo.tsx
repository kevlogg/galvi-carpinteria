import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-3", className)}
      aria-label="Galvi Carpintería - Inicio"
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-cream"
        aria-hidden
      >
        <span className="font-serif text-lg font-normal leading-none">GV</span>
      </div>
      {showText && (
        <span className="font-serif text-lg font-medium tracking-tight text-foreground">
          Galvi Carpintería
        </span>
      )}
    </Link>
  );
}
