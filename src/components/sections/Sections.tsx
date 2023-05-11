import React from 'react';
import { assertNever } from 'utils/type-utils';

import {
  ICallToActionSection,
  ICaseStudySection,
  IMembersSection,
  IStatsSection,
  IValuesSection,
} from 'generated/types/contentful';
import CTASection from './CTASection';
import CaseStudySection from './CaseStudySection';
import StatsSection from './StatsSection';
import MembersSection from './MembersSection';
import ValuesSection from './ValuesSection';


export type Section =
  | ICallToActionSection
  | ICaseStudySection
  | IMembersSection
  | IStatsSection
  | IValuesSection;

export interface ISectionsProps {
  sections: Section[];
}

export default function Sections({ sections }: { sections: Section[] }) {
  return sections ? (
    <>
      {sections.map((section, i) => {
        const typeId = section.sys.contentType.sys.id;
        switch (typeId) {
          case 'callToActionSection':
            return <CTASection key={i} {...(section as ICallToActionSection)} />;
          case 'caseStudySection':
            return <CaseStudySection key={i} {...(section as ICaseStudySection)} />;
          case 'statsSection':
            return <StatsSection key={i} {...(section as IStatsSection)} />;
          case 'membersSection':
            return <MembersSection key={i} {...(section as IMembersSection)} />;
          case 'valuesSection':
            return <ValuesSection key={i} {...(section as IValuesSection)} />;
          default:
            return assertNever(typeId);
        }
      })}
    </>
  ) : (
    <div />
  );
}
