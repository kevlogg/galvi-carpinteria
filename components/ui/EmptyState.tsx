import { cn } from "@/lib/utils/cn";

interface EmptyStateProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function EmptyState({ title, description, className, children }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed border-wood-200 bg-wood-50/50 py-12 px-6 text-center",
        className
      )}
    >
      <p className="font-medium text-wood-800">{title}</p>
      {description && <p className="mt-1 text-sm text-wood-600">{description}</p>}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
