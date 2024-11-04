import FetchDT from "@/hooks/FetchDT";
import NavBar from "./NavBar";
const NavWrapper = async () => {
    const { products } = await FetchDT({ type: 'all' });
    return <NavBar products={products} />
}
export default NavWrapper;