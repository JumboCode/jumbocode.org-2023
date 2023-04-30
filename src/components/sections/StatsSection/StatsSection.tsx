import React from 'react';
import classNames from 'classnames/bind';
import { IStatsSection } from 'generated/types/contentful';
import styles from './StatsSection.module.scss';
const cx = classNames.bind(styles);

export default function StatsSection({
  fields: { catchphrase, statistics },
}: IStatsSection) {
  return (
    <div className={cx('base')}>
      <h3>{catchphrase}</h3>
      <div className={cx('statistics')}>
        {statistics.map(({ fields: { statistic, description } }) => (
          <div key={statistic} className={cx('statistic')}>
            <span>{statistic}</span>
            <div className={cx('description')}>{description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
