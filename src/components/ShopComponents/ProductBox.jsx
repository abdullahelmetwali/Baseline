"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import ImgLoading from "./ImgLoading";

const ProductBox = ({ product, type, txtClass, clickFnc }) => {
    const [isHovered, setIsHovered] = useState(false);
    const imageSrc = useMemo(() =>
        isHovered ? product?.images[1]?.src : product?.images[0]?.src,
        [isHovered, product]
    );
    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={clickFnc}
        >
            <Link href={`/shop/${type}/${product?.handle}`}>
                <ImgLoading
                    src={imageSrc}
                    width={3000}
                    height={100}
                    alt={product.title}
                    priority
                    unoptimized
                />
                <div className={`flex items-start justify-between p-3 ${txtClass ? txtClass : 'text-xl border-y border-y-black h-24'} ${isHovered ? 'text-[#623cea]' : 'text-black'} tab:text-lg tab:h-fit`}>
                    <h2 className="w-3/5 text-left">{product.title}</h2>
                    <p>
                        ${product.variants[0].price}
                    </p>
                </div>
            </Link>
        </div>
    )
}
export default ProductBox