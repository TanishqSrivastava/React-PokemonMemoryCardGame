// Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
function Signup() {
  const nav = useNavigate();
  const [form, set] = useState({ email:'', password:'', username:'' });

  const submit = async e => {
    e.preventDefault();
    const r = await axios.post('http://localhost:8000/signup', form);
    if (r.data === 'exist') alert('User/username exists');
    else nav('/home', { state:{ id: form.email }});
  };

  return (
    <div className="login">
      <h1>Signup</h1>
      <form onSubmit={submit}>
        <input placeholder="Username"
               value={form.username}
               onChange={e=>set({...form,username:e.target.value})}/>
        <input type="email" placeholder="Email"
               value={form.email}
               onChange={e=>set({...form,email:e.target.value})}/>
        <input type="password" placeholder="Password"
               value={form.password}
               onChange={e=>set({...form,password:e.target.value})}/>
        <input type="submit" value="Signup"/>
      </form>
      <br/><Link to="/">Login Page</Link>
    </div>
  );
}
export default Signup;