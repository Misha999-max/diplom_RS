/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { getProducts, loadProductsList } from "../store/product";

const Card = () => {
  const URL_CATEGORY = "http://localhost:8080/api/category";
  const dispatch = useDispatch();
  const history = useHistory();
  const [categoryes, setCategory] = useState();
  const products = useSelector(getProducts());

  useEffect(() => {
    dispatch(loadProductsList());
  }, []);
  const { itemId } = useParams();
  const product = products && products.filter((prod) => prod._id === itemId);

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

  const handleBack = () => {
    history.push("/");
  };

  const category =
    categoryes &&
    categoryes.filter((categ) => categ.category_id === product[0].category_id);

  // console.log(category);
  console.log(product);

  return (
    <div className="carts__container">
      <button className="carts__item_btnBack" onClick={handleBack}>
        Back
      </button>
      {category && product ? (
        <div className="carts__item">
          <h1>{`${category[0].name} ${product[0].title}`}</h1>
          <img src={product[0].image} />
          <span> цена: {product[0].price} </span>
          <p>{product[0].description}</p>
        </div>
      ) : (
        "Loading...."
      )}
    </div>
  );
};

export default Card;
