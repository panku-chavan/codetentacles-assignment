import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import List from "./pages/List";
import Stepperform from "./pages/Stepperform";
import Product from "./pages/sales/Listproduct";
import Addproduct from "./pages/sales/Addproduct";
import { useSelector } from "react-redux";
import Loader from "./component/Loader/Loader";
import { ToastContainer } from "react-toastify";

function App() {
  const role = useSelector((state) => state.auth.role)?.toLowerCase();
  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.loader.isLoading);

  // Determine default route based on role
  const getDefaultRoute = () => {
    if (role === "admin") return "/List";
    if (role === "user") return "/Product";
    return "/"; // Default to login if role is unknown
  };

  return (
    <div className="App">
      <Loader isLoading={isLoading} />
      <Router>
        <Routes>
          {/* Public Route: Login (when no token is available) */}
          {!token ? (
            <>
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              {/* Admin Routes */}
              {role === "admin" && (
                <>
                  <Route path="/List" element={<List />} />
                  <Route path="/Stepperform" element={<Stepperform />} />
                </>
              )}

              {/* User Routes */}
              {role === "user" && (
                <>
                  <Route path="/Product" element={<Product />} />
                  <Route path="/Add-product" element={<Addproduct />} />
                </>
              )}

              {/* Default Redirection based on Role */}
              <Route
                path="/"
                element={<Navigate to={getDefaultRoute()} replace />}
              />
              <Route
                path="*"
                element={<Navigate to={getDefaultRoute()} replace />}
              />
            </>
          )}
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
