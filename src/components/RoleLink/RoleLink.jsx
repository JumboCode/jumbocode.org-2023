import React from "react";

import classNames from "classnames/bind";
import styles from "./RoleLink.module.scss";
const cx = classNames.bind(styles);

import { BsArrowRight } from 'react-icons/bs'

export default function RoleLink(children) {
    
    return (
        <div className={classNames(cx("container"))}>
            <p>{children.role}</p>
            <BsArrowRight />
            
        </div>
    )
}