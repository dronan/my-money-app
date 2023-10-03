import React, { Component } from 'react'
import Grid from '../common/layout/grid'
import { Field } from 'redux-form'
import Input from '../common/form/input'

class CreditList extends Component {

    renderRows(){
        return(
            <tr>
                <td><Field name="credits[0].name" component={Input}
                placeholder='Insert the name' readOnly={this.props.readOnly} /></td>
                <td><Field name="credits[0].value" component={Input}
                placeholder='Insert the value' readOnly={this.props.readOnly} /></td>
                <td>
                
                </td>
            </tr>
        )
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