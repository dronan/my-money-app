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
        >
          <option value="" disabled selected>
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
  