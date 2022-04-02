import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { combineReducers, createStore } from 'redux';
import {BrowserRouter} from 'react-router-dom';
import ProductsProvider from './context/products-context';

import './index.css';
import App from './App';
import configureProductStore from "./hooks-store/products-store";
// import productReducer from './store/reducers/products';
//
// const rootReducer = combineReducers({
//   shop: productReducer
// });
//
// const store = createStore(rootReducer);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
configureProductStore();
root.render(
    <ProductsProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </ProductsProvider>)
