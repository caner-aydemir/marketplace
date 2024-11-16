import { useQuery } from "@tanstack/react-query";
import queryMaker from "@/utils/queryMaker";

// Filtre parametrelerini tanımlıyorum
interface IFilterParams {
    q?: string; // Arama sorgusu
    pagination: {
        limit: number; // Bir sayfada kaç ürün gösterileceği
        skip: number;  // Hangi ürünlerden itibaren başlaması gerektiği
    };
    enabled: boolean; // Query'nin aktif olup olmadığını belirtiyorum
}

// API'den dönen ürün yanıtını tanımlıyorum
interface IProductsResponse {
    status: boolean; // API çağrısının başarılı olup olmadığını belirtiyor
    data: {
        total: number; // Toplam ürün sayısı
        products: Array<{
            id: number; // Ürünün benzersiz kimliği
            name: string; // Ürün adı
            price: number; // Ürün fiyatı
            description: string; // Ürün açıklaması
            imageUrl: string; // Ürün görseli URL'si
        }>;
    };
}

// Ürünleri getiren API çağrısını yapıyorum
const fetchProducts = async (filterParams: IFilterParams): Promise<IProductsResponse> => {
    // API'ye POST isteği gönderiyorum ve filtre parametrelerini iletiyorum
    const response = await fetch('/api/products/getProducts', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filterParams),
    });

    // Yanıt başarısızsa bir hata fırlatıyorum
    if (!response.ok) {
        throw new Error("Ürün verileri alınamadı.");
    }

    // JSON formatında dönen veriyi alıyorum
    return response.json();
};

// React Query'yi kullanarak ürünleri getiren hook'u tanımlıyorum
const useGetProducts = (filterParams: IFilterParams) => {
    // Query'nin durumlarını ve verilerini alıyorum
    const {
        data,        // API'den dönen veriler
        error,       // Hata durumu
        isFetching,  // Query'nin fetch işlemi yapıp yapmadığını kontrol ediyor
    } = useQuery({
        queryKey: ["getProducts", filterParams], // Query için benzersiz bir anahtar oluşturuyorum
        queryFn: () => fetchProducts(filterParams), // API çağrısını yapan fonksiyonu bağlıyorum
        enabled: filterParams.enabled, // Eğer 'enabled' true ise query'yi aktif hale getiriyorum
    });

    // Hook'tan veri, hata ve fetch durumu döndürüyorum
    return { data, error, isFetching };
};

// Hook'u dışa aktarıyorum
export default useGetProducts;
