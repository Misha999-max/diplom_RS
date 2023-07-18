import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CartItem = ({ img, title, price, id, handleClick }) => {
  return (
    <Card style={{ width: "15rem", height: "25rem" }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Цена: {price}</Card.Text>
        <Button variant="primary" onClick={() => handleClick(id)}>
          Go somewhere
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CartItem;
