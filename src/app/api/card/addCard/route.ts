import { NextRequest, NextResponse } from 'next/server';
import apiClient from "@/utils/apiClient";

export async function POST(request: NextRequest) {
    // İlk olarak gelen istekteki userId ve productId verilerini alıyorum
    const { userId, productId } = await request.json();

    try {
        // Ürünü sepete eklemek için gerekli payload'ı oluşturuyorum
        const payload = {
            userId: userId, // Kullanıcının ID'sini buraya ekliyorum
            products: [
                {
                    id: productId, // Eklemek istediğim ürünün ID'si
                    quantity: 1, // Ürün miktarını 1 olarak belirliyorum
                },
            ],
        };

        // Sepet API'sine payload ile POST isteği gönderiyorum
        const response = await apiClient.post(`/carts/add`, payload);

        // API'den dönen veriyi konsola yazdırıyorum (debug amaçlı)


        // Sepete ekleme başarılıysa, gelen veriyi ve durumu döndürüyorum
        return NextResponse.json({ data: response.data, status: true });
    } catch (error) {

        // Kullanıcıya hata mesajını JSON formatında dönüyorum
        return NextResponse.json({ status: false, message: error.message });
    }
};
