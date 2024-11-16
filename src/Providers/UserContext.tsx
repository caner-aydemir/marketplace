"use client";
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { LoginUser } from '../types/AuthTypes';

// Kullanıcı ve alışveriş sepeti bilgilerini içeren bir context tipi tanımlıyorum
interface UserContextType {
    user: LoginUser | null; // Kullanıcı bilgileri
    setUser: React.Dispatch<React.SetStateAction<LoginUser | null>>; // Kullanıcı bilgisini güncellemek için bir fonksiyon
    fetchUser: () => Promise<void>; // Kullanıcı bilgilerini sunucudan almak için bir fonksiyon
    shoppingCart: string[]; // Kullanıcının alışveriş sepeti
    setShoppingCart: React.Dispatch<React.SetStateAction<string[]>>; // Alışveriş sepetini güncellemek için bir fonksiyon
}

// Kullanıcı context'ini oluşturuyorum
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Kullanıcı bilgilerini sağlayan bir sağlayıcı bileşen oluşturuyorum
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<LoginUser | null>(null); // Kullanıcı bilgisini state olarak tutuyorum
    const [shoppingCart, setShoppingCart] = useState<string[]>([]); // Alışveriş sepetini state olarak tutuyorum

    // Kullanıcı bilgilerini sunucudan alan bir fonksiyon
    const fetchUser = async () => {
        try {
            const response = await fetch('/api/auth/getAuthUser', {
                method: 'POST', // Sunucuya POST isteği gönderiyorum
                headers: { 'Content-Type': 'application/json' }, // JSON formatında veri gönderdiğimi belirtiyorum
            });

            const data = await response.json(); // Gelen yanıtı JSON formatına çeviriyorum
            if (data.status) {
                setUser(data.data); // Eğer başarılıysa kullanıcı bilgisini güncelliyorum
            } else {
                setUser(null); // Eğer başarısızsa kullanıcı bilgisini sıfırlıyorum
            }
        } catch (error) {
            console.log("Error", error)
            setUser(null); // Kullanıcı bilgisini sıfırlıyorum
        }
    };

    // Bileşen yüklendiğinde kullanıcı bilgilerini alıyorum
    useEffect(() => {
        fetchUser(); // fetchUser fonksiyonunu çağırıyorum
    }, []); // Sadece bir kez çalışmasını sağlamak için bağımlılık dizisi boş

    return (
        // Sağlayıcıyı render ediyorum ve context'i tüm alt bileşenlere sağlıyorum
        <UserContext.Provider value={{ user, setUser, fetchUser, shoppingCart, setShoppingCart }}>
            {children} {/* Uygulamanın geri kalanını sarmalıyorum */}
        </UserContext.Provider>
    );
};
