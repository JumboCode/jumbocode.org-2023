import React from 'react';
import classNames from 'classnames/bind';
import { StatsSection as StatsSectionType } from 'generated/types/contentful';
import styles from './StatsSection.module.scss';
const cx = classNames.bind(styles);

export default function StatsSection({
  fields: { heading, statistics },
}: StatsSectionType<'WITHOUT_UNRESOLVABLE_LINKS', string>) {
  return (
    <div className={cx('base')}>
      <h2>{heading}</h2>
      <div className={cx('statistics')}>
        {statistics.map((s) => (s ? (
          <div key={s.sys.id} className={cx('statistic')}>
            <span>{s.fields.statistic}</span>
            <div className={cx('description')}>{s.fields.description}</div>
          </div>
        ) : null))}
      </div>
    </div>
  );
}
