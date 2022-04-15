import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItems";
import classes from "./Cart.module.css";
import CartContext from "../../Store/cart-context";
import Checkout from "./Checkout";
import Payment from "./Payment";



const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
 
  var Names =[];
  
  var  Streets=[];
   
  var  PostalCodes=[];
  var  WhatsappNumbers=[];
   

  
  const cartCtx = useContext(CartContext);
 
  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData ) => {
  const messae=[
    
     `Name= ${userData.name}`,
     `\nNumber= ${userData.Number}`,
     `\nStreet= ${userData.street}`,
     `\nCity= ${userData.city}`,
      `\nPostalCode= ${userData.postalCode}\n ORDERED ITEMS :\n`
      
     ];
     

    setIsSubmitting(true);
    
     
    
    await fetch('https://html-project-fac8e-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
        
      }),
     
     
    });
    console.log('cart',cartItems)
    const message=[
   `\nItem Name= ${cartCtx.items[0].name}`,
     `\nPrice= ₹${cartCtx.items[0].price}\n`, 
  ]+
  [
   `\nItem Name= ${cartCtx.items[1].name}`,
     `\nPrice= ₹${cartCtx.items[1].price}\n`, 
  ]+[
   `\nItem Name= ${cartCtx.items[2].name}`,
     `\nPrice= ₹${cartCtx.items[2].price}\n`, 
  ]+[
   `\nItem Name= ${cartCtx.items[3].name}`,
     `\nPrice= ₹${cartCtx.items[3].price}\n`, 
  ]
    
    const messa=[
      
      `TotalAmount = ₹${cartCtx.totalAmount.toFixed(2)}`
         
         ];
         console.log(messa)
        
    const URL ="https://api.whatsapp.com/send?phone=+918310766874&text=&app";
    const number =userData.name.replace(/[^\w\s]/gi, "").replace(/ /g, "");

   
   
    let url = `${URL}?phone=${number}`;
    url += `&text=  ${ encodeURI( messae+message+messa )}&app_absent=`;
    
    window.open(url);
   
   
    setIsSubmitting(false);
    setDidSubmit(true);
    //cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
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
  
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
       
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
     
      {!isCheckout && modalActions}
     
    </React.Fragment>
  );
  

  const isSubmittingModalContent = <p>Pay Amount...</p>;

  const didSubmitModalContent = ( 
    <>
    
    <React.Fragment>
      
 
      <div className={classes.actions}>
     
      
        
        <div className={classes.pad}>
      <Payment />
      </div>
      <button className={classes.buttons} onClick={props.onClose}>
        Close
      </button>
    </div>
    </React.Fragment>
    </>
  );

  return (
    <>
    
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
    </>
  );
};

export default Cart;