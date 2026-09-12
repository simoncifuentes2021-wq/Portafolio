import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeader({
  index,
  title,
  lede,
  className,
  aside,
  as: Heading = "h2",
}: {
  index: string;
  title: string;
  lede?: string;
  className?: string;
  aside?: string;
  as?: "h1" | "h2";
}) {
  return (
    <header className={cn("section-header", className)}>
      <p className="section-index">
        <span>{index}</span>
        <span className="index-line" />
        {title}
      </p>
      <div className="section-heading-row">
        <Reveal variant="mask">
          <Heading className="section-title">{lede ?? title}</Heading>
        </Reveal>
        {aside && <p className="section-aside">{aside}</p>}
      </div>
    </header>
  );
}
