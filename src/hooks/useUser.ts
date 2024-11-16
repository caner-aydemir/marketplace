import { useContext } from 'react';
import { UserContext } from '@/Providers/UserContext';

// Kullanıcı verilerine erişmek için özel bir hook tanımlıyorum
export const useUser = () => {
    // Context'e erişiyorum
    const context = useContext(UserContext);

    // Eğer context yoksa bu hook'un doğru bir Provider altında kullanılmadığını belirtiyorum
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }

    // Context verilerini döndürüyorum
    return context;
};
