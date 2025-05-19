import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PatientProfile from "./pages/PatientProfile";
import { AuthProvider, useAuth } from "./auth/AuthContext";

// PrivateRoute component
const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Login />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/patient/:id"
            element={<PrivateRoute element={<PatientProfile />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;