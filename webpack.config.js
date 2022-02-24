const path = require("path");
const nodeExternals = require("webpack-node-externals");

const { NODE_ENV = "production" } = process.env;

module.exports = {
  entry: "./index.js",
  target: "node",
  mode: NODE_ENV,
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: [".js"],
  },
  externalsPresets: {
    node: true,
  },
  watch: NODE_ENV === "development",
};
