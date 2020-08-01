import React from "react";

const inventoryInput = ({ name, label, value, onChange }) => {
  return (
    <div class="form-group">
      <label class="marginleft" htmlFor={name}>
        {label}{" "}
      </label>
      <input
        value={value}
        onChange={onChange}
        type="number"
        class="form-control form-control-sm marginleft"
        id={name}
        name={name}
      />
    </div>
  );
};
export default inventoryInput;
