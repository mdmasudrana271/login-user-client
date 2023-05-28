import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Registration = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const handlePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    } else {
      setPasswordType("password");
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const user = {
      name: name,
      email: email,
      password: password,
    };

    fetch("http://localhost:5000/singup", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.error){
          setError(data.error)
          setSuccess('')
        }
        if(data.acknowledged){
          setError('')
          setSuccess('Register successful')
          form.reset()
        }

      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content">
        <div className="card lg:w-96 w-full shadow-2xl bg-base-100">
          <form onSubmit={handleOnSubmit} className="card-body">
            <h1 className="my-3 text-4xl font-bold text-center">
              Registration
            </h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                name="name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="flex justify-center items-center gap-2">
              <input
                type={passwordType}
                placeholder="password"
                name="password"
                className="input input-bordered w-full"
              /> {passwordType === "password" ? (
                <FaEye
                  onClick={handlePasswordType}
                  className=" cursor-pointer w-[15px]"
                ></FaEye>
              ) : (
                <FaEyeSlash
                  onClick={handlePasswordType}
                  className=" cursor-pointer w-[15px]"
                ></FaEyeSlash>
              )}
              </div>
              <label className="label">
                  {
                    error && <p className="text-red-500">{error}</p>
                  }
                  {
                    success && <p className="text-green-500">{success}</p>
                  }
                
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
            <label className="label">
                <span className="label-text-alt link link-hover">
                  Already an account? <Link to="/login">Login</Link>
                </span>
              </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
