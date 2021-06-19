import React from "react";

const Breadcrumbs = () => {
  return (
    <div className="container py-4 flex items-center gap-3">
      <a href="/" className="text-primary text-base" alt="bread">
        <i className="fas fa-home" />
      </a>
      <span className="text-sm text-gray-400">
        <i className="fas fa-chevron-right" />
      </span>
      <p className="text-gray-600 font-medium">Shop</p>
    </div>
  );
};

export default Breadcrumbs;
