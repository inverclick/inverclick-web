/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lvptznfprobnfjquceok.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  eslint: {
    dirs: [
      "actions",
      "app",
      "components",
      "constants",
      "contexts",
      "emails",
      "global",
      "hooks",
      "lib",
      "middlewares",
      "services",
      "types",
    ],
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
