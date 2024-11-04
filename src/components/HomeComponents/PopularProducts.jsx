"use server";
import Link from "next/link";

const PopularProducts = async () => {
    const collections = [
        { url: "https://baseline-preset-modern-2.myshopify.com/collections/air-jordan/products.json", limit: 3 },
        { url: "https://baseline-preset-modern-2.myshopify.com/collections/new-balance/products.json", limit: 2 },
        { url: "https://baseline-preset-modern-2.myshopify.com/collections/converse/products.json", limit: 1 },
        { url: "https://baseline-preset-modern-2.myshopify.com/collections/asics/products.json", limit: 4 },
        { url: "https://baseline-preset-modern-2.myshopify.com/collections/nike-dunks/products.json", limit: 5 },
        { url: "https://baseline-preset-modern-2.myshopify.com/collections/reebok/products.json", limit: 2 },
        { url: "https://baseline-preset-modern-2.myshopify.com/collections/vans/products.json", limit: 1 },
    ];
    let limitedProducts = []
    let error = null;

    try {
        const responses = await Promise.all(collections.map(collection => fetch(collection.url)));
        const data = await Promise.all(responses.map(response => response.json()));
        limitedProducts = (data.flatMap((item, itemIndx) => item.products.slice(0, collections[itemIndx].limit)));
    } catch (err) {
        error = err.message;
    }


    const returnStyle = (title, id) => {
        const cuttedTitle = title.split(' ').map((word) => word.slice(0, 1)).filter((letter, indx) => letter !== '(' && indx > 1).join('')
        const cuttedId = id.toString().split('').filter((_, wordIndex) => wordIndex < 6).join('')
        return `${cuttedTitle}-${cuttedId}`
    }

    const returnLink = (title) => {
        if (title.includes('Jordan')) return `air-jordan`;
        else if (title.includes('Balance')) return `new-balance`;
        else if (title.includes('Nike')) return `nike-dunks`;
        else if (title.includes('Reebok')) return `reebok`;
        else if (title.includes('Converse')) return `converse`;
        else if (title.includes('Vans')) return `vans`;
        else if (title.includes('Asics')) return `asics`;
        else return `all`
    };

    return (
        <section className="border-t border-t-black mt-2 relative">
            <div className="text-xl grid grid-cols-9 px-3 py-2">
                <p className="col-span-6 tab:col-span-4">Title</p>
                <p className="col-span-1 tab:col-span-2 mob:hidden">Style</p>
                <p className="col-span-1 tab:col-span-2 mob:hidden">Vendor</p>
                <p className="col-span-1 mob:hidden">Price</p>
            </div>
            <ul className="border-t border-t-black z-10">
                {
                    limitedProducts.map((product, proIndx) => (
                        <li key={proIndx} className={`text-lg tab:text-base w-full ${proIndx === limitedProducts.length - 1 ? 'border-none' : 'border-b border-b-black'}`}
                        >
                            <Link href={`/shop/${returnLink(product?.title)}/${product?.handle}`} className="grid grid-cols-9 px-3 py-1 mob:grid-cols-1">
                                <p className="col-span-6 tab:col-span-4 mob:col-span-1 tab:pr-5 mob:pr-0">{product?.title}</p>
                                <p className="text-left col-span-1 tab:col-span-2">{returnStyle(product?.title, product?.id)}</p>
                                <p className="text-left col-span-1 tab:col-span-2">{product?.vendor}</p>
                                <p className="text-left col-span-1">${product?.variants[0]?.price}</p>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </section>
    );
};
export default PopularProducts