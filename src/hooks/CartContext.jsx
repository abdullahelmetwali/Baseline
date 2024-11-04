"use client";
import { createContext, useEffect, useState } from "react";
export const CartState = createContext();
export const CartProvider = ({ children }) => {
    const [seeCart, setSeeCart] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const toggleCart = () => {
        setSeeCart(prev => !prev)
    };
    useEffect(() => {
        const storage = localStorage.getItem('cart') || null;

        const updateCartFromStorage = (e) => {
            if (e.key === 'cart') {
                const newCart = JSON.parse(e.newValue) || [];
                const newCartCount = newCart.map(item => item.quantity).reduce((firstItem, nextItem) => firstItem + nextItem, 0);
                const newCartPrice = newCart.map(item => (item.price) * (item.quantity)).reduce((fir, sec) => fir + sec, 0);
                setCart(newCart);
                setCartCount(newCartCount);
                setTotalPrice(newCartPrice);
            }
        };

        if (storage) {
            const storageCart = JSON.parse(storage);
            const allQuantities = storageCart.map(item => item.quantity).reduce((firstItem, nextItem) => firstItem + nextItem, 0);
            const allPrices = storageCart.map(item => (item.price) * (item.quantity)).reduce((fir, sec) => fir + sec, 0);
            setCart(storageCart);
            setCartCount(allQuantities);
            setTotalPrice(allPrices);
        }

        window.addEventListener('storage', updateCartFromStorage);
        return () => {
            window.removeEventListener('storage', updateCartFromStorage);
        };
    }, [seeCart, totalPrice]);

    const AddQuantity = (ele) => {
        const eleIndex = cart.findIndex(item => item.selectedSize === ele.selectedSize);
        if (eleIndex !== -1) {
            const newCart = cart.map((item, i) =>
                i === eleIndex ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCart(newCart);
            setCartCount(cartCount + 1);
            setTotalPrice(totalPrice + ele.price)
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    };

    const RemoveQuantity = (ele) => {
        const eleIndex = cart.findIndex(item => item.selectedSize === ele.selectedSize);
        if (eleIndex !== -1 && ele.quantity > 1) {
            const newCart = cart.map((item, i) =>
                i === eleIndex ? { ...item, quantity: item.quantity - 1 } : item
            );
            setCart(newCart);
            setCartCount(cartCount - 1);
            setTotalPrice(totalPrice - ele.price);
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    };

    const RemoveProduct = (ele) => {
        const newCart = cart.filter(item => item.selectedSize !== ele.selectedSize);
        const removedQuantity = ele.quantity;
        setCart(newCart);
        setCartCount(cartCount - removedQuantity);
        setTotalPrice(0);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    return (
        <CartState.Provider value={{ seeCart, toggleCart, AddQuantity, RemoveQuantity, RemoveProduct, cartCount, cart, totalPrice }}>
            {children}
        </CartState.Provider>
    )
};
