import { NextRequest, NextResponse } from 'next/server';
import apiClient from '@/utils/apiClient';

export async function POST(request: NextRequest) {
    // Öncelikle gelen istekteki kullanıcı adı ve şifre bilgilerini alıyorum
    const { username, password } = await request.json();

    try {
        // Kullanıcı adı ve şifreyi kullanarak '/auth/login' endpoint'ine istek gönderiyorum
        const response = await apiClient.post('/auth/login', { username, password });

        // Başarılı bir girişten sonra accessToken bilgisini alıyorum
        const token = response.data.accessToken;

        // Şimdi token'ı bir HttpOnly cookie olarak ayarlıyorum
        const responseWithCookie = NextResponse.json({ userData: response.data, status: true });

        // Cookie'yi güvenli bir şekilde tarayıcıya ekliyorum
        responseWithCookie.cookies.set('token', token, {
            httpOnly: true, // Tarayıcı tarafında JavaScript ile erişimi engelliyorum
            path: '/', // Cookie'nin tüm sitede geçerli olmasını sağlıyorum
            maxAge: 86400, // 1 gün boyunca geçerli olacak şekilde ayarlıyorum
            sameSite: 'lax', // CSRF saldırılarına karşı koruma sağlıyorum
            secure: process.env.NODE_ENV === 'production', // Sadece üretim ortamında secure olarak işaretliyorum
        });

        // Son olarak kullanıcı verisiyle birlikte yanıtı döndürüyorum
        return responseWithCookie;
    } catch (error) {
        // Eğer giriş başarısız olursa, kullanıcıya hata mesajını dönüyorum
        return NextResponse.json({ status: false, message: 'Kullanıcı adı veya şifre hatalı' }, { status: 401 });
    }
}
