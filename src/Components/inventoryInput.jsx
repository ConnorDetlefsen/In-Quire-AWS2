import React from "react";

const inventoryInput = ({ name, label, value, onChange }) => {
  return (
    <div className="form-group">
      <label className="inv-label" htmlFor={name}>
        {label}{" "}
      </label>
      <input
        value={value}
        onChange={onChange}
        type="number"
        className="inv-input"
        id={name}
        name={name}
      />
    </div>
  );
};
export default inventoryInput;
