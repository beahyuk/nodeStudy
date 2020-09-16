"use strict"
const {PythonShell} = require('python-shell');

// python文件位置
const pythonFolder = __dirname+'/python';

PythonShell.defaultOptions={
  scriptPath:pythonFolder
}

function sendText(){
    let pyshell = new PythonShell('echo_text.py',{
      mode:'text'
    });
    // send发送数据
    pyshell.send('hello').send("word");
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

function sendJson(){
  let pyshell = new PythonShell('echo_json.py',{
    mode:'json'
  });
  let jsonData = {
    a: "1",
    b : "2",
  }
  pyshell.send(jsonData);
  pyshell.on('message',function(message){
    console.log(message);
  })
  pyshell.end(function(err){
    if(err) throw err;
    console.log("finished");
  });
}

// sendText();
sendJson();