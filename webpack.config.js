const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const glob = require("glob");
 module.exports = {
  watch: true, 
   mode: "development",
  entry: {
    dtuploader: [
      ...glob.sync("./src/**/*.ts").reduce(function (obj, el) {
        obj[path.parse(el).name] = el;
        let array = Object.values(obj);
        return array;
      }, {})
    ],
    style: [
      ...glob.sync("./src/style/**/*.scss").reduce(function (obj, el) {
        obj[path.parse(el).name] = el;
        let array = Object.values(obj);
        return array;
      }, {}),
    ],
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", "*"],

    fallback: {
      fs: false,

      path: false,
    },
  },

  module: {
    rules: [
      {
        parser: {
          amd: false,
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
    
          },
        ],
      },

      {
        test: /\.ts?$/,
        loader: "ts-loader",
        exclude: /node_modules|\.d\.ts$/,
      },
      {
        test: /\.d\.ts$/,
        loader: "ignore-loader",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "./dist/fonts/[name][hash][ext]",
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      // new TerserPlugin()
    ],
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin({
      optimizationBailout: true,
    }),
    new MiniCssExtractPlugin({
      filename: "../css/[name].css",
    }),
    // new CompressionPlugin({
    //   algorithm: "gzip",
    // }),
   
   ],

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/js/"),
  },
};
