/* eslint-disable react/prop-types */

import React from "react";
import { useSelector } from "react-redux";
import { getCategories, getCategoryStatus } from "../../store/category";

const AsaidBar = ({ handleSortCategory, handleClear }) => {
<<<<<<< HEAD
  const category = useSelector(getCategories());
  const isLoading = useSelector(getCategoryStatus());
=======
  const URL_CATEGORY = "http://188.124.50.192/api/category";

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
>>>>>>> ee6f597db1705a8a1e5c9c49fad22db8fe54bad8

  return (
    <div>
      <ul>
        {!isLoading &&
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
