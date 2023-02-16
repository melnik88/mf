function loadComponent(scope, module) {
    return async () => {
        // Initializes the share scope. This fills it with known provided modules from this build and all remotes
        await __webpack_init_sharing__('default');
        const container = window[scope]; // or get the container somewhere else
        // Initialize the container, it may provide shared modules
        await container.init(__webpack_share_scopes__.default);
        const factory = await window[scope].get(module);
        const Module = factory();
        return Module;
    };
}


import { combineReducers, createStore, compose } from 'redux';
import React from 'react';

const initialState = {
    appName: 'host',
};

const hostReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const staticReducers = {
    host: hostReducer,
};

/**
 * Cf. redux docs:
 * https://redux.js.org/recipes/code-splitting/#defining-an-injectreducer-function
 */
export default function configureStore(initialState) {
    //TODO нужно для работы девтулзов
    const composeEnhancers =
        typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
            : compose;

    const enhancer = composeEnhancers();
    const store = createStore(createReducer(), enhancer);

    store.asyncReducers = {};

    store.injectReducer = (key, asyncReducer) => {
        store.asyncReducers[key] = asyncReducer;
        store.replaceReducer(createReducer(store.asyncReducers));
    };

    return store;
}

function createReducer(asyncReducers) {
    return combineReducers({
        ...staticReducers,
        ...asyncReducers,
    });
}

export const store = configureStore();