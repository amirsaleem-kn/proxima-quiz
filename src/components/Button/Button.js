import React from "react";
import PropTypes from "prop-types"
import Styles from "./Button.module.scss";

const Button = (rest) => (
    <button {...rest} className={Styles.button}>{rest.children}</button>
)

Button.propTypes = {
    children: PropTypes.node.isRequired
}

export default Button;
