import { NextRequest, NextResponse } from 'next/server';
import apiClient from '@/utils/apiClient';

export async function POST(request: NextRequest) {
    // Öncelikle tarayıcı çerezlerinden token'ı alıyorum
    const token = request.cookies.get("token")?.value;

    // Eğer token varsa, kimlik doğrulama için işlem yapıyorum
    if (token) {
        try {
            // Token'ı kullanarak kullanıcı bilgisini almak için '/auth/me' endpoint'ine istek gönderiyorum
            const response = await apiClient.get('/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`, // Token'ı yetkilendirme başlığına ekliyorum
                },
                withCredentials: true, // Çerezlerle kimlik doğrulama bilgilerini gönderiyorum
            });

            // Eğer her şey yolundaysa, gelen veriyi JSON olarak döndürüyorum
            return NextResponse.json({ status: true, data: response.data });
        } catch (error) {
            console.error(error)
            // Kullanıcıyı bilgilendiren bir yanıt oluşturuyorum ve token çerezini siliyorum
            const response = NextResponse.json({ status: false, message: 'Kullanıcı verisi alınamadı' });
            response.cookies.delete("token"); // Token'ı geçersiz olduğu için kaldırıyorum
            return response;
        }
    }

    // Eğer token bulunamazsa, veriyi null olarak döndürüyorum
    return NextResponse.json({ status: false, data: null });
}
