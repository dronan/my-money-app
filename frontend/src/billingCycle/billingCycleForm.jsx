import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { init } from "./billingCycleActions";

import labelAndInput from "../common/form/labelAndInput";
import CreditList from "./creditList";
class BillingCycleForm extends Component {
  render() {

    // handleSubmit is a function provided by redux-form
    const { handleSubmit, readOnly } = this.props;

    return (
      <form role="form" onSubmit={handleSubmit}>
        <div className="box-body">
            <Field name="name" component={labelAndInput} readOnly={readOnly}
              label="Name" cols="12 4" placeholder="Enter the name"
            />
            <Field name="month" component={labelAndInput}  readOnly={readOnly} type="number"
              label="Month" cols="12 4" placeholder="Enter the month"
            />
            <Field name="year" component={labelAndInput}  readOnly={readOnly} type="number"
              label="Year" cols="12 4" placeholder="Enter the year"
            />
            <CreditList cols="12 6" readOnly={readOnly} />
        </div>
        <div className="box-footer">
          <button type="submit" className={`btn btn-${this.props.submitClass}`}>
            {this.props.submitLabel}
          </button>
          <button type="submit" className="btn btn-default" onClick={this.props.init}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

BillingCycleForm = reduxForm({ form: "billingCycleForm" })(BillingCycleForm);
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch);
export default connect(null, mapDispatchToProps)(BillingCycleForm);