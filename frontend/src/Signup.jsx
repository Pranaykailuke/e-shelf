import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Signup Successful ✅");

      navigate("/");

    } catch (err) {

      console.log(err);

      alert("Signup Failed ❌");
    }
  };

  return (

    <div className="container mt-5">

      <div
        className="card p-4 mx-auto shadow"
        style={{ maxWidth: "400px" }}
      >

        <h2 className="text-center mb-4">
          Signup
        </h2>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="form-control mb-3"
            onChange={handleChange}
          />

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
            Signup
          </button>

        </form>

        <p className="mt-3 text-center">

          Already have account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;