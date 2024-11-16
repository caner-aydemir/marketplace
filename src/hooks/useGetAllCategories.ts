import { useQuery } from "@tanstack/react-query";

// Kategoriler için API'den dönen yanıtın tipini tanımlıyorum
interface Category {
    slug: string; // Kategorinin slug değeri (benzersiz anahtar)
    name: string; // Kategorinin adı
    url: string;  // Kategoriye ait URL
}

interface CategoriesResponse {
    status: boolean; // API yanıt durumu
    data: Category[]; // Kategoriler listesi
}

// API'den tüm kategorileri getiren fonksiyonu tanımlıyorum
const fetchAllCategories = async (): Promise<CategoriesResponse> => {
    // API'ye POST isteği gönderiyorum
    const response = await fetch('/api/categories/getAllCategories', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    // Yanıt başarısızsa bir hata fırlatıyorum
    if (!response.ok) {
        throw new Error("Kategori verileri alınamadı.");
    }

    // Yanıtı JSON olarak çözümlüyorum ve döndürüyorum
    return response.json();
};

// React Query'yi kullanarak kategorileri getiren hook'u oluşturuyorum
const useGetAllCategories = () => {
    // React Query'den veri, hata, yükleme durumu ve fetch durumu bilgilerini alıyorum
    const {
        data: apiResponse, // API yanıtını bu değişkende tutuyorum
        error, // Hata durumu burada tutuluyor
        isLoading, // Veri yükleniyor mu kontrolü
        isFetching, // Arka planda veri tekrar fetch ediliyor mu kontrolü
    } = useQuery({
        queryKey: ["getAllCategories"], // Query için benzersiz bir önbellek anahtarı
        queryFn: fetchAllCategories,   // Kategorileri getiren fonksiyonu çağırıyorum
        placeholderData: { status: false, data: [] }, // Varsayılan olarak boş bir veri döndürüyorum
    });

    // API yanıtından sadece 'data' kısmını alıyorum ve 'categories' olarak adlandırıyorum
    const categories = apiResponse?.data || [];

    // Hook'tan kategoriler, hata, yüklenme ve fetch durumlarını döndürüyorum
    return { categories, error, isLoading, isFetching };
};

export default useGetAllCategories;
