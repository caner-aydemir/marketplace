import { useContext } from 'react';
import { UserContext } from '../Providers/UserContext';

export const useCart = () => {
    // UserContext'e erişiyorum
    const context = useContext(UserContext);

    // Eğer context yoksa ve yanlış bir şekilde kullanılmışsa bir hata fırlatıyorum
    if (!context) {
        throw new Error('useCart must be used within a UserProvider');
    }

    // Context'ten alışveriş sepeti ve onu güncelleyen fonksiyonu alıyorum
    const { shoppingCart, setShoppingCart } = context;

    // Alışveriş sepetiyle ilgili verileri ve fonksiyonları döndürüyorum
    return { shoppingCart, setShoppingCart };
};
