import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { selectTab, showTabs } from '../common/tab/tabActions'

const BASE_URL = 'http://localhost:3003/api'

const INITIAL_VALUES = {credits: [{}], debts: [{}]}

export function getList() {
    const request = axios.get(`${BASE_URL}/billingCycles`)
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }
}

export function create(values) {
    return submit(values, 'post')
}

export function update(values) {
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete')
}

export function submit(values, method) {
    return dispatch => {
        const id = values._id ? values._id : ''
        
        const _values = values;
        
        _values.debts = values.debts && values.debts[0] && Object.keys(values.debts[0]).length === 0 ? [] : values.debts;
        _values.credits = values.credits && values.credits[0] && Object.keys(values.credits[0]).length === 0 ? [] : values.credits;

        _values.debts.forEach(debt => {
                debt.value = Number(debt.value);
        })

        _values.credits.forEach(credit => {
            credit.value = Number(credit.value);
        })

        axios[method](`${BASE_URL}/billingCycles/${id}`, _values)
        .then( () => {
            toastr.success('Success', 'Operation successfully executed.')
            dispatch(init())
        }).catch(e => {
            e.response.data.errors.forEach(error => toastr.error('Error', error.reason))
            listValues(values);
        })     
    }
}

export function listValues(billingCycle) {
    if (!billingCycle.credits || billingCycle.credits.length === 0) {
        billingCycle.credits = INITIAL_VALUES.credits;
    } else {
        billingCycle.credits.forEach(credit => {
            credit.value = parseFloat(credit.value).toFixed(2);
        })
    }

    if (!billingCycle.debts || billingCycle.debts.length === 0) {
        billingCycle.debts = INITIAL_VALUES.debts;
    } else {
        billingCycle.debts.forEach(debt => {
            debt.value = parseFloat(debt.value).toFixed(2);
        })
    }
}

export function showUpdate(billingCycle) {

    listValues(billingCycle);

    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('billingCycleForm', billingCycle) // init the form with billingCycle data
    ]
}

export function showDelete(billingCycle) {
    listValues(billingCycle);

    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('billingCycleForm', billingCycle) // init the form with billingCycle data
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('billingCycleForm', INITIAL_VALUES)
    ]
}