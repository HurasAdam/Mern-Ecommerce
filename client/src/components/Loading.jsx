import { Spinner } from "react-bootstrap";

 const Loading = () => {
  return <div className="loading-container" style={{minHeight:"100vh",display:"flex",alignContent:"center",justifyContent:"center"}}>
    <Spinner animation="grow"/>
  </div>;
};

export default Loading