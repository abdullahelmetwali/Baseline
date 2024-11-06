const ProductLoading = () => {
    return (
        <div className="grid grid-cols-2 w-full min-h-screen tab:grid-cols-1">
            <div className="h-screen w-full lightLoader border-r border-black tab:h-full tab:border-b tab:border-b-black tab:border-r-0"></div>
            <div className="h-screen w-full lightLoader tab:h-full"></div>
        </div>
    )
}
export default ProductLoading