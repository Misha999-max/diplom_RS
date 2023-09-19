/* eslint-disable react/prop-types */

import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import couruselService from "../../services/courusel.services";

const CarouselItem = () => {
<<<<<<< HEAD
=======
  const URL_PRODUCT = "http://188.124.50.192/api/couresel";
>>>>>>> ee6f597db1705a8a1e5c9c49fad22db8fe54bad8
  const [index, setIndex] = useState(0);

  const [foto, setFoto] = useState([]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  useEffect(() => {
    couruselService.get().then(({ list }) => {
      setFoto(list);
    });
  }, []);

  return (
    <div className="carousel__slide">
      <Carousel
        className="mr-auto"
        activeIndex={index}
        onSelect={handleSelect}
        fade
      >
        {foto &&
          foto.map((fotos, index) => (
            <Carousel.Item key={fotos._id}>
              <img
                className="d-block w-100"
                src={fotos.couresel}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>{index + 1}slide label</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
};

export default CarouselItem;
