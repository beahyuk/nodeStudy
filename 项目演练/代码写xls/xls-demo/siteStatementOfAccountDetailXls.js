"use strict";

const { XlsBase } = require("./xlsBase");
const moment = require("moment");

exports.SiteStatementOfAccountDetailXls = class SiteStatementOfAccountDetailXls extends XlsBase {
    constructor({
        title,
        subject,
        siteName,
        tableData,
        startDate,
        endDate,
        createdAt,
    }) {
        super();

        this.sheetData = {
            siteName: siteName || "副标题",
            createdAt: moment(createdAt || undefined).format("YYYY-MM-DD HH:mm:ss"),
            tableData: tableData || [],
            startDate: moment(startDate).format("YYYY-MM-DD"),
            endDate: moment(endDate).format("YYYY-MM-DD"),
        };
        this.options = {
            title: title || "标题",
            subject: subject || "主题",
            creator: "创建者",
            sheet: {
                name: "sheet名称",
            },
        };
    }

    fillSheet(workbook) {
        const sheet = workbook.sheet("Sheet1");
        sheet.name(this.options.sheet.name);
        const sheetData = this.sheetData;

        // 输入数据
        sheet.cell("A1").value("第一行");
        sheet.cell("A2").value(`副标题：${sheetData.siteName}`);
        sheet
            .cell("A3")
            .value([
                [
                    `统计时段：${sheetData.startDate}~${sheetData.endDate}`,
                    null,
                    null,
                    null,
                    null,
                    `生成时间：${sheetData.createdAt}`,
                ],
            ]);
			// 表格的标题
        sheet
            .cell("A4")
            .value([
                [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                ],
                ...sheetData.tableData,
            ]);
        // 第6行开始列明细，totalDataRowNo为明细的下一行
        const totalDataStartRowNo = 5 + sheetData.tableData.length;
        const tableDataEndRowNo = totalDataStartRowNo - 1;
        const percentRowNo = totalDataStartRowNo + 1;

        sheet.cell(`F${totalDataStartRowNo}`).value("本次合计");

        // FORMULA
		// 一些单元格需要进行函数计算 加减乘除等
        sheet
            .cell(`G${totalDataStartRowNo}`)
            .formula(`SUM(G5:G${tableDataEndRowNo})`);
        sheet
            .cell(`H${totalDataStartRowNo}`)
            .formula(`SUM(H5:H${tableDataEndRowNo})`);
        sheet
            .cell(`I${totalDataStartRowNo}`)
            .formula(`SUM(I5:I${tableDataEndRowNo})`);
        sheet
            .cell(`J${totalDataStartRowNo}`)
            .formula(`SUM(J5:J${tableDataEndRowNo})`);
        sheet
            .cell(`K${totalDataStartRowNo}`)
            .formula(`SUM(K5:K${tableDataEndRowNo})`);
        sheet
            .cell(`I${percentRowNo}`)
            .formula(`I${totalDataStartRowNo}/$H${totalDataStartRowNo}`);
        sheet
            .cell(`J${percentRowNo}`)
            .formula(`J${totalDataStartRowNo}/$H${totalDataStartRowNo}`);
        sheet
            .cell(`K${percentRowNo}`)
            .formula(`K${totalDataStartRowNo}/$H${totalDataStartRowNo}`);

        // 合并单元格
		// 例如第一行的合并单元格
        sheet.range("A1:K1").merged(true);
        sheet.range("A2:K2").merged(true);
        sheet.range("A3:E3").merged(true);
        sheet.range("F3:K3").merged(true);

        //长宽
		// 列宽和行高
        sheet.column("A").width(10);
        sheet.column("B").width(20);
        sheet.column("C").width(10);
        sheet.column("D").width(20);
        sheet.column("E").width(50);
        sheet.column("F").width(10);
        sheet.column("G").width(15);
        sheet.column("H").width(10);
        sheet.column("I").width(10);
        sheet.column("J").width(10);
        sheet.column("K").width(10);
        sheet.row(1).height(30);
        sheet.row(2).height(25);
        sheet.row(3).height(25);
        sheet.row(4).height(20);

        // 风格
		// 设置单元格的样式，居中，字体大小，加黑，边框样式等
        sheet.usedRange().style({
            verticalAlignment: "center",
        });
        sheet.row(1).style({
            fontSize: 16,
        });
        sheet.row(2).style({
            fontSize: 14,
        });
        sheet.row(3).style({
            horizontalAlignment: "center",
            fontSize: 14,
        });
        sheet.row(4).style({
            horizontalAlignment: "center",
            fontSize: 12,
        });
        sheet.range(`A1:K${tableDataEndRowNo}`).style({
            border: "thin",
        });
        sheet.range(`F${totalDataStartRowNo}:K${totalDataStartRowNo}`).style({
            border: "thin",
        });
        sheet.range(`A5:C${totalDataStartRowNo}`).style({
            horizontalAlignment: "center",
        });
        sheet.range(`H5:K${tableDataEndRowNo}`).style({
            horizontalAlignment: "center",
        });
        sheet.range(`F${totalDataStartRowNo}:K${totalDataStartRowNo}`).style({
            bold: true,
        });

        sheet.range(`I${percentRowNo}:K${percentRowNo}`).style({
            border: "thin",
            horizontalAlignment: "right",
            numberFormat: "0%",
            bold: true,
        });
        sheet.cell("A2").style({
            indent: 2,
        });
        sheet.cell("A1").style({
            horizontalAlignment: "center",
        });

        // 数据格式化
        sheet
            .range(`B5:B${tableDataEndRowNo}`)
            .style("numberFormat", "YYYY-MM-DD HH:MM:SS");
        sheet
            .range(`F5:G${tableDataEndRowNo}`)
            .style("numberFormat", "[$￥-804]#,##0.00;[RED]-[$￥-804]#,##0.00");
        sheet
            .cell(`G${totalDataStartRowNo}`)
            .style("numberFormat", "[$￥-804]#,##0.00;[RED]-[$￥-804]#,##0.00");
    }
};

// const xlsx = new exports.SiteStatementOfAccountDetailXls({
//   siteName: "副标题名称",
//   startDate: "2020-01-01",
//   endDate: "2020-01-31",
//   tableData: [
//     [
//       "操作员1",
//       new Date(),
//       "1-123467",
//       "GB-11234565",
//       "标准",
//       14,
//       11,
//       1,
//       null,
//       null,
//       1,
//     ],
//     [
//       "操作员1",
//       new Date(),
//       "1-123467",
//       "GB-11234565",
//       "标准",
//       13,
//       11,
//       1,
//       null,
//       null,
//       1,
//     ],
//     [
//       "操作员1",
//       new Date(),
//       "1-123467",
//       "GB-11234565",
//       "标准",
//       14,
//       11,
//       1,
//       null,
//       null,
//       1,
//     ],
//   ],
// });

// xlsx.createFile("test.xlsx").then((result) => {
//   console.log(result);
// });