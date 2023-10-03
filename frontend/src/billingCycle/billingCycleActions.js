import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm } from 'redux-form'
import { selectTab, showTabs } from '../common/tab/tabActions'

const BASE_URL = 'http://localhost:3003/api'

export function getList() {
    const request = axios.get(`${BASE_URL}/billingCycles`)
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }
}

export function create(values) {
    
    return dispatch => {
        values.month = values.month ? parseInt(values.month, 10) : null;
        values.year = values.year ? parseInt(values.year, 10) : null;
        values.debts = []
        values.credits = []
    
        axios.post(`${BASE_URL}/billingCycles`, values).then(resp => {
            toastr.success('Success', 'Operation successfully executed.')
            
            dispatch([
                resetForm('billingCycleForm'),
                getList(),
                selectTab('tabList'),
                showTabs('tabList', 'tabCreate')
            ])
        }).catch(e => {
            e.response.data.errors.forEach(error => 
                toastr.error('Error', error.reason)
            )
        })     
    }
}