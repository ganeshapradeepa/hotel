import React, { useState, useEffect, useContext } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../../fireConfig";
import CartContext from "../../Store/cart-context";
import "./Home.css";
import MealItemForm from "../Meals/MealItem/MealItemForm";

export function Home(props) {
  const cartCtx = useContext(CartContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getdata();
  }, []);

  async function getdata() {
    try {
      const users = await getDocs(collection(fireDB, "products"));
      const productsArry = [];

      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArry.push(obj);
      });
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
  // function addmealdata(){
  //   dMeals.map( async (product)=>{

  //     try {
  //     await addDoc(collection(fireDB, 'products'), product)
  //     }catch (error){
  //     console.log(addmealdata)}
  //    })
  // }
  return (
    <div className="container">
      <div className="row">
        {products.map((product) => {
          return (
            <div>
              <div>
                <img src={product.imageUrl} alt="" className="product-img" />
              </div>
              <div className="rom">
                <h3>{product.name}</h3>
                <p className="para">{product.description}</p>
                <h4 className="bol">₹ {product.price}</h4>
              </div>

              <MealItemForm onAddToCart={addToCartHandler} />
              <button className="cart">ADD TO CART</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
