import "./views.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../context/AuthContext";
import { CheckLg, SuitHeart, SuitHeartFill } from "react-bootstrap-icons";
import LakeDetailsModal from "../components/LakeDetailsModal/LakeDetailsModal";
import { getToken } from "../utils/getToken.js";

function Lakes() {
  const { user, userProfile } = useContext(AuthContext);
  const [lakes, setLakes] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/lakes/all");
        setLakes(res.data);
        console.log(res.data);
        setTimeout(function () {
          setLoading(false);
        }, 2000);
        console.log("res", res.data);
      } catch (error) {
        console.log("error getting the lakes", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    getFavourites(userProfile.userName);
  }, [loading]);

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

  const addFavourite = async (lakeID) => {
    const token = getToken();
    try {
      await axios.post(
        "http://localhost:5000/api/lakes/favourite",
        { id: lakeID, userName: userProfile.userName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("You liked that lake");
    } catch (error) {
      console.log("error adding favourite", error);
    }
  };

  const deleteFavourite = async (lakeID) => {
    const token = getToken();
    try {
      await axios.post(
        "http://localhost:5000/api/lakes/unlike",
        { id: lakeID, userName: userProfile.userName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("You unliked that lake");
    } catch (error) {
      console.log("error adding favourite", error);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner animation="grow" style={{ width: "10rem", height: "10rem" }} />
      ) : (
        <div className="lakeContainer">
          <Row xs={1} md={2} className="g-4">
            {lakes.map((lake, i) => {
              let isFav = favourites.some((e) => {
                if (e._id === lake._id) {
                  return true;
                }
                return false;
              });
              console.log("isFav", isFav);

              return (
                <div key={i}>
                  <Col>
                    <Card>
                      <Card.Img
                        variant="top"
                        className="cardImage"
                        src="{lake.lakePicture}"
                      />
                      <Card.Body>
                        <Card.Title>{lake.name}</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </Card.Text>
                        <Card.Text>
                          {isFav ? (
                            <SuitHeartFill
                              color="#ff6583"
                              size="20px"
                              onClick={() => deleteFavourite(lake._id)}
                            />
                          ) : (
                            <SuitHeart
                              color="#000000"
                              size="20px"
                              onClick={() => addFavourite(lake._id)}
                            />
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
                        <Button
                          onClick={() => setModalShow(true)}
                          variant="light"
                        >
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
          {user ? (
            <div>
              <Button className="signButton" href="/newlake">
                Add Lake
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}

export default Lakes;
