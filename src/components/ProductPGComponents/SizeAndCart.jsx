"use client";
import { CartState } from "@/hooks/CartContext";
import { useParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";

const SizeAndCart = ({ productDetails, searchParams }) => {
    const params = useParams();
    const { toggleCart } = useContext(CartState);
    const [size, setSize] = useState(null);
    const selectedSize = searchParams.selectedSize;

    useEffect(() => {
        if (selectedSize) {
            setSize(selectedSize)
        } else {
            setSize(productDetails?.variants[0]?.title)
        }
    }, [selectedSize, productDetails]);

    const AddToCart = () => {
        const cartStorage = localStorage.getItem('cart') || null;
        const newItem = {
            img: productDetails?.images[0]?.src,
            title: productDetails.title,
            selectedSize: size,
            price: Number(productDetails?.variants[0]?.price),
            quantity: 1,
            type: params.type,
            handle: params.product
        };

        if (cartStorage) {
            const cartArr = JSON.parse(cartStorage);
            const sameItemIndex = cartArr.findIndex(item => item.selectedSize === newItem.selectedSize);
            // If exists, update its quantity
            if (sameItemIndex !== -1) {
                const newItemUpdate = {
                    ...cartArr[sameItemIndex],
                    quantity: cartArr[sameItemIndex].quantity + 1,
                };
                const newCart = cartArr.map((item, i) => (i === sameItemIndex ? newItemUpdate : item));
                localStorage.setItem('cart', JSON.stringify(newCart));
            } else {
                // If the item doesn't exist, add it to the cart
                const newCart = [...cartArr, newItem];
                localStorage.setItem('cart', JSON.stringify(newCart));
            }
        } else {
            // If there's no cart in localStorage, create a new cart
            const newCart = [newItem];
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
        setTimeout(() => {
            new Promise(res => {
                res;
                toggleCart();
            })
        }, 500)
    };

    return (
        <>
            <div className="my-8 p-4 ">
                <h2 className="text-xl font-medium mb-4">Size:</h2>
                <ul className="flex flex-wrap gap-2">
                    {
                        productDetails?.variants?.map((variant, varIndx) => (
                            <li key={varIndx} className={`p-1 px-2 text-lg cursor-pointer ${size === variant?.title ? 'border-black border' : ''}`} onClick={() => setSize(variant.title)}>
                                {variant?.title}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="my-12 p-4 ">
                <button className="text-center text-lg w-full mb-2 border border-black py-2 hover:border-[#623cea] hover:text-[#623cea]" onClick={AddToCart}>
                    Add to cart &rarr;
                </button>
                <button className="bg-black text-white text-center text-lg w-full py-2 hover:bg-[#623cea]">
                    Buy it now &rarr;
                </button>
            </div>
        </>
    )
}
export default SizeAndCart;