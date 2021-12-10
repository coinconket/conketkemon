const nrwlConfig = require('@nrwl/react/plugins/webpack.js');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = (config, context) => {
  nrwlConfig(config);
  return {
    ...config,
    node: {
      global: true,
    },
    resolve: {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        http: require.resolve('stream-http'),
      },
    },
    plugins: [...config.plugins, new NodePolyfillPlugin()],
  };
};
