import "server-only";
import BrandsContent from "@/components/ShopComponents/BrandsContent";
import ShopContent from "@/components/ShopComponents/ShopContent";
import FetchDT from "@/hooks/FetchDT";

const TypePage = async ({ params, searchParams }) => {
    const searchPar = searchParams?.search?.toLowerCase() || null;
    const { products, error, searchedProducts } = await FetchDT({ type: params.type, searchWord: searchPar })
    if (error) {
        return (
            <div className="text-center my-20 text-red-500 text-xl font-semibold">
                <h2>Error: {error.includes('getaddrinfo') ? 'Please Check Internet Connection' : error}</h2>
            </div>
        );
    };

    return (
        <>
            {searchPar ? (
                <ShopContent key={JSON.stringify(searchedProducts)} products={searchedProducts} />
            ) : (
                params.type === 'brands' ? (
                    <BrandsContent />
                ) : (
                    <ShopContent products={products} />
                )
            )}
        </>
    );

}
export default TypePage