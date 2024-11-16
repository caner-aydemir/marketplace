"use client";
import { useState } from "react"
import { IComment } from "../../types/Review";
import { Product } from "../../types/Product";
import { useAddCard } from "@/hooks/useAddCard";

const colorsData = [
    { id: 1, name: "Silver" },
    { id: 2, name: "Black" },
];
const featuresData = [
    { id: 1, title: "Ürün Özellik 1", desc: "Lorem Ipsum Dolar Sit Amet" },
    { id: 2, title: "Ürün Özellik 2", desc: "Lorem Ipsum Dolar Sit Amet" },
    { id: 3, title: "Ürün Özellik 3", desc: "Lorem Ipsum Dolar Sit Amet" },
    { id: 4, title: "Ürün Özellik 4", desc: "Lorem Ipsum Dolar Sit Amet" },
];
interface IProductDetailContentrProps {
    productDetailData: Product;
    productCommentsData?: any; // Tür belirtmeden kullanıyoruz
}


export function DetailProductContent({
    productDetailData,
    productCommentsData,
}: IProductDetailContentrProps) {

    const { addCardFunction } = useAddCard()
    const [selectedColor, setSelectedColor] = useState(colorsData[0].id);
    const [selectedFeature, setSelectedFeature] = useState(featuresData[0].id);
    const [isAdding, setIsAdding] = useState(false);
    const handleAddToCart = async (productId: number) => {
        setIsAdding(true);
        await addCardFunction(productId).then(() => {
            setIsAdding(false);
        })
    };

    const filledStars = Array.from({ length: 5 }, (_, index) => (
        <svg
            key={index}
            className="w-3 h-3 fill-current text-yellow-500"
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
        <div>
            <h1 className="font-bold text-4xl">{productDetailData.title}</h1>
            <p className="font-normal text-lg text-gray-400 mt-6">
                {productDetailData.description}
            </p>
            <h3 className="font-bold mt-6">Renk Seç:</h3>
            <div className="flex gap-4 pt-4">
                {colorsData.map((color) => (
                    <button
                        key={color.id}
                        onClick={() => setSelectedColor(color.id)}
                        className={`relative flex items-center justify-center gap-2 border rounded-md text-sm px-10 py-2 transition-all ${selectedColor === color.id
                            ? "bg-white shadow-lg border-green-500"
                            : "bg-gray-100 border-gray-300"
                            }`}
                    >
                        <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${color.name === "Silver"
                                ? "bg-gray-400"
                                : "bg-black border border-gray-300"
                                }`}
                        ></span>
                        <span
                            className={`font-medium ${selectedColor === color.id ? "text-black" : "text-gray-500"
                                }`}
                        >
                            {color.name}
                        </span>
                        {selectedColor === color.id && (
                            <span className="text-green-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </span>
                        )}
                    </button>
                ))}
            </div>
            <h3 className="font-bold mt-6">Özellik Seç:</h3>
            <div className="grid grid-cols-2 gap-4 pt-4">
                {featuresData.map((feature) => (
                    <button
                        key={feature.id}
                        onClick={() => setSelectedFeature(feature.id)}
                        className={`p-4 border rounded-lg text-left ${selectedFeature === feature.id
                            ? "border-green-500 bg-green-100"
                            : "border-gray-300"
                            }`}
                    >
                        <h4
                            className={`font-bold ${selectedFeature === feature.id ? "text-green-600" : "text-gray-800"
                                }`}
                        >
                            {feature.title}
                        </h4>
                        <p className="text-sm text-gray-500">{feature.desc}</p>
                    </button>
                ))}
            </div>
            {/* Ürün Yorumları */}
            <div className="flex flex-col mt-6">
                <h3 className="font-bold">Ürün Yorumları:</h3>
                <div className="flex items-center gap-x-1 font-semibold mt-6">
                    <span>{productCommentsData?.user?.username}</span>
                    <span className="flex">{filledStars}</span>
                </div>
                <div>{productCommentsData?.body}</div>
            </div>
            <div className=" bg-white p-4 border-t flex items-center justify-between">
                <div>
                    <h1 className="font-bold">Order Summary:</h1>
                    <p>${productDetailData.price}</p>
                </div>
                <button
                    className={`text-white px-6 py-2 rounded-md ${isAdding ? "bg-gray-600" : "bg-[#00B500] "}`}
                    disabled={isAdding}
                    onClick={() => handleAddToCart(productDetailData.id)}
                >
                    {isAdding ? "Ekleniyor.." : "Sepete Ekle"}
                </button>
            </div>
        </div>

    );
}
