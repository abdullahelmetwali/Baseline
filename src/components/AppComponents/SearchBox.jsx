"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AllBlogs from '@/data/blogs.json';
import ProductSwiper from "../ProductPGComponents/ProductSwiper";

const SearchBox = ({ products, setSearch, close }) => {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');
    const links = ['New Arrivals', 'Air Jordan', 'Asics', 'Converse', 'Crocs', 'Nike Dunk', 'New Balance', 'Nike Dunks', 'Reebok', 'Vans'];
    const searchProducts = products?.filter(pro => pro.title.toLowerCase().includes(searchValue.toLowerCase()));
    const suggestionsWords = searchProducts?.map(pro => {
        return pro.title.split(' ').filter(word => word.toLowerCase().includes(searchValue.toLowerCase())).join(' ').toLowerCase();
    });
    const uniqueSuggestions = [...new Set(suggestionsWords)];
    const searchedBlogs = AllBlogs.filter(blog => blog.title.toLowerCase().includes(searchValue.toLowerCase()));
    const searchedLinks = links.filter(link => link.toLowerCase().includes(searchValue.toLowerCase()));
    const closeSearchMenu = () => {
        if (setSearch) {
            setSearch(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between w-full px-4">
                <form
                    className="flex w-full"
                    onSubmit={(e) => {
                        e.preventDefault();
                        router.push(`/shop/all?search=${(searchValue.trim().toLowerCase())}`);
                        if (setSearch) {
                            setSearch(prev => !prev)
                        }
                        closeSearchMenu();
                        if (close) {
                            close();
                        }
                    }}
                >
                    <button type="submit">
                        <Image
                            src={'/icons/Search.svg'}
                            width={27}
                            height={27}
                            alt="Search"
                            title="Search"
                            className="w-7 h-auto"
                        />
                    </button>
                    <input
                        type="text"
                        placeholder="Search"
                        className="my-4 bg-transparent font-thin outline-none mx-3 placeholder:text-black text-xl w-3/4"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </form>
                {setSearch &&
                    <button onClick={() => {
                        setSearch(prev => !prev);
                        setSearchValue('');
                    }}>
                        <Image
                            src={'/icons/Close.svg'}
                            width={27}
                            height={27}
                            alt="Close Search"
                            title="Close Search"
                            className="w-7 h-auto"
                        />
                    </button>
                }
            </div>
            {
                (searchValue !== '' && products !== null) &&
                <section className="border-y border-y-black overflow-y-scroll overflow-x-hidden min-h-screen">
                    <h4 className="text-4xl tracking-tighter p-3 pt-8">Suggestions</h4>
                    <div className="grid">
                        {uniqueSuggestions.map((word, index) => {
                            const regex = new RegExp(`(${searchValue})`, 'gi');
                            const parts = word.split(regex);
                            return (
                                <Link
                                    key={index}
                                    href={`/shop/all?search=${word.toLowerCase()}`}
                                    className="px-3 text-lg border-b border-b-black p-1"
                                    onClick={() => setSearch(prev => !prev)}
                                >
                                    {parts.map((part, i) =>
                                        part.toLowerCase() === searchValue.toLowerCase() ? (
                                            <strong key={i}>{part}</strong>
                                        ) : (
                                            <span key={i}>{part}</span>
                                        )
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                    <div className="grid grid-cols-12 border-b border-b-black tab:grid-cols-1">
                        <div className="col-span-9 pt-6">
                            <h4 className="text-4xl tracking-tighter p-3">Products</h4>
                            <ProductSwiper sameProducts={searchProducts} type={null} whatPage={'home'} swiperLength={(searchProducts.length - 4) + 1} txtClass={`text-lg tracking-tighter border-y border-y-black h-32 tab:border-y tab:border-y-black`} clickFnc={closeSearchMenu} />
                        </div>
                        <div className="col-span-3 border-l border-l-black pt-6 tab:border-t tab:border-t-black">
                            <div>
                                <h4 className="text-4xl tracking-tighter p-3 border-b border-black ">Collections</h4>
                                {
                                    searchedLinks.length > 0 ?
                                        <ul>
                                            {
                                                searchedLinks.map((link, linkIndx) => (
                                                    <li key={linkIndx} className="w-full border-b border-b-black p-2 text-xl">
                                                        <Link href={`/shop/${link.replace(' ', '-').toLowerCase()}`} className="w-full">
                                                            {link}
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                        :
                                        <p className="p-2 text-xl mb-16">No collections for result “{searchValue.toLowerCase()}”</p>
                                }
                            </div>
                            <div>
                                <h4 className={`text-4xl tracking-tighter p-3 ${searchedBlogs.length > 0 ? 'border-b border-b-black' : 'border-y border-y-black'}`}>Articles</h4>
                            </div>
                            {
                                searchedBlogs.length > 0 ?
                                    <ul>
                                        {
                                            searchedBlogs.map((blog, blogIndx) => (
                                                <li key={blogIndx}>
                                                    <Link href={`/blogs/${blog.url}`} className={`grid grid-cols-3 p-3 gap-1 ${searchedBlogs.length > 1 ? 'border-b border-b-black' : ''}`}>
                                                        <Image
                                                            src={blog.img}
                                                            width={100}
                                                            height={100}
                                                            alt={blog.title}
                                                            title={blog.title}
                                                            className="col-span-1"
                                                        />
                                                        <div className="col-span-2 text-lg tracking-tighter">
                                                            <p className="">
                                                                {blog.title}
                                                            </p>
                                                            <p>
                                                                {blog.date}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    :
                                    <p className="p-2 text-xl">No artciles for result “{searchValue.toLowerCase()}”</p>
                            }
                        </div>
                    </div>
                </section>
            }
        </>
    );
};

export default SearchBox;
