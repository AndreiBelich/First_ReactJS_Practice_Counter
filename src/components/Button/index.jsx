import React from 'react';
import PropTypes from "prop-types";
import style from "./Button.module.scss";

const  Button = ({caption, handler}) => {
  return (
    <button className={style.button} onClick={handler}>{caption}</button>
  );
}

Button.defaultProps = {
  caption: "Click me",
  handler: () => {}
};

Button.propTypes = {
  caption: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired
};

export default Button;
