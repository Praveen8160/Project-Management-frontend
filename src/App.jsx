import { Outlet } from "react-router";
import "./App.css";
import Header from "./Component/Header";
import { Provider } from "react-redux";
import store from "./store/Store.js";
function App() {
  return (
    <Provider store={store}>
      <Header></Header>
      <div className="mt-14 lg:mt-20">
        <Outlet></Outlet>
      </div>
    </Provider>
  );
}

export default App;
