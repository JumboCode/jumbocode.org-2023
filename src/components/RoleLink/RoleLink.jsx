import React from "react";

import classNames from "classnames/bind";
import styles from "./RoleLink.module.scss";
const cx = classNames.bind(styles);

export default function RoleLink(children) {
    
    return (
        <p>{children.role}</p>
    )
}