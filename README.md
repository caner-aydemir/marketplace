# 🛒 Marketplace Uygulaması

**Marketplace**, modern web teknolojilerini kullanarak geliştirilmiş bir e-ticaret platformudur. Kullanıcıların ürünleri listeleyebileceği, detaylarına göz atabileceği ve sepetlerine ekleyebileceği, kullanıcı dostu ve performans odaklı bir uygulamadır.

🚀 **Canlı Demo**: [Marketplace Uygulamasını Deneyin](https://marketplace-d567.vercel.app)
**Kullanıcı adı : emilys
**Şifre : emilyspass


---

## 🎯 Özellikler

### 🛍️ Kullanıcılar İçin
- **Ürün Listeleme**: Farklı kategorilere göre ürünleri görüntüleyebilir, arama yapabilirsiniz.
- **Ürün Detayları**: Ürün açıklamaları, görselleri ve fiyat bilgilerine ulaşabilirsiniz.
- **Sepete Ekleme**: Beğendiğiniz ürünleri sepetinize ekleyerek alışverişinizi kolayca yönetebilirsiniz.

### 🧑‍💻 Geliştiriciler İçin
- **State Management**: **Context API** kullanılarak global state yönetimi sağlanmıştır.
- **API Çağrıları**: Tüm API istekleri **`app/api`** dizini üzerinden yapılmaktadır, bu sayede düzenli ve modüler bir yapı sunulmaktadır.
- **Custom Hooks**: Uygulamanın API çağrıları ve state yönetimini optimize etmek için özel React hook'ları oluşturulmuş ve kullanılmıştır.
- **Dinamik API Entegrasyonu**: **DummyJSON API** kullanılarak sahte ürün verileriyle hızlı prototipleme yapılabilir.
- **Hızlı Stil Yönetimi**: **Tailwind CSS** ile modern ve esnek bir kullanıcı arayüzü oluşturulmuştur.
- **Performans Optimizasyonu**: **Next.js** ile sunucu taraflı render (SSR) ve statik site oluşturma (SSG) özelliklerinden faydalanılmıştır.

---

## 🛠️ Teknolojiler ve Araçlar

Bu projede kullanılan ana teknolojiler ve araçlar şunlardır:

### Ana Teknolojiler
- **Next.js 15.0.3**
- **React 18.2.0**
- **Tailwind CSS 3.3.3**
- **DummyJSON API**
- **Context API**

### Ek Kütüphaneler
- **axios**
- **react-image-gallery**
- **tanstack/react-query**
- **react-toastify**

---

## 📌 Özel Dizin: `app/api/`

Tüm API çağrıları **`app/api`** dizininde organize edilmiştir. Bu yapı, projeyi modüler hale getirir ve API iş mantığını uygulama bileşenlerinden ayırır.

---

## 💻 Kurulum ve Çalıştırma

Projenin yerel ortamda çalıştırılması için aşağıdaki adımları izleyin:

1. Depoyu klonlayın:
   \`\`\`bash
   git clone https://github.com/caner-aydemir/marketplace.git
   \`\`\`

2. Proje dizinine gidin:
   \`\`\`bash
   cd marketplace
   \`\`\`

3. Gerekli bağımlılıkları yükleyin:
   \`\`\`bash
   npm install
   \`\`\`

4. Geliştirme sunucusunu başlatın:
   \`\`\`bash
   npm run dev
   \`\`\`

   Tarayıcınızda \`http://localhost:3000\` adresine giderek uygulamayı çalıştırabilirsiniz.

---

## 👩‍💻 Geliştirici

Bu proje **Caner Aydemir** tarafından geliştirilmiştir. İlgili sorularınız ve önerileriniz için benimle iletişime geçebilirsiniz!
