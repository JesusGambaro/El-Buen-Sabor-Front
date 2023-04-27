import Home from "@app/Home/Home";
import ErrorBoundary from "@app/ErrorBoundary/ErrorBoundary";
function App() {
  return (
    <ErrorBoundary>
        <div className="App">
          <Home />
        </div>
    </ErrorBoundary>
  );
}

export default App;
