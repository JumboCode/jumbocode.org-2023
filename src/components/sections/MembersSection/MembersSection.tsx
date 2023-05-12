import React from 'react';
import { MembersSection as MembersSectionType } from 'generated/types/contentful';

import classNames from 'classnames/bind';
import styles from './MembersSection.module.scss';
import ContentfulImage from 'components/ContentfulImage';
const cx = classNames.bind(styles);

export default function MembersSection({
  fields: { members, heading },
}: MembersSectionType<'WITHOUT_UNRESOLVABLE_LINKS', string>) {
  return (
    <div className={cx('base')}>
      <h3>{heading}</h3>
      <div className={cx('preview-container')}>
        {members.map((m, i) => (
          m ? (
            // TODO: make images square and if bio exists make it appear on hover
            // `bio` is a field of clubMember
            <div className={cx('preview')} key={`${m.sys.id}-${i}`}>
              <div className={cx('image')}>
                <ContentfulImage fill asset={m.fields.picture} />
              </div>
              <div className={cx('name')}>
                {/* {role && <p className={cx('role')}>{role}:</p>} */}
                <p>
                  {m.fields.name}
                </p>
              </div>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
}
