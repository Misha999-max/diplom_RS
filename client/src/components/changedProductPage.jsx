/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getProducts } from "../store/product";
import TextField from "./common/form/textField";
import SelectField from "./common/form/selectField";
import TextAreaField from "./common/form/textAreaField";
import { getCategories } from "../store/category";

function ChangedProductPage() {
  const { id } = useParams();
  const [data, setData] = useState({
    price: "",
    title: "",
    image: "",
    description: "",
    category_id: "",
  });
  const products = useSelector(getProducts());
  const categores = useSelector(getCategories());

  const product = products && products.filter((prod) => prod._id === id);
  const category =
    categores &&
    categores.filter((cat) => cat.category_id === product[0].category_id);
  useEffect(() => {
    setData({
      price: `${products && product[0].price}`,
      title: `${products && product[0].title}`,
      image: `${products && product[0].image}`,
      description: `${products && product[0].description}`,
      category_id: `${categores && category[0].name}`,
    });
  }, [id]);
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...data });
    // const isValid = validate();
    // if (!isValid) return;
    // dispatch(
    //   createProduct({ id: Date.now().toString(), like: false, ...data })
    // );
  };
  return (
    <div className="change__form">
      <div className="container">
        <h1 className="repair__zone-title">ChangeProductPage</h1>
        <form className="form__group" onSubmit={handleSubmit}>
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
            label="Chooose....."
            defaultOption="Chooose...."
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
            изменить
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangedProductPage;
