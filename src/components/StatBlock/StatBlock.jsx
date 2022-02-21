import React from "react";

import classNames from 'classnames/bind';
import styles from './StatBlock.module.scss';
const cx = classNames.bind(styles);

export default function StatBlock(props) {
    return (
        <div className={classNames(cx('base'))}>
            <p className={classNames(cx('number'))}>{props.number}</p>
            <p>{props.description}</p>
        </div>
    )
}