import React from "react";
import Style from "./Input.module.scss";

export default (rest) => (
    <input {...rest} className={Style.input} />
)

export const JumboInput = (rest) => (
    <input {...rest} className={Style.jumboInput} />
)