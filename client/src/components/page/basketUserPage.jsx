import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import localStorageService from "../../services/localStorage.service";
import { useSelector } from "react-redux";
import { getProducts } from "../../store/product";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BasketUserPage = () => {
  const [bascket, setBascket] = useState("");
  const products = useSelector(getProducts());
  const history = useHistory();
  const userId = localStorageService.getUserId();
  useEffect(() => {
    if (localStorageService.getBascketId(userId)) {
      setBascket(localStorageService.getBascketId(userId));
    }
  }, []);

  const sliceBasketArr = bascket.split(",");
  let showProductBascketconst = [];
  if (products && bascket) {
    sliceBasketArr.forEach((id) => {
      products.forEach((item) => {
        if (item._id === id) {
          showProductBascketconst.push(item);
        }
      });
    });
  }
  const handleMove = (id) => {
    history.push(`/cartItem/${id}`);
  };
  const handleDelete = (id) => {
    const newArr = localStorage.getItem(userId).split(",");
    const filterArr = newArr.filter((item) => item !== id);
    localStorage.setItem(userId, filterArr);
    setBascket(localStorageService.getBascketId(userId));
  };
  console.log(showProductBascketconst);

  return (
    <div className="user__container">
      <Container>
        <ul className="user__bascket">
          {products && bascket ? (
            showProductBascketconst.map((prod) => (
              <li className="user__bascket-item" key={prod._id}>
                <div
                  className="user__bascket-block"
                  onClick={() => handleMove(prod._id)}
                >
                  <img className="user__bascket-img" src={prod.image} />
                  <span className="user__bascket-title">{prod.title}</span>
                </div>
                <button
                  className="btn__delete"
                  onClick={() => handleDelete(prod._id)}
                >
                  <svg viewBox="0 0 448 512" className="svgIcon">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                  </svg>
                </button>
              </li>
            ))
          ) : (
            <span className="user__bascket-empty">Корзина пока пуста....</span>
          )}
        </ul>
      </Container>
    </div>
  );
};

export default BasketUserPage;
