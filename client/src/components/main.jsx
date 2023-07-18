import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import CarouselItem from "./common/carusell";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TablePaginationDemo from "./common/pagination";
import { Container } from "react-bootstrap";
import CartItem from "./cartItem";
import AsaidBar from "./page/asaidBar";

const MainPage = () => {
  const URL_PRODUCT = "http://localhost:3001/products";
  const [product, setProduct] = useState([]);
  //const [pageNumber, setPageNumber] = useState(1);
  const [showArray, setShowArray] = useState([]);
  useEffect(() => {
    axios.get(URL_PRODUCT).then((data) => setProduct(data.data));
    axios
      .get(`${URL_PRODUCT}?_page=1&_limit=3`)
      .then((res) => setShowArray(res.data));
  }, []);
  const handleChange = (value) => {
    axios
      .get(`${URL_PRODUCT}?name=${value}`)
      .then((responce) => console.log(responce.data));
  };
  const handleSortCategory = (name) => {
    console.log(name);
  };
  const handleClick = (id) => {
    axios
      .get(`${URL_PRODUCT}/${id}`)
      .then((responce) => console.log(responce.data));
  };
  const handleSliceTasks = (item) => {
    axios
      .get(`${URL_PRODUCT}?_page=${Number(item)}&_limit=3`)
      .then((res) => setShowArray(res.data));
  };

  return (
    <>
      <Container>
        <Grid container spacing={4} sx={{ padding: 2 }}>
          <Grid item>
            <AsaidBar
              product={product}
              handleSortCategory={handleSortCategory}
            />
          </Grid>
          {showArray.map((item) => (
            <Grid item key={item.id}>
              <CartItem
                title={item.title}
                price={item.price}
                img={item.image}
                id={item.id}
                handleClick={handleClick}
              />
            </Grid>
          ))}
        </Grid>

        <TablePaginationDemo
          tasks={product}
          handleSliceTasks={handleSliceTasks}
        />
        <CarouselItem />
      </Container>
    </>
  );
};

export default MainPage;
