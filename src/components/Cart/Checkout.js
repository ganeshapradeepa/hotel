import React, { useRef, useState } from 'react';

import classes from './Checkout.module.css';


const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;
const isTenChars = (value) => value.trim().length === 13;
const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
    Number: true,
   
  });
  
  
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const  NumberInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredNumber = NumberInputRef.current.value;
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
    const enteredNumberIsValid = isTenChars(enteredNumber);
    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
      Number: enteredNumberIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid &&
      enteredNumberIsValid;
    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode, 
      Number:enteredNumber,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? '' : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? '' : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? '' : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? '' : classes.invalid
  }`;
  
  const  NumberControlClasses = `${classes.control} ${
    formInputsValidity.Number ? '' : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={NumberControlClasses}>
        <label htmlFor='whatsapp'>Number</label>
        <input type='text' id=' whatsapp' ref={NumberInputRef} />
        {!formInputsValidity.Number && <p>Please enter a valid Number</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
       
      </div>
    </form>
  );
};

export default Checkout;