/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState } from "react";
// import config from "../../config.json";

const AsaidBar = ({ handleSortCategory, handleClear }) => {
  const URL_CATEGORY = "http://localhost:8080/api/category";

  const [category, setCategory] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(URL_CATEGORY);
        setCategory(data.list);
      } catch (error) {
        throw new Error(error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {category &&
          category.map((item) => (
            <li className="list__category" key={item.category_id}>
              <button
                onClick={() => handleSortCategory(item.category_id)}
                className="btn btn-primary mb-2"
              >
                {item.name}
              </button>
            </li>
          ))}
        <li>
          <button className="btn btn-danger mb-2" onClick={handleClear}>
            All
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AsaidBar;
