import React from 'react';
import FullWidthHeading from 'components/FullWidthHeading';
import Balancer from 'react-wrap-balancer';

import parse, { domToReact, Element } from 'html-react-parser';

import classNames from 'classnames/bind';
import styles from './Hero.module.scss';
const cx = classNames.bind(styles);


type ReplaceFunc = NonNullable<Parameters<typeof parse>[1]>['replace'];
const balanceParagraphReplacer: ReplaceFunc = (node) => {
  if (node instanceof Element && node.name === 'p') {
    return <p><Balancer>{domToReact(node.children)}</Balancer></p>;
  }
  return undefined;
};


export default function Hero({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) {
  return (
    <div className={cx('base')}>
      <div className={cx('content')}>
        <FullWidthHeading level={1}>{parse(heading)}</FullWidthHeading>
        {parse(subheading, { replace: balanceParagraphReplacer })}
      </div>
    </div>
  );
}
