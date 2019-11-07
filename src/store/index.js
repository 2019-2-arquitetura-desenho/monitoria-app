import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

import reducers from './reducers';


const composeEnhancer =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default function configureStore() {
    const store = createStore(
        persistedReducer,
        composeEnhancer(applyMiddleware(thunk))
    );

    const persistor = persistStore(store);

    return { store, persistor };
}
