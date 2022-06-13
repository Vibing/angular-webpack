import { Configuration } from 'webpack';
import * as ProgressBarPlugin from 'progress-bar-webpack-plugin';

export default {
  plugins: [new ProgressBarPlugin()],
} as Configuration;
