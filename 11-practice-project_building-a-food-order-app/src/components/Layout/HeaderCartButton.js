import classes from './HeaderCartButton.module.css';
import CartIcon from "../Cart/CartIcon";
import {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
    const [btnHighlited, setBtnHighlited] = useState(false);
    const ctx = useContext(CartContext);
    const {items} = ctx;
    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0);
    const btnClasses = `${classes.button} ${btnHighlited ? classes.bump : ''}`;
    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnHighlited(true);
        const timer = setTimeout(() => {
            setBtnHighlited(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items])
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;