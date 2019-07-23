import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './components/App/App';
import { SpiritedContextProvider } from './SpiritedContext'
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <SpiritedContextProvider>
            <App />
        </SpiritedContextProvider>
    </BrowserRouter>,
    document.getElementById('root')
  );
