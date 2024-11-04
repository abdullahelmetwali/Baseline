"use server";
import Image from "next/image";
import Link from "next/link";

const ProductsScroller = async ({ url, type, scrollClass, imgClass }) => {
    let scrollerProducts = [];
    let error = null;
    try {
        const res = await fetch(url);
        const data = await res.json();
        scrollerProducts = data.products || [];
    } catch (err) {
        error = err.message;
    };

    return (
        <div className={`flex items-center whitespace-nowrap px-1 ${scrollClass}`}>
            {
                scrollerProducts.map((pro, proIndx) => (
                    <>
                        <div className="flex items-center gap-14">
                            <Link key={proIndx} className="flex items-center gap-3" href={`/shop/${type}/${pro?.handle}`}>
                                <Image
                                    src={pro?.images[0]?.src}
                                    alt={pro?.title}
                                    title={pro?.title}
                                    width={56}
                                    height={56}
                                    unoptimized
                                    priority
                                    className={`${imgClass ? imgClass : 'w-12 h-auto'}`}
                                />
                                <p className={`text-4xl tracking-tighter`}>{pro?.title}</p>
                            </Link>
                            <div className="mx-4 w-1 h-1 bg-black rounded-full"></div>
                        </div>
                    </>
                ))
            }
        </div>
    )
}
export default ProductsScroller