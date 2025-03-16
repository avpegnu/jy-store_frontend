import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Signup from "../components/Auth/Signup.jsx";
import Login from "../components/Auth/Login.jsx";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="" />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="" />} />
    </Routes>
  </Router>
);

export default AppRouter;
