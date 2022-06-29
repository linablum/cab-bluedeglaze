import React from "react";
import "./Carousel.css";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Pic from "../../assets/undraw_adventure_map_hnin.svg";
import Pic2 from "../../assets/undraw_couple.svg";
import Pic3 from "../../assets/undraw_reading.svg";

function LandingCarousel() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img className="d-block w-100" src={Pic} alt="First slide" />
        <Carousel.Caption>
          <h3>Blue Deglaze</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Pic2} alt="Second slide" />
        <Carousel.Caption>
          <h3>Take me to the lakes</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div>
            <Button className="btn-1"></Button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Pic3} alt="Third slide" />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default LandingCarousel;
