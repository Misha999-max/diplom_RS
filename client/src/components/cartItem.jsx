/* eslint-disable react/prop-types */

import React from "react";
import Card from "react-bootstrap/Card";
import localStorageService from "../services/localStorage.service";

const CartItem = ({ img, title, price, id, handleClick, handleAdd }) => {
  const accessToken = localStorageService.getAccessToken();

  return (
    <Card className="item__card">
      <Card.Img variant="top" className="item__card_img" src={img} />
      <Card.Body>
        <Card.Title className="item__card_title">{title}</Card.Title>
        <Card.Text>Цена: {price}</Card.Text>
        <button className="cta carts__item-add" onClick={() => handleClick(id)}>
          <span className="hover-underline-animation"> Go somewhere </span>
          <svg
            viewBox="0 0 46 16"
            height="10"
            width="30"
            xmlns="http://www.w3.org/2000/svg"
            id="arrow-horizontal"
          >
            <path
              transform="translate(30)"
              d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
              data-name="Path 10"
              id="Path_10"
            ></path>
          </svg>
        </button>

        {accessToken && (
          <button className="add__basket" onClick={() => handleAdd(id)}>
            Add +
          </button>
        )}
      </Card.Body>
    </Card>
  );
};

{
  /* <button className="carts__item-add" onClick={() => handleClick(id)}>
          Go somewhere
        </button>

        <button className="carts__item-add" onClick={() => handleAdd(id)}>
            Add to basket
          </button>
        
        */
}

export default CartItem;
