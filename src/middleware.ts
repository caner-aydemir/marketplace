// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

// Middleware fonksiyonumu oluşturuyorum
export function middleware(request: NextRequest) {
    // Kullanıcının tarayıcısındaki token'ı cookie'den alıyorum
    const token = request.cookies.get('token')?.value;
    // Kullanıcının giriş sayfasında olup olmadığını kontrol ediyorum
    const isLoginPage = request.nextUrl.pathname === '/login';

    // Eğer token yoksa ve kullanıcı giriş sayfasında değilse
    // onu giriş sayfasına yönlendiriyorum
    if (!token && !isLoginPage) {
        const loginUrl = new URL('/login', request.url); // Giriş sayfasının URL'sini oluşturuyorum
        return NextResponse.redirect(loginUrl); // Kullanıcıyı giriş sayfasına yönlendiriyorum
    }

    // Eğer token varsa ve kullanıcı giriş sayfasına gitmeye çalışıyorsa
    if (token && isLoginPage) {
        const referer = request.headers.get('referer'); // Kullanıcının geldiği URL'yi alıyorum
        if (referer) {
            // Eğer referer varsa, kullanıcıyı geldiği sayfada tutuyorum
            return NextResponse.redirect(referer);
        } else {
            // Eğer referer yoksa, kullanıcıyı ana sayfaya yönlendiriyorum
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // Diğer durumlarda kullanıcıyı erişmek istediği sayfaya yönlendirmeye izin veriyorum
    return NextResponse.next();
}

// Middleware'in hangi sayfalarda çalışacağını burada belirtiyorum
export const config = {
    matcher: ['/', '/products/:path*', '/login'], // "/" , "/products" ve "/products/*" tüm alt yollarında çalışır
};
