import { useCart } from "@/hooks/useCart";
import { useUser } from "@/hooks/useUser";
import { useToast } from "@/Providers/ToastContext";

export const useAddCard = () => {
    // Alışveriş sepeti ile ilgili fonksiyonlar ve verileri alıyorum
    const { setShoppingCart } = useCart();
    // Kullanıcı bilgilerini alıyorum
    const { user } = useUser();
    // Toast mesajlarını göstermek için gerekli fonksiyonları alıyorum
    const { showToast } = useToast();

    // Ürün ekleme fonksiyonunu tanımlıyorum
    const addCardFunction = async (productId: number) => {
        // Kullanıcının ID'sini alıyorum
        const userId = 1
        try {
            // API'ye POST isteği göndererek ürünü sepete ekliyorum
            const response = await fetch('/api/card/addCard', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, productId }),
            });

            // Eğer API'den dönen yanıt başarısızsa bir hata fırlatıyorum
            if (!response.ok) {
                throw new Error("Failed to add card.");
            }

            // API'den dönen ürün verisini alıyorum
            const productData = await response.json();

            // Eğer işlem başarılıysa
            if (productData.status) {
                // Sepeti güncelliyorum ve yeni ürünü ekliyorum
                setShoppingCart((prevState) => [...prevState, productData.data]);

                // Başarılı mesajını kullanıcıya gösteriyorum
                showToast("success", "Ürün sepetinize eklendi");
            }
        } catch (error) {
            console.error("Error", error)
            // Eğer bir hata oluşursa, kullanıcıya uygun bir hata mesajı gösteriyorum
            showToast("error", "Üzgünüz, stoklarda kalmamış olabilir.");
        }
    };

    // Ürün ekleme fonksiyonunu döndürüyorum
    return { addCardFunction };
};
