import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//import registerServiceWorker from "./registerServiceWorker";
import { Provider } from 'react-redux';
import store from './store';
import "./index.css";
import { unregister } from './registerServiceWorker';

unregister();

ReactDOM.render( 
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById("root")
  );

  