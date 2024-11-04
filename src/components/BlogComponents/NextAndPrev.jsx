"use client";
import { useEffect, useState } from "react";
import AllBlogs from '@/data/blogs.json';
import { useRouter } from "next/navigation";

const NextAndPrev = ({ seenBlog }) => {
    const router = useRouter();
    const [seeNew, setSeeNew] = useState(null);
    const [seeOld, setSeeOld] = useState(null);

    const nowIndex = AllBlogs.findIndex((blog) => blog.id === seenBlog.id);
    const nextBlog = AllBlogs[nowIndex - 1];
    const oldBlog = AllBlogs[nowIndex + 1];

    useEffect(() => {
        if (seenBlog.id === AllBlogs[AllBlogs.length - 1].id) {
            setSeeNew(true);
        } else if (seenBlog.id === AllBlogs[0].id) {
            setSeeOld(true);
        } else {
            setSeeNew(true);
            setSeeOld(true);
        }
    }, [seenBlog.id]);

    return (
        <div className='px-4 py-7 w-3/12 tab:w-full border-l border-l-black tab:border-l-0 tab:border-t tab:border-t-black'>
            <div className='flex justify-between items-center w-full relative'>
                {seeNew &&
                    <button
                        className='underline underline-offset-8 text-lg hover:text-[#623cea] absolute left-0'
                        onClick={() => router.push(`/blogs/${nextBlog.url}`)}
                    >
                        &larr; Newer
                    </button>}
                {seeOld &&
                    <button
                        className='underline underline-offset-8 text-lg hover:text-[#623cea] absolute right-0'
                        onClick={() => router.push(`/blogs/${oldBlog.url}`)}
                    >
                        Older &rarr;
                    </button>}
            </div>
        </div>
    )
};
export default NextAndPrev;