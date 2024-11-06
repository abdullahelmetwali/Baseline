import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchBox from "./SearchBox";

interface SideBarProps {
    setSideBar: () => void | null
}
const SideBar: React.FC<SideBarProps> = ({ setSideBar }) => {
    const [shopMenu, setShopMenu] = useState<boolean>(false);
    const [brandsMenu, setBrandsMenu] = useState<boolean>(false);
    const brandLinks: readonly string[] = ['Air Jordan', 'Asics', 'Converse', 'Crocs', 'New Balance', 'Nike Dunks', 'Reebok', 'Vans']

    return (
        <>
            <div className="flex justify-end px-3 py-5">
                <button onClick={() => setSideBar()}>
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
            <div>
                <ul>
                    <li className="border-y-black border px-2 py-4">
                        <div className="flex justify-between items-center w-full cursor-pointer" onClick={() => setShopMenu(prev => !prev)}>
                            <p>Shop</p>
                            <button className={`m-0 p-0`}>
                                <Image
                                    src={shopMenu ? '/icons/Subctract.svg' : '/icons/Plus.svg'}
                                    width={27}
                                    height={27}
                                    alt={`${shopMenu ? 'Close' : 'Open'}`}
                                    title={`${shopMenu ? 'Close' : 'Open'} Shop Menu`}
                                    className="w-6 h-auto"
                                />
                            </button>
                        </div>
                        <ul className={`text-lg w-full overflow-hidden transition-all duration-150 ease-in-out ${shopMenu ? 'max-h-full opacity-100 py-3 pl-5' : 'max-h-0 opacity-0'}`}>
                            <li>
                                <Link href={`/shop/all`} onClick={setSideBar}>
                                    Shop All
                                </Link>
                            </li>
                            <li>
                                <Link href={`/shop/new-arrivals`} onClick={setSideBar}>
                                    New Arrivals
                                </Link>
                            </li>
                            <li>
                                <Link href={`/shop/on-sale`} onClick={setSideBar}>
                                    On Sale
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-start justify-between w-full cursor-pointer"
                                    onClick={() => setBrandsMenu(prev => !prev)}>
                                    <p>Brands</p>
                                    <button className={`m-0 p-0`}>
                                        <Image
                                            src={brandsMenu ? '/icons/Subctract.svg' : '/icons/Plus.svg'}
                                            width={23}
                                            height={23}
                                            alt={`${brandsMenu ? 'Close' : 'Open'}`}
                                            title={`${brandsMenu ? 'Close' : 'Open'} Brands Menu`}
                                            className="w-6 h-auto"
                                        />
                                    </button>
                                </div>
                                <div>
                                    <ul className={`text-lg w-full overflow-hidden transition-all duration-150 ease-in-out ${brandsMenu ? 'max-h-full opacity-100 py-3 pl-5' : 'max-h-0 opacity-0'}`}>
                                        {
                                            brandLinks.map((br, brIndx) => (
                                                <li key={brIndx} onClick={setSideBar}>
                                                    <Link href={`/shop/${br.replace(' ', '-').toLowerCase()}`}>
                                                        {br}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li className="px-2 py-4">
                        <Link href={`/blogs`} onClick={setSideBar}>
                            Blog
                        </Link>
                    </li>
                    <li className="border border-y-black px-2 py-4">
                        <Link href={`/about`} onClick={setSideBar}>
                            About
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="my-8">
                <SearchBox products={null} setSearch={null} close={setSideBar} />
            </div>
        </>
    )
}
export default SideBar