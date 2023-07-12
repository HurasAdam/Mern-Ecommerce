import { useSelector } from "react-redux";
import "../pages/OrdersPage.css";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { Container, Table } from "react-bootstrap";
import Loading from "../Loading";
function OrdersPage() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.producst);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderToShow, setOrderToShow] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/users/${user._id}/orders`)
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);


if(loading){
    return <Loading/>
}
if(orders.length===0){
    return <h1 className="text-center pt-3">No orders yet</h1>
}

  return (
    <Container>
      <h1 className="text-center">Your orders</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Total</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr>
                <td>{order._id}</td>
                <td>
                  <Badge
                    bg={`${order.status === "processing"}?"warning":"success"`}
                    text="white"
                  >
                    {order.status}
                  </Badge>
                </td>
                <td>${order.total}</td>
                <td>{order._id}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
export default OrdersPage;
