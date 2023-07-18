import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "../components/Loading";
import { Badge, Button, Table } from "react-bootstrap";
function OrdersAdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products);
  const [orderToShow, setORderToShow] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/orders/list")
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

 
  console.log(orders[0]?.owner?.name);

  if (orders.length === 0) {
    return <h1 className="text-center pt-4">No orders yet</h1>;
  }
  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Client Name</th>
          <th>Items</th>
          <th>Order Total</th>
          <th>Adress</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          return (
            <tr>
              <td>{order._id}</td>
              <td>{order?.owner?.name}</td>
              <td>{order.count}</td>
              <td>${order.total}</td>
              <td>{order.adress}</td>
              <td>
       {order.status==="processing"?<Button>Mark as shhipped</Button>:<Badge bg="success">Shipped</Badge>}
              </td>
              <td>{order.date}</td>
            
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
export default OrdersAdminPage;
