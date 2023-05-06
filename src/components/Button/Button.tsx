import React from "react";
import "./Button.scss";
import PropTypes from "prop-types"

export interface ButtonProps {
  label: string;
}

const Button = ({ label }: ButtonProps) => {
  return <button onClick={() => {
    console.log('hello from web component!')
  }}>{label}</button>;
};

Button.propTypes = {
  label: PropTypes.string.isRequired
}

export default Button;
