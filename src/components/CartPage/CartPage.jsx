import React, {useEffect} from 'react';
import './CartPage.css';
import {useDispatch, useSelector} from "react-redux";
import {getCart} from "../../store/CartSlice";
import {getTransportations} from "../../store/TransportationSlice";
import CartService from "../../services/CartServices";
import {Link} from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const CartPage = () => {
    const { cart } = useSelector((state) => state.cartReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCart());
        dispatch(getTransportations());
    }, [dispatch]);

    const handleEditItem = (id, gap) => {
        const item = cart.find((item) => item.id === id);
        if (item) {
            if (item.amount + gap < 0){
                CartService.deleteFromCart(item.id).then(() => {dispatch(getCart())});
            } else {
                CartService.updateCart({type: item.type, amount: item.amount + gap, transportationId: item.transportation.id}, id).then(() => {dispatch(getCart())});
            }
        }
    }

    const handleDeleteItem = async (id) => {
        try{
            await CartService.deleteFromCart(id);
            dispatch(getCart());
        } catch (e) {
            console.error("Error deleting from cart:", e);
        }
    }

    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + item.amount * item.transportation.price, 0);
    }

    return (
        <>
            <Header />
            <div className={"cart"}>
                <h1>Cart</h1>
                {cart.length === 0 && <div>Cart is empty</div>}
                {cart.map((item) => (
                    <div className={"cart_items"}>
                        <div className={"cart_item"}>
                            <img
                                src={"https://i.pinimg.com/originals/4f/7f/0b/4f7f0b4c095626ebcdad7f98d5beb10d.jpg"}
                                id={"photo"}
                            />
                            <h2>{item.transportation.location}</h2>
                        </div>
                        <div className={"cart_item_action"}>
                            <button
                                className={"decrease"}
                                onClick={() => handleEditItem(item.id, -1)}
                            >-</button>
                            <h3>{item.amount}</h3>
                            <button
                                className={"increase"}
                                onClick={() => handleEditItem(item.id, 1)}
                            >+</button>
                            <h4>{item.type}</h4>
                            <h5>{item.transportation.price * item.amount} $</h5>
                        </div>
                        <button
                            className={"delete"}
                            onClick={() => handleDeleteItem(item.id)}
                        >Delete</button>
                    </div>
                ))}
                <div className={"cart_total"}>
                    {cart.length > 0 && <h2>Total: {calculateTotal()} $</h2>}
                    <div className={"cart_buttons"}>
                        <Link to={"/catalog"} className={"back-to-catalog"}>Continue shopping</Link>
                        <button className={"continue_button"}>Continue</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CartPage;