import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <div className="container py-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">Register</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Register here if you don't have account
        </p>
        <form action>
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 mb-2 block">Full Name</label>
              <input
                onChange={handleChange("name")}
                type="text"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                placeholder="John Doe"
                value={name}
              />
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">Email Address</label>
              <input
                onChange={handleChange("email")}
                type="email"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                placeholder="Enter you email address"
                value={email}
              />
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">Password</label>
              <input
                onChange={handleChange("password")}
                type="password"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                placeholder="Enter you password"
                value={password}
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreement"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label
                htmlFor="agreement"
                className="text-gray-600 ml-3 cursor-pointer"
              >
                I have read and agree to the{" "}
                <Link to="/" className="text-primary">
                  {" "}
                  terms and conditions
                </Link>
              </label>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={clickSubmit}
              className="block w-full py-2 bg-primary border border-primary text-center text-white px-8 rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
            >
              Create Account
            </button>
          </div>
        </form>
        <p className="mt-4 text-gray-600 text-center">
          Already have an account{" "}
          <Link to="/" className="text-primary">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );

  const showError = () => (
    <div
      className="px-5 py-5 bg-red-400 text-white mx-auto max-w-lg"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="px-5 py-5 bg-green-400 text-white mx-auto max-w-lg"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );

  return (
    <Layout>
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
