import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const data = [
  {
    image: require("./assets/Slidepic1.jpg"),
    caption: "Caption",
    description: "Description Here",
  },
  {
    image: require("./assets/Slidepic2.jpg"),
    caption: "Caption",
    description: "Description Here",
  },
  {
    image: require("./assets/Slidepic3.jpg"),
    caption: "Caption",
    description: "Description Here",
  },
];

function HomeCarousel() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {data.map((slide) => {
        return (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={slide.image}
              alt="slider image"
            />
            <Carousel.Caption className="centered-caption">
              <h3>{slide.caption}</h3>
              <p>{slide.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
export default HomeCarousel;
