import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AliceCarousel from "react-alice-carousel";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import axios from "../../axios";
export function ProductPage() {
  const { id } = useParams;
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
  function handleDragStart(e) {
    e.preventDefault();
    useEffect(() => {
      axios.get(`/products/${id}`).then(({ data }) => {
        setProduct(data.product);
        setSimilar(data.similar);
      });
    }, [id]);
  }

  const images = product.map((picture) => (
    <img
      className="product__carousel--image"
      src={picture.url}
      onDragStart={handleDragStart}
    />
  ));
  if (!product) {
    return <Loading />;
  }

  let similarProducts = [];
  if (similar) {
    similarProducts = similar.map((product, idx) => {
      return <div className="item" data-value={idx}>
<SimilarProduct/>

      </div>;
    });
  }
  return (
    <Container className="pt-4" style={{ position: "relative" }}>
      <Row>
        <Col lg={6}>
          <AliceCarousel
            mouseTracking
            items={images}
            controlsStrategy="alternate"
          />
        </Col>
      </Row>
    </Container>
  );
}
