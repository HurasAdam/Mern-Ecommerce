import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "../components/Loading";
import { Badge, Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
function OrdersAdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products);
  const [orderToShow, setORderToShow] = useState([]);
  const [show, setShow] = useState(false);

  function markShipped(orderId, ownerId) {
axios.patch(`/orders/${orderId}/mark-shipped`,{ownerId})
.then(({data})=>setOrders(data))
.catch((e)=>console.log(e))
  }
  function showOrder(){

  }

  useEffect(() => {
    setLoading(true);
    axios
      .get("/orders")
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

  console.log(orders);

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
                {order.status === "processing" ? (
                  <Button
                    size="sm"
                    onClick={() => markShipped(order._id, order.owner?._id)}
                  >
                    Mark as shhipped
                  </Button>
                ) : (
                  <Badge bg="success">Shipped</Badge>
                )}
              </td>
              <td>
                <span style={{ cursor: "pointer" }} onClick={()=>showOrder(products)}>
                  View order
                  <FontAwesomeIcon icon={faEye} style={{margin:"0px 6px"}}/>
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
export default OrdersAdminPage;
