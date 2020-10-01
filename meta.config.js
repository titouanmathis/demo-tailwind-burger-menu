const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  src: ['./src/css/app.scss', './src/js/menu-manager.js', './src/js/sticky-manager.js'],
  dist: './dist',
  public: '/',
  server: 'dist',
  watch: ['./dist/**/*.html'],
  webpack(config) {
    config.module.rules.push({
      test: /\.twig$/,
      use: [
        'raw-loader',
        {
          loader: 'twig-html-loader',
          options: {
            data: {},
          },
        },
      ],
    });
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/templates/index.twig',
      })
    );
  },
};
