import React from 'react';
import { IEBoardSection } from 'generated/types/contentful';

import classNames from 'classnames/bind';
import styles from './EBoard.module.scss';
import ContentfulImage from 'components/ContentfulImage';
const cx = classNames.bind(styles);

export default function CaseStudySection({
  fields: { boardMembers },
}: IEBoardSection) {
  return (
    <div className={cx('base')}>
      <h3>Get to know our E-Board</h3>
      <div className={cx('preview-container')}>
        {boardMembers.map((
          { fields: { clubMember: { fields: { name, picture } }, role } },
        ) => (
          // TODO: make images square and if bio exists make it appear on hover
          // `bio` is a field of clubMember
          <div className={cx('preview')} key={`${id}-${i}`}>
            <div className={cx('image')}>
              <ContentfulImage fill asset={picture} />
            </div>
            <div className={cx('name')}>
              {role && <p className={cx('role')}>{role}:</p>}
              <p>
                {name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
