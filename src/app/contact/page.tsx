const Contact = () => {
    return (
        <section className="grid grid-cols-2 tab:grid-cols-1">
            <h1 className="text-7xl p-4 pt-7 tab:text-4xl tracking-tighter border-r border-r-black tab:border-r-0">Contact</h1>
            <div className="tab:border-t border-t-black">
                <form action="#" method="POST" className="w-full p-4">
                    <div className="flex items-center gap-4 tab:flex-col">
                        <input
                            type="text"
                            id="name"
                            className="bg-transparent text-xl placeholder:text-black outline-none p-1 border-y border-t-0 border-b-black w-full"
                            placeholder="Name"
                            title="Please Enter Your Name"

                        />
                        <input
                            type="email"
                            id="email"
                            className="bg-transparent text-xl placeholder:text-black outline-none p-1 border-y border-t-0 border-b-black w-full"
                            placeholder="Email Address"
                            title="Please Enter Your Email Address"

                        />
                    </div>
                    <input
                        type="tel"
                        id="number"
                        className="bg-transparent text-xl placeholder:text-black outline-none p-1 border-y border-t-0 border-b-black w-full my-6"
                        placeholder="Phone Number"
                        title="Please Enter Your Phone Number"
                    />
                    <div className="text-xl">
                        <label htmlFor="message">Message</label> <br />
                        <textarea name="message" id="message" className="bg-transparent border border-black w-full mt-2 p-1" cols={40} rows={7} title="Please Write Here Your Message"></textarea>
                    </div>
                    <button className="w-full bg-black text-white text-center py-2 text-xl mt-2" type="button">
                        Send
                    </button>
                </form>
            </div>
        </section>
    )
}
export default Contact