// Axios ile API isteklerini yönetmek için bir istemci oluşturuyorum
import axios from 'axios';

// API istemcisini yapılandırıyorum
const apiClient = axios.create({
    // Temel URL'yi belirliyorum
    baseURL: 'https://dummyjson.com', // Bu URL, API'nin temel adresi
    headers: {
        // İsteklerde kullanılacak varsayılan başlıkları ekliyorum
        'Content-Type': 'application/json', // JSON formatında veri gönderiyorum
    },
});

// Artık apiClient'i diğer dosyalarda kullanabilirim
export default apiClient;
