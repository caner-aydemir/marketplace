import { NextRequest, NextResponse } from 'next/server';
import apiClient from '@/utils/apiClient';

export async function POST(request: NextRequest) {
    try {
        // Öncelikle isteğin gövdesinden kategori adını alıyorum
        const { categoryName } = await request.json();

        // API'ye kategoriye ait ürünleri almak için GET isteği gönderiyorum
        const response = await apiClient.get(`/products/category/${categoryName}`);

        // API'den gelen yanıtı kullanıcıya JSON formatında döndürüyorum
        return NextResponse.json(response.data);
    } catch (error: any) {
        // Eğer bir hata oluşursa, boş bir dizi döndürerek kullanıcıya sorun olmadığını hissettiriyorum
        const nullData = [];

        // Hatanın daha iyi anlaşılabilmesi için yanıtı boş bir diziyle döndürüyorum
        return NextResponse.json(nullData);
    }
}
