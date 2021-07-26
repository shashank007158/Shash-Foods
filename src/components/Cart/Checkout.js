import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const pincodeLength = (pincode) => pincode.trim().length !== 6;
const phoneNumLength = (phone) => phone.trim().length !== 10;
const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    phone: true,
    street: true,
    city: true,
    pincode: true,
  });
  const name = useRef();
  const phone = useRef();
  const street = useRef();
  const city = useRef();
  const pincode = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = name.current.value;
    const enteredPhone = phone.current.value;
    const enteredStreet = street.current.value;
    const enteredCity = city.current.value;
    const enteredPincode = pincode.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredPhoneIsValid = !phoneNumLength(enteredPhone);
    const enteredstreetIsValid = !isEmpty(enteredStreet);
    const enteredcityIsValid = !isEmpty(enteredCity);
    const enteredpincodeValid = !pincodeLength(enteredPincode);

    setFormInputValidity({
      name: enteredNameIsValid,
      phone: enteredPhoneIsValid,
      street: enteredstreetIsValid,
      city: enteredcityIsValid,
      pincode: enteredpincodeValid,
    });
    const formIsValid =
      enteredNameIsValid &&
      enteredPhoneIsValid &&
      enteredcityIsValid &&
      enteredstreetIsValid &&
      enteredpincodeValid;
    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      phone: enteredPhone,
      street: enteredStreet,
      city: enteredCity,
      pincode: enteredPincode,
    });
  };
  const nameClass = `${classes.control} ${
    !formInputValidity.name && classes.invalid
  }`;
  const phoneClass = `${classes.control} ${
    !formInputValidity.phone && classes.invalid
  }`;
  const cityClass = `${classes.control} ${
    !formInputValidity.city && classes.invalid
  }`;
  const streetClass = `${classes.control} ${
    !formInputValidity.street && classes.invalid
  }`;
  const pincodeClass = `${classes.control} ${
    !formInputValidity.pincode && classes.invalid
  }`;
  const onChangeHandler = (e) => {
    setFormInputValidity((prev) => {
      return { ...prev, [e.target.name]: true };
    });
  };
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClass}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          ref={name}
          onChange={onChangeHandler}
        />
        {!formInputValidity.name && (
          <p style={{ color: "red" }}>Please enter a valid name</p>
        )}
      </div>
      <div className={phoneClass}>
        <label htmlFor="phone">Phone</label>
        <input
          type="number"
          id="phone"
          name="phone"
          ref={phone}
          onChange={onChangeHandler}
        />
        {!formInputValidity.phone && (
          <p style={{ color: "red" }}>
            Please enter a valid phone number (Do not include telephone code)
          </p>
        )}
      </div>
      <div className={streetClass}>
        <label htmlFor="street">Street and Area</label>
        <input
          type="text"
          id="street"
          name="street"
          ref={street}
          onChange={onChangeHandler}
        />
        {!formInputValidity.street && (
          <p style={{ color: "red" }}>Please enter a valid street</p>
        )}
      </div>

      <div className={cityClass}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          ref={city}
          name="city"
          onChange={onChangeHandler}
        />
        {!formInputValidity.city && (
          <p style={{ color: "red" }}>Please enter a valid city</p>
        )}
      </div>
      <div className={pincodeClass}>
        <label htmlFor="postal">Pincode</label>
        <input
          type="text"
          id="postal"
          name="pincode"
          ref={pincode}
          onChange={onChangeHandler}
        />
        {!formInputValidity.pincode && (
          <p style={{ color: "red" }}>Please enter a valid pincode</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
