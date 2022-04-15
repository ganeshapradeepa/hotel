import  {useEffect,useState} from 'react'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import fireDB from '../../fireConfig' 
import './AvailableMeals.css'
import { Grid } from '@material-ui/core'






const AvailableMeals = () => {
 
  const [products, setProducts]=useState([]);
  useEffect(()=>{
  getdata()
},[])
 
  async function getdata(){
     try {
     const users = await getDocs(collection(fireDB, 'products'))
const productsArry = []
    
users.forEach((doc) => {
const obj={
  id:doc.id,
  ...doc.data()
}
productsArry.push(obj)

});
setProducts(productsArry)
     }catch (error){
     }
 }
 
  const mealsList = products.map((product) => ([
    
      <MealItem 
       key={product.id}
      id={product.id}
    imageUrl={product.imageUrl}
      name={product.name}
      description={product.description}
      price={product.price}
      />]
      
  ))
  
    return (<div className='container'>
     

       <section className='row'>
    <Card className='col-md-4'>
        
         <ul>{mealsList}</ul>
      
      </Card>
    </section>
    
    
    </div>
  );
 
 

};
export default AvailableMeals;
