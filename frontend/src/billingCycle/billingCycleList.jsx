import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getList } from "./billingCycleActions";

class BillingCycleList extends Component {

    componentWillMount() {
        this.props.getList();
    }

    renderRows() {
        const list = this.props.list || [];
        return list.map(bc => (
            <tr key={bc._id}>
                <td>{bc.name}</td>
                <td>{bc.month}</td>
                <td>{bc.year}</td>
            </tr>
        ));
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Month</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderRows() }
                    </tbody>
                </table>
            </div>
        );
    }
}

// map the state to the props of this component
const mapStateToProps = state => ({ list: state.billingCycle.list });

// maps the getList action creator to the component's props
const mapDispatchToProps = dispatch => bindActionCreators({ getList }, dispatch);

// connect the component to the redux store
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleList); 