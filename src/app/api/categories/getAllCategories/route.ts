import { NextRequest, NextResponse } from 'next/server';
import apiClient from '@/utils/apiClient';

export async function POST(request: NextRequest) {
    try {
        // Ürün kategorilerini almak için '/products/categories' endpoint'ine bir GET isteği yapıyorum
        const response = await apiClient.get('/products/categories');

        // Eğer işlem başarılı olursa, gelen veriyi ve durumu JSON formatında döndürüyorum
        return NextResponse.json({
            status: true, // İşlemin başarılı olduğunu belirtiyorum
            data: response.data, // Gelen kategori verilerini yanıt olarak ekliyorum
        });
    } catch (error: any) {

        // Hata mesajını belirliyorum, eğer API'den özel bir mesaj dönerse onu kullanıyorum
        const errorMessage =
            error.response?.data?.message || "Kategoriler alınırken bir hata oluştu.";

        // Kullanıcıya hata durumunda uygun bir yanıt oluşturuyorum
        return NextResponse.json(
            {
                status: false, // İşlemin başarısız olduğunu belirtiyorum
                message: errorMessage, // Hata mesajını yanıt olarak ekliyorum
            },
            { status: error.response?.status || 500 } // Yanıt durum kodunu ayarlıyorum
        );
    }
}
