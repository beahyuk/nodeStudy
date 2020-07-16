# pdfmake

## 介绍

pdfmake是npm的第三方包，用于导出pdf文件，可以进行打印，下载等功能

下面的代码主要实现 生成一个pdf文件

其实就是用代码画PDF

## 使用

下载文件后，先在所处目录 安装包，然后运行app.js文件。就可以看到有pdf导出。

这个pdf内容是示例，后面可以更改内容

1. 安装

   ```shell
   npm install pdfmake
   ```

2. 运行

   ```shell
   npm app.js
   ```

   

## 代码说明

### app.js 

```javascript
"use strict";
// 入口文件，运行app.js生成文件
const { Generate_PDF } = require("./Generate_PDF");
// 实例化对象，传参.后续可以通过{}内传值，如果为空，就用默认的值
// 默认的值是在Generate_PDF里设置的
new Generate_PDF({}).createFile("./Generate_PDF.pdf")
```

### Generate_PDF.js

这个文件需要引入两个文件，一个是进行了包设置的pdfBase.js。还有一个是日期格式转化的utils.js

pdf需要的内容配置 都是在这里完成

类似于 e-charts里的options 配置，只不过这个配置是单独文件编写

constructor里的第一个{}是参数，是默认的值，在app.js引用的时候，可以设置参数 覆盖里面的值

```javascript
"use strict";

const { toFooterDateStr } = require("./utils");

const { PdfBase } = require("./pdfBase");
// pdf文件在这里写
exports.Generate_PDF = class Generate_PDF extends PdfBase {
    constructor({
        title,
        subject,
        keywords,
        siteName,
        tableData = [
            ["示例", "11", "22", "33"],
        ],
        totalData = ["11", "22", "33", "44"],
        footerDate = "2019.5",
    }) {
        const tableResults = [];
        const fn = function() {
            // 判断表格中数据 靠左 居中 还是 靠右
            for (let i = 0; i < tableData.length; i++) {
                let result = tableData[i].map(function(item, index) {
                    if (index > 0) {
                        return {
                            text: item,
                            alignment: "right"
                        }
                    } else {
                        return item
                    }
                });
                tableResults.push(result)
            }
        }();
        // 总计的数据 后面靠右
        const totalResult = totalData.map(items => {
            return {
                text: items,
                alignment: "right"
            }
        });
        const docDefinition = {
            info: {
                title: title || "aas",
                author: "ass",
                subject: subject || "ccc",
                keywords: keywords || "vvv",
                creator: "bbb",
                producer: "aaa",
                modDate: new Date(),
            },
            content: [
                { text: "标题", style: "header" },
                { text: siteName || "副标题", style: "content" },
                {
                    text: "文本",
                    style: "content",
                    // 缩进两格
                    leadingIndent: 15 * 2,
                    margin: [0, 0, 0, 8]
                },
                {
                    // 表格样式
                    table: {
                        heights: 25,
                        headerRows: 1,
                        widths: "*",
                        body: [
                            [
                                // 首行 数据，居中
                                { text: "表格1", alignment: "center" },
                                { text: "表格2", alignment: "center" },
                            ],
                            // ["Xxxx", "2018年12月", "1054.00", "1054.00", "1054.00", "1054.00"],
                            // tableResults是每行数据，一个数组一条数据
                            ...tableResults,
                            // 最后一行 colSpan合并处理
                            [{
                                    colSpan: 2,
                                    text: "合并",
                                },
                                // 如果colSpan为1，则不需要下面的空字符串。如果colspan为3，则有两个空字符串
                                "",
                                // 剩下的列数据 就是 totalResult
                                ...totalResult,
                            ],
                        ],
                    },
                },
                {
                    text: "加粗型文本",
                    style: "content",
                    bold: true,
                    margin: [0, 10, 0, 0]
                },
                {
                    // 页脚格式，toFooterDateStr是一个函数，用来转换日期
                    text: `第一行\n第二行文本\n${toFooterDateStr(footerDate)}`,
                    style: "footer",
                }

                // {
                // 放置图片
                //     image: "static/images/test.png",
                //     fit: [100, 100],
                //     alignment: "right",
                //     relativePosition: { x: 0, y: -70 },
                //     opacity: 0.5,
                // },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: "center",
                    margin: [0, 0, 0, 20],
                },
                content: {
                    fontSize: 15,
                    alignment: "left",
                    lineHeight: 1,
                },
                footer: {
                    fontSize: 15,
                    alignment: "right",
                    lineHeight: 1,
                    margin: [0, 20, 0, 0],
                },
            },
            defaultStyle: {
                font: "SourceHanSansCN",
            },
            version: "1.7",
        };
        super(docDefinition);
    }
};
```

### pdfBase.js

pdfBase.js  里面是设置引用pdfmake包 ，类似于用example of usage

```javascript
"use strict";
const fs = require("fs");
// 引入pdfmake 包
const PdfPrinter = require("pdfmake");
// 字体格式，格式有多种样式
const fonts = {
    SourceHanSansCN: {
        normal: "static/fonts/SourceHanSansCN-Regular.ttf",
        bold: "static/fonts/SourceHanSansCN-Bold.ttf",
    },
};
// 主要引入pdfmake包，进行设置的
// 参考 官网的 example of usage，是服务端的代码
const pdfPrinter = new PdfPrinter(fonts);
const defaultOptions = {};

exports.PdfBase = class PdfBase {
    constructor(docDefinition) {
        this.docDefinition = docDefinition;
    }
    createStream() {
        const pdfDoc = pdfPrinter.createPdfKitDocument(
            this.docDefinition,
            defaultOptions
        );
        // pdfDoc.pipe(fs.createWriteStream("test.pdf"));
        pdfDoc.end();
        return pdfDoc;
    }
    async createFile(target) {
        return new Promise((resolve, reject) => {
            const stream = this.createStream();
            const writeStream = fs.createWriteStream(target);
            stream.pipe(writeStream);
            writeStream.once("error", (err) => reject(err));
            writeStream.once("finish", () => resolve(target));
        });
    }
};
```

官网：<https://pdfmake.github.io/docs/getting-started/server-side/>

示例：

```javascript
// Define font files
var fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  }
};

var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

var docDefinition = {
  // ...
};

var options = {
  // ...
}

var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
pdfDoc.pipe(fs.createWriteStream('document.pdf'));
pdfDoc.end();
```

### utils.js

这个文件是 将末尾的 日期 转成 阿拉伯大写 的数字

类似于 "2020.5 转成"  "二零二零年五月"

```javascript
"use strict";

const dateCNDict = {
    "0": "〇",
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六",
    "7": "七",
    "8": "八",
    "9": "九",
    "10": "十",
    "11": "十一",
    "12": "十二",
};

// 生成尾部日期
exports.toFooterDateStr = (date) => {
    const realDate = new Date(date);
    const yearStr = realDate
        .getFullYear()
        .toString()
        .split("")
        .map((c) => dateCNDict[c] || "")
        .join("");

    const monthStr = dateCNDict[(realDate.getMonth() + 1).toString()] || "";

    return `${yearStr}年${monthStr}月`;
};
```

## 项目的坑

### 表宽

需要设置widths:[100,200,300],之前不起作用，是因为数值太大，导致好像没有效果

可以缩小数值 就可以看到列宽变窄的效果

### 行高

可以在table对象中设置 heights：23，高度也可以函数定义

### 列表中数字靠右，其他靠左

利用数组的map方法，进行一个个遍历，然后进行增加属性alignment：“right”

```javascript
let a = ["示例","22","33","331","213"];
//目标：让数字 居右，中文数据默认位置
//results 是最后结果，table的一行行数据是引用results
let results = []；
let fn = function(){
    for(let i = 0;i<a.length;i++){
        let result = a.map((item,index)=>{
            // 从第二个开始设置right属性
            if(index>0){
                return {
                    text:item,
                    alignment:"right"
                }
            }else{
                return item
            }
        })
       results.push(result)
    }
}()  //立即调用fn函数
```

### 首行数据居中

没有找到好方法，一个个设置alignment:center属性的

## 待解决问题

- 表居中
  - 表靠右，设置列宽后，想让表居中
  - 但是通过对table设置 margin:[20,0,0,0] 或者alignment :"center",都不起作用
  - margin:[左，上，右，下]
- 单元格内的数据上下居中
  - 如果行高一点，数据会紧贴上面。想让他居中