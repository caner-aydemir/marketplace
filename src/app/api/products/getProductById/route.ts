import { NextRequest, NextResponse } from 'next/server';
import apiClient from '@/utils/apiClient';

export async function POST(request: NextRequest) {
    try {
        // Gelen isteğin gövdesinden productId bilgisini alıyorum
        const { productId } = await request.json();

        // Ürün detaylarını almak için ilgili API endpoint'ine GET isteği gönderiyorum
        const response = await apiClient.get(`/products/${productId}`);

        // API'den alınan veriyi başarılı yanıt olarak döndürüyorum
        return NextResponse.json({ status: true, data: response.data });
    } catch (error: any) {
        // Hata oluştuğunda bunu konsola yazdırıyorum
        console.error("Ürün detayı alınamadı:", error);

        // Hata mesajını API'den dönen özel mesaj ya da genel bir mesaj olarak ayarlıyorum
        const errorMessage =
            error.response?.data?.message || "Ürün detayı alınırken bir hata oluştu.";

        // Hata yanıtını kullanıcıya uygun HTTP durum koduyla döndürüyorum
        return NextResponse.json(
            {
                status: false, // İşlemin başarısız olduğunu belirtiyorum
                message: errorMessage, // Hata mesajını yanıt olarak döndürüyorum
            },
            { status: error.response?.status || 500 } // HTTP durum kodunu belirliyorum
        );
    }
}
