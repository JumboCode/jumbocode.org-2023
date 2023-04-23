import React from 'react';
import {
  ICallToActionSection,
  ICaseStudySection,
  ISections,
  IStatsSection,
} from 'generated/types/contentful';
import CallToAction from './CallToAction';
import CaseStudySection from './CaseStudySection';
import StatsSection from './StatsSection';

export interface ISectionsProps {
  sections: ISections;
}

export default function Sections({ sections: { fields } }: ISectionsProps) {
  const { sections } = fields;
  return sections ? (
    <>
      {sections.map((section, i) => {
        switch (section.sys.contentType.sys.id) {
          case 'callToActionSection':
            return <CallToAction key={i} {...(section as ICallToActionSection)} />;
          case 'caseStudySection':
            return <CaseStudySection key={i} {...(section as ICaseStudySection)} />;
          case 'statsSection':
            return <StatsSection key={i} {...(section as IStatsSection)} />;
          default:
            return null;
        }
      })}
    </>
  ) : (
    <div />
  );
}
