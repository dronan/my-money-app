import React from "react";
import Grid from "../layout/grid";

export default ({ input, label, readOnly, options, cols, placeholder }) => (
    <Grid cols={cols ? cols : ''}>
        {label && <label htmlFor={input.name}>{label}</label>}
        <select
          {...input}
          className="form-control"
          placeholder={placeholder}
          readOnly={readOnly}
          value={input.value || ''} // Garanta que isso não seja undefined ou null
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
    </Grid>
  );
  