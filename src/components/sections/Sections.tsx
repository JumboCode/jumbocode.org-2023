import React from 'react';
import { assertNever } from 'utils/type-utils';

import type {
  CallToActionSection as CallToActionSectionType,
  CaseStudySection as CaseStudySectionType,
  MembersSection as MembersSectionType,
  StatsSection as StatsSectionType,
  ValuesSection as ValuesSectionType,
  CallToActionSectionSkeleton,
  CaseStudySectionSkeleton,
  MembersSectionSkeleton,
  StatsSectionSkeleton,
  ValuesSectionSkeleton,
} from 'generated/types/contentful';
import type { Entry } from 'contentful';

import CTASection from './CTASection';
import CaseStudySection from './CaseStudySection';
import StatsSection from './StatsSection';
import MembersSection from './MembersSection';
import ValuesSection from './ValuesSection';


type EntrySkeleton =
  | CallToActionSectionSkeleton
  | CallToActionSectionSkeleton
  | CaseStudySectionSkeleton
  | MembersSectionSkeleton
  | StatsSectionSkeleton
  | ValuesSectionSkeleton;

export type Section = Entry<EntrySkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>;

export interface ISectionsProps {
  sections: Section[];
}

export default function Sections({ sections }: { sections: (Section | undefined)[] }) {
  return sections ? (
    <>
      {sections.map((section, i) => {
        if (!section) return null;
        const typeId = section.sys.contentType.sys.id;
        switch (typeId) {
          case 'callToActionSection':
            return <CTASection key={i} {...section as CallToActionSectionType<'WITHOUT_UNRESOLVABLE_LINKS', string>} />;
          case 'caseStudySection':
            return <CaseStudySection key={i} {...section as CaseStudySectionType<'WITHOUT_UNRESOLVABLE_LINKS', string>} />;
          case 'statsSection':
            return <StatsSection key={i} {...section as StatsSectionType<'WITHOUT_UNRESOLVABLE_LINKS', string>} />;
          case 'membersSection':
            return <MembersSection key={i} {...section as MembersSectionType<'WITHOUT_UNRESOLVABLE_LINKS', string>} />;
          case 'valuesSection':
            return <ValuesSection key={i} {...section as ValuesSectionType<'WITHOUT_UNRESOLVABLE_LINKS', string>} />;
          default:
            return assertNever(typeId);
        }
      })}
    </>
  ) : (
    <div />
  );
}
