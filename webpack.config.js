const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlWebPackPlugin({
  template:path.join(__dirname,'./src/index.html'),
  filename:'index.html'
})
module.exports = {
  mode:'production',  //development
  plugins:[
    htmlPlugin
  ],
  module:{
    rules: [ //规则 css-loader 解析 @import这种语法

      {
        test:/\.html$/,
        use:'html-withimg-loader'
      },
      {
        test:/\.(png|jpg|gif|jpeg|svg)$/,
        //做一个限制 当图片小于多少K的时候，用base64来转化
        //否则用file-loader产生真实的图片
        use:{
          loader: "url-loader",
          options: {
            limit: 1024, // size <= 1kib
            outputPath: "img",
            publicPath:'',  //可以单独添加公共路径
          }
        }
      },
      {
        test:/\.js|jsx$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:[  //babel-loader 需要把es6-es5
              '@babel/preset-env'
            ],
            plugins:[
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime',
            ]
          }
        },
        include:path.resolve(__dirname,'src'),
        exclude:/node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader:MiniCssExtractPlugin.loader,
            // options: {
            //   publicPath: '../'  // 特别重要，否则css文件打包后其中引用的图片文件不正确
            // }
          },
          'css-loader',
          "postcss-loader", //添加前缀
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // {
          //   loader: "style-loader" // 将 JS 字符串生成为 style 节点
          // },
          MiniCssExtractPlugin.loader,
          "css-loader", // 将 CSS 转化成 CommonJS 模块
          "postcss-loader",
          "sass-loader", // 将 Sass 编译成 CSS
        ]
      }
    ]
  },
  performance: {
    hints:false   
  }
}
