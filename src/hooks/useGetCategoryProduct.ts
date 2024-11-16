import { useQuery } from "@tanstack/react-query";

// API'den dönen veri tiplerini `any` olarak ayarladık
const fetchProductByCategoryName = async (categoryName: any): Promise<any> => {
    const response = await fetch('/api/categories/getCategoryProduct', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName }),
    });

    if (!response.ok) {
        throw new Error("Kategori verileri alınamadı.");
    }

    return response.json();
};

// React Query hook'u
const useGetAllCategoryProduct = (categoryName: any) => {
    const {
        data, // API yanıtı
        error, // Hata durumu
        isLoading, // Yükleniyor durumu
        isFetching, // Yeniden fetch ediliyor durumu
    } = useQuery<any>({
        queryKey: ["getCategoryProducts", categoryName], // Cache anahtarı
        queryFn: () => fetchProductByCategoryName(categoryName), // Fetch fonksiyonu
        enabled: !!categoryName, // Kategori adı varsa query aktif
    });

    return { data, error, isLoading, isFetching }; // Dönen değerler
};

export default useGetAllCategoryProduct;
