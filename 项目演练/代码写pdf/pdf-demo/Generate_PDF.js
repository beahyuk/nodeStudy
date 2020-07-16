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