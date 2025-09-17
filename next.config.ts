/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,   // ⬅️ turn build-time lint errors into warnings
  },
};

export default nextConfig;
