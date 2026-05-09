import { useState } from "react";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Member");

  const signupUser = async () => {
    try {
      await axios.post("https://team-task-manager-production-0f6b.up.railway.app/api/auth/signup", {
        name,
        email,
        password,
        role
      });

      alert("Signup Successful");
    } catch (error) {
      alert("Signup Failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Signup</h1>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <br /><br />

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br /><br />

      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br /><br />

      <select onChange={(e) => setRole(e.target.value)}>
        <option>Member</option>
        <option>Admin</option>
      </select>
      <br /><br />

      <button onClick={signupUser}>Signup</button>
    </div>
  );
}

export default Signup;