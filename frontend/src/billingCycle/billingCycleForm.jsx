import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

class BillingCycleForm extends Component {
  render() {

    // handleSubmit is a function provided by redux-form
    const { handleSubmit } = this.props;

    return (
      <form role="form" onSubmit={handleSubmit}>
        <div className="box-body">
            <Field name="name" component="input" />
            <Field name="month" component="input" type="number" />
            <Field name="year" component="input" type="number" />
        </div>
        <div className="box-footer">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm( { form: 'billingCycleForm' } )(BillingCycleForm);