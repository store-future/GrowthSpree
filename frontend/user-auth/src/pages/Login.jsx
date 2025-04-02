import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getAccessToken, refreshAccessToken, verifyRefreshToken } from "../services/auth";
import { API_BASE_URL } from "../services/auth";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const checkExistingTokens = async () => {
      const accessToken = getAccessToken();
      if (accessToken) return setMessage("Already logged in!");

      const refreshedToken = await refreshAccessToken();
      if (refreshedToken) setMessage("Token refreshed. You are logged in!");
    };

    checkExistingTokens();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const existingRefreshToken = localStorage.getItem("refresh_token");

    if (existingRefreshToken) {
      const isValid = await verifyRefreshToken(existingRefreshToken);
      if (isValid) {
        setMessage("You are already logged in!");
        return;
      }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/accounts/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        setMessage("Login successful!");

        setTimeout(() => {
          navigate("/"); // Redirect to the homepage
        }, 500);
      } else {
        setMessage(data.detail || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login Error:", error);
      // setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 w-50">
        <h2 className="text-center text-primary">Login</h2>
        {message && <p className="text-center text-danger">{message}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="staticEmail"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group row mt-3">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
