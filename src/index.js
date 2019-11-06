import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import configureStore  from './store';
import App from './routes';

import './index.css';


const { store, persistor } = configureStore();

ReactDOM.render(
    <Provider store={ store }>
        <PersistGate loading={ null } persistor={ persistor }>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
