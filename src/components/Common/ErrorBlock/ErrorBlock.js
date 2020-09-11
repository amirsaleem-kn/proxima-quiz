import React from "react";
import Style from "./ErrorBlock.module.scss";

export default ({ text }) => (
    <div className={Style.errorBlock}>
        {text}
    </div>
)
