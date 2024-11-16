"use client";

import React, { createContext, useContext, useState } from "react";
import Toast from "@/components/Toast";

// Toast için bir Context oluşturuyorum
interface ToastContextType {
    message: string | null; // Gösterilecek mesaj
    type: "success" | "error" | null; // Toast tipi: success veya error
    showToast: (type: "success" | "error", message: string) => void; // Toast'u gösterme fonksiyonu
    hideToast: () => void; // Toast'u gizleme fonksiyonu

}

// Toast Context'i oluşturuyorum
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Provider bileşenimi tanımlıyorum
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [message, setMessage] = useState<string | null>(null); // Toast mesajını tutuyorum
    const [type, setType] = useState<"success" | "error" | null>(null); // Toast türünü tutuyorum

    // Toast'u gösterme fonksiyonu
    const showToast = (toastType: "success" | "error", toastMessage: string) => {
        setType(toastType); // Toast türünü ayarlıyorum
        setMessage(toastMessage); // Mesajı ayarlıyorum
        setTimeout(() => hideToast(), 3000); // 3 saniye sonra Toast'u gizliyorum
    };

    // Toast'u gizleme fonksiyonu
    const hideToast = () => {
        setMessage(null); // Mesajı temizliyorum
        setType(null); // Türü temizliyorum
    };

    return (
        // Context sağlayıcıyı tanımlıyorum
        <ToastContext.Provider value={{ message, type, showToast, hideToast }}>
            {children} {/* Uygulamanın geri kalanını sarmalıyorum */}
            {message && <Toast statusType={type!} message={message} />} {/* Toast bileşenini gösteriyorum */}
        </ToastContext.Provider>
    );
};

// Custom hook: useToast
export const useToast = () => {
    // Context'e erişim sağlıyorum
    const context = useContext(ToastContext);
    if (!context) {
        // Eğer context sağlanmamışsa hata fırlatıyorum
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context; // Context değerini döndürüyorum
};
