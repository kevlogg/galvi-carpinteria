import { cn } from "@/lib/utils/cn";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2 className="font-serif text-3xl font-medium tracking-tight text-wood-900 md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-wood-600">{subtitle}</p>
      )}
    </div>
  );
}
