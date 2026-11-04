import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge: string;
  title: string;
  highlight?: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  highlight,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl mx-auto text-center mb-12", className)}>
      <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
        {badge}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-snug">
        {title}{" "}
        {highlight && (
          <span className="text-primary underline decoration-accent decoration-4 underline-offset-8">
            {highlight}
          </span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
