const path = require('path');
const withTM = require('next-transpile-modules')(['react-ogl', 'ogl']);

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
  },

  webpack: (config) => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        { test: /\.svg$/, use: ['@svgr/webpack'] },
      ],
    },
  }),
});
