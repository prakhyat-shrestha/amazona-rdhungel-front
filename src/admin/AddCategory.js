import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // make request to api to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => (
    <div className="mt-1  w-1/3">
      <form onSubmit={clickSubmit}>
        <div>
          <label htmlFor="" className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            onChange={handleChange}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="py-3">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Category
          </button>
        </div>
      </form>
    </div>
  );

  const showSuccess = () => {
    if (success) {
      return (
        <div className="text-white text-sm bg-green-500 p-5 w-1/3 mb-5">
          <h3>{name} is created</h3>
        </div>
      );
    }
  };

  const showError = () => {
    if (error) {
      return (
        <div className="text-white text-sm bg-red-300 p-5 w-1/3 mb-5">
          <h3>Category should be unique</h3>
        </div>
      );
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link
        to="/admin/dashboard"
        className="text-sm bg-yellow-500 p-3 text-white hover:bg-yellow-600"
      >
        <i className="fas fa-long-arrow-alt-left pr-2"></i>
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <AdminLayout>
      <div>
        {showSuccess()}
        {showError()}
        {newCategoryForm()}
      </div>
    </AdminLayout>
  );
};

export default AddCategory;
