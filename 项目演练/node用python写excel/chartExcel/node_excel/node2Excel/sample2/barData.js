"use strict"
const {PythonShell} = require('python-shell');
const{arrToStr} = require('../arr2str')
const os = require('os')
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
    let pyshell = new PythonShell('barChart.py',{
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
    console.log(calcMem());
}

sendText();
//计算内存使用率
function calcMem(){
  let mem_total = os.totalmem(), // 以整数的形式返回系统的内存总量（以字节为单位）
      mem_free = os.freemem(), //以整数的形式返回空闲的系统内存量（以字节为单位）。
      mem_used = mem_total - mem_free,
      mem_ratio = 0;
  mem_total = (mem_total / (1024 * 1024 * 1024)).toFixed(1);
  mem_used = (mem_used / (1024 * 1024 * 1024)).toFixed(1);
  mem_ratio = parseInt(mem_used / mem_total * 100);
  return {
      total: mem_total,
      used: mem_used,
      ratio: mem_ratio
  }  
}

