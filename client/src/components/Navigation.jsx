import { Navbar, NavDropdown, Nav, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {useRef,useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "../components/Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetNotifications } from "../features/userSlice";
import axios from "axios";
import {useToggleNotificationStatusMutation} from "../services/appApi"
export const Navigation = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
const bellRef= useRef(null);
const notificationRef=useRef(null);
const [bellPosition,setBellPosition]=useState({})
const [toggle, { isLoading }] = useToggleNotificationStatusMutation();


  function handleLogout() {
    dispatch(logout());
  }
 
  const unreadNotifications = user?.notifications?.reduce((acc, current) => {
    if (current.status == "unread") return acc + 1;

    return acc;
}, 0);

  function handleToggleNotifications() {
    const position = bellRef.current.getBoundingClientRect();
    setBellPosition(position);
    notificationRef.current.style.display = notificationRef.current.style.display === "block" ? "none" : "block";
    console.log(unreadNotifications)
   toggle(user._id)
dispatch(resetNotifications())
   
}

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Ecommerce</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
              <LinkContainer to={"/login"}>
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}

            {user && !user.isAdmin && (
              <LinkContainer to="/cart">
                <Nav.Link>
                <FontAwesomeIcon
                  icon={faCartShopping}
                />
                  {user?.cart?.count > 0 && (
                    <span className="badge badge-warning" id="cartcount">
                      {user.cart.count}
                    </span>
                  )}
                </Nav.Link>
              </LinkContainer>
            )}

            {user && (
              <>
             <Nav.Link     style={{position:"relative"}} onClick={handleToggleNotifications}>
   <div className={`${unreadNotifications===0?'notification-bell-container':'notification-bell-container--active'}`} data-count={unreadNotifications || null}>
             <FontAwesomeIcon className="notification-bell" icon={faBell} ref={bellRef}  />
             </div>
             </Nav.Link>
              <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
                {user.isAdmin && (
                  <>
                    <LinkContainer to={"/admin"}>
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to={"/new-product"}>
                      <NavDropdown.Item>Create Product</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}
                {!user.isAdmin && (
                  <>
                    <LinkContainer to={"/cart"}>
                      <NavDropdown.Item>Cart</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to={"/orders"}>
                      <NavDropdown.Item>My orders</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}
                <NavDropdown.Divider />
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  Logout
                </Button>
              </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      {/* Notifications */}
    <div className="notofications-container" ref={notificationRef} style={{ position: "absolute", top: bellPosition.top + 30, left: bellPosition.left, display:"none" }}>
      {
      user?.notifications.length>0?(
      user&&user.notifications.map((notification)=>{
        return(<p className={`notification-${notification.status}`}>
          {notification.message}
          <br />
          <span>{notification.time.split('T')[0]+" "+ notification.time.split('T')[1]}}</span>
          <span className="notification-clearBtn">X</span>
        </p>)
      })):(<p>No notifications yet</p>)
    }
    </div>
    </Navbar>
  );
};
