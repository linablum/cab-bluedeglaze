import "./views.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../context/AuthContext";
import { CheckLg, SuitHeart, SuitHeartFill } from "react-bootstrap-icons";
import LakeDetailsModal from "../components/LakeDetailsModal/LakeDetailsModal";
import { getToken } from "../utils/getToken.js";

function Lakes() {
  const { user, userProfile } = useContext(AuthContext);
  const [lakes, setLakes] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/api/lakes/all").catch(
        console.log("Error")
      );
      const data = await res.json();
      console.log("all", data);
      setLakes(data);
    };
    fetchData();
  }, []);

  const getFavourites = async (userName) => {
    try {
      const token = getToken();
      const res = await axios.get(
        `http://localhost:5000/api/lakes/favourite/${userName}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("favs", res.data);
      setFavourites(res.data);
    } catch (error) {
      console.log("error getting your favourites", error);
    }
  };

  return (
    <div className="lakeContainer">
      <Row xs={1} md={2} className="g-4">
        {lakes &&
          getFavourites(userProfile.userName) &&
          lakes.map((lake, i) => {
            let isFav = favourites.some((e) => {
              console.log("fav", e._id);
              console.log(lake._id);
              if (e._id === lake._id) {
                return true;
              }
              return false;
            });
            console.log("isFav", isFav);
            const addFavourite = async () => {
              const token = getToken();
              try {
                await axios.post(
                  "http://localhost:5000/api/lakes/favourite",
                  { id: lake._id, userName: userProfile.userName },
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                console.log("Update successful");
              } catch (error) {
                console.log("error adding favourite", error);
              }
            };
            return (
              <div key={i}>
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
                      <Card.Text>
                        {isFav ? (
                          <SuitHeartFill color="blue" />
                        ) : (
                          <SuitHeart color="lightblue" onClick={addFavourite} />
                        )}{" "}
                        {lake.likes.length}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        {lake.area} {lake.location}
                      </small>
                    </Card.Footer>
                    <Card.Footer>
                      {/*                       <small className="text-muted">More Details</small> */}
                      <Button onClick={() => setModalShow(true)} variant="dark">
                        More
                      </Button>
                      {/*  <LakeDetailsModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      /> */}
                    </Card.Footer>
                  </Card>
                </Col>
              </div>
            );
          })}
      </Row>
      <div>
        {user ? (
          <Button className="signButton" href="/newlake">
            Add Lake
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Lakes;
