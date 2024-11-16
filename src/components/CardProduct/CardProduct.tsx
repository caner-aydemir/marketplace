import { useState, MouseEvent } from "react";
import { Product } from "../../types/Product";
import Image from "next/image";
import Link from "next/link";
import { useAddCard } from "@/hooks/useAddCard";

interface IProductCardProps {
    product: Product;
}

export const CardProduct = ({ product }: IProductCardProps) => {
    const { addCardFunction } = useAddCard();
    const [isAdding, setIsAdding] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Sepete ekleme fonksiyonunda doğru tip tanımları
    const handleAddToCart = async (productId: number, e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
        setIsAdding(true);
        try {
            await addCardFunction(productId);
        } finally {
            setIsAdding(false);
        }
    };

    // Yıldızlar için dolu ve boş SVG'ler
    const filledStars = Array.from({ length: Math.round(product.rating) }, (_, index) => (
        <svg
            key={`filled-star-${index}`}
            className="w-4 h-4 fill-current text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
        >
            <path
                fillRule="evenodd"
                d="M10 1l2.5 6.5H18l-5 3.8 1.7 6.3L10 14.3 5.3 17.6l1.7-6.3-5-3.8h5.5L10 1z"
                clipRule="evenodd"
            />
        </svg>
    ));

    const emptyStars = Array.from({ length: 5 - Math.round(product.rating) }, (_, index) => (
        <svg
            key={`empty-star-${index}`}
            className="w-4 h-4 fill-current text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
        >
            <path
                fillRule="evenodd"
                d="M10 1l2.5 6.5H18l-5 3.8 1.7 6.3L10 14.3 5.3 17.6l1.7-6.3-5-3.8h5.5L10 1z"
                clipRule="evenodd"
            />
        </svg>
    ));

    return (
        <div className="p-4 rounded-lg">
            <Link href={`/products/${product.id}`}>
                <div className="relative w-full h-48">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                                className="animate-spin h-8 w-8 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                        </div>
                    )}
                    <Image
                        onLoad={() => setIsLoading(false)}
                        placeholder="blur"
                        loading="lazy"
                        src={product.thumbnail}
                        alt={product.title}
                        className="object-cover rounded-lg"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAyMCAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTIiIGZpbGw9IiNkZWQ5ZGUiLz48L3N2Zz4="
                    />
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <p className="text-lg font-semibold mt-2">${product.price}</p>
                    <div className="flex items-center mt-2">
                        <div className="flex">
                            {filledStars}
                            {emptyStars}
                        </div>
                        <span className="ml-1 text-gray-500">{product.rating.toFixed(1)}</span>
                    </div>
                    <button
                        className={`bg-[#00B500] text-white px-4 py-2 mt-2 w-full rounded-md z-50 ${isAdding && "bg-gray-600"
                            }`}
                        onClick={(e) => handleAddToCart(product.id, e)}
                        disabled={isAdding}
                    >
                        {isAdding ? "Ekleniyor.." : "Sepete Ekle"}
                    </button>
                </div>
            </Link>
        </div>
    );
};
