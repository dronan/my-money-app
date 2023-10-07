import React, { Component } from "react";
import { reduxForm, Field, formValueSelector } from "redux-form";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { change } from 'redux-form';

import { init } from "./billingCycleActions";

import labelAndInput from "../common/form/labelAndInput";
import select from "../common/form/select";
import ItemList from "./itemList";
import { parseNumber, formatNumber } from '../common/form/formHelpers'
import Summary from "./summary";

class BillingCycleForm extends Component {

  calculateSummary() {
    const sum = (t, v) => t + v || 0;
    return {
        sumOfCredits: this.props.credits.map(c => +c.value || 0).reduce(sum, 0),
        sumOfDebts: this.props.debts.map(d => +d.value || 0).reduce(sum, 0)
    }
  }

  render() {

    // handleSubmit is a function provided by redux-form
    const { handleSubmit, readOnly, credits, debts } = this.props;
    const { sumOfCredits, sumOfDebts } = this.calculateSummary();
    // Generate array of years for example from 1970 to 2050
    const years = Array.from({ length: 81 }, (_, i) => 1970 + i);

    // Create options for the year selector
    const yearOptions = years.map(year => ({ value: year, label: year.toString() }));

    return (
      <form role="form" onSubmit={handleSubmit}>
        <div className="box-body">
            <Field name="name" component={labelAndInput} readOnly={readOnly}
              label="Name" cols="12 4" placeholder="Enter the name" initialValue=""
            />
            <Field name="month" component={select} readOnly={readOnly}
              label="Month" cols="12 4" placeholder="Select the month"
              parse={parseNumber} format={formatNumber}
              options={[
                { value: 1, label: 'January' },
                { value: 2, label: 'February' },
                { value: 3, label: 'March' },
                { value: 4, label: 'April' },
                { value: 5, label: 'May' },
                { value: 6, label: 'June' },
                { value: 7, label: 'July' },
                { value: 8, label: 'August' },
                { value: 9, label: 'September' },
                { value: 10, label: 'October' },
                { value: 11, label: 'November' },
                { value: 12, label: 'December' }
              ]} />
              <Field 
                name="year" component={select} readOnly={readOnly}
                label="Year" cols="12 4" 
                placeholder="Select the year" 
                options={yearOptions} 
                parse={parseNumber} format={formatNumber}
              />
            <Summary credit={sumOfCredits} debt={sumOfDebts} />
            <ItemList list={credits} field='credits' legend='Credits' cols="12 6" readOnly={readOnly} />
            <ItemList list={debts} field='debts' legend='Debts' cols="12 6" readOnly={readOnly} showStatus={true} />
            
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

BillingCycleForm = reduxForm({ form: "billingCycleForm", destroyOnUnmount: false })(BillingCycleForm);
const selector = formValueSelector("billingCycleForm");
const mapStateToProps = state => ({
  credits: selector(state, "credits"),
  debts: selector(state, "debts")
});
const mapDispatchToProps = dispatch => bindActionCreators({ init, change }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm);