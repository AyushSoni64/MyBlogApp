import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Router from "./routes/Router";
import { ToastProvider } from "./context/ToastContext";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={true}
        />
        <BrowserRouter>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
