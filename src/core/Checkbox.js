import React, { useState } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setCheked] = useState([]);

  const handleToggle = (c) => () => {
    // return the first index or -1
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state > push
    // else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    //console.log(newCheckedCategoryId);
    setCheked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return categories.map((c, i) => (
    <div key={i} className="flex items-center">
      <input
        onChange={handleToggle(c._id)}
        value={checked.indexOf(c._id === -1)}
        type="checkbox"
        // id="cat-1"
        className="text-primary focus:ring-0 rounded-sm cursor-pointer"
      />
      <label htmlFor="cat-1" className="text-gray-600 ml-3 cursor-pointer">
        {c.name}
      </label>
      <div className="ml-auto text-gray-600 text-sm">(15)</div>
    </div>
  ));
};

export default Checkbox;
