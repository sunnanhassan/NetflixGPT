import React from "react";
import Body from "./components/Body";
import "./index.css";
import { Provider } from "react-redux";
import appStore from "./utils/appstore.js";
const App = () => {
  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
  );
};

export default App;
