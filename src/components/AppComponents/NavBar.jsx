"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useContext } from "react";
import SideBar from "./SideBar";
import Cart from "./Cart";
import { CartState } from "@/hooks/CartContext";
import SearchBox from "./SearchBox";

export default function NavBar({ products }) {
    const { toggleCart, seeCart, cartCount } = useContext(CartState);
    const router = useRouter();
    const pathname = usePathname();
    const [sideBar, setSideBar] = useState(false);
    const [mainShopMenu, setMainShopMenu] = useState(false);
    const [search, setSearch] = useState(false);
    const brands = ['Air Jordan', 'Asics', 'Converse', 'Crocs', 'Nike Dunk', 'New Balance', 'Nike Dunks', 'Reebok', 'Vans'];
    const closeMainMenu = () => {
        setMainShopMenu(false);
    };
    return (
        <>
            {
                pathname === '/' && <div className="overflow-hidden">
                    <ul className="scroll flex items-center whitespace-nowrap px-1">
                        {[...Array(5)].map((_, liIndex) => (
                            <li key={liIndex}>
                                <Link href={`/shop/new-arrivals`}>
                                    New Dunks and Air Jordan have dropped. Get in quick before you miss out.
                                </Link>
                                <span className="mx-2">—</span>
                            </li>
                        ))}
                    </ul>
                </div>
            }
            <header className="border-black border border-r-0 border-l-0">
                {/* MAIN NAV */}
                <nav className="flex items-center justify-between p-5 tab:p-3">
                    <div className="w-96 tab:w-full">
                        <Image src={`/icons/logo.svg`}
                            alt="Baseline"
                            width={32}
                            height={32}
                            onClick={() => router.push('/')}
                            className="cursor-pointer w-24 h-auto"
                            priority
                        />
                    </div>
                    <ul className="w-full flex items-center justify-between text-xl tab:gap-3 tab:justify-end">
                        <li className="tab:hidden flex items-center gap-2 cursor-pointer" onClick={() => {
                            setMainShopMenu(prev => !prev);
                            setSearch(prev => {
                                if (prev === true) {
                                    !prev
                                }
                            })
                        }}>
                            Shop
                            <button>
                                <Image
                                    src={`${mainShopMenu ? '/icons/Subctract.svg' : '/icons/Plus.svg'}`}
                                    width={13.5}
                                    height={13.5}
                                    alt={`${mainShopMenu ? 'Close' : 'Open'}`}
                                    title={`${mainShopMenu ? 'Close' : 'Open'} Shop Menu`}
                                    className="w-4 h-auto"
                                />
                            </button>
                        </li>
                        <li className="tab:hidden">
                            <Link href={`/blogs`}>
                                Blog
                            </Link>
                        </li>
                        <li className="hidden tab:block">
                            <button onClick={() => setSideBar(prev => !prev)}>
                                Menu
                            </button>
                        </li>
                        <li className="tab:hidden">
                            <Link href={`/about`}>
                                About
                            </Link>
                        </li>
                        <li>
                            <button onClick={() => {
                                setSearch(prev => !prev);
                                setMainShopMenu(prev => {
                                    if (prev === true) {
                                        !prev
                                    }
                                })
                            }}>
                                Search
                            </button>
                        </li>
                        <li className="text-nowrap">
                            <button onClick={toggleCart}>
                                Cart ({cartCount})
                            </button>
                        </li>
                    </ul>
                </nav>

                <div className={`transition-all duration-150 ease-in-out ${(mainShopMenu) ? `opacity-100 ${pathname === '/' ? 'top-[7rem]' : 'top-[4.3rem]'}` : `opacity-0 ${pathname === '/' ? 'top-[6rem]' : 'top-[3.3rem]'}`}  absolute ${mainShopMenu ? 'z-10' : 'z-0'} bg-[#ececec] flex w-full border border-y-black tab:hidden`}>
                    {
                        mainShopMenu &&
                        <>
                            <ul className="border border-r-black w-3/12 p-3 text-xl">
                                <li onClick={closeMainMenu}>
                                    <Link href={`/shop/all`}>
                                        Shop All
                                    </Link>
                                </li>
                                <li onClick={closeMainMenu}>
                                    <Link href={`/shop/new-arrivals`}>
                                        New Arrivals
                                    </Link>
                                </li>
                                <li onClick={closeMainMenu}>
                                    <Link href={`/shop/on-sale`}>
                                        On Sale
                                    </Link>
                                </li>
                            </ul>
                            <ul className={`border border-r-black w-3/12 p-3 text-xl`}>
                                <li className="mb-5">Brands</li>
                                {brands.map((brand, brandIndx) => (
                                    <li key={brandIndx} onClick={closeMainMenu}>
                                        <Link href={`/shop/${brand.replace(' ', '-').toLowerCase()}`}>{brand}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    }
                </div>

                <div className={`transition-all duration-150 ease-in-out ${(search) ? `opacity-100 ${pathname === '/' ? 'top-[7rem] tab:top-[6rem]' : 'top-[4.3rem] tab:top-[3.3rem]'}` : `opacity-0 ${pathname === '/' ? 'top-[6rem] tab:top-[5rem]' : 'top-[3.3rem] tab:top-[2.3rem]'}`} absolute ${search ? 'z-10' : 'z-0'} bg-[#ececec] w-full border-y border-y-black tab:`}>
                    <SearchBox products={products} setSearch={setSearch} />
                </div>

                {
                    sideBar && (
                        <div
                            className={`hidden tab:block w-1/12 right-0 bg-transparent h-dvh fixed top-0 z-40`}
                            onClick={() => setSideBar(false)}
                        >
                        </div>
                    )
                }
                <aside className={`hidden tab:block absolute text-3xl bg-[#ececec] h-dvh w-11/12 top-0 border-x border-x-black overflow-y-scroll ${sideBar ? 'left-0' : '-left-full'} transition-all duration-300 ease-in-out z-50`}>
                    <SideBar setSideBar={setSideBar} />
                </aside>
                <aside
                    className={`fixed ${seeCart ? 'right-0' : '-right-full'} top-0 bg-[#ececec] min-h-screen w-3/12 border border-black overflow-y-scroll transition-all duration-300 ease-in-out z-50 tab:w-11/12`}
                >
                    <Cart />
                </aside>
                {
                    seeCart && (
                        <div
                            className={`w-9/12 tab:w-1/12 left-0 bg-transparent h-dvh fixed top-0 z-40`}
                            onClick={toggleCart}
                        >
                        </div>
                    )
                }
            </header>
        </>
    )
};