import React from 'react'
import { Badge, Card } from "react-bootstrap";
import { LinkContainer} from 'react-router-bootstrap'

export const ProductPreview = ({_id,category,name,pictures}) => {
  return (
  <LinkContainer to={`/product/${_id}`}style={{cursor:"pointer", width:"13rem",margin:"10px"}}>
  <Card style={{width:"20rem",margin:"10px"}}>
<Card.Img varinat="top" className="product-preview-img" src={pictures[0].url} style={{height:"150px", objectFitL:"cover"}} />
<Card.Body>
    <Card.Title>{name}</Card.Title>
    <Badge bg="warning">{category}</Badge>
</Card.Body>
  </Card>
  </LinkContainer>
  )
}
