import React from "react";
import "./Carousel.css";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pic from "../../assets/undraw_adventure_map_hnin.svg";
import Pic2 from "../../assets/undraw_couple.svg";
import Pic3 from "../../assets/undraw_reading.svg";

function LandingCarousel() {
  return (
    <Carousel fade className="carousel">
      <Carousel.Item className="carousel_item">
        <Container className="carousel_container">
          <Row className="carousel_row">
            <Col className="carousel_col_text">
              <Carousel.Caption className="carousel_caption">
                <h3>Escape The Heat</h3>
                <div className="carousel_text">
                  <p>
                    Get out the of the city heat and enjoy some lake time! Find
                    your favourite spot.
                  </p>
                </div>
              </Carousel.Caption>
              <Col>
                <img className="carouselImage" src={Pic} alt="First slide" />
              </Col>
            </Col>
          </Row>
        </Container>
      </Carousel.Item>
      {/* 
      <Carousel.Item>
        <Container>
          <Row>
            <Col>
              <Carousel.Caption>
                <h3>Take me to the lakes</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div>
                  <Button className="btn-1"></Button>
                </div>
              </Carousel.Caption>
            </Col>
            <Col>
              <img className="" src={Pic2} alt="Second slide" />
            </Col>
          </Row>
        </Container>
      </Carousel.Item>

      <Carousel.Item>
        <Row>
          <Col>
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Col>
          <Col>
            <img className="" src={Pic3} alt="Third slide" />
          </Col>
        </Row>
      </Carousel.Item>*/}
    </Carousel>
  );
}

export default LandingCarousel;
