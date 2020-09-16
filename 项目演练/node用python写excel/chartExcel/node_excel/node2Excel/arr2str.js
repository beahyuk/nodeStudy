// 多维数组转字符串
function arrToStr( objarr ){
	let arrLen = objarr.length;
  let row = "[";
    for (let i = 0 ;i < arrLen ; i++){
        row += "[";
        for(let j = 0; j < objarr[i].length; j++){
            row += objarr[i][j];
            if(j < objarr[i].length-1){
                row +=",";
            }
        }
        row += "]";
        if(i<arrLen-1){
             row+=",";
        }
    }
    row+="]";
    return row;
}
// let res = arrToStr(data);
// console.log(res);

// 字符串转多维数组
// let a ="[[1,2,3],[2,3,4]]"
// let  str=eval(a);
// console.log(str);

module.exports= {arrToStr}