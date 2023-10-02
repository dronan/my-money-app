import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider 
} from 'react'
import App from './main/app'
import Reducers from './main/reducers'
const store = createStore(reducers)

ReactDOM.render(
<Provider store={store}>
    <App/>
</Provider>
, document.getElementById('app'))