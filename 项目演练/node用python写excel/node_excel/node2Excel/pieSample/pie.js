"use strict"
const {PythonShell} = require('python-shell');

// python文件位置
const pythonFolder = __dirname;

PythonShell.defaultOptions={
  scriptPath:pythonFolder
}
let data = {
  "headings":["category","values","Batch2"],
  "type":'pie',
  "title":'Fruits',
  "X_axis_name":"fruits category",
  "Y_axis_name":"percent of fruits",
  "categories":["apple", "banana", "pear"],
  "value1":[2, 4, 6],
  "value2": [3, 6, 9],
  "pos":['A1','A16']
  
};
let jsonData = JSON.stringify(data); // 序列化
function sendJson(){
    let pyshell = new PythonShell('pie.py',{
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