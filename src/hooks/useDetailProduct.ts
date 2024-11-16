import { useQuery } from "@tanstack/react-query";
import { Product } from "../types/Product";

// Belirli bir ürünün detaylarını API'den getiren fonksiyonu tanımlıyorum
const fetchDetailProduct = async (productId: number): Promise<Product> => {
    // API'ye POST isteği gönderiyorum ve ürün ID'sini iletmek için request body'yi dolduruyorum
    const response = await fetch('/api/products/getProductById', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
    });

    // Eğer yanıt başarısızsa bir hata fırlatıyorum
    if (!response.ok) {
        throw new Error("Ürün verileri alınamadı.");
    }

    // API'den dönen yanıtı JSON olarak çözümlüyorum
    const result = await response.json();

    // Ürünün detay bilgilerini döndürüyorum
    return result.data;
};

// Ürün detaylarını almak için React Query kullanıyorum
const useDetailProduct = (productId: number) => {
    // React Query'nin useQuery hook'unu kullanarak API'den veriyi alıyorum
    const {
        data, // API'den gelen ürün detayları
        error, // Eğer bir hata oluşursa bu değişken doluyor
        isFetching, // Veri hala yükleniyorsa bu değişken true oluyor
    } = useQuery<Product>({
        queryKey: ["getProductById", productId], // React Query'nin önbellekleme anahtarı
        queryFn: () => fetchDetailProduct(productId), // API'den veriyi getiren fonksiyonu çağırıyorum
        enabled: !!productId, // Sadece productId varsa query'yi aktif hale getiriyorum
    });

    // API'den gelen veri, hata durumu ve yüklenme durumunu döndürüyorum
    return { data, error, isFetching };
};

export default useDetailProduct;
