import { NextResponse } from 'next/server';

export async function POST() {
    // Çıkış işlemi için bir yanıt oluşturuyorum
    const response = NextResponse.json({ status: true, message: 'Çıkış başarılı' });

    // Kullanıcının giriş yapmasını sağlayan token'ı cookie'den siliyorum
    response.cookies.delete('token');

    // Son olarak çıkış işleminin başarılı olduğunu belirten yanıtı döndürüyorum
    return response;
}
