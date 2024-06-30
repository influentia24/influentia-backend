import { useState } from "react";
import axios from "axios";

export const Signup = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault
    console.log(userData)
    axios.post("http://localhost:8000/api/authentication/signup", userData)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xl mx-auto p-4">
        <div className="logo flex items-center justify-center">
          <img className="w-16" src="https://imgs.search.brave.com/p03IZrKSpg003NoZech3qM-mDad5N_gy6_tbf_CtTZw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2FyYm9uZm9vdHBy/aW50LmNvbS9pbWFn/ZXMvaWNvbl9zaG91/dF9ibGFjay5wbmc" alt="logo"/>
          <h1 className="text-2xl font-bold mx-2">Linkers</h1>
        </div>
        <div className="text-center my-2 py-2">
          <h1 className="mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">Join Linkers</h1>
          <p className="text-xl leading-none text-gray-700">Signup for free!</p>
        </div>
        <div className="form-section">
          <div className="flex flex-col justify-center items-center"
          >
            <input type="text" name="firstName" placeholder="First Name" className="input-field" onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" className="input-field" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" className="input-field" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" className="input-field" onChange={handleChange} />
            <input type="text" name="username" placeholder="Username" className="input-field" onChange={handleChange} />
            <button type="submit"  className="btn"
            onClick={handleSubmit}
            >Create Account</button>
          </div>
          <hr className="my-4" />
          <div className="text-center">
            <p className="text-gray-600 mb-2">or signup with</p>
            <div className="flex justify-center space-x-4">
              <img src="/image/google.png" alt="Google" className="social-icon" />
              <img src="/image/apple-logo.png" alt="Apple" className="social-icon" />
              <img src="/image/facebook.png" alt="Facebook" className="social-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
