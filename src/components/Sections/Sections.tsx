import React from 'react';
import { assertNever } from 'utils/type-utils';

import {
  ICallToActionSection,
  ICaseStudySection,
  IEBoardSection,
  ISections,
  IStatsSection,
  IValuesSection,
} from 'generated/types/contentful';
import CTASection from './CTASection';
import CaseStudySection from './CaseStudySection';
import StatsSection from './StatsSection';
import EBoardSection from './EBoardSection';
import ValuesSection from './ValuesSection';

export interface ISectionsProps {
  sections: ISections;
}

export default function Sections({ sections: { fields } }: ISectionsProps) {
  const { sections } = fields;
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
          case 'eBoardSection':
            return <EBoardSection key={i} {...(section as IEBoardSection)} />;
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
