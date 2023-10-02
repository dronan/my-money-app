import conbineReducers from 'redux';

const rootReducer = conbineReducers({
    dashboard: () => ({summary: {credit: 100, debt: 50}})
});

export default rootReducer;