import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'react-redux';
import store from './store';
import "./index.css";

// I"m unsure how or what this code was in here for but it
// was forcing the browser to use a "Cached" version of the react app
// for the life of me I could not get any of my API calls to work or be verified
// speaking with Zack we were seeing different results on the Homepage test paths that I created
// per online reading this was the recommended fix to stop allowing React to load from the cache;
// #########  #########  #########
// import registerServiceWorker from "./registerServiceWorker";
// registerServiceWorker();
// #########  #########  #########

import { unregister } from './registerServiceWorker';
unregister();

ReactDOM.render( 
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById("root")
  );

  