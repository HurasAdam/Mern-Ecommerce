import axios from "../axios";
import { Container, Tab, Row, Col, Nav } from "react-bootstrap";
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <Container>
      <Tab.Container>
        <Row>
          <Col md={3}>
            <Nav variant="pills" className="flex-columns">
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
          <Col md={9}>
            <Tab.Content>Hello</Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}
export default AdminDashboard;
