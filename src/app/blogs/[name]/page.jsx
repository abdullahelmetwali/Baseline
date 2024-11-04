"use cache";
import NextAndPrev from '@/components/BlogComponents/NextAndPrev';
import AllBlogs from '@/data/blogs.json';
import Image from 'next/image';

const BlogPage = ({ params }) => {
    const { name } = params;
    const seenBlog = AllBlogs.find(blog => blog.url === name);
    return (
        <main className='min-h-screen'>
            <section className="relative min-w-full min-h-[80vh] tab:min-h-48">
                <Image
                    src={seenBlog.img}
                    alt={seenBlog.title}
                    title={seenBlog.title}
                    fill
                    className="object-cover min-h-[80vh] tab:min-h-full"
                />
            </section>
            <section className='flex border-t border-t-black tab:flex-col'>
                <div className='w-9/12 tab:w-full'>
                    <div className='w-3/4 p-3 tab:w-full'>
                        <h1 className='title tracking-tighter'>{seenBlog.title}</h1>
                        <p className='mt-3'>by {seenBlog.author}</p>
                        <p>{seenBlog.date}</p>
                        <article className='text-lg my-8'>
                            {seenBlog.intro}
                        </article>
                        <div>
                            {
                                seenBlog?.blogData?.map((blog, blogIndx) => (
                                    <article key={blogIndx} className='text-lg my-6'>
                                        - <strong>{blog.header}</strong> <span>{blog.blog}</span>
                                    </article>
                                ))
                            }
                        </div>
                        <div className='text-lg'>
                            <strong>Conclusion: </strong>
                            <span>{seenBlog.conc}</span>
                        </div>
                        <div className='flex items-center gap-4 mt-5'>
                            <button className='underline underline-offset-2 hover:text-[#623cea] hover:-translate-y-2 transition-all duration-150 ease-in-out h-fit w-fit'>
                                Facebook
                            </button>
                            <button className='underline underline-offset-2 hover:text-[#623cea] hover:-translate-y-2 transition-all duration-150 ease-in-out h-fit w-fit'>
                                Twitter (X)
                            </button>
                            <button className='underline underline-offset-2 hover:text-[#623cea] hover:-translate-y-2 transition-all duration-150 ease-in-out h-fit w-fit'>
                                Pinterest
                            </button>
                        </div>
                    </div>
                </div>
                <NextAndPrev seenBlog={seenBlog} />
            </section>
        </main>
    )
}
export default BlogPage