import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { fileURLToPath } from 'url';

/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [
      fileURLToPath(new URL('src/', import.meta.url)),
      fileURLToPath(new URL('node_modules/', import.meta.url)),
    ],
  },

  webpack: (config, { isServer }) => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        { test: /\.svg$/, use: ['@svgr/webpack'] },
      ],
    },
    plugins: [
      ...config.plugins,
      ...(!isServer && process.env.ANALYZE === 'true') ? [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: './analyze/client.html',
          generateStatsFile: true,
        }),
      ] : [],
    ],
    node: {
      ...config.node,
      __dirname: true,
    },
  }),

  experimental: {
    appDir: true,
  },
};
