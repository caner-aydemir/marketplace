"use client";
import React, { useEffect, useState } from "react";
import useDetailProduct from "@/hooks/useDetailProduct";
import useProductReviews from "@/hooks/useProductReviews";
import { useRouter } from "next/navigation";
import ImageGallery from "react-image-gallery";
import { useAddCard } from "@/hooks/useAddCard";
import { DetailProductContent } from "@/components/DetailProduct/DetailProductContent";
import "react-image-gallery/styles/css/image-gallery.css";

const ProductDetailPage = ({ params: paramsPromise }: { params: Promise<{ id: number }> }) => {
    const [productId, setProductId] = useState<number | null>(null);
    const { data: productDetailData, isFetching, error } = useDetailProduct(productId || 0);
    const { data: productCommentsData, isFetching: commentsIsLoading } = useProductReviews(productId || 0);
    const { addCardFunction } = useAddCard();
    const router = useRouter();

    // params Promise'ini çöz ve productId'yi ayarla
    useEffect(() => {
        (async () => {
            const resolvedParams = await paramsPromise;
            setProductId(resolvedParams.id);
        })();
    }, [paramsPromise]);

    if (!productId || isFetching) {
        return (
            <div role="status" className="text-center mt-20">
                <svg
                    aria-hidden="true"
                    className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    if (productDetailData === undefined || error) {
        return (
            <div className="text-center">
                <h1 className="">Ürün Bulunamadı</h1>
                <button type="button" onClick={() => router.push("/")}>
                    Anasayfaya dön
                </button>
            </div>
        );
    }

    const addCardFunct = (productId: number) => {
        addCardFunction(productId);
    };

    return (
        <div>
            <div className="grid grid-cols-12 gap-20 mt-8 mx-40 max-w-full">
                <div className="col-span-12 md:col-span-4">
                    <ImageGallery
                        items={productDetailData.images.map((image) => ({
                            original: image,
                            thumbnail: image,
                            showFullscreenButton: false,
                            showPlayButton: false,
                            useBrowserFullscreen: false,
                        }))}
                    />
                </div>
                <div className="col-span-12 md:col-span-8">
                    <DetailProductContent
                        productDetailData={productDetailData}
                        productCommentsData={productCommentsData}
                    />
                </div>
            </div>
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 z-50">
                <div className="flex items-center justify-evenly py-4">
                    <h1 className="font-bold px-6 py-4 border">Sipariş Özeti:</h1>
                    <div className="px-6">
                        <h1 className="font-bold text-sm">{productDetailData.title}</h1>
                        <p>{productDetailData.description}</p>
                    </div>
                    <p className="font-bold text-3xl">${productDetailData.price}</p>
                    <button
                        className="bg-[#00B500] text-white px-4 py-2 rounded-md"
                        onClick={() => addCardFunct(productId)}
                    >
                        Sepete Ekle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
