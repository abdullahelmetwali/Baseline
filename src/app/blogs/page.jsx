import "server-only";
import Link from "next/link";
import Image from "next/image";
import AllBlogs from '@/data/blogs.json';

const Blogs = () => {
    return (
        <main>
            <h2 className="title pt-6 mb-4 mx-3 tracking-tighter">News</h2>
            <section className="border-y border-y-black">
                {
                    AllBlogs.map((blog) => (
                        <Link key={blog.id} href={`/blogs/${blog.url}`}>
                            <div className={`grid grid-cols-2 tab:flex tab:flex-col-reverse min-h-dvh tab:min-h-fit ${blog.id === 1 ? 'border-y border-y-black' : ''}`}>
                                <div className="grid items-center justify-center p-3 w-3/4 tab:w-full">
                                    <div>
                                        <h2 className="title tab:text-3xl tracking-tighter mb-2 tab:mb-0">
                                            {blog.title}
                                        </h2>
                                        <p className="text-xl tracking-tighter mb-3">{blog.date}</p>
                                        <p className="text-lg tracking-tighter">{blog.intro.slice(0, 146)} ...</p>
                                        <button className="my-4 underline underline-offset-4 hover:text-[#623cea]">
                                            Read More &rarr;
                                        </button>
                                    </div>
                                </div>
                                <Image
                                    src={blog.img}
                                    width={3000}
                                    height={500}
                                    alt={blog.title}
                                    title={blog.title}
                                    className="border-l border-l-black tab:border-l-0 min-h-dvh object-cover tab:object-contain tab:min-h-fit"
                                />

                            </div>
                        </Link>
                    ))
                }
            </section>
        </main>
    )
}

export default Blogs