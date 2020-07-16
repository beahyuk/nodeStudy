const XlsxPopulate = require('xlsx-populate');

// Load a new blank workbook
XlsxPopulate.fromBlankAsync()
    .then(workbook => {
        // 示例
        // workbook.sheet("Sheet1").cell("A1").value("This is neat!");

        // 1.定义r
        // const r = workbook.sheet(0).range("A1:C3");
        // 1.1 设置所有单元格的值都为5
        // r.value(5);

        // 1.2 按照行列填充数据，一个数组是一行数据
        // r.value([
        //         [1, 2, 3],
        //         [4, 5, 6],
        //         [7, 8, 9]
        //     ]);

        // 1.3 数据可以使用回调函数设置
        // 三行三列单元格填充随机数据 
        // r.value((cell, ri, ci, range) => Math.random())
        // 修改表名 "sheet1" => "new sheet name"
        const sheet = workbook.sheet(0).name("new sheet name")

        // Write to file.
        return workbook.toFileAsync("./out.xlsx");
    });