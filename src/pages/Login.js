import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Get users list
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find valid user
    const validUser = users.find(
      u => u.username === username && u.password === password
    );

    if (!validUser) {
      alert("Invalid username or password");
      return;
    }

    // Login success
    dispatch(login({ username: validUser.username }));
    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <div className="auth-link">
        <button onClick={() => navigate("/signup")}>
          Create New Account
        </button>
      </div>
    </div>
  );
}

export default Login;
