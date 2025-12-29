import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem(
      "registeredUser",
      JSON.stringify({ username, password })
    );

    alert("Signup successful! Please login.");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>

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

      <button onClick={handleSignup}>Signup</button>

      <div className="auth-link">
        <p>Already have an account?</p>
        <button onClick={() => navigate("/")}>
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default Signup;
