const path = require('path');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'src/'),
      path.join(__dirname, 'node_modules/'),
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
