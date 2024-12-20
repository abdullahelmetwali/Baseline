"use client";
import AllFaqs from '@/data/faqs.json';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface FAQ {
    question: string,
    answer: string
};

const FAQs = () => {
    const [openQuestions, setOpenQuestions] = useState<any>([]);

    const toggleAnswer = (index: number) => {
        setOpenQuestions((prevOpenQuestions) =>
            prevOpenQuestions.includes(index)
                ? prevOpenQuestions.filter((i: number) => i !== index)
                : [...prevOpenQuestions, index]
        );
    };

    return (
        <section>
            <h1 className="text-7xl p-4 pt-7 tab:text-4xl tracking-tighter">FAQs</h1>
            <ul className="grid grid-cols-2 tab:grid-cols-1 border-t border-t-black">
                {AllFaqs.map((faq: FAQ, faqIndx: number) => (
                    <li
                        key={faqIndx}
                        className={`border-b border-b-black p-4 ${faqIndx % 2 === 0 ? 'border-r border-r-black tab:border-r-0' : ''} tab:px-2`}
                        onClick={() => toggleAnswer(faqIndx)}
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl tracking-tighter tab:w-3/4">{faq.question}</h3>
                            <button
                                className="m-0 p-0"
                                onClick={() => toggleAnswer(faqIndx)}
                            >
                                <Image
                                    src={openQuestions.includes(faqIndx) ? '/icons/Subctract.svg' : '/icons/Plus.svg'}
                                    width={23}
                                    height={23}
                                    alt={openQuestions.includes(faqIndx) ? "Close" : "Open"}
                                    title={openQuestions.includes(faqIndx) ? "Close Answer" : "Open Answer"}
                                    className="w-4 h-auto tab:w-5"
                                />
                            </button>
                        </div>
                        <p
                            className={`mt-1 text-base overflow-hidden transition-all duration-300 ease-in-out ${openQuestions.includes(faqIndx) ? 'max-h-[100px] opacity-100' : 'max-h-0 opacity-0'} tab:text-xl`}
                        >
                            {faq.answer}
                        </p>
                    </li>
                ))}
            </ul>
            <div className='p-4 tab:px-2 text-lg tracking-tight'>
                <p>If You need any help, <Link href={`/contact`} className='hover:text-[#623cea] underline underline-offset-2'>Please contact us &rarr;</Link></p>
            </div>
        </section>
    );
};

export default FAQs;
