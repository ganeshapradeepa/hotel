import React, { useState, useEffect, useContext } from "react";
import  "./MealItem.css";

import { collection, getDocs } from "firebase/firestore";
import fireDB from "../../../fireConfig";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../Store/cart-context";
import Grid from "@material-ui/core/Grid";



const MealItem = (props) => {
  const [products, setProducts] = useState([]);
  const cartCtx = useContext(CartContext);
  const price = `₹ ${props.price.toFixed(2)}`;
  useEffect(() => {
    getdata();
  }, []);

  async function getdata() {
    try {
      const users = await getDocs(collection(fireDB, "products"));
      const productsArry = [];

      setProducts(productsArry);
    } catch (error) {}
  }

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      imageUrl: props.imageUrl,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
   
  
    <Grid container >
    <Grid item xs={6} md={6}>
   
      <div className='meal'>
      <div className="nm">
            <img  src={props.imageUrl} className="nme"/>
          <div className="name">
            <h3>{props.name}</h3>
            <p className="description">{props.description}</p>
            <h3 className="pa">{price}</h3>
            </div>
          <div className="up">
            <MealItemForm onAddToCart={addToCartHandler} />
          </div>
       
        </div>
        </div>
      
    </Grid>
    <Grid  xs={6} md={6}>
   
   <div className='meal'>
   <div className="nm">
         <img  src={props.imageUrl} className="nme"/>
       <div className="name">
         <h3>{props.name}</h3>
         <p className="description">{props.description}</p>
         <h3 className="pa">{price}</h3>
         </div>
       <div className="up">
         <MealItemForm onAddToCart={addToCartHandler} />
       </div>
    
     </div>
     </div>
   
 </Grid>
    </Grid>
   
  );
};
export default MealItem;
