import "server-only";
import ImagesBox from "@/components/ProductPGComponents/ImagesBox";
import ProductSwiper from "@/components/ProductPGComponents/ProductSwiper";
import SizeAndCart from "@/components/ProductPGComponents/SizeAndCart";

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

const ProductDetails = async ({ params, searchParams }) => {
    const { type } = params;
    const { product } = params;
    const productURL = `https://baseline-preset-modern-2.myshopify.com/collections/${type}/products/${product}.json`;
    const sameTypeProductsURL = `https://baseline-preset-modern-2.myshopify.com/collections/${type}/products.json`;

    let productDetails: Product = {
        id: "",
        title: "",
        variants: null,
        images: null,
        handle: "",
        price: "",
        vendor: "",
        body_html: ""
    };
    let error = null;
    let sameProducts: Product[] = [];
    try {
        const productResponse = await fetch(productURL);
        const sameProductsResponse = await fetch(sameTypeProductsURL);
        if (!productResponse.ok) {
            throw new Error('Failed to get product');
        };
        if (!sameProductsResponse.ok) {
            throw new Error('Failed to get products you may like');
        };
        const productData = await productResponse.json();
        const sameProductsData = await sameProductsResponse.json();
        for (const product of sameProductsData.products) {
            if (product.handle !== product) {
                sameProducts.push(product)
            }
            if (sameProducts.length === 4) break;
        }
        Object.assign(productDetails, productData.product || {});
    } catch (err) {
        error = err.message;
    };

    const returnModel = (title: string) => {
        return title.split(' ').filter((_, wordIndex: number) => wordIndex < 3).join(' ')
    };

    return (
        <>
            <main className="grid grid-cols-2 mob:grid-cols-1 relative">
                <ImagesBox productDetails={productDetails} />
                <section>
                    <div className="sticky top-0">
                        <h1 className="title p-4 ">
                            {productDetails?.title}
                        </h1>
                        <p className="text-2xl font-medium p-4 ">
                            ${productDetails?.variants[0]?.price}
                        </p>
                        <SizeAndCart productDetails={productDetails} searchParams={searchParams} />
                        <div>
                            <div className="flex text-lg gap-4 border-y-black border">
                                <h3 className="p-2 w-1/4 border-r-black border">Model</h3>
                                <p className="p-2">{returnModel(productDetails?.title)}</p>
                            </div>
                            <div className="flex text-lg gap-4">
                                <h3 className="p-2 w-1/4 border-r-black border">Style</h3>
                                <p className="p-2">CTC576-{productDetails?.id.toString().slice(0, 3)}</p>
                            </div>
                            <div className="flex text-lg gap-4 border-y-black border">
                                <h3 className="p-2 w-1/4 border-r-black border">Year</h3>
                                <p className="p-2">2024</p>
                            </div>
                        </div>
                        <div className="my-8 p-4">
                            <p dangerouslySetInnerHTML={{ __html: productDetails?.body_html }} className="text-xl font-medium" />
                        </div>
                        <div className="my-4 p-4">
                            <p className="text-lg">This is a demo store. Contact developer at <a href="https://abdullahelmetwali.vercel.app/" className="underline underline-offset-2 hover:text-blue-500" target="_blank">Abdullah ElMetwali</a></p>
                        </div>
                    </div>
                </section>
            </main>
            <div className="overflow-hidden bg-[#ceff31] border-y border-y-black">
                <ul className="scroll flex items-center whitespace-nowrap px-1 hover:text-black">
                    {[...Array(10)].map((_, spanIndex) => (
                        <li key={spanIndex} className="text-4xl font-sans font-semibold tracking-tighter">
                            Free shipping on all orders over 100$
                            <span className="mx-2 text-xl font-black">·</span>
                        </li>
                    ))}
                </ul>
            </div>
            <main className="my-8">
                <h2 className="text-4xl font-medium m-4">You may also like</h2>
                <section>
                    <ProductSwiper sameProducts={sameProducts} type={type} whatPage={'product'} txtClass={null} clickFnc={null} swiperLength={null} />
                </section>
            </main>
        </>
    )
}
export default ProductDetails;