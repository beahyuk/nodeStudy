"use strict"
const {PythonShell} = require('python-shell');
const{arrToStr} = require('../arr2str')
// python文件位置
const pythonFolder = __dirname;

PythonShell.defaultOptions={
  scriptPath:pythonFolder
}
let data = [
  [1, 2, 3, 4, 5],
  [2, 4, 6, 8, 10],
  [3, 6, 9, 12, 15],
]
let strData = arrToStr(data)
function sendText(){
    let pyshell = new PythonShell('test.py',{
      mode:'text'
    });
    // send发送数据
    pyshell.send(strData);

    // on 监听返回数据
    pyshell.on('message', function (message) {
      console.log(message);   // python的print结果
    });
    // end 结束 不可缺少
    pyshell.end(function (err,code,signal) {
      if (err) throw err;
      console.log('The exit code was: ' + code);
      console.log('The exit signal was: ' + signal);
      console.log('finished');
    });
}

sendText();
