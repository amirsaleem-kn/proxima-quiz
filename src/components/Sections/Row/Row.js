import React from "react";
import Styles from "./Row.module.scss";

export default ({ children }) => (
    <div className={Styles.row} >{children}</div>
)
