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
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!savedUser) {
      alert("No account found. Please signup.");
      navigate("/signup");
      return;
    }

    if (
      savedUser.username === username &&
      savedUser.password === password
    ) {
      dispatch(login({ username }));
      navigate("/dashboard");
    } else {
      alert("Invalid username or password");
    }
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
        <p>Don't have an account?</p>
        <button onClick={() => navigate("/signup")}>
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Login;
