'use client';

import React, { useCallback, useRef, useEffect } from 'react';
import useElementSize from '../../hooks/element-size';

import classNames from 'classnames';
import classNamesBinder from 'classnames/bind';
import styles from './FullWidthHeading.module.scss';
const cx = classNamesBinder.bind(styles);


export default function FullWidthHeading({
  children,
  level,
  className = undefined,
  ...props
}: {
  children: React.ReactNode;
  className?: Parameters<typeof classNames>[number];
  level: 1 | 2 | 3 | 4 | 5 | 6;
} & Omit<React.HTMLAttributes<HTMLHeadingElement>, 'className'>) {
  const HeadingEl = `h${level}` as const;

  const [blockRef, [blockWidth]] = useElementSize<HTMLHeadingElement>();
  const textRef = useRef<HTMLElement>(null);

  const update = useCallback(() => {
    if (blockWidth && blockRef.current && textRef.current) {
      const widthRatio = blockWidth / textRef.current.offsetWidth;
      const meaningfulDifference = Math.abs(Math.log(widthRatio)) > 0.01;
      // don’t update too much to avoid infinite loops
      if (meaningfulDifference) {
        const oldFontSize = parseFloat(getComputedStyle(blockRef.current).fontSize);
        blockRef.current.style.setProperty('--font-size', `${oldFontSize * widthRatio}px`);
      }
    }
  }, [blockRef, blockWidth]);

  update();
  useEffect(() => { document.fonts.ready.then(update); });

  return (
    <HeadingEl
      ref={blockRef}
      className={classNames(cx('base'), className)}
      {...props}
    >
      <span ref={textRef}>{children}</span>
    </HeadingEl>
  );
}
