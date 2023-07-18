import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "../components/Loading";
import { Badge, Table } from "react-bootstrap";
 function OrdersAdminPage() {
const [orders,setOrders]=useState([]);
const [loading,setLoading]=useState(false);
const products = useSelector(state=>state.products);
const[orderToShow,setORderToShow]=useState([]);
const [show,setShow]=useState(false);

useEffect(()=>{
setLoading(true);
axios.get('/orders')
.then(({data})=>{
    setLoading(false);
    setOrders(data);

}).catch((e)=>{
    setLoading(false);
})
},[])

console.log(orders[0].orders)
if(loading){
    return <Loading/>
}

if(orders.length===0){
    return <h1 className="text-center pt-4">No orders yet</h1>
}
  return (
    <Table responsive striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Status</th>
        <th>Date</th>
        <th>Total</th>

      </tr>
    </thead>
    <tbody>
      {orders.map((order) => {
        return (
          <tr>
            <td>{order._id}</td>
            <td>
              <Badge
                bg={`${order.status === "processing"?"warning":"success"}`}
                text="white"
              >
                {order.status}
              </Badge>
            </td>
            <td>{order.date}</td>
            <td>${order.total}</td>
          </tr>
        );
      })}
    </tbody>
  </Table>
  )
}
export default OrdersAdminPage