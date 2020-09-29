"use strict"
const {PythonShell} = require('python-shell');

const pythonFolder = __dirname;

PythonShell.defaultOptions={
  scriptPath:pythonFolder
}
let data = {
  "fruit":"苹果"
};
let jsondata = JSON.stringify(data);
let pyshell = new PythonShell('utf-8.py',{
  mode:"text",
});

pyshell.send(jsondata);
pyshell.on('message',function(message){
  console.log(message);
})
pyshell.end()
