/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { getProducts, loadProductsList } from "../store/product";
import clock from "../images/clock.jpeg";
import phone from "../images/casePhone.png";
import microWave from "../images/microWave.webp";
import tvSet from "../images/tvSet.jpg";
import tablet from "../images/tablet.png";
import { getCategories } from "../store/category";

const Card = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const products = useSelector(getProducts());
  const categoryes = useSelector(getCategories());

  useEffect(() => {
    dispatch(loadProductsList());
  }, []);
  const { itemId } = useParams();
  const product = products && products.filter((prod) => prod._id === itemId);

  const handleBack = () => {
    history.push("/");
  };

  const category =
    categoryes &&
    categoryes.filter((categ) => categ.category_id === product[0].category_id);

  function changeBackGround(cat) {
    if (cat === "телефон") {
      return phone;
    }
    if (cat === "Микроволновые печи") {
      return microWave;
    }
    if (cat === "Планшеты") {
      return tablet;
    }
    if (cat === "Телевизоры") {
      return tvSet;
    }
    if (cat === "Часы") {
      return clock;
    }
  }

  return (
    <div
      className="carts__container"
      style={{
        backgroundImage: `url(${
          category && changeBackGround(category[0].name)
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: `rgba(red, rgb(196, 214, 196), blue, 0.8)`,
      }}
    >
      <button className="btn__back-cards" onClick={handleBack}>
        <div className="btn__back-box">
          <span className="btn__back-elem">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 40">
              <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
            </svg>
          </span>
          <span className="btn__back-elem">
            <svg viewBox="0 0 46 40">
              <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
            </svg>
          </span>
        </div>
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
//
export default Card;
