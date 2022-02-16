const path = require('path');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
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
  }),
};
