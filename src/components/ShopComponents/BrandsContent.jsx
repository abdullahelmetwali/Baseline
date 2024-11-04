"use server";
import Link from "next/link";
import ImgLoading from "./ImgLoading";

const BrandsContent = () => {
    const allBrands = [
        {
            img: "/imgs/jordan.webp",
            title: "Air Jordan",
        },
        {
            img: '/imgs/all.webp',
            title: "All",
        },
        {
            img: '/imgs/asics.webp',
            title: "Asics",
        },
        {
            img: '/imgs/converse.webp',
            title: "Converse",
        },
        {
            img: '/imgs/crocs.webp',
            title: "Crocs",
        },
        {
            img: '/imgs/new-arrivals.webp',
            title: "New Arrivals",
        },
        {
            img: '/imgs/new-balance.webp',
            title: "New Balance",
        },
        {
            img: '/imgs/nike-dunk.webp',
            title: "Nike Dunk",
        },
        {
            img: '/imgs/nike-dunks.webp',
            title: "Nike Dunks",
        },
        {
            img: '/imgs/on-sale.webp',
            title: "On Sale",
        },
        {
            img: '/imgs/reebok.webp',
            title: "Reebok",
        },
        {
            img: '/imgs/vans.webp',
            title: "Vans",
        },
    ];
    return (
        <>
            <h1 className="title p-4 pt-8 border border-b-black tracking-tighter">Collections</h1>
            <main className="grid grid-cols-3 tab:grid-cols-1 bg-black gap-[1px]">
                {
                    allBrands.map((brand, brandIndex) => (
                        <Link key={brandIndex} className={`flex relative justify-center items-center bg-[#ececec]`} href={`/shop/${brand.title.replace(' ', '-').toLowerCase()}`}>
                            <ImgLoading
                                src={brand.img}
                                width={3000}
                                height={1500}
                                alt={brand.title}
                                title={brand.title}
                            />
                            <p className="absolute text-5xl tracking-tighter">{brand.title}</p>
                        </Link>
                    ))
                }
            </main>
        </>
    )
};
export default BrandsContent;