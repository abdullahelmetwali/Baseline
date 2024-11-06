import "server-only";
import Link from "next/link";
import Image from "next/image";
import WhatToGet from "@/components/HomeComponents/WhatToGet";
import PopularProducts from "@/components/HomeComponents/PopularProducts";
import ProductsScroller from "@/components/HomeComponents/ProductsScroller";
import AllBlogs from '@/data/blogs.json';

const Home = () => {
  const links = [{ link: 'New Arrivals', sup: 7 }, { link: 'Air Jordan', sup: 8 }, { link: 'Nike Dunks', sup: 8 }, { link: 'New Balance', sup: 16 }, { link: 'Asics', sup: 7 }, { link: 'Converse', sup: 3 }, { link: 'Crocs', sup: 4 }, { link: 'Reebok', sup: 3 }, { link: 'Vans', sup: 4 }];

  const reviews = [
    {
      comm: "Kicks can't be beaten. Found kicks here that I'd been searching for months. Best spot for rare finds!",
      usr: "Chris L."
    },
    {
      comm: "Amazing store! Great selection, even better service. Kicks is my go-to for unique sneakers.",
      usr: "Mia S."
    },
    {
      comm: "Every visit to Kicks Corner scores a win. It’s my secret spot for the sneakers no one else has!",
      usr: "Tyrell J."
    },
  ];

  return (
    <main>
      <section className="py-8 px-2 tab:py-4">
        <Link href={`/shop/all`} className="home-link">
          <span>Shop All</span>
          <sup>71</sup>
        </Link>
        <span className="mx-4 home-line">—</span>
        {
          links.map((link, linkIndx) => (
            <>
              <Link href={`/shop/${link.link.toLowerCase().replace(' ', '-')}`} key={linkIndx} className="home-link">
                <span>{link.link}</span>
                <sup>{link.sup}</sup>
              </Link>
              <span className={`mx-4 home-line ${linkIndx === links.length - 1 ? 'hidden' : ''} tab:mx-2`}>—</span>
            </>
          ))
        }
      </section>
      <div className="overflow-hidden bg-[#ceff31] border-y border-y-black mb-8">
        <ul className="scroll flex items-center whitespace-nowrap px-1 hover:text-black">
          {[...Array(10)].map((_, spanIndex) => (
            <li key={spanIndex} className="text-4xl font-sans font-semibold tracking-tighter mob:text-xl">
              Free shipping on all orders over 100$
              <span className="mx-2 text-xl font-black">·</span>
            </li>
          ))}
        </ul>
      </div>
      <section>
        <h2 className="title tracking-tighter m-4">Latest Arrivals</h2>
        <WhatToGet url={`https://baseline-preset-modern-2.myshopify.com/collections/new-arrivals/products.json`} swiperLength={4} />
      </section>
      <div className="border-y border-y-black p-4 tracking-tighter my-8 font-bold">
        <p className="title">
          A sneaker store specializing in rare and hard-to-find kicks from the world&apos;s top brands.
        </p>
      </div>
      <section className="pt-2">
        <h2 className="title tracking-tighter m-4">Popular</h2>
        <PopularProducts />
      </section>
      <section className="border-y border-y-black overflow-hidden">
        <ProductsScroller url={`https://baseline-preset-modern-2.myshopify.com/collections/air-jordan/products.json`} type={'air-jordan'} scrollClass={`scroll`} imgClass={null} />
      </section>
      <section className="border-y border-b-black overflow-hidden">
        <ProductsScroller url={`https://baseline-preset-modern-2.myshopify.com/collections/nike-dunks/products.json`} type={'nike-dunks'} imgClass={`w-16 h-auto`} scrollClass={`scroll-opp`} />
      </section>
      <section className="grid grid-cols-2 tab:grid-cols-1 border-b border-b-black">
        <div className="relative border-r border-r-black tab:border-r-0">
          <Link href={`/shop/nike-dunks`}>
            <p className="absolute m-3 text-lg">Shop Nike Dunks</p>
            <Image
              src={`/imgs/img1.webp`}
              width={3000}
              height={100}
              alt="Shop Nike Dunks"
            />
          </Link>
        </div>
        <div className="relative border-t-0 tab:border-t tab:border-t-black ">
          <Link href={`/shop/air-jordan`}>
            <p className="absolute m-3 text-lg">Shop Air Jordan</p>
            <Image
              src={`/imgs/img2.webp`}
              width={3000}
              height={100}
              alt="Shop Nike Dunks"
            />
          </Link>
        </div>
      </section>
      <section className="pt-8">
        <h2 className="title tracking-tighter m-4">Nike Dunks</h2>
        <WhatToGet url={`https://baseline-preset-modern-2.myshopify.com/collections/nike-dunks/products.json`} swiperLength={16} />
      </section>
      <section className="border-t border-t-black pt-8">
        <h2 className="title tracking-tighter m-4">As seen in</h2>
        <div className="flex flex-wrap justify-center items-center tab:grid grid-cols-2 gap-16 px-10 border-y border-y-black py-28 tab:justify-items-center">
          <Image
            src={`/imgs/The_New_Yorker_svg.avif`}
            width={200}
            height={200}
            alt="The New Yorker"
            title="The New Yorker"
            quality={100}
          />
          <Image
            src={`/imgs/Monocle_Radio_svg.avif`}
            width={200}
            height={200}
            alt="Monocle"
            title="Monocle"
            quality={100}
            className="mt-4"
          />
          <Image
            src={`/imgs/Frame_6.avif`}
            width={200}
            height={200}
            alt="GQ"
            title="GQ"
            quality={100}
          />
          <Image
            src={`/imgs/Swagger.avif`}
            width={200}
            height={200}
            alt="Swagger"
            title="Swagger"
            quality={100}
          />
          <Image
            src={`/imgs/Esquire_svg.avif`}
            width={200}
            height={200}
            alt="Esquire"
            title="Esquire"
            quality={100}
            className="tab:col-span-2"
          />
        </div>
      </section>
      <section className="pt-8">
        <h2 className="text-6xl tracking-tighter m-4 tab:text-4xl">From the fans</h2>
        <div className="border-y border-y-black py-4 flex items-start justify-between tab:grid tab:gap-6">
          {
            reviews.map((rev, indx) => (
              <div key={indx} className="px-4 grid justify-between">
                <p className="text-2xl font-medium tracking-tighter text-left">{rev.comm}</p>
                <h3 className="text-xl my-2">- {rev.usr}</h3>
              </div>
            ))
          }
        </div>
      </section>
      <section>
        <h2 className="text-5xl tracking-tighter m-4 tab:text-4xl">
          Blog
        </h2>
        <div className="grid grid-cols-3 tab:grid-cols-1 border-t border-t-black">
          {
            AllBlogs.map(blog => (
              <Link href={`/blogs/${blog.url}`} key={blog.id} className={`${blog.id === 1 ? 'border-x border-x-black tab:border-x-0 tab:border-y border-y-black' : ''}`}>
                <div key={blog.id}>
                  <Image
                    src={blog.img}
                    width={3000}
                    height={150}
                    alt={blog.title}
                    title={blog.title}
                    className="object-cover w-full h-96"
                  />
                </div>
                <div className="p-2 py-4 border-t border-t-black">
                  <p className="text-3xl tab:text-2xl tracking-tighter mb-4">{blog.title}</p>
                  <p className="text-lg">
                    {blog.intro.slice(0, 146)} ...
                  </p>
                  <button className="my-4 underline underline-offset-4 hover:text-[#623cea]">
                    Read More &rarr;
                  </button>
                </div>
              </Link>
            ))
          }
        </div>
      </section>
    </main>
  );
};
export default Home;