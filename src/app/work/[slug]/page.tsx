import React from 'react';
import { notFound } from 'next/navigation';

import client from 'content';
import type { CaseStudySkeleton } from 'generated/types/contentful';
import ContentfulImage from 'components/ContentfulImage';

import classNames from 'classnames/bind';
import styles from './page.module.scss';
const cx = classNames.bind(styles);

interface ICaseStudyPageParams {
  params: {
    slug: string;
  };
}

export default async function CaseStudy({ params }: ICaseStudyPageParams) {
  const rolesFound = await client.withoutUnresolvableLinks.getEntries<CaseStudySkeleton>({
    limit: 1,
    content_type: 'caseStudy',
    include: 10,
    'fields.slug': params.slug,
  });
  const { fields } = rolesFound.items[0] ?? notFound();

  return (
    <div className={cx('base')}>
      <div className={cx('header-image')}>
        <ContentfulImage fill asset={fields.headerImage} />
      </div>
      <div className={cx('content')}>
        <h1>{fields.projectName}</h1>
        <p>{fields.previewDescription}</p>
        <div className={cx('main-image')}>
          <ContentfulImage fill asset={fields.mainImage} />
        </div>
        <p>{fields.mainDescription}</p>
        <div className={cx('nonprofit-bio')}>
          <div className={cx('nonprofit-image')}>
            <ContentfulImage asset={fields.nonprofitLogo} />
          </div>
          <p>{fields.nonprofitDescription}</p>
        </div>
        {fields.teamMembers && (
          <div className={cx('team-members')}>
            <h2>Created by</h2>
            <div className={cx('list')}>
              {fields.teamMembers.map((memberInRole) => (
                (memberInRole && memberInRole.fields.member)
                  ? (
                    <div key={memberInRole.sys.id} className={cx('member')}>
                      <div className={cx('image')}>
                        {memberInRole.fields.member.fields.picture && (
                          <ContentfulImage fill asset={memberInRole.fields.member.fields.picture} />
                        )}
                      </div>
                      <div className={cx('info')}>
                        <p>{memberInRole.fields.member.fields.name}</p>
                        <p>{memberInRole.fields.roleText}</p>
                      </div>
                    </div>
                  )
                  : null
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const caseStudies = await client.getEntries<CaseStudySkeleton>({
    limit: 1000,
    content_type: 'caseStudy',
    include: 10,
  });

  return caseStudies.items.map((caseStudy) => ({
    slug: caseStudy.fields.slug,
  }));
}
