const Loading = () => {
    return (
        <div className="w-full flex flex-col">
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="mb-4 border p-4 rounded shadow animate-pulse">
                    <div className="h-5 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded"></div>
                </div>
            ))}
        </div>
    );
};

export default Loading;
