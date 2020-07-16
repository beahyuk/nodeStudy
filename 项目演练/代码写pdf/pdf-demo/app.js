"use strict";
// 入口文件，运行app.js生成文件
const { Generate_PDF } = require("./Generate_PDF");
// 实例化对象，传参.后续可以通过{}内传值，如果为空，就用默认的值
// 默认的值是在Generate_PDF里设置的
new Generate_PDF({}).createFile("./Generate_PDF.pdf")