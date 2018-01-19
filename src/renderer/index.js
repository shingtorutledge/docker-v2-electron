import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from '../common/pages/main';
import Reducers from '../common/reducers/reducers';
import { readAndMergeDataFile } from '../common/datastore/controller';

const loadData = {
  images: [],
  url: '',
  username: '',
  password: '',
  timestamp: (new Date()).toLocaleString(),
  showHidden: false,
};
window.onload = () => {
  readAndMergeDataFile(loadData).then((data) => {
    const store = createStore(Reducers, data, applyMiddleware(thunkMiddleware));
    ReactDOM.render(
      <MuiThemeProvider>
        <Provider store={store}>
          <Main />
        </Provider>
      </MuiThemeProvider>,
      document.getElementById('app'),
    );
  });
};
