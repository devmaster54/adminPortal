import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../redux/reducers";
import { getData } from "../services";

let DevTools;
if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line global-require
  DevTools = require("./DevTools").default;
}

const configureStore = (initialState = {}) => {
  // Middleware and store enhancers
  const enhancers = [applyMiddleware(thunk)];

  if (process.env.NODE_ENV === "development") {
    // Enable DevTools only when rendering on client and during development.
    enhancers.push(
      typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : DevTools.instrument()
    );
  }
  const token = getData("token", { json: true });
  const email = getData("email");
  const phone = getData("phone");

  const auth = {
    isAuthenticated: token !== null,
    email: email ? email : "",
    phone: phone ? phone : "",
    token: token ? token.token : "",
    renewToken: token ? token.renewToken : "",
    expDate: token ? token.expDate : ""
  };
  const { notification } = initialState;
  const store = createStore(
    rootReducer,
    {
      ...initialState,
      auth: { ...auth }
    },
    compose(...enhancers)
  );

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./reducers", () => {
      // eslint-disable-next-line global-require
      const nextReducer = require("./reducers").default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

const store = configureStore();
export default store;
