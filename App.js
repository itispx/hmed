// For React Navigation 6x
import "react-native-gesture-handler";

// Redux
import { Provider } from "react-redux";

import store from "./src/redux-store";

// Display
import Layout from "./src/Layout";

export default function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}
