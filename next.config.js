/** @type {import('next').NextConfig} */
const nextConfig = {images: { domains: [process.env.NEXT_PUBLIC_AUTH_URL_DOMAIN]}}

module.exports = nextConfig
