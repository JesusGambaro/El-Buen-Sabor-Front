import Home from "@app/Home/Home";
import ErrorBoundary from "@app/ErrorBoundary/ErrorBoundary";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <div className="App">
          <Home />
        </div>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
