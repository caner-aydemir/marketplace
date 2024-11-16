interface PaginationControlsProps {
    page: number; // Şu anki sayfa
    totalPages: number; // Toplam sayfa sayısı
    onPageChange: (page: number) => void; // Sayfa değişikliği fonksiyonu
}

export const PaginationControls = ({ page, totalPages, onPageChange }: PaginationControlsProps) => {
    const renderPageNumbers = () => {
        const pageNumbers: (number | string)[] = []; // Sayfa numaraları ve '...' için dizgi veya sayı türü
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
                pageNumbers.push(1, '...', page - 1, page, page + 1, '...', totalPages);
            }
        }
        return pageNumbers;
    };

    return (
        <div className="mt-10 mb-20 flex justify-center items-center space-x-2">
            {/* Önceki sayfa butonu */}
            <button
                className="text-gray-500 px-3 py-1 rounded hover:bg-gray-300 disabled:text-gray-300"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
            >
                Prev
            </button>

            {/* Sayfa numaraları */}
            {renderPageNumbers().map((pageNumber, index) =>
                typeof pageNumber === 'string' ? ( // Eğer pageNumber bir dizgi ise, buton yerine '...' metni
                    <span key={`ellipsis-${index}`} className="px-2">
                        ...
                    </span>
                ) : (
                    <button
                        key={pageNumber}
                        className={`px-3 py-1 rounded ${page === pageNumber ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'
                            } hover:bg-gray-200`}
                        onClick={() => onPageChange(pageNumber)} // Artık pageNumber her zaman number türünde
                    >
                        {pageNumber}
                    </button>
                )
            )}

            {/* Sonraki sayfa butonu */}
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
