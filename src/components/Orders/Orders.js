import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css';

const Orders = () => {
    const { initialCart } = useLoaderData();
    const [cart, setCart] = useState(initialCart);

    const handelRemoveItem = (id) => {
        // console.log(id)
        const remaining = cart.filter(product => product._id !== id);
        setCart(remaining);
        removeFromDb(id);
    }

    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }


    return (
        <div className='shop-container'>
            <div className="orders-container">
                {
                    cart.map(product => <ReviewItem
                        key={product._id}
                        product={product}
                        handelRemoveItem={handelRemoveItem}
                    ></ReviewItem>)
                }
                {
                    cart.length === 0 && <h2>No items for review, <Link to={'/'}>Please Shop</Link></h2>
                }
            </div>
            <div className="cart-container">
                <Cart
                    clearCart={clearCart}
                    cart={cart}
                >
                    <Link to='/shipping'>
                        <button className='btn-shipping'>Proceed Shipping</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;