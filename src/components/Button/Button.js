import React from "react";
// import './Button.css'
// import 'material-design-lite/src/button/button'
import PropTypes from "prop-types";

import { IconButton } from "@material-ui/core";

const GenericButton = ({
  label,
  invoke,
  context,
  classes,
  icon,
  type,
  color,
}) => (
  <IconButton
    disabled={!invoke}
    variant="raised"
    color={color || "primary"}
    aria-label={label}
    className={classes}
    type={type || "button"}
    onClick={() => (type ? true : invoke(context))}
  >
    {icon}
  </IconButton>
);

GenericButton.propTypes = {
  invoke: PropTypes.func,
  context: PropTypes.any,
  classes: PropTypes.string,
  icon: PropTypes.node,
  type: PropTypes.string,
  color: PropTypes.string,
};

export default GenericButton;
