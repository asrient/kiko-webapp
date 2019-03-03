const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    app:"./code/app.js",
    login:"./code/login.js",
    set_uid:"./code/set_uid.js",
    info:"./code/info.js",
    editme:"./code/editme.js",
},
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test:/\.(s*)css$/,
        use: ["style-loader", "css-loader",'sass-loader']
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: "H:\\AA\\kiko\\webstation\\bundle",
    publicPath: "/app/",
    filename: "[name].bundle.js"
  },
  devServer: {
    contentBase:"http://localhost:2000"/* path.join(__dirname, "public/")*/ ,
    port: 2000,
    publicPath: "H:\\AA\\kiko\\webstation\\bundle",
    hotOnly: true
  },
 // plugins: [new webpack.HotModuleReplacementPlugin()]
};