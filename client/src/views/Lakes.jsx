import "./Lakes.css";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function Lakes() {
  const [lakes, setLakes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/api/lakes/all").catch(
        console.log("Error")
      );
      const data = await res.json();
      console.log(data);
      setLakes(data);
    };
    fetchData();
  }, []);

  return (
    <div className="lakeContainer">
      <Row xs={1} md={2} className="g-4">
        {lakes &&
          lakes.map((lake) => {
            return (
              <>
                <Col>
                  <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                      <Card.Title>{lake.name}</Card.Title>
                      <Card.Text>
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">{lake.area}</small>
                    </Card.Footer>
                    <Card.Footer>
                      <small className="text-muted">{lake.location}</small>
                    </Card.Footer>
                  </Card>
                </Col>
              </>
            );
          })}
      </Row>
      <div>
        <Button className="signButton">Add Lake</Button>
      </div>
    </div>
  );
}

export default Lakes;
