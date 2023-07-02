import { useEffect, useState } from "react";
import {
  Container,
  Col,
  Row,
  Badge,
  ButtonGroup,
  Form,
  Button,
} from "react-bootstrap";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import axios from "../../axios";
import { SimilarProduct } from "../SimilarProduct";
import "../pages/ProductPage.css";
import { LinkContainer } from "react-router-bootstrap";
export function ProductPage() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
  function handleDragStart(e) {
    e.preventDefault();
  }
  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data.product);
      setSimilar(data.similar);
    });
  }, [id]);

  console.log(id);
  if (!product) {
    return <Loading />;
  }
  const resposive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const images = product.pictures.map((picture) => (
    <img
      key={picture.name}
      className="product__carousel--image"
      src={picture.url}
      onDragStart={handleDragStart}
    />
  ));
  //   let similarProducts = [];
  //   if (similar) {
  //     similarProducts = similar.map(({product, idx}) => {
  //       return <div key={idx} className="item" data-value={idx}>
  // <SimilarProduct {...product}/>

  //       </div>;
  //     });
  //   }
  return (
    <Container className="pt-4" style={{ position: "relative" }}>
      <Row>
        <Col lg={6}>
          <AliceCarousel
            animationType="slide"
            mouseTracking
            items={images}
            controlsStrategy="alternate"
          />
        </Col>
        <Col lg={6} className="pt-4">
          <h1>{product.name}</h1>
          <p>
            <Badge bg="primary">{product.category}</Badge>
          </p>
          <p className="product__price">${product.price}</p>
          <p style={{ textAlign: "justify" }} className="py-3">
            <strong>Description:</strong>
            {product.description}
          </p>
          {user && !user.isAdmin && (
            <ButtonGroup style={{ width: "90%" }}>
              <Form.Select
                size="lg"
                style={{ width: "40%", borderRadius: "0" }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
              <Button size="lg">Add to cart</Button>
            </ButtonGroup>
          )}
          {user && user.isAdmin && (
            <LinkContainer to={`/product/${product._id}/edit`}>
              <Button size="lg">Edit Product</Button>
            </LinkContainer>
          )}
        </Col>
      </Row>
      <div className="my-4">
        <h2>Similar Products</h2>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          {similar.map((product) => {
            return <div>
                <h4>{product.name}</h4>
                <img src={product.pictures[0].url} alt="" />
            </div>;
          })}
        </div>
      </div>
    </Container>
  );
}
