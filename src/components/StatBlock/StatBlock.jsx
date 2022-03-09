import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './StatBlock.module.scss';
const cx = classNames.bind(styles);

//for incrementation
const easeOutQuad = t => t * (2 - t); // easing function
const frameDuration = 1000 / 60;

//based on James Shakespeare's implementation
const IncrementToNum = ( { children, duration = 8000 } ) => {
    const countTo = parseInt(children, 10);
    const [ count, setCount ] = useState(0);
    
    useEffect ( () => {
        let frame = 0;
        const totalFrames = Math.round(duration / frameDuration);
        
        const counter = setInterval ( () => {
            frame++;
            const progress = easeOutQuad(frame / totalFrames );
            setCount(countTo * progress);
            
            if (frame === totalFrames) {
                clearInterval(counter);
            }
        })
    }, [] );
    
    return Math.floor(count);
}

export default function StatBlock({ number, char, description }) {
  
  let countNumber = 0;
  
  return (
    <div className={cx('base')}>
      <h1 className={cx('number')}><IncrementToNum>{number}</IncrementToNum>{char}</h1>
      <p className={cx('description')}>{description}</p>
    </div>
  );
}
StatBlock.propTypes = {
  number: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
