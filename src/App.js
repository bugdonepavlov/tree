import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Root from './containers/Root';

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

export default App;
