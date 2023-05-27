import { useState } from "react"
import {Link} from 'react-router-dom'
import { Col, Container,Row,Form,Button } from "react-bootstrap"

export const Login = () => {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();

    // const handleSubmit=()=>{

    // }

  return (
<Container>
    <Row>
        <Col md={6} className="login__form--container">
            <Form style={{width:"100%"}} >
<h1>Log in</h1>
<Form.Group>
    <Form.Label>
        Email Adress
    </Form.Label>
    <Form.Control type="email" placeholder = "Enter email" value={email} required onChange={(e)=>setEmail(e.target.value)}/>
</Form.Group>

<Form.Group className="mb-3">
    <Form.Label>
       Password
    </Form.Label>
    <Form.Control type="password" placeholder = "Enter Password" value={password} required onChange={(e)=>setPassword(e.target.value)}/>
</Form.Group>

<Form.Group>
<Button type="submit">Login</Button>
   <p>Dont have an account?<Link to='/signup'>Create account</Link></p>
</Form.Group>
            </Form>
        </Col>
        <Col md={6} className="login__image--container"></Col>
    </Row>
</Container>
  )
}
