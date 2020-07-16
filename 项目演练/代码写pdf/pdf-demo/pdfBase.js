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