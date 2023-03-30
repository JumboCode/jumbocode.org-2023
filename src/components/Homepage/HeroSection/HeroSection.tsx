import classNames from 'classnames/bind';
import { IHeroSection } from 'generated/types/contentful';
import styles from './HeroSection.module.scss';
const cx = classNames.bind(styles);

export default function HeroSection({
  fields: { catchphrase, statistics },
}: IHeroSection) {
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
