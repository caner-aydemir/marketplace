import { useQuery } from "@tanstack/react-query";
import { Product } from "../types/Product";

// Ürün yorumlarını almak için bir API çağrısı yapan fonksiyonu tanımlıyorum
const fetchProductReview = async (productId: string) => {
    // API'ye POST isteği yaparak ürünün yorumlarını alıyorum
    const response = await fetch('/api/products/getProductReview', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
    });

    // Eğer istek başarılı olmazsa bir hata fırlatıyorum
    if (!response.ok) {
        throw new Error("Ürün verileri alınamadı.");
    }

    // API'den dönen verileri JSON formatında çözümlüyorum
    const result = await response.json();

    // Yorum verilerini döndürüyorum
    return result.data;
};

// Ürün yorumlarını almak için özel bir React Query hook'u oluşturuyorum
const useProductReviews = (productId: string) => {
    const {
        data,        // API'den gelen veriler
        error,       // Hata durumu
        isFetching,  // Veri yükleme durumu
    } = useQuery<Product>({
        queryKey: ["getProductReview", productId], // Cache için bir anahtar tanımlıyorum
        queryFn: () => fetchProductReview(productId), // API çağrısı yapan fonksiyonu belirtiyorum
        enabled: !!productId, // Eğer `productId` yoksa sorguyu çalıştırmıyorum
    });

    // API verilerini ve durumu döndürüyorum
    return { data, error, isFetching };
};

export default useProductReviews;
