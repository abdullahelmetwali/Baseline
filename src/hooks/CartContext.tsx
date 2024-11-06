"use client";
import { createContext, useEffect, useState } from "react";
export const CartState = createContext<any>(null);

interface Item {
    price: number | null,
    quantity: number | null,
    selectedSize: string | null
};

interface LocalStorageProduct {
    price: number,
    quantity: number,
    handle: string,
    title: string,
    type: string,
    img: string,
    selectedSize: string
};

export const CartProvider = ({ children }) => {
    const [seeCart, setSeeCart] = useState<boolean>(false);
    const [cartCount, setCartCount] = useState<number>(0);
    const [cart, setCart] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const toggleCart = () => {
        setSeeCart(prev => !prev)
    };
    useEffect(() => {
        const storage = localStorage.getItem('cart') || null;

        const updateCartFromStorage = (e: any) => {
            if (e.key === 'cart') {
                const newCart = JSON.parse(e.newValue) || [];
                const newCartCount = newCart.map((item: Item) => item.quantity).reduce((firstItem: number, nextItem: number) => firstItem + nextItem, 0);
                const newCartPrice = newCart.map((item: Item) => (item.price) * (item.quantity)).reduce((fir: number, sec: number) => fir + sec, 0);
                setCart(newCart);
                setCartCount(newCartCount);
                setTotalPrice(newCartPrice);
            }
        };

        if (storage) {
            const storageCart = JSON.parse(storage);
            const allQuantities = storageCart.map((item: Item) => item.quantity).reduce((firstItem: number, nextItem: number) => firstItem + nextItem, 0);
            const allPrices = storageCart.map((item: Item) => (item.price) * (item.quantity)).reduce((fir: number, sec: number) => fir + sec, 0);
            setCart(storageCart);
            setCartCount(allQuantities);
            setTotalPrice(allPrices);
        }

        window.addEventListener('storage', updateCartFromStorage);
        return () => {
            window.removeEventListener('storage', updateCartFromStorage);
        };
    }, [seeCart, totalPrice]);

    const AddQuantity = (ele: LocalStorageProduct) => {
        const eleIndex = cart.findIndex((item: Item) => item.selectedSize === ele.selectedSize);
        if (eleIndex !== -1) {
            const newCart = cart.map((item: Item, i) =>
                i === eleIndex ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCart(newCart);
            setCartCount(cartCount + 1);
            setTotalPrice(totalPrice + ele.price)
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    };

    const RemoveQuantity = (ele: LocalStorageProduct) => {
        const eleIndex = cart.findIndex((item: Item) => item.selectedSize === ele.selectedSize);
        if (eleIndex !== -1 && ele.quantity > 1) {
            const newCart = cart.map((item: Item, i) =>
                i === eleIndex ? { ...item, quantity: item.quantity - 1 } : item
            );
            setCart(newCart);
            setCartCount(cartCount - 1);
            setTotalPrice(totalPrice - ele.price);
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    };

    const RemoveProduct = (ele: LocalStorageProduct) => {
        const newCart = cart.filter((item: Item) => item.selectedSize !== ele.selectedSize);
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
