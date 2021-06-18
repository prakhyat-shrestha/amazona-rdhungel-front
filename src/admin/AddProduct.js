import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  // load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const newPostForm = () => (
    <div className="container py-16">
      <div className="max-w-2xl ml-10 shadow px-6 py-7 rounded overflow-hidden">
        <form className="mb-3" onSubmit={clickSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Post Photo
              </label>
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image/*"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full  sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="text-gray-600 mb-2 block">Name</label>
              <input
                onChange={handleChange("name")}
                type="text"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                value={name}
              />
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">Description</label>
              <textarea
                onChange={handleChange("description")}
                id="description"
                name="description"
                rows="3"
                className="shadow-sm focus:ring-0 focus:border-primary mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                value={description}
              />
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">Price</label>
              <input
                onChange={handleChange("price")}
                type="number"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                value={price}
              />
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">Category</label>
              <select
                onChange={handleChange("category")}
                id="category"
                name="category"
                className="mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-primary sm:text-sm"
              >
                <option>Please select</option>
                {categories &&
                  categories.map((c, i) => (
                    <option key={i} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">Shipping</label>
              <select
                onChange={handleChange("shipping")}
                id="shipping"
                name="shipping"
                className="mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-primary sm:text-sm"
              >
                <option>Please select</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div>
              <label className="text-gray-600 mb-2 block">Quantity</label>
              <input
                onChange={handleChange("quantity")}
                type="number"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                value={quantity}
              />
            </div>
            <div className="py-3">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  const showSuccess = () => (
    <div
      className="container text-white text-sm bg-green-500 p-5  mb-5 "
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct}`} is created!</h2>
    </div>
  );

  const showError = () => (
    <div
      className="container text-white text-sm bg-red-300 p-5  mb-5"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div>
        <h2>Loading...</h2>
      </div>
    );

  return (
    <AdminLayout>
      <div>
        {showLoading()}
        {showSuccess()}
        {showError()}
        {newPostForm()}
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
