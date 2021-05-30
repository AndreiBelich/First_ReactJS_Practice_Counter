import React from 'react'
import PropTypes from "prop-types";

function Button({caption, handler}) {
  return (
    <button onClick={handler}>{caption}</button>
  )
}

Button.defaultProps = {
  caption: "Click me",
  handler: () => {}
};

Button.propTypes = {
  caption: PropTypes.string.isRequired,
  handler: propTypes.func.isRequired
};

export default Button;
