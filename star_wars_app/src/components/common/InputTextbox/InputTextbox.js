import React from "react";

function InputTextbox(props) {
  return (
    <>
      <input
        className={props.style}
        type={props.type}
        placeholder={props.placeholder}
        required
        onChange={(e) => props.onChange(e.target.value)}
      />
    </>
  );
}

export default InputTextbox;
