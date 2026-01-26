import * as React from "react";

type SectionDividerProps = {
    children: React.ReactNode;
    teamColor?: string;
    className?: string;
};

export function SectionDivider({ children, teamColor, className }: SectionDividerProps) {
  const style = teamColor
    ? { borderColor: teamColor }
    : undefined;

  return (
    <div className={`my-4 grid grid-cols-[1fr_auto_1fr] items-center gap-4 w-full ${className ?? ""}`}>
      <div
        className="border-t border-muted-foreground"
        style={style}
      />
      <h2 className="text-xl font-semibold text-foreground whitespace-nowrap">
        {children}
      </h2>
      <div
        className="border-t border-muted-foreground"
        style={style}
      />
    </div>
  );
}