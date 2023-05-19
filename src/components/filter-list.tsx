"use client";

import { useState } from "react";
import { ExpandableSection } from "./expandable-section";

export type Facet = {
  value: string;
  count: number;
};

export type FilterListParams = {
  name: string;
  facets: Facet[];
  path: string;
  className?: string;
};

export const Filterlist = (props: FilterListParams) => {
  const [listExtended, setListExtended] = useState<boolean>(false);

  return (
    <ExpandableSection
      title={props.name}
      titleClassName="font-bold"
      className={props.className}
    >
      <div className="grid lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4 overflow-hidden">
        {props.facets.map((facet, i) => {
          if (i > 10 && !listExtended) return;
          return (
            <span key={facet.value}>
              <a href={`${props.path}${facet.value}`}>
                {facet.value} ({facet.count})
              </a>
            </span>
          );
        })}
        <span
          onClick={() => {
            setListExtended(!listExtended);
          }}
          className="cursor-pointer font-bold"
        >
          {listExtended ? <i>Show less</i> : <i>Show more</i>}
          ...
        </span>
      </div>
    </ExpandableSection>
  );
};