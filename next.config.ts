import type NextConfig from 'next'
import million from 'million/compiler'
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Dominio de las imágenes de Google
        pathname: '/**',
      },
    {
      protocol: 'https',
      hostname: 'img.freepik.com', // Dominio de las imágenes de Unsplash
      pathname: '/**',
    }
    ],
      unoptimized: false,
    },
     reactStrictMode: true
}

const millionConfig = {
  auto: true,
}
export default million.next(nextConfig, millionConfig)
