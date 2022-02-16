const path = require('path');
const withTM = require('next-transpile-modules')(['react-ogl', 'ogl']);

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = withTM({
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
});
