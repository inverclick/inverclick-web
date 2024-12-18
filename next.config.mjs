/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: [
      "app",
      "components",
      "constants",
      "contexts",
      "services",
      "global",
      "hooks",
      "lib",
      "services",
      "types",
    ],
  },
};

export default nextConfig;
