import axios from "../../axios"
import { Link } from "react-router-dom";
import categories from '../../categories/catagories'
import '../pages/Home.css';
import { Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../../features/productSlice";
import { ProductPreview } from "../ProductPreview";
export const Home = () => {
const dispatch = useDispatch()

const products = useSelector((state)=>state.products)

useEffect(()=>{

  axios.get("/products").then(({data})=>dispatch(updateProducts(data)))
},[])

  return (
    <div className="home">
      
      <img
        src="https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png"
        alt=""
        className="home-banner"
      />
      <div className="featured-products-container container mt-4">
        <h2>Latest products</h2>
        {/* LAST PRODUCTS HERE */}
        <div className="d-flex justify-content-center flex-wrap">
 {products.map((product)=>{
  return(
    <ProductPreview {...product}/>
  )
 })}
</div>
        <div>
          <Link
            to="/category/all"
            style={{
              textAlign: "right",
              display: "block",
              textDecoration: "none",
            }}
          >
            See more{">>"}
          </Link>
        </div>
      </div>
      {/* BANNER */}
      <div className="sale__banner--container mt-4">
        <img
          src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png"
          alt=""
        />
      </div>
      <div className="recet-products-container container mt-4">
        <h2>Categories</h2>
        <Row>
          {categories.map((category) => {
            return (
              <LinkContainer
                key={category.name}
                to={`/category/${category.name.toLowerCase()}`}
              >
                <Col md={4}>
                  <div
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                      gap: "10px",
                    }}
                    className="category-tile"
                  >
                    {category.name}
                  </div>
                </Col>
              </LinkContainer>
            );
          })}
        </Row>
      </div>
    </div>
  );
};
