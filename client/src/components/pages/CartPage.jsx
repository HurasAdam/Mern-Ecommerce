import "./CartPage.css";
import { useSelector } from "react-redux";
import { Container, Row, Alert, Col, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import {
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useRemoveFromCartMutation,
} from "../../services/appApi";
import ToastMessage from "../ToastMessage";
function CartPage() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user?.cart;

  let cart = products.filter((product) => userCartObj?.[product._id] != null);
  const [increaseCart] = useIncreaseCartProductMutation();
  const [decreaseCart, { data, isError,  error: { data: errorMessage } = {} }] =
    useDecreaseCartProductMutation();
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

  function handleDecrease(product) {
    decreaseCart(product);
  }
  return (
    <Container style={{ minHeight: "95vh" }} className="cart-container">
      <Row>
        <Col md={7}>
          <h1 className="pt-2 h3">Shopping cart</h1>
          {cart.length == 0 ? (
            <Alert variant="info">
              Shopping cart is empty. Add products to your cart
            </Alert>
          ) : (
            <div>Payment here</div>
          )}
        </Col>
        <Col md={5}>
          {cart.length > 0 && (
            <>
              <Table responsive="sm" className="cart-table">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quanity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {/* LOOP thru cart products */}
                  {cart.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>&nbsp;</td>
                        <td>
                          {!isLoading && (
                            <FontAwesomeIcon
                              className="cart-action-icon remove"
                              icon={faXmark}
                              style={{ marginRight: 10 }}
                              onClick={() =>
                                removeFromCart({
                                  productId: item._id,
                                  price: item.price,
                                  userId: user._id,
                                })
                              }
                            />
                          )}
                          <img
                            src={item.pictures[0].url}
                            style={{
                              width: 100,
                              height: 100,
                              objectFit: "cover",
                            }}
                            alt=""
                          />
                        </td>
                        <td>{item.price}</td>
                        <td>
                          <span className="quantity-indicator">
                       <FontAwesomeIcon
                         
                              className={`${user&&user.cart[item._id]<=1?"cart-action-icon minus-disabled":"cart-action-icon minus"}`}
                              icon={faCircleMinus}
                              size="lg"
                              style={{ color: "#27282b" }}
                              onClick={() =>
                                handleDecrease({
                                  productId: item._id,
                                  price: item.price,
                                  userId: user._id,
                                })
                              }
                            />
                            <span>{user.cart[item._id]}</span>
                            <FontAwesomeIcon
                              className="cart-action-icon plus"
                              icon={faCirclePlus}
                              size="lg"
                              style={{ color: "#27282b" }}
                              onClick={(e) =>
                                increaseCart({
                                  productId: item._id,
                                  price: item.price,
                                  userId: user._id,
                                })
                              }
                            />
                          </span>
                        </td>
                        <td>{item.price * user.cart[item._id]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <div>
                <h3 className="h4 pt-4">Total:${user.cart.total}</h3>
              </div>
            </>
          )}
          {isError && (
            <ToastMessage
              item={"asdas"}
              bg="warning"
              title={isError && errorMessage && errorMessage.data}
              position={"top"}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default CartPage;
