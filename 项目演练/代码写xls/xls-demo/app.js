const {
    SiteStatementOfAccountDetailXls,
} = require("./siteStatementOfAccountDetailXls");

const xlsx = new SiteStatementOfAccountDetailXls({
    siteName: "副标题名称",
    startDate: "2020-01-01",
    endDate: "2020-01-31",
    tableData: [
        [
            "1",
            new Date(),
            "1-123467",
            "GB-11234565",
            "标准",
            14,
            11,
            1,
            null,
            null,
            1,
        ],
        [
            "2",
            new Date(),
            "1-123467",
            "GB-11234565",
            "标准",
            13,
            11,
            1,
            null,
            null,
            1,
        ],
        [
            "3",
            new Date(),
            "1-123467",
            "GB-11234565",
            "标准",
            14,
            11,
            1,
            null,
            null,
            1,
        ],
    ],
});

xlsx.createFile("test.xlsx").then((result) => {
    console.log("success", result);
});