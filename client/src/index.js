import React from 'react'
import * as ReactDOMClient from 'react-dom/client';
import App from './App'
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import {reducers} from './reducers'

const container=document.getElementById('root');
const root=ReactDOMClient.createRoot(container)
const store=configureStore({reducer:reducers})

root.render(
<Provider store={store}>
<App/>
</Provider>);