import React from 'react';
import { Provider } from 'react-redux';
import models from "./dva/models";
import dva from "./dva/index";
import './app.less';

const dvaApp = dva.createApp( {
  initialState: {},
  models: models,
} );  
const store = dvaApp.getStore();

const App = (props) => {
  return (
    <Provider store={store} >
      {props.children}
    </Provider>
  )
}
export default App;

