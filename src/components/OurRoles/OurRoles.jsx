import React from "react";

import classNames from "classnames/bind";
import styles from "./OurRoles.module.scss";
const cx = classNames.bind(styles);

import RoleLink from "../RoleLink"

export default function OurRoles() {
    
    return (
        <div className={classNames(cx("container"))}>
            <h2>Our Roles</h2>
            <hr className={classNames(cx("divider"))}/> {/* this should fill the full container*/}
            <RoleLink role="Developer"/>
            <RoleLink role="Designer"/>
            <RoleLink role="Project Manager"/>
            <RoleLink role="Tech Lead"/>
            <RoleLink role="Board Member"/>
        </div>
    )
}