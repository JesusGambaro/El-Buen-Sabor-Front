import HomeLanding from "@components/Home/Home";
import ErrorBoundary from "@components/ErrorBoundary/ErrorBoundary";
import { Provider } from 'react-redux';
import store from './redux/store';
function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <div className="App">
          <HomeLanding />
        </div>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
