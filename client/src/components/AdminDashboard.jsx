import axios from "../axios";
import { Container, Tab, Row, Col, Nav } from "react-bootstrap";
import "./AdminDashboard.css";
import DashboardProducts from "./DashboardProducts";
import OrdersAdminPage from './OrdersAdminPage';
function AdminDashboard() {
  return (
    <Container>
      <Tab.Container defaultActiveKey="products">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="products">Products</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="orders">Orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="clients">Clients</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Pane eventKey="products">
<DashboardProducts/>
            </Tab.Pane>
            <Tab.Pane eventKey="orders">
<OrdersAdminPage/>
            </Tab.Pane>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}
export default AdminDashboard;
