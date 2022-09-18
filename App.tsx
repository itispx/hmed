import React from 'react';

// For React Navigation 6x
import 'react-native-gesture-handler';

// Redux
import {Provider} from 'react-redux';

import store from './src/redux-store';

// Display
import Toast from 'react-native-toast-message';
import Layout from './src/Layout';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Layout />
      <Toast />
    </Provider>
  );
};

export default App;
