/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['jotai-devtools'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qwdgiglqleppdburiadx.supabase.co',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
}

export default nextConfig
