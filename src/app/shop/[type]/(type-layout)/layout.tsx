import "server-only";
import ShopLayout from "@/components/ShopComponents/ShopLayout";

const TypeLayout = ({ children, params }) => {
    const { type } = params;
    return (
        <main>
            <section>
                {
                    type !== 'brands' &&
                    <>
                        <ShopLayout type={type} />
                    </>
                }
            </section>
            {children}
        </main>
    )
};
export default TypeLayout;