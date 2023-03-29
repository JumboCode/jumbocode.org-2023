import classNames from 'classnames/bind';
import client from 'content';
import { IHeroSectionFields } from 'generated/types/contentful';
import { notFound } from 'next/navigation';
import styles from './HeroSection.module.scss';
const cx = classNames.bind(styles);

export default async function HeroSection() {
  const entries = await client.getEntries<IHeroSectionFields>({
    limit: 1,
    order: 'sys.createdAt',
    content_type: 'heroSection',
    include: 10,
  });

  const heroSection = entries.items[0] ?? notFound();
  const { fields } = heroSection;

  return (
    <div className={cx('base')}>
      <h3>{fields.catchphrase}</h3>
      <div className={cx('statistics')}>
        {fields.statistics.map(({ fields: { statistic, description } }) => (
          <div key={statistic} className={cx('statistic')}>
            <span>{statistic}</span>
            <div className={cx('description')}>{description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
