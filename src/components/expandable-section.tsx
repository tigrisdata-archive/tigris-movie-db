"use client";

import { ChevronRight } from "@/icons/chevron-down";
import { ChevronDown } from "@/icons/chevron-right";
import { useState } from "react";

export type ExpandableSectionProps = {
  title: string;
  children: JSX.Element;
  className?: string;
  titleClassName?: string;
};

export const ExpandableSection = ({
  title,
  children,
  className,
  titleClassName,
}: ExpandableSectionProps) => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  return (
    <section className={className}>
      <h2
        className={`cursor-pointer ${titleClassName}`}
        onClick={() => {
          setFilterOpen(!filterOpen);
        }}
      >
        {title}
        <span className="pl-2 w-4 h-4">
          {filterOpen ? <ChevronDown /> : <ChevronRight />}
        </span>
      </h2>
      <div className={filterOpen ? "" : "hidden"}>{children}</div>
    </section>
  );
};
