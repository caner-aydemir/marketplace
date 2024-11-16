import { useState } from "react";
import useGetProducts from "@/hooks/useGetProduct";
import useGetCategoryProducts from "@/hooks/useGetCategoryProduct";
import { PaginationControls } from "@/components/PaginationControls";
import { CardProduct } from "@/components/CardProduct/CardProduct";

// Tüm tipleri 'any' olarak ayarladık
interface IProductsContainerProps {
    filterParams: any;
    filterCategory: any;
}

export const ProductsContainer = ({ filterParams, filterCategory }: IProductsContainerProps) => {
    const [page, setPage] = useState<any>(1);

    const { data: productsData, isFetching } = useGetProducts({
        pagination: { limit: 9, skip: (page - 1) * 9 },
        q: filterParams.q,
        enabled: !filterCategory?.category,
    });

    const { data: categorizedProducts, isFetching: isLoading } = useGetCategoryProducts(
        filterCategory?.category
    );

    const total = filterCategory?.category
        ? categorizedProducts?.total || 0
        : productsData?.data.total || 0;
    const totalPages = Math.ceil(total / 9);

    const handlePageChange = (newPage: any) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="p-4 mx-auto">
            {(isLoading || isFetching) && (
                <div role="status" className="text-center">
                    <svg
                        aria-hidden="true"
                        className="inline w-16 h-16 text-gray-200 animate-spin fill-green-500"
                        viewBox="0 0 100 101"
                        fill="none"
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
            )}

            {filterCategory?.category ? (
                categorizedProducts && (
                    <ProductList products={categorizedProducts.products} total={categorizedProducts.total} />
                )
            ) : (
                productsData && (
                    <ProductList
                        products={productsData.data.products}
                        total={productsData.data.total}
                    />
                )
            )}
            {isLoading || isFetching ? null : (
                <PaginationControls
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

// Ürün listesi bileşeni
interface IProductListProps {
    products: any; // Ürünler için any kullanımı
    total: any; // Toplam ürün sayısı için any kullanımı
}

const ProductList = ({ products, total }: IProductListProps) => (
    <div className="p-10">
        <p className="mb-4 font-bold">{total} ürün listeleniyor</p>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
            {products.map((product: any) => (
                <CardProduct key={product.id} product={product} />
            ))}
        </div>
    </div>
);
