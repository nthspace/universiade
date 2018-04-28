import path from 'path';

import DashboardPlugin from 'webpack-dashboard/plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { HotModuleReplacementPlugin, NamedModulesPlugin } from 'webpack';

const app = [
  './src/js/index.js',
];
const plugins = [
  new FaviconsWebpackPlugin({
    logo: './src/img/logo.png',
  }),
  new HtmlWebpackPlugin({
    template: './src/ejs/index.ejs',
    title: '2017 世大運賽程資訊',
  }),
];
if (process.env.NODE_ENV !== 'production') {
  app.unshift(
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
  );
  plugins.push(
    new DashboardPlugin(),
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
  );
}


export default {
  entry: {
    app,
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'react-hot-loader/webpack',
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  'es2015',
                  {
                    modules: false,
                  },
                ],
                'react',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|ico|svg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        },
      },
    ],
  },
  plugins,
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    hot: true,
  },
};
