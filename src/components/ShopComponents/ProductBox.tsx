"use client";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import ImgLoading from "./ImgLoading";

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

interface ProductBox {
    product: Product,
    type: string | string[] | null,
    txtClass: string | null,
    clickFnc: () => void | null
};

const ProductBox: React.FC<ProductBox> = ({ product, type, txtClass, clickFnc }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
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
                    title={null}
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