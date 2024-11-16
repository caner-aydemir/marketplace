import React, { Dispatch, SetStateAction, useState } from "react";
import useGetAllCategories from "@/hooks/useGetAllCategories";
import { debounce } from "../../utils/debounce/debonce";

interface IProductsFilterContainerProps {
    setFilterCategory: Dispatch<SetStateAction<Record<string, string>>>;
    setFilterParams: Dispatch<SetStateAction<Record<string, string>>>;
}

export const ProductsFilterContainer = ({
    setFilterCategory,
    setFilterParams,
}: IProductsFilterContainerProps) => {
    const { categories, error, isLoading } = useGetAllCategories();
    if (isLoading) return <p>Yükleniyor...</p>;
    if (error) return <p>Hata oluştu: {(error as Error).message}</p>;

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const value = e.target.value;

        // Eğer yazı yazılmaya başlandıysa kategoriyi temizle
        if (selectedCategory) {
            setSelectedCategory(null);
            setFilterCategory((prev) => ({
                ...prev,
                category: "",
            }));
        }

        updateDebounceText(value, name);
    };

    const updateDebounceText = debounce((text: any, name: any) => {
        setFilterParams((prev) => {
            if (text) {
                return { ...prev, [name]: text };
            } else {
                const newParams = { ...prev };
                delete newParams[name];
                return newParams;
            }
        });
    });

    const handleCategoryChange = (categoryName: string) => {
        setSelectedCategory((prevSelectedCategory) =>
            prevSelectedCategory === categoryName ? null : categoryName
        );
    };

    const handleFilter = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        setFilterCategory((prevParams) => ({
            ...prevParams,
            category: selectedCategory || "",
        }));
    };

    const handleClear = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        setSelectedCategory(null);
        setFilterCategory((prevParams) => ({
            ...prevParams,
            category: "",
        }));
    };

    return (
        <div className="p-4 max-w-xs mx-auto">
            <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="search"
                    className="block w-full pl-10 py-2 border border-gray-300 rounded-md text-sm focus:border-gray-400 focus:ring-gray-300 focus:outline-none"
                    placeholder="Quick search"
                    onChange={(e) => onChange(e, "q")}
                />
            </div>

            <h2 className="text-lg font-bold mb-2">Kategoriler</h2>
            <div className="border-b-4 w-full border-gray-900 w-10 mb-4"></div>

            {isLoading ? (
                <div role="status" className="flex justify-center">
                    <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-200 animate-spin fill-green-500"
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
            ) : (
                <div className="space-y-2">
                    {categories?.map((category: any) => (
                        <label key={category.slug} className="flex items-center text-sm text-gray-800">
                            <input
                                type="checkbox"
                                className="mr-2"
                                name="category"
                                value={category.slug}
                                checked={selectedCategory === category.slug}
                                onChange={() => handleCategoryChange(category.slug)}
                            />
                            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                        </label>
                    ))}
                </div>
            )}

            <button
                className="w-full mt-6 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400"
                onClick={handleFilter}
                disabled={selectedCategory === null}
            >
                Filtrele
            </button>

            {selectedCategory && (
                <button
                    className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={handleClear}
                >
                    Kategoriyi Temizle
                </button>
            )}
        </div>
    );
};
