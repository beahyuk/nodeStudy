# JavaScript 编程语言

## 1. 简介

### 1.1 JavaScript简介

#### JavaScript的定义

- JavaScript最初的目的是为了“赋予网页生命”
- 这种编程语言我们称之为 **脚本**，它们可以写在HTML中，在页面加载的时候会自动执行
- 脚本作为纯文本存在和执行，它们不需要特殊的准备或编译即可运行

#### JavaScript执行

JavaScript可以在浏览器内执行，也可以在服务端执行，甚至还能在任意搭载了JavaScript引擎的设备中都可以执行

浏览器中嵌入了JavaScript引擎，有时也称作JavaScript虚拟机

不同的引擎有不同的“代号”，例如“

- V8 ——Chrome和Opera中的JavaScript引擎
- SpiderMonkey——Firefox中的JavaScript引擎
- 还有一些其他的引擎

## 2.JavaScript基础知识

### 2.3 现代模式，"use strict"

长久以来，JavaScript 不断向前发展且并未带来任何兼容性问题。新的特性被加入，旧的功能也没有改变。

这么做有利于兼容旧代码，但缺点是 JavaScript 创造者的任何错误或不完善的决定也将永远被保留在 JavaScript 语言中。

这种情况一直持续到 2009 年 ECMAScript 5 (ES5) 的出现。**ES5 规范增加了新的语言特性并且修改了一些已经存在的特性。为了保证旧的功能能够使用，大部分的修改是默认不生效的。你需要一个特殊的指令 —— `"use strict"` 来明确地激活这些特性。**



**确保 “use strict” 出现在最顶部**

请确保 `"use strict"` 出现在脚本的最顶部，否则严格模式可能无法启用。

这里的严格模式就没有被启用：

```javascript
alert("some code");
// 下面的 "use strict" 会被忽略，必须在最顶部。

"use strict";

// 严格模式没有被激活
```

只有注释可以出现在 `"use strict"` 的上面。

### 2.4 变量

#### 2.4.1 变量命名：

JavaScript 的变量命名有两个限制：

1. 变量名称必须仅包含字母，数字，符号 `$` 和 `_`。
2. 首字符必须非数字。

如果命名包括多个单词，通常采用驼峰式命名法（[camelCase](https://en.wikipedia.org/wiki/CamelCase)）。也就是，单词一个接一个，除了第一个单词，其他的每个单词都以大写字母开头：`myVeryLongName`。

美元符号 `'$'` 和下划线 `'_'` 也可以用于变量命名。它们是正常的符号，就跟字母一样，没有任何特殊的含义。

下面的命名是有效的：

```javascript
let $ = 1; // 使用 "$" 声明一个变量
let _ = 2; // 现在用 "_" 声明一个变量

alert($ + _); // 3
```

下面的变量命名不正确：

```javascript
let 1a; // 不能以数字开始

let my-name; // 连字符 '-' 不允许用于变量命名
```

#### 2.4.2 区分大小写

命名为 `apple` 和 `AppLE` 的变量是不同的两个变量。

#### 2.4.3 常量

声明一个常数（不变）变量，可以使用 `const` 而非 `let`：

```javascript
const myBirthday = '18.04.1982';
```

使用 `const` 声明的变量称为“常量”。它们不能被修改，如果你尝试修改就会发现报错：

```javascript
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // 错误，不能对常量重新赋值
```

当程序员能确定这个变量永远不会改变的时候，就可以使用 `const` 来确保这种行为，并且清楚地向别人传递这一事实。

#### 2.4.4 大写形式的常数

一个普遍的做法是将**常量用作别名**，以便记住那些在执行之前就已知的难以记住的值。

使用大写字母和下划线来命名这些常量。

例如，让我们以所谓的“web”（十六进制）格式为颜色声明常量：

```javascript
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ……当我们需要选择一个颜色
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

> 什么时候该为常量使用大写命名，什么时候进行常规命名？让我们弄清楚一点。

作为一个“常数”，意味着值永远不变。但是有些常量在执行之前就已知了（比如红色的十六进制值），还有些在执行期间被“计算”出来，但初始赋值之后就不会改变。

例如：

```javascript
const pageLoadTime = /* 网页加载所需的时间 */;
```

`pageLoadTime` 的值在页面加载之前是未知的，所以采用常规命名。但是它仍然是个常量，因为赋值之后不会改变。

