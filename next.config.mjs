/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Prevent server-side bundling of browser-only 3D packages
    if (isServer) {
      config.externals = [
        ...(config.externals || []),
        'three',
        '@react-three/fiber',
        '@react-three/drei',
      ]
    }
    return config
  },
}

export default nextConfig
