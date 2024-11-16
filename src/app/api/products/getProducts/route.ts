import { NextRequest, NextResponse } from 'next/server';
import apiClient from '@/utils/apiClient';
import queryMaker from "@/utils/queryMaker";

export async function POST(request: NextRequest) {
    try {
        // Gelen isteğin gövdesinden filtreleme parametrelerini ve sayfalama bilgilerini alıyorum
        const { q, pagination } = await request.json();
        const { limit, skip } = pagination;


        // API'ye ürünleri almak için GET isteği gönderiyorum
        const response = await apiClient.get(`/products${queryMaker(q, limit, skip)}`);

        // Başarılı bir yanıt durumunda, API'den gelen veriyi kullanıcıya döndürüyorum
        return NextResponse.json({ status: true, data: response.data });
    } catch (error: any) {

        // Hata mesajını belirliyorum, eğer API'den özel bir mesaj dönerse onu kullanıyorum
        const errorMessage =
            error.response?.data?.message || "Ürünler alınırken bir hata oluştu.";

        // Hata durumunda uygun bir yanıt döndürüyorum
        return NextResponse.json(
            {
                status: false, // İşlemin başarısız olduğunu belirtiyorum
                message: errorMessage, // Hata mesajını yanıt olarak ekliyorum
            },
            { status: error.response?.status || 500 } // HTTP durum kodunu belirliyorum
        );
    }
}
