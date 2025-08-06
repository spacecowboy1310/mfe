import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';

// Mount function to start the app
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath],
    });

    if (onNavigate) {
        history.listen(onNavigate);
    }

    ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

    return {
        onParentNavigate: ({ pathname: nextPathname }) => {
            const { pathname } = history.location;
            if (pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    };
};

// If we are in development and the app is running in isolation call mount immediately
if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#_auth-dev-root');
    if (el) {
        mount(el, { defaultHistory: createBrowserHistory() });
    }
}

// We are running through a container we should export the mount function
export { mount };