const { override, addWebpackAlias } = require("customize-cra");
const path = require('path')

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src/'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
    '@layouts': path.resolve(__dirname, 'src/layouts'),
    '@mocks': path.resolve(__dirname, 'src/mocks'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@plugins': path.resolve(__dirname, 'src/plugins'),
    '@utils': path.resolve(__dirname, 'src/utils'),
  })
);