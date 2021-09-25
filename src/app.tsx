import React from 'react';
import { Provider } from 'react-redux';
import models from "./dva/models";
import dva from "./dva/index";
import './app.less';

export const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});

const store = dvaApp.getStore();
store.dispatch({
  type: 'app/getSysData'
})

const App = (props) => {
  return (
    <Provider store={store} >
      {props.children}
    </Provider>
  )
}
export default App;

