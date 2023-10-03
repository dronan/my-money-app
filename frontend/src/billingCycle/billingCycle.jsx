import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ContentHeader from "../common/template/contentHeader";
import Content from "../common/template/content";

import Tabs from "../common/tab/tabs";
import TabsHeader from "../common/tab/tabsHeader";
import TabsContent from "../common/tab/tabsContent";
import TabHeader from "../common/tab/tabHeader";

import TabContent from "../common/tab/tabContent";

import { selectTab, showTabs } from "../common/tab/tabActions";

import { create } from "./billingCycleActions";

import List from "./billingCycleList";
import Form from "./billingCycleForm";

class BillingCycle extends Component {

    componentWillMount() { 
        this.props.selectTab('tabList');
        this.props.showTabs('tabList', 'tabCreate');
    }

    render() {
        return (
            <div>
                <ContentHeader title="Ciclos de Pagamentos" small="Cadastro" />
                <Content>
                    <Tabs>
                        <TabsHeader>
                            <TabHeader label="List" icon="bars" target="tabList" />
                            <TabHeader label="Add" icon="plus" target="tabCreate" />
                            <TabHeader label="Change" icon="pencil" target="tabUpdate" />
                            <TabHeader label="Delete" icon="trash-o" target="tabDelete" />
                            <TabHeader label="Payments" icon="usd" target="tabPayment" />
                            <TabHeader label="Resume" icon="usd" target="tabSummary" />
                        </TabsHeader>
                        <TabsContent>
                            <TabContent id="tabList">
                                <List />
                            </TabContent>
                            <TabContent id="tabCreate">
                                <Form onSubmit={this.props.create} />
                            </TabContent>
                            <TabContent id="tabUpdate"><h1>Alterar</h1></TabContent>
                            <TabContent id="tabDelete"><h1>Excluir</h1></TabContent>
                            <TabContent id="tabPayment"><h1>Pagamentos</h1></TabContent>
                            <TabContent id="tabSummary"><h1>Resumo</h1></TabContent>
                        </TabsContent>
                    </Tabs>
                </Content>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ selectTab, showTabs, create }, dispatch);
export default connect(null, mapDispatchToProps)(BillingCycle); 