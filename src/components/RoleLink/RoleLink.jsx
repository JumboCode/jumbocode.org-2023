import React from "react";

import classNames from "classnames/bind";
import styles from "./RoleLink.module.scss";
const cx = classNames.bind(styles);

import Link from "next/link";
import { BsArrowRight } from 'react-icons/bs';

export default function RoleLink(children) {
    
    const path = "/apply/" + children.role.toLowerCase(); 
    
    return (
        <Link href={path}>
            <div className={classNames(cx("container"))}>
                <h4>{children.role}</h4>
                <BsArrowRight className={classNames(cx("arrow"))} />
                </div>
        </Link>
    )
}