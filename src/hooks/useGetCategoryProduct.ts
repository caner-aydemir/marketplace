import { useQuery } from "@tanstack/react-query";

// Kategori ürünleri için API'den dönen yanıtın tipini tanımlıyorum
interface CategoryProduct {
    slug: string; // Ürünün benzersiz slug değeri
    name: string; // Ürünün adı
    url: string;  // Ürüne ait URL
}

interface CategoriesResponse {
    status: boolean; // API yanıt durumu
    data: CategoryProduct[]; // Kategoriye ait ürünlerin listesi
}

// Belirli bir kategori adına göre ürünleri getiren API çağrısı yapan fonksiyonu tanımlıyorum
const fetchProductByCategoryName = async (categoryName: string): Promise<CategoriesResponse> => {
    // API'ye POST isteği gönderiyorum ve kategori adını request body'de iletiyorum
    const response = await fetch('/api/categories/getCategoryProduct', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName }),
    });

    // Eğer yanıt başarısızsa bir hata fırlatıyorum
    if (!response.ok) {
        throw new Error("Kategori verileri alınamadı.");
    }

    // Yanıtı JSON olarak çözümlüyor ve döndürüyorum
    return response.json();
};

// React Query'yi kullanarak belirli bir kategoriye ait ürünleri getiren hook'u oluşturuyorum
const useGetAllCategoryProduct = (categoryName: string) => {
    // React Query ile veri, hata durumu, yüklenme durumu ve fetch durumu bilgilerini alıyorum
    const {
        data, // API'den dönen yanıtı burada tutuyorum
        error, // Hata oluşursa bu değişken doluyor
        isLoading, // Veriler yükleniyor mu kontrolü
        isFetching, // Veriler yeniden fetch ediliyor mu kontrolü
    } = useQuery({
        queryKey: ["getCategoryProducts", categoryName], // Query'nin benzersiz önbellek anahtarı
        queryFn: () => fetchProductByCategoryName(categoryName), // API çağrısını yapan fonksiyon
        enabled: !!categoryName, // Eğer kategori adı varsa query'yi aktif hale getiriyorum
    });

    // Hook'tan dönen değerler; veriler, hata durumu ve yükleme durumları
    return { data, error, isLoading, isFetching };
};

export default useGetAllCategoryProduct;
