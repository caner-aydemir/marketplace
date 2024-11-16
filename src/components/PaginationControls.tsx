export const PaginationControls = ({ page, totalPages, onPageChange }) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (page <= 3) {
                pageNumbers.push(1, 2, 3, '...', totalPages);
            } else if (page >= totalPages - 2) {
                pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pageNumbers.push(1, '...', page, '...', totalPages);
            }
        }
        return pageNumbers;
    };

    return (
        <div className="mt-10 mb-20 flex justify-center items-center space-x-2">
            <button
                className="text-gray-500 px-3 py-1 rounded hover:bg-gray-300 disabled:text-gray-300"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
            >
                Prev
            </button>
            {renderPageNumbers().map((pageNumber, index) =>
                pageNumber === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-2">
                        ...
                    </span>
                ) : (
                    <button
                        key={pageNumber}
                        className={`px-3 py-1 rounded ${
                            page === pageNumber ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'
                        } hover:bg-gray-200`}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                )
            )}
            <button
                className="text-gray-500 px-3 py-1 rounded hover:bg-gray-300 disabled:text-gray-300"
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
            >
                Next
            </button>
        </div>
    );
};
