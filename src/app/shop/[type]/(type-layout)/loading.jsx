const Loading = () => {
    return (
        <div className="grid grid-cols-3 tab:grid-cols-2 mob:grid-cols-1 w-full gap-3 px-2">
            {
                [...Array(9)].map((_, loaderIndex) => (
                    <div key={loaderIndex} className="w-full h-96 tab:h-72 lightLoader rounded-lg">
                    </div>
                ))
            }
        </div>
    )
}
export default Loading