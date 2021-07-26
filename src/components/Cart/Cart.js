import { Fragment, useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import axios from "axios";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [checkout, setCheckout] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  const orderHandler = () => {
    setCheckout(true);
  };
  const submitOrder = async (userData) => {
    setSubmitting(true);
    const data = { user: userData, orderedItems: cartCtx.items };
    const config = { headers: { "Content-Type": "application/json" } };
    await axios.post(
      "https://react-hooks-5b742-default-rtdb.firebaseio.com/orders.json",
      data,
      config
    );
    setSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const cartModal = (
    <Fragment>
      {" "}
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkout && (
        <Checkout onConfirm={submitOrder} onCancel={props.onClose} />
      )}
      {!checkout && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </Fragment>
  );
  const isSubmittingModal = <p>Sending your order data...</p>;
  const didSubmitModal = (
    <Fragment>
      <p>
        Your order has been placed sucessfully!! Be ready to taste your food!!!
      </p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );
  return (
    <Modal onClose={props.onClose}>
      {!submitting && !didSubmit && cartModal}
      {submitting && isSubmittingModal}
      {!submitting && didSubmit && didSubmitModal}
    </Modal>
  );
};

export default Cart;
