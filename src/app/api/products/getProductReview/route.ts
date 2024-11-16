import { NextRequest, NextResponse } from 'next/server';
import apiClient from '@/utils/apiClient';

export async function POST(request: NextRequest) {
    try {
        // Gelen isteğin gövdesinden productId bilgisini alıyorum
        const { productId } = await request.json();

        // Ürüne ait yorumları almak için ilgili API endpoint'ine GET isteği gönderiyorum
        const response = await apiClient.get(`/comments/${productId}`);

        // Başarılı bir yanıt durumunda, API'den gelen veriyi döndürüyorum
        return NextResponse.json({ status: true, data: response.data });
    } catch (error: any) {
        // Hata oluşursa bunu konsola yazdırıyorum

        const errorMessage =
            error.response?.data?.message || "Ürün detayı alınırken bir hata oluştu.";

        // Hata durumunda uygun bir yanıt oluşturuyorum
        return NextResponse.json(
            {
                status: false, // İşlemin başarısız olduğunu belirtiyorum
                message: errorMessage, // Hata mesajını yanıt olarak döndürüyorum
            },
            { status: error.response?.status || 500 } // HTTP durum kodunu belirliyorum
        );
    }
}
