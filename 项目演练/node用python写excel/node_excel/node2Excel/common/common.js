"use strict"
const {PythonShell} = require('python-shell');

// python文件位置
const pythonFolder = __dirname;

PythonShell.defaultOptions={
  scriptPath:pythonFolder
}
let data = {
  "fileName":"common_chart",
  "headings":["Number","Batch1","Batch2"],
  "type":'bar',
  "title":'results of sample analysis',
  "XAxisNname":"test number",
  "YAxisNname":"Sample length(mm)",
  "categories":["apple", "pear", "banana", "peach", "mango"],
  "value1":[2, 4, 6, 8, 10],
  "value2": [3, 6, 9, 12, 15],
  "chartPos": {'column':'A','row':1},
  "columnPos":["A","B","C","D",]
};
let jsonData = JSON.stringify(data); // 序列化
function sendJson(){
    let pyshell = new PythonShell('common.py',{
      mode:'text'
    });
    
    // send发送数据
    pyshell.send(jsonData);

    // on 监听返回数据
    pyshell.on('message', function (message) {
      console.log(message);   // python的print结果
    });
    // end 结束 不可缺少
    pyshell.end(function (err) {
      if (err) throw err;
      console.log('finished');
    });
}

sendJson()