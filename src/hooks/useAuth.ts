import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from "@/hooks/useUser";
import { useToast } from "@/Providers/ToastContext";

export const useAuth = () => {
    // Giriş-çıkış işlemlerinde durumları takip etmek için state tanımlıyorum
    const [loading, setLoading] = useState<boolean>(false); // İşlem yükleniyor mu?
    const [error, setError] = useState<string | null>(null); // Hata mesajı
    const [success, setSuccess] = useState<string | null>(null); // Başarı mesajı
    const router = useRouter(); // Yönlendirme işlemleri için router

    const { setUser } = useUser(); // Kullanıcı bilgisini yönetmek için hook
    const { showToast } = useToast(); // Bildirim göstermek için hook

    // Kullanıcı giriş fonksiyonu
    const login = async (username: string, password: string) => {
        setLoading(true); // İşlemin başladığını belirtiyorum
        setError(null); // Önceki hataları temizliyorum
        setSuccess(null); // Önceki başarı mesajlarını temizliyorum

        try {
            // Giriş işlemi için API'ye istek gönderiyorum
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json(); // Yanıtı JSON olarak alıyorum

            if (data.status) {
                // Eğer giriş başarılıysa, kullanıcı bilgisini güncelliyorum
                setUser(data.userData);

                // Başarı mesajını gösteriyorum
                showToast("success", "Giriş başarılı, yönlendiriliyorsunuz.");

                // Kullanıcıyı ana sayfaya yönlendiriyorum
                router.push('/');
            } else {
                // Hata mesajını kullanıcıya gösteriyorum
                showToast("error", data.message);
            }
        } catch (error) {
            console.error("Error", error)
            // Hata oluşursa kullanıcıya bir mesaj gösteriyorum
            showToast("error", "Giriş sırasında bir hata oluştu.");
        } finally {
            // İşlem bittiğinde yüklenme durumunu kaldırıyorum
            setLoading(false);
        }
    };

    // Kullanıcı çıkış fonksiyonu
    const logout = async () => {
        setLoading(true); // İşlemin başladığını belirtiyorum
        setError(null); // Önceki hataları temizliyorum
        setSuccess(null); // Önceki başarı mesajlarını temizliyorum

        try {
            // Çıkış işlemi için API'ye istek gönderiyorum
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            });
            const data = await response.json(); // Yanıtı JSON olarak alıyorum

            if (data.status) {
                // Eğer çıkış başarılıysa, kullanıcı bilgisini temizliyorum
                setUser(null);

                // Başarı mesajını gösteriyorum
                showToast("success", "Çıkış işlemi başarılı. Kendine iyi bak :)");

                // Kullanıcıyı giriş sayfasına yönlendiriyorum
                router.push('/login');
            } else {
                // Hata mesajını kullanıcıya gösteriyorum
                showToast("error", "Çıkış işlemi başarısız.");
            }
        } catch (error) {
            console.error("Error", error)

            // Hata oluşursa kullanıcıya bir mesaj gösteriyorum
            showToast("error", "Çıkış sırasında bir hata oluştu.");
        } finally {
            // İşlem bittiğinde yüklenme durumunu kaldırıyorum
            setLoading(false);
        }
    };

    // Fonksiyonları döndürüyorum, böylece dışarıdan erişilebilirler
    return { login, logout, loading, error, success };
};
