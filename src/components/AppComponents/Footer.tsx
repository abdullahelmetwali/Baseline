import Link from "next/link";
import Image from "next/image";
export default function Footer() {
    return (
        <footer>
            <section className="bg-[#ceff31] flex justify-between items-center px-2 py-3 text-lg font-medium border border-t-black tab:grid tab:gap-4">
                <p className="mob:border-y mob:border-t-0 mob:border-b-black ">Receive special offers and first look at new products.</p>
                <form method="POST" className="relative flex gap-2 tab:grid">
                    <input
                        type="email"
                        id="email"
                        className="bg-transparent placeholder:text-black outline-none p-1 border-y border-t-0 border-b-black w-80 tab:w-full"
                        placeholder="Email Address"
                    />
                    <button type="button" className="border-y border-t-0 border-black w-fit hover:text-white hover:border-b-white">
                        Subscribe &rarr;
                    </button>
                </form>
            </section>
            <section className="grid grid-cols-4 border border-y-black tab:grid-cols-2 mob:grid-cols-1">
                <div className="border border-r-black p-4 tab:px-2 mob:border-r-0">
                    <h2 className="text-xl mb-6">About</h2>
                    <p className="text-lg">This is demo store. Product shots are <br />provided from <a href="https://themes.shopify.com/themes/baseline/styles/modern/preview" className="underline underline-offset-2">shopify</a>.</p>
                </div>
                <div className="border border-r-black p-4 tab:px-2 tab:border tab:border-r-0 mob:border-t-black">
                    <h2 className="text-xl mb-6">Shop</h2>
                    <ul className="text-lg">
                        <li>
                            <Link href={`/shop/all`} className="hover:text-[#623cea]">
                                Shop All
                            </Link>
                        </li>
                        <li>
                            <Link href={`/shop/new-arrivals`} className="hover:text-[#623cea]">
                                New Arrivals
                            </Link>
                        </li>
                        <li>
                            <Link href={`/shop/on-sale`} className="hover:text-[#623cea]">
                                On Sale
                            </Link>
                        </li>
                        <li>
                            <Link href={`/shop/brands`} className="hover:text-[#623cea]">
                                Brands
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="border border-r-black mob:border-r-0 p-4 tab:px-2 tab:border tab:border-t-black">
                    <h2 className="text-xl mb-6">Information</h2>
                    <ul className="text-lg">
                        <li>
                            <Link href={`/blogs`} className="hover:text-[#623cea]">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href={`/about`} className="hover:text-[#623cea]">
                                About us
                            </Link>
                        </li>
                        <li>
                            <Link href={`/faqs`} className="hover:text-[#623cea]">
                                FAQs
                            </Link>
                        </li>
                        <li>
                            <Link href={`/contact`} className="hover:text-[#623cea]">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="p-4 tab:px-2 tab:border tab:border-t-black">
                    <h2 className="text-xl mb-6">Find Us</h2>
                    <ul className="text-lg">
                        <li>
                            <a href={`https://facebook.com`} className="hover:text-[#623cea]">
                                Facebook
                            </a>
                        </li>
                        <li>
                            <a href={`https://instagram.com`} className="hover:text-[#623cea]">
                                Instagram
                            </a>
                        </li>
                        <li>
                            <a href={`https://tiktok.com`} className="hover:text-[#623cea]">
                                TikTok
                            </a>
                        </li>
                        <li>
                            <a href={`https://youtube.com`} className="hover:text-[#623cea]">
                                Youtube
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
            <section className="py-3 px-2">
                <div className="flex justify-between items-start mob:flex-col mob:gap-4">
                    <div>
                        <h3 className="text-base">© 2024, Baseline.</h3>
                        <p className="te">Powered by <a href="https://abdullahelmetwali.vercel.app/" className="hover:text-blue-500 underline underline-offset-2" target="_blank">Abdullah ElMetwali</a></p>
                    </div>
                    <div className="flex gap-2">
                        <Image src={`/icons/Visa.svg`} alt="Visa" title="Visa" width={30} height={30} className="w-5 h-auto" />
                        <Image src={`/icons/MasterCard.svg`} alt="Mastercard" title="Mastercard" width={30} height={30} className="w-5 h-auto" />
                        <Image src={`/icons/PayPal.svg`} alt="PayPal" title="PayPal" width={20} height={30} className="w-4 h-auto" />
                    </div>
                </div>
                <div className="text- text-center my-8">
                    <Image src={`/icons/logo.svg`} width={3000} height={100} alt="Baseline" title="Baseline" />
                </div>
            </section>
        </footer>
    )
}