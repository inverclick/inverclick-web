/** @type {import('next').NextConfig} */
const nextConfig = {
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
