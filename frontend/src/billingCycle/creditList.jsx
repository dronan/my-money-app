import React, { Component } from 'react'
import Grid from '../common/layout/grid'
import { Field } from 'redux-form'
import Input from '../common/form/input'
import { parseNumber, formatNumber } from '../common/form/formHelpers'

class CreditList extends Component {

    renderRows(){
        const list = this.props.list || []
        return list.map((item, index) => (
            <tr key={index}>
                <td><Field name={`credits[${index}].name`} component={Input}
                placeholder='Insert the name' readOnly={this.props.readOnly} /></td>
                <td><Field name={`credits[${index}].value`} component={Input}
                placeholder='Insert the value' readOnly={this.props.readOnly} 
                parse={parseNumber} format={formatNumber} /></td>
                <td>
                
                </td>
            </tr>
        ))
    }

    render(){
        return(
            <Grid cols={this.props.cols}>
                <fieldset>
                    <legend>Credits</legend>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </fieldset>
            </Grid>
        )
    }
}

export default CreditList