/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    prependData: `@import "./styles/vars.scss";`,
  },
};

module.exports = nextConfig;
