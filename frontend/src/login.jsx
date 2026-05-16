import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login({ setUser }) {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );
      setUser(res.data.user);

      alert("Login Successful ✅");

     window.location.href = "/";

    } catch (err) {

      console.log(err);

      alert("Invalid Credentials ❌");
    }
  };

  return (

    <div className="container mt-5">

      <div
        className="card p-4 mx-auto shadow"
        style={{ maxWidth: "400px" }}
      >

        <h2 className="text-center mb-4">
          Login
        </h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <button className="btn btn-dark w-100">
            Login
          </button>

        </form>

        <p className="mt-3 text-center">

          Don't have account?

          <Link to="/signup">
            Signup
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;