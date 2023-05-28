import { useState } from "react"
import '../pages/Signup.css'
import { Col, Container,Row,Form,Button,Alert } from "react-bootstrap"
import { Link } from "react-router-dom";
import {useSignupMutation} from '../../services/appApi';
import { useSelector } from "react-redux";


export const Signup = () => {

    const user = useSelector((state) => state.user);
console.log('User state:', user);
const [email,setEmail]=useState('');
const [password,setPassword]=useState('')
const [name,setName]=useState('');
const[signup,{error,isLoading,isError}]=useSignupMutation()

function handleSignup(e){
e.preventDefault();
signup({name,email,password})
}

  return (
    <Container>
    <Row>
        <Col md={6} className="signup__form--container">
            <Form style={{width:"100%"}} onSubmit={handleSignup}>
<h1>Create an account</h1>
{isError && <Alert variant="danger">{error.data}</Alert>}
{isLoading && <Alert variant="primary">{'LOADING'}</Alert>}
{user&& <Alert variant="success">{"Account created successfully"}</Alert>}
<Form.Group>
    <Form.Label>
        name
    </Form.Label>
    <Form.Control type="text" placeholder = "Your name" value={name} required onChange={(e)=>setName(e.target.value)}/>
</Form.Group>

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
<Button type="submit" disabled={isLoading}>Login</Button>
   <p>Dont have an account?<Link to='/signup'>Create account</Link></p>
</Form.Group>
            </Form>
        </Col>
        <Col md={6} className='signup__image--container'>
         
        </Col>
    </Row>
</Container>
  )
  
}
