/* eslint-disable react/prop-types */

import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CarouselItem from "./common/carusell";
import { useState } from "react";
import { Grid } from "@mui/material";
import { Container } from "react-bootstrap";
import CartItem from "./cartItem";
import AsaidBar from "./page/asaidBar";
import { paginate } from "../utils/paginate";
import Pagination from "./common/newPagination";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  getProducts,
  getProductsStatus,
  loadProductsList,
} from "../store/product";
import { useDispatch, useSelector } from "react-redux";
import localStorageService from "../services/localStorage.service";

const MainPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(getProducts());
  const isLoading = useSelector(getProductsStatus());
  const [pageNumber, setPageNumber] = useState(1);
  const [showProduct, setShowProduct] = useState([]);
  const [bascketArr, setBascketArr] = useState([]);
  const userId = localStorageService.getUserId();
  useEffect(() => {
    dispatch(loadProductsList());
  }, []);
  const history = useHistory();

  const handlePageChange = (pageIndex) => {
    setPageNumber(pageIndex);
  };

  const handleSortCategory = (id) => {
    const productArr = [];
    products.forEach((item) => {
      if (item.category_id === id) {
        productArr.push(item);
      }
    });
    setShowProduct(productArr);
  };
  const handleClear = () => {
    setShowProduct(products);
  };
  const handleClick = (id) => {
    history.push(`/cartItem/${id}`);
  };
  console.log(products);

  const handleAdd = (data) => {
    // console.log(id);
    if (localStorage.getItem(userId)) {
      const newBAsketArr = localStorage.getItem(userId);
      setBascketArr((prevState) => [...prevState, data]);
      localStorage.setItem(userId, bascketArr);
    } else {
      localStorage.setItem(userId, data);
    }
  };

  const count = showProduct && showProduct.length;
  const pageSize = 3;
  const productCrop =
    showProduct && paginate(showProduct, pageNumber, pageSize);

  return (
    <div className="main__container">
      <Container>
        <Grid container spacing={4} sx={{ padding: 2 }}>
          <Grid item>
            <AsaidBar
              handleSortCategory={handleSortCategory}
              handleClear={handleClear}
            />
          </Grid>

          {!isLoading ? (
            productCrop.map((item) => (
              <Grid item key={item._id}>
                <CartItem
                  title={item.title}
                  price={item.price}
                  img={item.image}
                  id={item._id}
                  handleClick={handleClick}
                  handleAdd={() => handleAdd(item._id)}
                />
              </Grid>
            ))
          ) : (
            <h1>Loading....</h1>
          )}
        </Grid>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={pageNumber}
          onPageChange={handlePageChange}
        />
        <CarouselItem />
      </Container>
    </div>
  );
};

export default MainPage;
