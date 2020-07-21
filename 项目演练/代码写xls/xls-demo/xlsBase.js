"use strict";

const XlsxPopulate = require("xlsx-populate");

exports.XlsBase = class XlsBase {
  constructor() {
    this.XlsxPopulate = XlsxPopulate;
    this.options = {
      sheet: {
        name: "明细",
      },
    };
  }

  /**
   * @function fillSheet 填充sheet
   *
   */
  fillSheet(workbook) {
    throw new Error("not finished");
  }

  async createFile(target, options) {
    const workbook = await this.XlsxPopulate.fromBlankAsync();
    this.fillSheet(workbook);
    workbook.property({
      Title: this.options.title || "",
      Subject: this.options.subject || "",
      Creator: this.options.creator || "",
      Keywords: "",
    });
    return workbook.toFileAsync(target, options);
  }
};
