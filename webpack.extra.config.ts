import * as path from 'path';
import * as webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default {
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require('./dll/vendor-manifest.json'),
      context: path.resolve(__dirname, '.'),
    }),
    new BundleAnalyzerPlugin(),
    // new ProgressBarPlugin(),
  ],
} as webpack.Configuration;
