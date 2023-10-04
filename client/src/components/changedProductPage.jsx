/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { getProducts, updateProduct } from "../store/product";
import TextField from "./common/form/textField";
import SelectField from "./common/form/selectField";
import TextAreaField from "./common/form/textAreaField";
import { getCategories } from "../store/category";

function ChangedProductPage() {
  const { id } = useParams();
  const histore = useHistory();
  const dispatch = useDispatch();
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
      category_id: `${categores && category[0].category_id}`,
    });
  }, []);
  const handelBack = () => {
    histore.push("/Address/");
  };
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, ...data }));
    histore.push("/");
  };
  return (
    <div className="change__form">
      <div className="container">
        <h1 className="repair__zone-title">Настройка товаров</h1>
        <button className="back__batton" onClick={handelBack}>
          <svg
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 1024 1024"
          >
            <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
          </svg>
          <span>Back</span>
        </button>
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
