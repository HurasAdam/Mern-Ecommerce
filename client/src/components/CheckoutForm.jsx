import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../services/appApi";
import { useState } from "react";
import { Alert, Col,Form,Row,Button } from "react-bootstrap";

 function CheckoutForm(){
const stripe=useStripe();
const elements=useElements()
const user=useSelector(state=>state.user)
const navigate = useNavigate();
const [alertMessage,setAlertMessage]=useState("");
const [createOrder,{isLoading,isError,isSuccess}]=useCreateOrderMutation();
const [country,setCountry]=useState("");
const [adress,setAdress]=useState("");
const [paying,setPaying]=useState(false);

async function handlePay(e){
    e.preventDefault();
if(!stripe||!elements||user.cart.count<=0){
    return console.log('All field need to be filled')
}
else{
    setPaying(true);
    const {client_secret}=await fetch("http://127.0.0.1:3001/create-payment",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({amount:user?.cart?.total}),
    }).then((res)=>res.json());
    const {paymentIntent}=await stripe.confirmCardPayment(client_secret,{
        payment_method:{
            card:elements.getElement(CardElement),
        },
    })
    setPaying(false);

    if(paymentIntent){
        createOrder({userId:user._id,cart:user.cart,adress,country}).then(res=>{
            if(!isLoading&&!isError){
                setAlertMessage(`Payment ${paymentIntent.status}`);
                setTimeout(()=>{
navigate('/orders')
                },1800)
            }
        })
    }
}
}

  return (
   <Col md={7} className="cart-payment-container" >

    <Form onSubmit={handlePay}>
<Row>
    {alertMessage&& <Alert>{alertMessage}</Alert>}

    <Col md={6}>
        <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="First Name" value={user.name} disabled/>
        </Form.Group>
    </Col>
    <Col md={6}>
        <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Email" value={user.email} disabled/>
        </Form.Group>
    </Col>
    </Row>
    <Row>
    <Col md={7}>
        <Form.Group className="mb-3">
            <Form.Label>Adress</Form.Label>
            <Form.Control type="text" placeholder="Adress" value={adress} required onChange={(e)=>setAdress(e.target.value)}/>
        </Form.Group>
    </Col>
    <Col md={5}>
        <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" placeholder="Country" value={country} required onChange={(e)=>setCountry(e.target.value)}/>
        </Form.Group>
    </Col>
    </Row>
    <label htmlFor="card-element">Cart</label>
    <CardElement id="card-element"/>
    <Button className="mt-3" type="submit" disabled={user.cart.count<=0||paying}>{paying?"Processing...":"Pay"||isSuccess}</Button>
    </Form>
   </Col>
  )
}
export default CheckoutForm;
