import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const { data } = await API.post("/auth/login", {
        email,
        password
      });

      const decoded = JSON.parse(atob(data.token.split(".")[1]));

      if (decoded.role !== role) {
        alert("Selected role does not match your account role.");
        return;
      }

      login(data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-card">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} />
            <button className="primary" type="submit">Login</button>
        </form>
    </div>
  );
}

const formStyle = {
  maxWidth: "400px",
  margin: "50px auto",
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

export default Login;