import axios from "axios";
import "./Login.css"; // Đảm bảo rằng bạn đã tạo file CSS cho style
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS của react-toastify
import logo from "../../assets/logoweb.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State để điều khiển hiển thị mật khẩu
  const apiKey = "5744c461b4e9a5730311b1bacdc9a337";

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Tạo request token
      const tokenResponse = await axios.get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`
      );
      const requestToken = tokenResponse.data.request_token;

      // Xác thực request token với thông tin đăng nhập
      const validateResponse = await axios.post(
        `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
        {
          username,
          password,
          request_token: requestToken,
        }
      );

      if (validateResponse.data.success) {
        // Tạo session
        const sessionResponse = await axios.post(
          `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
          {
            request_token: requestToken,
          }
        );

        const sessionId = sessionResponse.data.session_id;
        // Lưu sessionId vào localStorage hoặc state quản lý session
        localStorage.setItem("sessionId", sessionId);
        toast.success("Login successful!"); // Thông báo đăng nhập thành công
        window.location.href = "/"; // Chuyển hướng sau khi đăng nhập thành công
      } else {
        setError("Invalid username or password.");
        toast.error("Invalid username or password."); // Thông báo đăng nhập thất bại
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login.");
      toast.error("An error occurred during login."); // Thông báo lỗi khi đăng nhập
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      {isLoading && (
        <div className="loading-container">
          <div className="loading">Loading...</div>
        </div>
      )}
      <div className="login-form">
        <div className="login-logo-wrapper">
          <img src={logo} alt="Logo" className="login-logo" />
        </div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button type="submit" disabled={isLoading}>
            Login
          </button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <div className="form-switch">
              <span>Switch to Signup</span>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
