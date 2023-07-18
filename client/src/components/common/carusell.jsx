import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const CarouselItem = () => {
  const URL_PRODUCT = "http://localhost:3001/couresel";
  const [index, setIndex] = useState(0);

  const [foto, setFoto] = useState([]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  useEffect(() => {
    axios.get(URL_PRODUCT).then((responce) => {
      setFoto(responce.data);
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
        {foto.map((fotos, index) => (
          <Carousel.Item>
            <img className="d-block w-100" src={fotos} alt="First slide" />
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
