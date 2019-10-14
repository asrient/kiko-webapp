const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    app:"./code/app.js",
    login:"./code/login.js",
    info:"./code/info.js",
    settings:"./code/settings.js",
    test:"./code/test.js",
   error:"./code/err.js",
},
  mode: "production",
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
    path: "H:\\AA\\kiko\\webstation\\exposed\\bundle",
    publicPath: "/app/",
    filename: "[name].bundle.js"
  },
  devServer: {
    contentBase:"http://localhost:3000"/* path.join(__dirname, "public/")*/ ,
    port: 2000,
    publicPath: "H:\\AA\\kiko\\webstation\\exposed\\bundle",
    hotOnly: true
  },
 // plugins: [new webpack.HotModuleReplacementPlugin()]
};