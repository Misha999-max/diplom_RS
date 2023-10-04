/* eslint-disable react/prop-types */

import React, { useState } from "react";
import TextField from "../common/form/textField";
import TextAreaField from "../common/form/textAreaField";
import SelectField from "../common/form/selectField";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategories,
  getCategoryStatus,
} from "../../store/category/selectors";
import { removeProduct, createProduct } from "../../store/product";
import { getProducts, getProductsStatus } from "../../store/product";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddressPage = () => {
  const [data, setData] = useState({
    price: "",
    title: "",
    image: "",
    description: "",
    category_id: "",
  });
  const categores = useSelector(getCategories());
  const products = useSelector(getProducts());
  const dispatch = useDispatch();
  const isLoading = useSelector(getProductsStatus());
  const history = useHistory();
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleDelete = (id) => {
    dispatch(removeProduct(id));
    // history.push("/");
  };
  const handleChangeProduct = (id) => {
    history.push(`/changeProduct/${id}`);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({ id: Date.now().toString(), like: false, ...data })
    );
    history.push("/");
  };
  return (
    <>
      <h1 className="repair__zone-title">Admin Panel</h1>
      <div className="container repaer__zone">
        <form action="" onSubmit={handleSubmit}>
          <TextField
            label="price"
            name="price"
            value={data.price}
            onChange={handleChange}
            // error={errors.name}
          />
          <TextField
            label="title"
            name="title"
            value={data.title}
            onChange={handleChange}
            // error={errors.name}
          />
          <TextField
            label="image"
            name="image"
            value={data.image}
            onChange={handleChange}
            // error={errors.name}
          />
          <SelectField
            label="Выбери категорию"
            defaultOption="Choose..."
            name="category_id"
            options={categores}
            onChange={handleChange}
            value={data.category_id}
            // error={errors.profession}
          />
          <TextAreaField
            value={data.description || ""}
            onChange={handleChange}
            name="description"
            label="Описание товара"
            // error={errors.description}
          />
          <button
            type="submit"
            // disabled={!isValid}
            className="btn btn-primary w-100 mx-auto"
          >
            Создать
          </button>
        </form>
        <div className="leftRepairZone">
          <ul className="leftRepairZone__list">
            {products ? (
              products.map((item) => (
                <li key={item._id} className="leftRepairZone__list-item">
                  <img src={item.image ? item.image : ""} />
                  <span className="leftRepairZone__list-title">
                    {item.title ? item.title : ""}
                  </span>
                  <span
                    className="changedspan"
                    onClick={() => handleChangeProduct(item._id)}
                  >
                    &#128736;
                  </span>
                  <span
                    className="rightRepairZone"
                    onClick={() => handleDelete(item._id)}
                  >
                    &times;
                  </span>
                </li>
              ))
            ) : (
              <div className="loader">
                <div data-glitch="Loading..." className="glitch">
                  Loading...
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
