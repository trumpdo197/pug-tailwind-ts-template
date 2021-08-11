/**
 * Necessary imports
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BeautifyHtmlWebpackPlugin = require("beautify-html-webpack-plugin");
const { readdirSync } = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/**
 * Define variables and functions
 */
const VIEWS_PATH = "./src/views";
const PAGE_SCRIPTS_PATH = "./src/js/pages";

const getPugFiles = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => !dirent.isDirectory() && dirent.name.match(/\.pug/g))
    .map((dirent) => dirent.name);

const getScriptsFiles = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => !dirent.isDirectory() && dirent.name.match(/\.ts/g))
    .map((dirent) => dirent.name);

const pugFiles = getPugFiles(VIEWS_PATH);
const filenamesWithoutExtension = pugFiles.map((filename) =>
  filename.substring(0, filename.length - 4)
);

const scripts = getScriptsFiles(PAGE_SCRIPTS_PATH);
const scriptNamesWithoutExtension = scripts.map((filename) =>
  filename.substring(0, filename.length - 3)
);

const scriptEntries = {};
scriptNamesWithoutExtension.forEach((scriptName) => {
  scriptEntries[scriptName] = path.resolve(
    __dirname,
    PAGE_SCRIPTS_PATH,
    scriptName + ".ts"
  );
});

const htmlPlugins = filenamesWithoutExtension.map((filename) => {
  return new HtmlWebpackPlugin({
    title: filename,
    minify: false,
    inject: false,
    template: `${VIEWS_PATH}/${filename}.pug`,
    filename: filename + ".html",
  });
});

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    main: path.resolve(__dirname, "./src/js/index.ts"),
    ...scriptEntries,
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.pug$/i,
        include: path.resolve(__dirname, "src"),
        use: ["pug-loader"],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "src"),
    watchContentBase: true,
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...htmlPlugins,
    new BeautifyHtmlWebpackPlugin({
      indent_size: 4,
    }),
  ],
};
