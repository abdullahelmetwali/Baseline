"use client";
import { useContext } from "react";
import { CartState } from "@/hooks/CartContext";
import Image from "next/image";
import Link from "next/link";

const Cart = () => {
    const { cartCount, cart, toggleCart, AddQuantity, RemoveQuantity, RemoveProduct, totalPrice } = useContext(CartState);
    return (
        <>
            <div className="flex items-center justify-between px-3 py-4">
                <p className="text-base">
                    Your Cart - ({cartCount}) items
                </p>
                <button onClick={toggleCart}>
                    <Image
                        src={'/icons/Close.svg'}
                        width={27}
                        height={27}
                        alt="Close"
                        title="Close Menu"
                        className="w-7 h-auto"
                    />
                </button>
            </div>
            <div className="border border-t-black py-4">
                <h2 className={`px-3 text-4xl tracking-tighter ${cartCount === 0 ? '' : 'border-b border-b-black pb-2'}`}>
                    Your Cart
                </h2>
                {cartCount === 0 ? (
                    <div className="px-3">
                        <p className="my-4 text-lg">
                            Your cart is currently empty.
                        </p>
                        <Link href={`/`} className="relative text-xl hover:text-blue-600 underline underline-offset-8">
                            Continue shopping &#8594;
                        </Link>
                    </div>
                ) : (
                    <>
                        <div>
                            {cart.map((ele, eleIndex) => (
                                <div key={eleIndex} className="border-b border-b-black py-3 px-3 grid grid-cols-4 gap-2">
                                    <div className="col-span-1">
                                        <Link href={`/shop/${ele.type}/${ele.handle}?selectedSize=${ele.selectedSize}`} className="text-xl tracking-tighter" onClick={toggleCart}>
                                            <Image
                                                src={ele.img}
                                                width={3000}
                                                height={150}
                                                alt={ele.title}
                                                title={ele.title}
                                            />
                                        </Link>
                                    </div>
                                    <div className="col-span-2">
                                        <Link href={`/shop/${ele.type}/${ele.handle}?selectedSize=${ele.selectedSize}`} className="text-xl tracking-tighter" onClick={toggleCart}>
                                            {ele.title}
                                        </Link>
                                        <p className="border border-black w-fit px-2">{ele.selectedSize}</p>
                                        <div className="flex items-center gap-3 my-3">
                                            <button onClick={() => RemoveQuantity(ele)} className="p-1">
                                                <Image
                                                    src={'/icons/Subctract.svg'}
                                                    width={13.5}
                                                    height={13.5}
                                                    alt={'Remove'}
                                                    title={'Remove Quantity'}
                                                    className="w-4 h-auto"
                                                />
                                            </button>
                                            <p className="text-lg">{ele.quantity}</p>
                                            <button onClick={() => AddQuantity(ele)} className="p-1">
                                                <Image
                                                    src={'/icons/Plus.svg'}
                                                    width={12}
                                                    height={12}
                                                    alt={'Add'}
                                                    title={'Add Quantity'}
                                                    className="w-4 h-auto"
                                                />
                                            </button>
                                        </div>
                                        <button onClick={() => RemoveProduct(ele)} title="Remove Product">
                                            Remove
                                        </button>
                                    </div>
                                    <div className="text-right text-xl">
                                        <p>${ele.price * ele.quantity}.00</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <form className="px-2 py-4">
                                <label className="text-lg tracking-tight" htmlFor="note">
                                    Add a note to your order
                                </label><br />
                                <textarea name="note" id="note" cols={40} rows={3} className="bg-transparent border border-black w-full p-2"></textarea>
                                <div className="text-right my-2 text-lg tracking-tight">
                                    <span className="mx-14">Subtotal</span>
                                    <span>${totalPrice}AUD</span>
                                </div>
                                <div>
                                    <p className="text-right my-2 text-xl tracking-tighter">Taxes and shipping calculated at checkout</p>
                                    <button className="bg-black w-full text-white py-2 text-lg my-3">
                                        Check out &rarr;
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Cart;
