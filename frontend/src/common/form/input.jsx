import React from "react";

const Input = props => (
        <input
            {...props.input}
            className="form-control"
            placeholder={props.placeholder}
            readOnly={props.readOnly}
            type={props.type}
        />
    );

const InputMoney = props => {
        const handleBlur = (e) => {
          const value = e.target.value;
          if (value) {
            props.input.onBlur(parseFloat(value).toFixed(2));   
          } else {
            props.input.onBlur();
          }
        };
      
        return (
          <input
                {...props.input}
                className="form-control"
                placeholder={props.placeholder}
                readOnly={props.readOnly}
                type={props.type}
                onBlur={handleBlur} 
            />
        );
      };
      
export { Input, InputMoney };