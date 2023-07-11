import { useState } from "react"
import { ToastContainer,Toast } from "react-bootstrap";
import "./ToastMessage.css"


function ToastMessage({bg,title,body,position}){
    const [show,setShow]=useState(true);
  return (
<ToastContainer position="bottom-right " className={`toast-container-${position}`}>
<Toast bg={bg} onClose={()=>setShow(false)} show={show} delay={1800} autohide>
    <Toast.Header>
        <strong className="me-auto">{title}</strong>
        <small>now</small>
    </Toast.Header>
    <Toast.Body>
        {body}
    </Toast.Body>
</Toast>
</ToastContainer>
  )
}

export default ToastMessage
