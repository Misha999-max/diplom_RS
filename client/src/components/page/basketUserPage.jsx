import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import localStorageService from "../../services/localStorage.service";

const BasketUserPage = () => {
  const [bascket, setBascket] = useState("");
  const userId = localStorageService.getUserId();
  useEffect(() => {
    if (localStorageService.getBascketId(userId)) {
      setBascket(localStorageService.getBascketId(userId));
    }
  }, []);
  const sliceBasketArr = bascket.split(",");
  console.log(sliceBasketArr);
  return (
    <Container>
      <h1>BasketUserPage</h1>
    </Container>
  );
};

export default BasketUserPage;
