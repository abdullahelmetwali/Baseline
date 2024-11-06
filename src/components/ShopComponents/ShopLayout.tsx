"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SearchBox from "../AppComponents/SearchBox";

interface LayoutProps {
    type: string
}


const ShopLayout: React.FC<LayoutProps> = ({ type }) => {
    const searchParams = useSearchParams();
    const search = searchParams.get('search') as string | null
    const links: string[] = ['New Arrivals', 'Air Jordan', 'Asics', 'Converse', 'Crocs', 'Nike Dunk', 'New Balance', 'Nike Dunks', 'Reebok', 'Vans'];

    const returnTitle = (title: string) => {
        return title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    };
    return (
        <>
            {
                search ?
                    <>
                        <h1 className="title p-4 pt-8 border border-b-black tracking-tighter">
                            All results for “{search.toLowerCase()}”
                        </h1>
                        <SearchBox products={null} setSearch={null} close={null} />
                    </>
                    :
                    <>
                        <h1 className="title p-4 pt-8 border border-b-black">{returnTitle(type)}</h1>
                        <div>
                            <ul className="flex gap-6 text-nowrap p-3 border border-b-black text-lg scroll-smooth justify-start snap-x overflow-x-auto hide-scrollbar">
                                <li className={`${type === 'all' ? 'underline underline-offset-2' : ''}text-nowrap whitespace-nowrap`}>
                                    <Link href={`/shop/all`} className="text-nowrap whitespace-nowrap">
                                        Shop All
                                    </Link>
                                </li>
                                {
                                    links.map((link, linkIndx) => (
                                        <li key={linkIndx}
                                            className={`${type === link.toLowerCase()?.replace(' ', '-') ? 'underline underline-offset-2' : ''} text-nowrap whitespace-nowrap`}>
                                            <Link href={`/shop/${link.toLowerCase().replace(' ', '-')}`} className="text-nowrap whitespace-nowrap">
                                                {link}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </>
            }
        </>
    )
}
export default ShopLayout