import * as path from 'path';
import * as webpack from 'webpack';

export default {
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require('./dll/vendor-manifest.json'),
      context: path.resolve(__dirname, '.'),
    }),
    // new ProgressBarPlugin(),
  ],
} as webpack.Configuration;
