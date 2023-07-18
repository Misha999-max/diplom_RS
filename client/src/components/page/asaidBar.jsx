import React from "react";
const AsaidBar = ({ product, handleSortCategory }) => {
  const categorySort = [];
  product.map((item) => categorySort.push(item.name));
  const makeUniqueCategory = (arr) => {
    const uniqSet = new Set(arr);
    return [...uniqSet];
  };
  const newArr = makeUniqueCategory(categorySort);

  return (
    <div>
      <ul>
        {newArr.map((item) => (
          <li className="list__category" key={item.index}>
            <button
              onClick={(e) => handleSortCategory(e.target.textContent)}
              className="btn btn-primary mb-2"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AsaidBar;
