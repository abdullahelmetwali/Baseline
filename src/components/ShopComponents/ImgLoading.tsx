"use client";
import Image from "next/image";
import React, { useState } from "react";

interface ImgLoadingProps {
    src: string | null,
    width: number | null,
    height: number | null,
    alt: string | null,
    title: string
}

const ImgLoading: React.FC<ImgLoadingProps> = ({ src, width, height, alt, title }) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <>
            {
                isLoading && <div className="lightLoader w-full h-[31.5rem]"></div>
            }
            <Image
                src={src}
                width={width}
                height={height}
                alt={alt}
                title={title}
                onLoad={() => setIsLoading(false)}
                priority
                unoptimized
                className={`${isLoading ? 'hidden' : 'block'}`}
            />
        </>
    )

}
export default ImgLoading