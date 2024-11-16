// API çağrıları için dinamik sorgu oluşturuyorum
const queryMaker = (q: string | undefined, limit: number, skip: number): string => {
    // Eğer arama terimi (q) varsa, arama sorgusu oluşturuyorum
    if (q) {
        return `/search?q=${q}`; // Örnek: /search?q=keyword
    } else {
        // Eğer arama terimi yoksa, limit ve skip parametrelerine göre sorgu oluşturuyorum
        return `?limit=${limit}&skip=${skip}`; // Örnek: ?limit=10&skip=20
    }
};

export default queryMaker; // Bu fonksiyonu dışa aktarıyorum ki diğer dosyalarda kullanabileyim
