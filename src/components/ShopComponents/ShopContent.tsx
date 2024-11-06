"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import ProductBox from "./ProductBox";
import Image from "next/image";

interface Product {
    id: number | string | null,
    title: string,
    variants: ItemInArr | null,
    images: ItemInArr | null
    handle: string,
    price: string | number | null,
    vendor: string | string[] | null,
    body_html: string | null
};


interface ItemInArr {
    src: string | null,
    price: number | null
};

const ShopContent = ({ products }) => {
    const { type } = useParams();
    const searchedParams = useSearchParams();
    const search: string | null = searchedParams.get('search');
    const [allProducts, setAllProducts] = useState(products);
    const [currentPG, setCurrentPG] = useState<number>(1);
    const [containerHeight, setContainerHeight] = useState<number>(0);
    const [sortMenu, setSortMenu] = useState<boolean>(false);
    const productBoxHeight = useRef(null);
    const productsPerPG: number = 9;

    useEffect(() => {
        setAllProducts(products);
        setCurrentPG(1);
    }, [products])

    const displayedProducts = useMemo(() => {
        const startProductsIndex = (currentPG - 1) * productsPerPG;
        return allProducts.slice(startProductsIndex, startProductsIndex + productsPerPG);
    }, [allProducts, currentPG]);

    useEffect(() => {
        if (productBoxHeight.current) {
            setContainerHeight(productBoxHeight.current.offsetHeight * productsPerPG);
        }
    }, [productBoxHeight, productsPerPG]);

    const AToZ = () => {
        const sortedProducts = [...allProducts].sort((first, second) => first.title.localeCompare(second.title));
        setAllProducts(sortedProducts);
        setSortMenu(prev => !prev);
    };

    const ZToA = () => {
        const unSortedProducts = [...allProducts].sort((first, second) => second.title.localeCompare(first.title));
        setAllProducts(unSortedProducts);
        setSortMenu(prev => !prev);
    };

    const LowToHigh = () => {
        const orderedPrices = [...allProducts].sort((first, second) => (first.variants[0].price) - (second.variants[0].price));
        setAllProducts(orderedPrices);
        setSortMenu(prev => !prev);
    };

    const HighToLow = () => {
        const unOrderedPrices = [...allProducts].sort((first, second) => (second.variants[0].price) - (first.variants[0].price));
        setAllProducts(unOrderedPrices);
        setSortMenu(prev => !prev);
    };

    return (
        <>
            <main className="relative">
                {!search &&
                    <div className="flex justify-end w-full px-3 py-2 text-lg">
                        <div className="cursor-pointer"
                            onClick={() => setSortMenu(prev => !prev)}>
                            <span>Sort</span>
                            <button className={`ml-2`}>
                                <Image
                                    src={`${sortMenu ? '/icons/Subctract.svg' : '/icons/Plus.svg'}`}
                                    width={13.5}
                                    height={13.5}
                                    alt={`${sortMenu ? 'Close' : 'Open'}`}
                                    title={`${sortMenu ? 'Close' : 'Open'} Sort Menu`}
                                    className="w-3 h-auto"
                                />
                            </button>
                        </div>
                    </div>}
                <div className={`absolute py-4 px-3 ${sortMenu ? 'top-12 opacity-100' : 'top-11 opacity-0'} transition-all duration-200 ease-in-out flex justify-end w-full z-20 h-fit border-b border-b-black gap-5 bg-[#ececec]`}>
                    {
                        sortMenu &&
                        <ul className="text-lg tracking-tight">
                            <li className="hover:text-[#623cea]" onClick={AToZ}>
                                <label htmlFor="a-z" className="cursor-pointer">
                                    <input type="radio" name="sort" id="a-z" className="mr-2" />
                                    Alphabetically, A - Z
                                </label>
                            </li>
                            <li className="hover:text-[#623cea]" onClick={ZToA}>
                                <label htmlFor="z-a" className="cursor-pointer">
                                    <input type="radio" name="sort" id="z-a" className="mr-2" />
                                    Alphabetically, Z - A
                                </label>
                            </li>
                            <li className="hover:text-[#623cea]" onClick={LowToHigh}>
                                <label htmlFor="l-h" className="cursor-pointer">
                                    <input type="radio" name="sort" id="l-h" className="mr-2" />
                                    Price, Low To High
                                </label>
                            </li>
                            <li className="hover:text-[#623cea]" onClick={HighToLow}>
                                <label htmlFor="h-l" className="cursor-pointer">
                                    <input type="radio" name="sort" id="h-l" className="mr-2" />
                                    Price, High To Low
                                </label>
                            </li>
                        </ul>
                    }
                </div>
            </main>
            <div className="border-t border-t-black">
                <ul className={`grid grid-cols-3 tab:grid-cols-1 h-[${containerHeight}px] w-full`}>
                    {displayedProducts.length <= 0 ?
                        search ?
                            <p className="text-xl px-2 pt-4">Sorry, there are no products for result “ {search.toLowerCase()} ”.</p>
                            :
                            <p className="text-xl px-2 pt-4">Sorry, there are no products in this collection.</p>
                        :
                        displayedProducts?.map((product: Product, proIndx: number) => (
                            <li key={proIndx} ref={productBoxHeight}
                                className={`border transition-all duration-150 ease-in-out bg-[#ececec]${((proIndx + 1) % 3) === 1 || ((proIndx + 1) % 3) === 2 ? 'border-r border-r-black tab:border-none' : ''}`}>
                                <ProductBox product={product} type={type} txtClass={null} clickFnc={null} />
                            </li>
                        ))}
                </ul>
            </div>
            <div className="flex justify-center gap-6 text-2xl my-4">
                {
                    [...Array(Math.ceil(products.length / productsPerPG))].map((_, index) => (
                        <button key={index}
                            onClick={() => setCurrentPG(index + 1)}
                            className={`${currentPG === index + 1 ? 'underline' : ''}`}
                        >
                            {index + 1}
                        </button>
                    ))
                }
            </div>
        </>
    );
};

export default ShopContent;
