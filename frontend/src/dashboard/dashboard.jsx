import React, { Component } from "react";

import ContentHeader from "../common/template/contentHeader";
import Content from "../common/template/content";
import ValueBox from "../common/widget/valueBox";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <ContentHeader title="Dashboard" subtitle="V1.0" />
                <Content>
                    <ValueBox cols="12 4" color="green" icon="bank" value="€ 10" text="Total Credits" />
                    <ValueBox cols="12 4" color="red" icon="credit-card" value="€ 10" text="Total Debts" />
                    <ValueBox cols="12 4" color="blue" icon="money" value="€ 0" text="Consolidated" />
                </Content>
            </div>
        );
    }
}

export default Dashboard;