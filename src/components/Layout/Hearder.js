import { Fragment } from "react";
import HeaderCartButton from './HeaderCartButton'
import mealsImage from '../../assets/meals.png'
import classes from './Header.module.css';



const Header = (props) => {
  return(
<Fragment>
      <header className={classes.header}>
        <h2>Sri Maruthi Nati Style</h2>
      
        <HeaderCartButton onClick={props.onShowCart} />
    
      </header>
      <div className={classes['main-image']}>
          <img src={mealsImage} alt='A table full of delicius food! '/>
          </div>
    </Fragment>
  );
};
export default Header;
