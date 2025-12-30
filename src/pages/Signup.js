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

    // Get existing users or empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username already exists
    const userExists = users.find(
      u => u.username === username
    );

    if (userExists) {
      alert("Username already exists. Please login.");
      navigate("/");
      return;
    }

    // Add new user
    users.push({ username, password });

    // Save users list
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Please login.");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

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
      <p>Already have an account?</p>

      <div className="auth-link">
        <button onClick={() => navigate("/")}>
           Sign in
        </button>
      </div>
    </div>
  );
}

export default Signup;
