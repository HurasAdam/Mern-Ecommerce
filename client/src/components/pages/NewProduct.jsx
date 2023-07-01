import { useState } from "react";
import "./NewProduct.css";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../services/appApi";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios";

export const NewProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [imgToRemove, setImgToRemove] = useState(null);
  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();

  function handleRemoveImg(imgObj) {
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setImgToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !description || !price || !category || !images.length) {
      return alert("Please fill out all the fields");
    }

      createProduct({ name, description, price, category, images }).then(({data})=>{
        if(data.length>0){
          setTimeout(()=>{
            navigate("/");
          },1500)
        }
      })


  

  }

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dxupb5ce8",
        uploadPreset: "qrlmprdr",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  }

  return (
    <div>
      <Container>
        <Row>
          <Col md={6} className="new-product_form--container">
            <Form style={{ width: "100%" }}>
              <h1>Create a product</h1>
              {isSuccess && (
                <Alert variant="success">Product created with success</Alert>
              )}
              {isError && <Alert variant="danger">{error.data}</Alert>}
              <Form.Group className="mb-3">
                <Form.Label>Product name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Product description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Product description"
                  style={{ height: "100px" }}
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price ($)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Price ($)"
                  style={{ height: "100px" }}
                  value={price}
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                onChange={(e) => setCategory(e.target.value)}
              >
                <Form.Label>Category</Form.Label>
                <Form.Select>
                  <option disabled selected>
                    {" "}
                    -- Select One --
                  </option>
                  <option value="Technology">Technology</option>
                  <option value="Tablets">Tablets</option>
                  <option value="Phones">Phones</option>
                  <option value="Laptops">Laptops</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Button type="button" onClick={showWidget}>
                  Upload Images
                </Button>
                <div className="images-preview-container">
                  {images.map((image) => {
                    return (
                      <div key={image.url} className="image-preview">
                        <img src={image.url} />
                        {imgToRemove !== image.public_id ? (
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            onClick={() => handleRemoveImg(image)}
                          />
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </Form.Group>

              <Form.Group>
                <Button type="submit" disabled={isLoading || isSuccess} onClick={handleSubmit}>
                  Create Product
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col md={6} className="new-product__image--container"></Col>
        </Row>
      </Container>
    </div>
  );
};
