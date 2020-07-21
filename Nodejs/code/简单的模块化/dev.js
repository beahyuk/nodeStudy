var foo = "hello word";

module.exports = {
    add: function(x, y) {
        return x + y
    },
    str: "hello lindG",
    arr: ['1', '2', '333'],
};
// exports.foo = foo;
// exports.add = function(x, y) {
//     return x + y
// };

// //数值
// exports.a = 22;
// //字符串
// exports.b = "addff";
// //函数
// exports.c = function(x, y) {
//     return x + y
// };
// //对象
// exports.d = { foo: "lindG" };

// module.exports = "hello word";
// //以这个为准，后会覆盖前
// module.exports = function(x, y) {
//     return x + y
// };