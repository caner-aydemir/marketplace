/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // Build sırasında ESLint hatalarını yok sayar
    },
    images: {
        domains: ['dummyjson.com', 'cdn.dummyjson.com'], // İzin verilen alan adlarını buraya ekleyin.
    },
};

module.exports = nextConfig;