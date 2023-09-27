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
  // const isLoading = useSelector(getCategoryStatus());
  // console.log(products);
  // const categoryList =
  //   isLoading &&
  //   categores.map((c) => ({
  //     label: c.name,
  //     value: c.category_id,
  //   }));
  // const [errors, setErrors] = useState({});
  //   const validate = () => {
  //     const errors = validator(data, validatorConfog);
  //     setErrors(errors);
  //     return Object.keys(errors).length === 0;
  // };
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleDelete = (id) => {
    console.log(id);
    dispatch(removeProduct(id));
  };
  const handleChangeProduct = (id) => {
    console.log(id);
    history.push(`/changeProduct/${id}`);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ id: Date.now().toString(), like: false, ...data });
    // const isValid = validate();
    // if (!isValid) return;
    dispatch(
      createProduct({ id: Date.now().toString(), like: false, ...data })
    );
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
            {products.map((item) => (
              <li key={item._id} className="leftRepairZone__list-item">
                <div className="leftRepairZone__list-block">
                  <img src={item.image && item.image} />
                  <span>{item.title}</span>
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
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
