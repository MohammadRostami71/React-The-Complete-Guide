import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import {AAuthContextProvider} from "./store/auth-context";

ReactDOM.render(
    <AAuthContextProvider><App/></AAuthContextProvider>
    , document.getElementById('root'));
