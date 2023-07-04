import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../pages/CategoryPage.css"
import Loading from "../Loading";
import axios from "../../axios"
import { useParams } from "react-router-dom";
import { ProductPreview } from "../ProductPreview";
function CategoryPage() {
    const {category}=useParams()
    const [loading,setLoading]=useState(true);
    const [products,setProducts]=useState([]);
    const [searchTerm,setSearchTerm]=useState("")
useEffect(()=>{
axios.get(`/products/category/${category}`).then(({data})=>{
setLoading(false);
setProducts(data)
})
.catch((e)=>{
    setLoading(false);
    console.log(e.message)
})
},[category])

if(loading){
    return <Loading/>
}

const productsSearch = products.filter((product) =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase())
);
  return <div className="category-page-container">
    <div className={`pt-3 ${category}-banner-container category-banner-container`}>
  <h1 className="text-center">{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
  </div>
  <div className="filters-container d-flex justify-content-center pt-4 pb-4">
    <input type="search" placeholder="Search" onChange={(e)=>setSearchTerm(e.target.value)}/>
     </div>
     {productsSearch.length===0?(
    <h2>No products to show</h2>
):(<Container>
    <Row>
        <Col md={{span:10, offset:1}}>
            <div className="d-flex justify-content-center align-items-center flex-wrap">
            {productsSearch.map((product)=><ProductPreview {...product} key={product.name}/>)}
            </div>
     
        </Col>
    </Row>
</Container>)}
  </div>;

}
export default CategoryPage;
