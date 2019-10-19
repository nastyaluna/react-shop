import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

export default (initialState = {}) => {
  let middleware = applyMiddleware(logger, thunk);

  if (process.env.NODE_ENV !== 'production') {
    const __REDUX_DEVTOOLS_EXTENSION__ = window.__REDUX_DEVTOOLS_EXTENSION__;
    if (typeof __REDUX_DEVTOOLS_EXTENSION__ === 'function') {
      middleware = compose(middleware, __REDUX_DEVTOOLS_EXTENSION__());
    }
  }

  const store = createStore(reducers, initialState, middleware);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers').default);
    });
  }

  return store;
};