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

就是ES5修改了一些存在的特性，为了保证旧功能正常使用，默认是不生效这些修改过的特性的，为了让这个特性生效，可以使用“use strict”来激活这些特性

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

### 2.4  变量

#### 2.4.1  变量命名：

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

### 2.5  数据类型

JavaScript 中的值都具有特定的类型。例如，字符串或数字。

在 JavaScript 中有 8 种基本的数据类型（译注：7 种原始类型和 1 种引用类型）。

1. Number
2. BigInt(还需要兼容)
3. String
4. Boolean
5. null
6. undefined
7. typeof

#### String类型

在 JavaScript 中，有三种包含字符串的方式。

1. 双引号：`"Hello"`.
2. 单引号：`'Hello'`.
3. 反引号：``Hello``.

双引号和单引号都是“简单”引用，在 JavaScript 中两者几乎没有什么差别。

反引号是 **功能扩展** 引号。它们允许我们通过将**变量**和**表达式**包装在 `${…}` 中，来将它们嵌入到字符串中。例如：

```javascript
let name = "John";

// 嵌入一个变量
alert( `Hello, ${name}!` ); // Hello, John!

// 嵌入一个表达式
alert( `the result is ${1 + 2}` ); // the result is 3
```

`${…}` 内的表达式会被计算，计算结果会成为字符串的一部分。可以在 `${…}` 内放置任何东西：诸如名为 `name`的变量，或者诸如 `1 + 2` 的算数表达式，或者其他一些更复杂的。

#### "undefined"值

特殊值 `undefined` 和 `null` 一样自成类型。

`undefined` 的含义是 `未被赋值`。

> 如果一个变量已被声明，但未被赋值，那么它的值就是 `undefined`

从技术上讲，可以显式地将 `undefined` 赋值给变量：……但是不建议这样做。通常，使用 `null` 将一个“空”或者“未知”的值写入变量中，而 `undefined` 则保留作为未进行初始化的事物的默认初始值。

#### 总结

JavaScript 中有八种基本的数据类型（译注：前七种为基本数据类型，也称为原始类型，而 `object` 为复杂数据类型）。

- `number` 用于任何类型的数字：整数或浮点数，在 ±253 范围内的整数。
- `bigint` 用于任意长度的整数。
- `string` 用于字符串：一个字符串可以包含 0 个或多个字符，所以没有单独的单字符类型。
- `boolean` 用于 `true` 和 `false`。
- `null` 用于未知的值 —— 只有一个 `null` 值的独立类型。
- `undefined` 用于未定义的值 —— 只有一个 `undefined` 值的独立类型。
- `symbol` 用于唯一的标识符。
- `object` 用于更复杂的数据结构。

我们可以通过 `typeof` 运算符查看存储在变量中的数据类型。

- 两种形式：`typeof x` 或者 `typeof(x)`。
- 以字符串的形式返回类型名称，例如 `"string"`。
- `typeof null` 会返回 `"object"` —— 这是 JavaScript 编程语言的一个错误，实际上它并不是一个 `object`。

### 2.6  交互：alert，prompt和confirm

由于我们将使用浏览器作为我们的演示环境，让我们看几个与用户交互的函数：`alert`，`prompt` 和`confirm`。

#### prompt

`prompt` 函数接收两个参数：

```javascript
result = prompt(title, [default]);
```

浏览器会显示一个带有文本消息的模态窗口，还有 input 框和确定/取消按钮。

- `title`

  显示给用户的文本

- `default`

  可选的第二个参数，指定 input 框的初始值。

#### confirm

语法：

```javascript
result = confirm(question);
```

`confirm` 函数显示一个带有 `question` 以及确定和取消两个按钮的模态窗口。

点击确定返回 `true`，点击取消返回 `false`。

#### 总结

我们学习了与用户交互的 3 个浏览器的特定函数：

- `alert`

  显示信息。

- `prompt`

  显示信息要求用户输入文本。点击确定返回文本，点击取消或按下 Esc 键返回 `null`。

- `confirm`

  显示信息等待用户点击确定或取消。点击确定返回 `true`，点击取消或按下 Esc 键返回 `false`。

### 2.7  类型转换

#### 总结

有三种常用的类型转换：转换为 string 类型、转换为 number 类型和转换为 boolean 类型。

**字符串转换** —— 转换发生在输出内容的时候，也可以通过 `String(value)` 进行显式转换。原始类型值的 string 类型转换通常是很明显的。

**数字型转换** —— 转换发生在进行算术操作时，也可以通过 `Number(value)` 进行显式转换。

数字型转换遵循以下规则：

| 值             | 变成……                                                       |
| :------------- | :----------------------------------------------------------- |
| `undefined`    | `NaN`                                                        |
| `null`         | `0`                                                          |
| `true / false` | `1 / 0`                                                      |
| `string`       | “按原样读取”字符串，两端的空白会被忽略。空字符串变成 `0`。转换出错则输出 `NaN`。 |

**布尔型转换** —— 转换发生在进行逻辑操作时，也可以通过 `Boolean(value)` 进行显式转换。

布尔型转换遵循以下规则：

| 值                                    | 变成……  |
| :------------------------------------ | :------ |
| `0`, `null`, `undefined`, `NaN`, `""` | `false` |
| 其他值                                | `true`  |

上述的大多数规则都容易理解和记忆。人们通常会犯错误的值得注意的例子有以下几个：

- 对 `undefined` 进行数字型转换时，输出结果为 `NaN`，而非 `0`。
- 对 `"0"` 和只有空格的字符串（比如：`" "`）进行布尔型转换时，输出结果为 `true`。

### 2.8  基础运算符，数学

#### 术语：“一元运算符”，“二元运算符”，“运算元”

- 运算元：运算符应用的对象。a+b 中 a和b都是运算元
- 一元运算符：如果一个运算符对应的只有一个运算元。a++ 就是一元运算符
- 二元运算符：如果一个运算符拥有两个运算元。a+b 就是二元运算符

#### 取余 %

取余运算符是 `%`，尽管它看起来很像百分数，但实际并无关联。

`a % b` 的结果是 `a` 整除 `b` 的 [余数](https://zh.wikipedia.org/zh-hans/余数))。

#### 求幂 **

求幂运算 `a ** b` 是 `a` 乘以自身 `b` 次。

```javascript
alert( 2 ** 2 ); // 4  (2 * 2，自乘 2 次)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2，自乘 4 次)
```

#### 二元运算符 +

通常，加号 `+` 用于求和。

但是如果加号 `+` 被应用于字符串，它将合并（连接）各个字符串：

```javascript
alert(2 + 2 + '1' ); // "41"，不是 "221"
```

在这里，运算符是按顺序工作。第一个 `+` 将两个数字相加，所以返回 `4`，然后下一个 `+` 将字符串 `1` 加入其中，所以就是 `4 + '1' = 41`。

二元 `+` 是唯一一个以这种方式支持字符串的运算符。其他算术运算符只对数字起作用，并且总是将其运算元转换为数字。

#### 一元运算符+

一元运算符加号，或者说，加号 `+` 应用于单个值，对数字没有任何作用。

但是如果**运算元不是数字**，加号 `+` 则会将**其转化为数字**。

它的效果和 `Number(...)` 相同，但是更加简短。

```javascript
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23"，二元运算符加号合并字符串
alert( +apples + +oranges ); // 5，在二元运算符加号起作用之前，所有的值都被转化为了数字
```

### 2.9  值的比较

#### 总结

- 比较运算符始终**返回布尔值。**
- **字符串**的比较，会按照**“词典”**顺序逐字符地比较大小。
- 当对**不同类型**的值进行比较时，它们会**先被转化为数字**（不包括严格相等检查）再进行比较。
- 在**非严格相等** `==` 下，`null` 和 `undefined` 相等且各自不等于任何其他的值。
- 在使用 `>` 或 `<` 进行比较时，需要注意变量可能为 `null/undefined` 的情况。比较好的方法是单独检查变量是否等于 `null/undefined`。

### 2.11  逻辑运算符

#### 或运算寻找第一个真值

或运算符 `||` 做了如下的事情：

- 从左到右依次计算操作数。
- 处理每一个操作数时，都将其转化为布尔值。如果结果是 `true`，就停止计算，返回这个操作数的初始值。
- 如果所有的操作数都被计算过（也就是，转换结果都是 `false`），则返回最后一个操作数。

返回的值是操作数的初始形式，不会做布尔转换。

也就是，一个或运算 `"||"` 的链，将返回**第一个真值**，如果**不存在真值**，就返回该链的**最后一个值**。

#### 多个或运算衍生的用法

1. **获取变量列表或者表达式的第一个真值。**

2. **短路求值（Short-circuit evaluation）。**

   `||` 对其参数进行处理，直到达到第一个真值，然后立即返回该值，而无需处理其他参数。

   如果操作数不仅仅是一个值，而是一个有副作用的表达式，例如变量赋值或函数调用，那么这一特性的重要性就变得显而易见了。

   ```javascript
   true || alert("not printed");
   false || alert("printed");
   ```

   在第一行中，或运算符 `||` 在遇到 `true` 时立即停止运算，所以 `alert` 没有运行。

   有时，人们利用这个特性，只在左侧的条件为假时才执行命令。

#### 与操作寻找第一个假值

与运算 `&&` 做了如下的事：

- 从左到右依次计算操作数。
- 将处理每一个操作数时，都将其转化为布尔值。如果结果是 `false`，就停止计算，并返回这个操作数的初始值。
- 如果所有的操作数都被计算过（也就是，转换结果都是 `true`），则返回最后一个操作数。

换句话说，与运算符返回**第一个假值**，如果没有假值就返回**最后一个值**。

上面的规则和或运算很像。区别就是与运算返回第一个假值而或操作返回第一个真值。

> **与运算 `&&` 在或运算符 `||` 之前执行**

与运算 `&&` 的优先级比或运算 `||` 要高。

所以代码 `a && b || c && d` 完全跟 `&&` 表达式加了括号一样：`(a && b) || (c && d)`。

> **不要用 || 或 && 来取代 `if`**

有时候，有人会用与运算符 `&&` 来“简化 `if`”

```javascript
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

虽然使用 `&&` 写出的变体看起来更短，但 `if` 更明显，并且往往更具可读性。因此，我们建议根据每个语法结构的用途来使用：如果我们想要 `if`，就使用 `if`；如果我们想要逻辑与，就使用 `&&`。

#### !（非）

感叹符号 `!` 表示布尔非运算。

运算符接受一个参数，并按如下运作：

1. 将**操作数转化为布尔类型**：`true/false`。
2. 返回相反的值。

```javascript
alert( !0 ); // true
```

非运算符 `!` 的优先级在所有逻辑运算符里面最高，所以它总是在 `&&` 和 `||` 前执行。

### 2.13 循环：while和for

**循环** 是一种重复运行同一代码的方法。

#### 跳出循环

通常条件为假时，循环会终止。

但我们随时都可以使用 `break` 指令**强制退出**。

只要在循环里条件不符合的，break了，就立刻跳出，不执行该循环体了

#### 继续下一次迭代

`continue` 指令是 `break` 的“轻量版”。它不会停掉整个循环。而是**停止当前这一次迭代**，并强制启动新一轮循环（如果条件允许的话）。

如果我们完成了当前的迭代，并且希望继续执行下一次迭代，我们就可以使用它。

continue是这次条件不符合了，下面代码不执行，跳出循环体，但是会再进行循环，如果符合循环条件的话。跟break不同，break是跳出循环体，不会再进行循环

#### break/continue 标签

`break/continue` 支持循环前的标签。标签是 `break/continue` 跳出嵌套循环以转到外部的唯一方法。

**标签** 是在循环之前带有冒号的标识符：

```javascript
labelName: for (...) {
  ...
}
```

`break <labelName>` 语句跳出循环至标签处：

```javascript
// outer是标签名
outer: for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // 如果是空字符串或被取消，则中断并跳出这两个循环。
    if (!input) break outer; // (*)

    // 用得到的值做些事……
  }
}
alert('Done!');
```

上述代码中，`break outer` 向上寻找名为 `outer` 的标签并跳出当前循环。

因此，控制权直接从 `(*)` 转至 `alert('Done!')`。

### 2.15 函数

#### 函数声明

`function` 关键字首先出现，然后是 **函数名**，然后是括号之间的 **参数** 列表（用逗号分隔，在上述示例中为空），最后是花括号之间的代码（即“函数体”）。

```javascript
function name(parameters) {
  ...body...
}
```

我们的新函数可以通过名称调用：`showMessage()`。

#### 局部变量

在函数中声明的变量只在该函数内部可见。

#### 外部变量

函数也可以访问外部变量，例如：

```javascript
                                                let userName = 'John';

function showMessage() {
  let message = 'Hello, ' + userName;
  alert(message);
}

showMessage(); // Hello, John
```

函数对外部变量拥有全部的访问权限。函数也可以修改外部变量。

只有在**没有局部变量**的情况下**才会使用外部变量**。

如果在函数内部声明了同名变量，那么函数会 **遮蔽** 外部变量。

局部变量 > 外部变量

#### 返回值

函数可以将一个值返回到调用代码中作为结果。

return 的是一个结果，可以是一个值

指令 `return` 可以在函数的任意位置。当执行到达时，函数停止，并将值返回给调用代码

执行return语句后，就直接跳出函数，不再执行下面代码

#### 函数命名

函数就是**行为**（action）。所以它们的名字通常是动词。它应该简短且尽可能准确地描述函数的作用。这样读代码的人就能清楚地知道这个函数的功能。

一种普遍的做法是用动词前缀来开始一个函数，这个前缀模糊地描述了这个行为。团队内部必须就前缀的含义达成一致。

例如，以 `"show"` 开头的函数通常会显示某些内容。

函数以 XX 开始……

- `"get…"` —— 返回一个值，
- `"calc…"` —— 计算某些内容，
- `"create…"` —— 创建某些内容，
- `"check…"` —— 检查某些内容并返回 boolean 值，等。

函数应该简短且只有一个功能。如果这个函数功能复杂，那么把该函数拆分成几个小的函数是值得的。

一个单独的函数不仅更容易测试和调试 —— 它的存在本身就是一个很好的注释！

### 2.16  函数表达式

#### 函数表达式有分号

注意：函数表达式结尾有一个分号 `;`，而函数声明没有：

```javascript
  function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
};
```

- 在代码块的结尾不需要加分号 `;`，像 `if { ... }`，`for { }`，`function f { }` 等语法结构后面都不用加。
- 函数表达式是在语句内部的：`let sayHi = ...;`，作为一个值。它不是代码块而是一个赋值语句。不管值是什么，都建议在语句末尾添加分号 `;`。所以这里的分号与函数表达式本身没有任何关系，它只是用于终止语句。

#### 函数表达式和函数声明的区别

1. 两者最大的区别就是 调用函数 位置

函数声明未定义之前就可以被调用，而函数表达式得等到代码执行到那一行（该函数）后，才可以调用该函数

更细微的差别是，JavaScript 引擎会在 **什么时候** 创建函数。

**函数表达式是在代码执行到达时被创建，并且仅从那一刻起可用。**

**在函数声明被定义之前，它就可以被调用。**

原因：这是内部算法的原故。当 JavaScript **准备** 运行脚本时，首先会在脚本中寻找全局函数声明，并创建这些函数。我们可以将其视为“初始化阶段”。

在处理完所有函数声明后，代码才被执行。所以运行时能够使用这些函数。

也就是说js会先处理所有的函数声明再执行代码

2. 函数声明的另外一个特殊的功能是它们的块级作用域。

**严格模式下，当一个函数声明在一个代码块内时，它在该代码块内的任何位置都是可见的。但在代码块外不可见。**代码块就是{}

而使用函数表达式，现在代码块{}外面声明变量，然后在{}中定义函数，这样在代码块的外面就可以调用该函数

```javascript
let fn,age=19;
if(age>18){
    fn = function(){
        age + =1;
        console.log(age);
    };
}
fn(); //可以调用代码块里的函数
```

#### 选择函数声明or表达式?

一般来说，用函数声明。因为函数声明可读性好，而且在任何地方可以调用

除非，由于某种原因而导致函数声明不能使用，就用函数表达式

#### 总结

- **函数是值**。它们可以在代码的任何地方被分配，复制或声明。
- 如果函数在主代码流中被声明为单独的语句，则称为“函数声明”。
- 如果该函数是作为表达式的一部分创建的，则称其“函数表达式”。
- 在执行代码块之前，内部算法会先处理函数声明。所以函数声明在其被声明的代码块内的任何位置都是可见的。
- 函数表达式在执行流程到达时创建。

在大多数情况下，当我们需要声明一个函数时，最好使用函数声明，因为函数在被声明之前也是可见的。这使我们在代码组织方面更具灵活性，通常也会使得代码可读性更高。

所以，仅当函数声明不适合对应的任务时，才应使用函数表达式。

### 2.17 箭头函数，基础知识

#### 单行的箭头函数

箭头函数格式：

```javascript
let func = (arg1, arg2, ...argN) => expression
```

创建了一个函数 `func`，它接受参数 `arg1..argN`，然后使用参数对右侧的 `expression` 求值并返回其结果。

- 如果我们只有一个参数，还可以省略掉参数外的圆括号，使代码更短。

```javascript
let double = n => n * 2;
alert( double(3) ); // 6
```

- 如果没有参数，括号将是空的（但括号应该保留）：

```javascript
let sayHi = () => alert("Hello!");

sayHi(); 
```

- 箭头函数可以像函数表达式一样使用。

#### 多行的箭头函数

用花括号括起来。然后使用一个普通的 `return` 将需要返回的值进行返回。

```javascript
let sum = (a, b) => {  // 花括号表示开始一个多行函数
  let result = a + b;
  return result; // 如果我们使用了花括号，那么我们需要一个显式的 “return”
};

alert( sum(1, 2) ); // 3
```

#### 总结

对于**一行代码**的函数来说，箭头函数是相当方便的。它具体有两种：

1. 不带花括号：`(...args) => expression` — 右侧是一个表达式：函数计算表达式并返回其结果。
2. 带花括号：`(...args) => { body }` — 花括号允许我们在函数中编写多个语句，但是我们需要显式地 `return` 来返回一些内容。

## 3. 代码质量

### 3.5 使用Mocha进行自动化测试

虽然还没看懂,但是知道是省事的东西

每次写完函数后,不用每次运行看控制台的结果了

这个会自动测试

### 3.6 Polyfill

虽然还没看懂,但知道是跟babel有关的

把es6转成 es5这样,或者样式格式?

## 4. Object（对象）：基础知识

### 4.1 对象

#### 1. 定义对象

通过使用带有可选 **属性列表** 的花括号 `{…}` 来创建对象。一个属性就是一个键值对（“key: value”），

其中键（`key`）是一个**字符串**（也叫做属性名），

​		值（`value`）可以是任何值。可以是字符串，数字，null，undefined,布尔类型或其他

#### 2. 创建对象

我们可以用下面两种语法中的任一种来创建一个空的对象（“空柜子”）：

```javascript
let user = new Object(); // “构造函数” 的语法
let user = {};  // “字面量” 的语法
```

通常，我们用花括号。这种方式我们叫做**字面量**。

#### 3. 对象的增删改查

前面定义过一个user的对象

- 增加对象属性

  ```javascript
  user.name = "lily";  // 直接点增加
  ```

- 删除对象属性

  ```javascript
  delete user.age;
  ```

- 修改对象属性

  ```javascript
  user.name = "linda"; //修改name的值
  ```

- 查看对象属性

  ```javascript
  let name = user.name;
  console.log(name);
  ```

```javascript
let user = {
    age: 18,
    height: 1.88,
};
// 增加属性
user.name = "lily";
// 删除属性
delete user.age;
// 修改属性
user.name = "linda";	
// 查看属性
let height = user.height

console.log(user, height) //{ height: 1.88, name: 'linda' } 1.88
```

- 允许多字词语作为属性名，但必须给他们加上引号

  ```javascript
  let user = {
      "two words":"hello word",
  }
  ```

- 列表中的最后一个属性应以逗号结尾：

  ```
  let user = {
  	name:"lily",
  	age:30,
  }
  ```

  这叫做尾随（trailing）或悬挂（hanging）逗号。这样便于我们添加、删除和移动属性，因为所有的行都是相似的。

#### 4. const声明的对象可以修改

> 这个面试过！会问为什么可以修改

请注意：用 `const` 声明的对象 **能** 被修改。

```javascript
const user = {
  name: "John"
};

user.name = "Pete"; // 修改name属性

console.log(user.name); // Pete
```

因为对象数据是存储在堆空间的，在栈空间的只是指向 堆空间 的指针，是不变的，所以const  没有改变，一直都是地址。因此可以修改对象的属性

内存分为 

- 栈空间：基本数据类型，函数调用栈
- 堆空间：引用数据类型

#### 5. 对象方括号访问

一般都是`user.name` 点的方式访问属性值，但如果属性名为多个词语，需要用方括号[]来访问：`user["two woeds"]`

请注意方括号中的**字符串要放在引号中**，单引号或双引号都可以。

- 访问属性名

  方括号提供了一种可以通过任意表达式来获取属性名的方法 —— 跟语义上的字符串不同 —— 比如像类似于下面的变量：

  ```javascript
  let key = "name";
  user[key] = lily;
  ```

  在这里，变量 `key` 可以是程序运行时**计算得到**的，也可以是根据**用户的输入得到**的。然后我们可以用它来访问属性。这给了我们很大的灵活性。

- 计算属性

  当创建一个对象时，我们可以在对象字面量中使用方括号。这叫做 **计算属性**。

  ```javascript
  let username = "name";
  let user = {
      [username]:"lily",
  };
  console.log(user) // { name: 'lily' }
  ```

  方括号比点符号更强大。它允许任何属性名和变量

  属性名是已知且简单的时候，就使用点符号。如果我们需要一些更复杂的内容，那么就用方括号。

#### 6. 属性存在性测试，“in”操作符

想查看一个 对象中是否存在某个属性时，可以使用in

语法是：

```javascript
"key" in object
```

例如：

```javascript
let user = { name: "John", age: 30 };

console.log( "age" in user ); // true，user.age 存在
console.log( "blabla" in user ); // false，user.blabla 不存在。
```

请注意，`in` 的左边必须是 **属性名**。通常是一个带引号的字符串。

如果不带引号，会认为是变量，所以一定要带引号，成为一个字符串

#### 7. 遍历“for…in”循环

遍历对象也可以用for..in方法，更快获得所有的键

为了遍历一个对象的所有键（key），可以使用一个特殊形式的循环：`for..in`。

语法：

```javascript
for (key in object) {
  // 对此对象属性中的每个键执行的代码
}
```

例如，让我们列出 `user` 所有的属性：

```javascript
let user = {
    name: "lily",
    age: 18,
    height: 1.88
};

for (let key in user) {
    console.log(key); // name,age,height
    console.log(user[key]); //18,height,1.88
}
```

#### 8. 总结

对象是具有一些特殊特性的关联数组。

它们存储属性（键值对），其中：

- 属性的键必须是字符串或者 symbol（通常是字符串）。
- 值可以是任何类型。

我们可以用下面的方法访问属性：

- 点符号: `obj.property`。
- 方括号 `obj["property"]`，方括号允许从变量中获取键，例如 `obj[varWithKey]`。

其他操作：

- 删除属性：`delete obj.prop`。
- 检查是否存在给定键的属性：`"key" in obj`。
- 遍历对象：`for(let key in obj)` 循环。

我们在这一章学习的叫做“普通对象（plain object）”，或者就叫对象。

JavaScript 中还有很多其他类型的对象：

- `Array` 用于存储有序数据集合，
- `Date` 用于存储时间日期，
- `Error` 用于存储错误信息。
- ……等等。

它们有着各自特别的特性，我们将在后面学习到。有时候大家会说“Array 类型”或“Date 类型”，但其实它们并不是自身所属的类型，而是属于一个对象类型即 “object”。它们以不同的方式对 “object” 做了一些扩展。

### 4.2   对象拷贝，引用

#### 1. 对象和基本类型拷贝区别

对象和基本类型的拷贝是不同的。对象是拷贝的对该对象引用的地址，基本类型是整体赋值。

对象与原始类型其中一个基本的区别是：对象“通过引用的形式”被存储和拷贝。

原始类型值：字符串，数字，布尔值 —— 被“作为整体”赋值/拷贝。

#### 2.克隆与合并， Object.assign 

**浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象**。

**浅拷贝**：复制的是地址：

```javascript
let user = {
    name:"lily",
    age:18
};
let buser = user;
console.log(buser); //{ name: 'lily', age: 18 } 
```

如果想复制对象本身，而不是引用地址，两种方式

- 方法一：循环原对象，然后每个赋值给 新对象

  ```javascript
  let user = {
      name: "lily",
      age: 18
  };
  let clone = {};
  for (let key in user) {
      clone[key] = user[key]
  }
  console.log(clone); //{ name: 'lily', age: 18 }
  ```

- 方法二：利用 Object.assign方法，这是js自带的方法 

  语法是：

  ```javascript
  Object.assign(target, [src1, src2, src3...])
  ```

  - 参数

    `target` 目标对象 

    `src1，src2..` 源对象   可以有多个源对象

  - 返回值

    目标对象

  ```javascript
  // 1. 只赋值一个对象
  let user = {
      name: "lily",
      age: 18
  };
  let clone = {};
  Object.assign(clone, user)
  console.log(clone); //{ name: 'lily', age: 18 }
  // 2.赋值多个对象
  let user1 = {
      name: "lily",
      age: 18
  };
  let user2 = {
      height: 1.88,
      hobbies: "sing"
  };
  let clone = {};
  Object.assign(clone, user1, user2)
  console.log(clone); //{ name: 'lily', age: 18, height: 1.88, hobbies: 'sing' }
  ```

  注意：如果被拷贝的属性的属性名已经存在，那么它会被覆盖

#### 3. 深层克隆

深层克隆的意思是：对象里的属性值也是对象的时候，也要完全拷贝过去，而不是拷贝引用地址

这是标准的深拷贝，需要调用递归方法或者不自己造轮子，使用现成的实现，例如 JavaScript 库 [lodash](https://lodash.com/) 中的 [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep)。

#### 4. 总结

对象通过引用被赋值和拷贝。换句话说，一个变量存储的不是“对象的值”，而是一个对值的“引用”（内存地址）。因此，拷贝此类变量或将其作为函数参数传递时，所拷贝的是引用，而不是对象本身。

所有通过被拷贝的引用的操作（如添加、删除属性）都作用在同一个对象上。

为了创建“真正的拷贝”（一个克隆），我们可以使用 `Object.assign` 来做所谓的“浅拷贝”（嵌套对象被通过引用进行拷贝）或者使用“深拷贝”函数，例如 [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep)。

- 当对象里的只有一层对象的时候，这时候 `Object.assign` 是深拷贝。如果对象中的键值是对象时，这时候是浅拷贝

### 4.3  垃圾回收

#### 可达性

JavaScript中主要的内存管理概念就是  **可达性**

意思是：“可达”值 是那些以某些方式可访问 或 可用的值。它们一定是存储在内存中的

- 两种类型：一种是根，一种是根的引用，（根的引用）的引用，各种扩展引用，但一定要和根搭接，不然 成为无法到达的岛屿

可达性 就是有用到的

1. 固有的可达值的基本集合，这些值不能被释放

   - 当前函数的局部变量和参数
   - 嵌套调用时，当前调用链上（作用域链？）上所有函数的变量与参数
   - 全局变量
   - （还有一些内部的）

   这些值被称作 “根”，意思是一定不能被释放，它们只有发出的箭头，没有进入的箭头

2. 如果说一个值可以通过引用 或者引用链 从根访问 任何其他值，则认为该值是可达的

   比方说：如果全局变量中有一个对象，并且该对象有一个属性引用了另一个对象，则该对象被认为是可达的，而且它引用的内容也是可达的

注意点：

- 对外引用不重要，只有传入引用才可以使对象可达。也就是说除了根，其他引用必须有进入的箭头，光出去箭头不重要

  ![1596513507156](Javascript笔记.assets/1596513507156.png)

- 如果几个对象相互引用，但是外部没有对其任意对象的引用，这些对象也可能是不可达的，并从内存中删除

#### 内部算法

垃圾回收的基本算法被称为：“mark-and-sweep”。

定期执行以下“垃圾回收”步骤：

- 垃圾收集器找到所有的根，并标记它们；

- 然后它遍历并标记来自它们的所有引用。

- 然后它遍历标记的对象 并标记 **他们的** 引用。所有被遍历到的对象都会被记住，以免将来再次遍历到同一个对象

- ……如此操作，直到所有可达的（从根部）引用都被访问到

- 没有被标记的对象都会被删除

  如图所示，凡是根的向外引用，以及 根的引用的引用 都被标记了

  ![1596513573070](Javascript笔记.assets/1596513573070.png)

#### 总结

- 垃圾回收是自动完成的，我们不能强制执行或是阻止执行
- 当对象是可达状态时，它一定是存在于内存中的
- 被引用与可访问（从一个根）不同：一组相互连接的对象可能整体都不可达

### 4.4 对象方法，“this”

#### 方法的定义：

作为对象属性的函数被称为 **方法**。 对象中的函数称为方法，例如下面的sayHi方法

```javascript
let user = {
  name:"lily"
  sayHi: function() {
    alert("Hello");
  }
};
```

对象字面量中，省略function和冒号

在对象字面量中，有一种更短的（声明）方法的语法：

```javascript
// 这些对象作用一样

user = {
  sayHi: function() {
    alert("Hello");
  }
};

// 方法简写看起来更好，对吧？
let user = {
  sayHi() { // 与 "sayHi: function()" 一样
    alert("Hello");
  }
};
```

#### 方法中的“this”

通常，对象方法需要访问对象中存储的信息才能完成其工作。

**为了访问该对象，方法中可以使用`this`关键字**

`this`的值就是在点之前的这个对象，即调用该方法的对象。

```javascript
let user = {
  name: "John",
  age: 30,
  
  sayHi() {
    // "this" 指的是“当前的对象”
    alert(this.name);
  }
};

user.sayHi(); // John
```

一般调用当前对象的存储信息时，都用`this`，不用对象的名字，例如`user.name`。这样做，是为了函数能在不同对象中都能调用

#### "this"不受限制

`this`可以用于任何函数

`this`的值是在代码运行时计算出来的，它取决于代码上下文

例如：这里相同的函数被分配给两个不同的对象，在调用中有着不同的`this`值

规则很简单：如果`obj.f()`被调用了，则`this`在`f`函数调用期间是`obj`。所以在上面的例子`this`先是`user`,之后是`admin`

- **在没有对象的情况下调用：`this == undefined**`

  一般来说，this只会在对象的方法里调用。因为this要调用属性例如name，如果不是对象的方法，只是单纯的函数调用，严格模式下`this ==undefined` ，非严格模式下,`this`将会是全局对象

  ```javascript
  function sayHi() {
    alert(this);
  }
  
  sayHi(); // undefined
  ```

  在这种情况下，严格模式下的 `this` 值为 `undefined`。如果我们尝试访问 `this.name`，将会报错。

  在非严格模式的情况下，`this` 将会是 **全局对象**（浏览器中的 `window`，我们稍后会在 [全局对象](https://zh.javascript.info/global-object) 一章中学习它）。这是一个历史行为，`"use strict"` 已经将其修复了。

  通常这种调用是程序出错了。如果在一个函数内部有 `this`，那么通常意味着它是在对象上下文环境中被调用的。

- **解除** `this` **绑定的后果**

  在JavaScript中，`this`是"自由"的，它的值是在调用时计算出来的，它的值并不取决于方法声明的位置，而是取决于在"点符号前"的是什么对象

  在运行时对`this` 求值的这个概念有缺点也有优点，一方面，**函数可以被重用于不同的对象**。另一方面，更大的灵活性造成了更大的出错的可能

#### 箭头函数没有自己的"this"

箭头函数有点特别，虽然它是函数，但它没有`this`。如果在这样的函数引用`this`，`this`值取决于外部"正常的"函数

举个例子：这里的`arrow()` 使用的`this`来自于外部的`user.sayHi()` 方法：

```javascript
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Ilya
```

#### 总结

- 存储在对象属性中的函数被称为"方法"
- 方法允许对象进行像`object.doSomething()` 这样的操作
- 方法可以将对象引用为`this`

`this` 的值是在程序运行时得到的

- 一个函数在声明时，可能就使用了`this` ,但是这个`this` 只有在函数被调用时才会有值。
- 可以在对象之间复制函数。
- 以“方法”的语法调用函数时：`object.method()`,调用过程中的`this`值是`object`

注意：箭头函数没有`this`，在箭头函数内部访问到的`this`都是从外部获取的

### 4.5  构造器和操作符"new"

常规的`{...}` 语法允许创建一个对象，但是我们经常需要创建许多类似的对象，例如多个用户或菜单。这可以使用构造函数和`new` 操作符来实现

常规对象和构造器的区别：当你想有多个对象的时候，你复制多个对象，但是你只复制了指针。而构造器它虽然是一个对象，但是你`new`一个构造器后，会在堆空间划分一块空间给对象。

#### 构造函数

构造函数在技术上是常规函数，不过有两个约定：

1. 它们的命名以大写字母开头。
2. 它们只能有`new` 操作符来执行。不能直接像普通函数调用

当一个函数被使用`new`操作符执行时，它按照一下步骤：

1. 一个新的空对象被创建并分配给`this`
2. 函数体执行，通常它会修改`this`，为其添加新的属性
3. 返回`this`的值

就像下面的`new User(..)`后做的类似事情

```javascript
function User(name){
  // 第一步：隐式创建空对象并分配给this
  // this = {}; 
  
  // 第二步：修改this，为其添加新的属性
  this.name = name;
  this.isAdmin = false;
  
  // 第三步：返回this的值，隐式返回
  // return this;
}
```

创建多个用户时，可以调用`new User("Ann")`,`new User("Alice")`等，比每次都使用字面量创建的要短得多，而且更容易阅读

> 这就是构造器的主要目的——实现可重用的对象创建代码

注意：从技术来说，任何函数都可以作为构造器，即：任何函数都可以通过`new`来运行，它会执行上面的算法。只不过“首字母大写”是一个共同的约定，已明确表示一个函数将被使用`new` 来运行

#### 构造函数的 return

一个普通的函数都有return，但是构造函数最好不明写return，因为它们的任务是将所有必要的东西写入`this`，并自动转换成结果，隐式返回`return this`

但如果有的话，根据下面的规则返回

- 如果`return` 返回的是一个对象，则返回到这个对象，而不是`this`;
- 如果`return` 返回的是一个原始类型，例如string字符串，number数字，Boolean布尔类型等等，则忽略

换句话说，带有对象的`return`返回该对象，在所有其他情况下返回`this`

通常构造器没有`return`语句，return返回一个对象是特殊行为

**省略括号**

如果`new`一个函数没有参数，则可以省略`new`后的括号

```javascript
let user = new User； //没有参数
// 等同于
let user = new User();
```

但是省略括号不是好风格，最好不要省略，虽然规范允许使用这个语法。普通函数一定 要括号来调用，即使没有参数`getTotal()`

#### 总结

- 构造函数，或简称构造器，就是常规函数，但大家对于构造器有个共同的约定，就是其命名首字母要大写
- 构造函数只能使用`new`来调用，这样的调用意味着在开始时创建了空的`this`,并在最后返回填充了值的`this`

我们可以使用构造函数来创建多个类似的对象

JavaScript为许多内置的对象提供了构造函数，比如日期`Date`,集合`set` 等待

### 4.6  可选链  "?."

#### 介绍可选链

可选链就是判断前面是否存在，就算不存在，也不会报错。是用于嵌套对象

类似于之前的`user && user.address && user.address.street`,只有`user`和`user.address`都为true后，才执行`user.address.street`的命令，现在是`user?.address?.street`

可选链`?.`是一种访问嵌套对象属性的放错误方法。即使中间的属性不存在，也不会出现错误

如果可选链`?.`前面的部分是`undefined`或者`null`,它就会停止运算并返回`undefined`

`?.` 语法使其**前面的值**成为**可选值**，但不会对后面的起作用

例如`user?.` 只允许`user` 为`null/undefined`,只判断前面的

#### 注意点

**不要过度使用可选链**

我们应该只将`?.`使用在一些东西可以不存在的地方，如果`user`必须存在，就不要用`?.`

 **`?.`前的变量必须已声明**

如果未声明变量`user`，那么`user?.anything`会触发一个错误：

```javascript
// ReferenceError:user is not defined
user?.address;
```

`?.`前的变量必须已通过`let/const/var user`进行声明。可选链只适用于已声明的变量

#### 其他情况：?.(),?.[]

可选链`?.` 不是一个运算符，而是一个特殊的语法结构，它还可以和函数和方括号一起使用。

例如,将`?.()` 用于调用一个可能不存在的函数

```javascript
let user1 = {
  admin(){
    console.log("hello word");
  }
}
let user2 ={};
user1.admin?.(); //hello word
user2.adnmin?.();
```

在这个两行代码中，我们首先使用点符号`.` 来获取`admin` 属性，因为用户对象一定存在，因此可以安全地读取它。

然后`?.()` 会检查它左边的部分；如果admin函数存在，就调用它，不存在，就运算停止，没有错误如user2

如果想使用方括号`[]` 而不是点符号`.` 来访问属性，语法`?.[]` 也可以使用。允许从一个可能不存在的对象上安全地读取属性

```javascript
let user1 = {
  firstName: "John"
};

let user2 = null; // 假设，我们不能授权此用户

let key = "firstName";

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined

alert( user1?.[key]?.something?.not?.existing); // undefined
```

此外，还可以将`?.` 跟`delete` 一起使用

```javascript
delete user?.name; //如果user存在，则删除user.name
```

**可以使用`?.` 来安全读取或删除，但不能写入**

可选链`?.` 不能用在赋值语句的左侧

```javascript
// 下面这段代码的想法是 要写入 user.name,如果user存在的话
user?.name = "john" ; //error,不起作用
```

#### 总结

可选链`?.` 语法有三种形式

1. `obj?.prop` —— 如果`obj` 存在则返回 `obj.prop`,否则返回`undefined`
2. `obj?.[prop]`——如果`obj`存在则返回`obj[prop]`，否则返回`undefined`
3. `obj?.method()` ——如果`obj` 存在则调用`obj.method()`，否则返回`undefined`

`?.` 检查左边部分是否为`null/undefined` ,如果不是则继续运算

`?.` 链使我们能够安全地访问嵌套属性

### 4.7 Symbol 类型（ 不懂）

不是很懂,只知道是ES6加的基本类型,是表示唯一标识符,java里也有

但不知道怎么用

#### 总结

`Symbol`是唯一标识符的基本类型

Symbol是使用带有可选描述（name）的`Symbol()`调用创建的

Symbol总是不同的值，即使它们有相同的名字。如果我们希望同名的Symbol相等，那么我们应该使用全局注册表示：`Symbol.for(key)` 返回（如果需要的话则创建） 一个以`key`作为名字的全局Symbol。使用`Symbol.for` 多次调用`key` 相同的Symbol时，返回的就是同一个Symbol

Symbol有两个主要的使用场景：

1. "隐藏"对象属性。如果我们想要向"属于"另一个脚本或者库的对象添加一个属性，我们可以创建一个Symbol并使用它作为属性的值。Symbol属性不会出现在`for..in`中，因此它不会意外地被与其他属性一起处理。并且，它不会被直接访问，因为另一个脚本没有我们的symbol。因此，该属性将受到保护，防止被意外使用或重写
2. JavaScript使用了许多系统Symbol，这些Symbol可以作为`Symbol.*`访问。我们可以使用它们来改变一些内置行为

### 4.8  对象 —— 原始值转换 （不懂）

无语，为什么要把高贵的对象转换成原始值。 

`JSON.parse(JSON.stringify(onj))` 实现深拷贝。利用JSON.stringify将js对象序列化（JSON字符串），再使用JSON.parse来反序列化（还原）js对象。

#### 总结

对象到原始值的转化，是由许多期望以原始值作为值的内建函数和运算符自动调用的

这里有三种类型（hint）：

- `string` 对于`alert`和其他字符串的操作
- `number` 对于数学运算
- `default` 少数运算符

规范明确描述了哪个运算符使用哪个hint。很少有运算符"不知道期望什么"并使用`default` hint。通常对于内建对象，`default` hint的处理方式与`number`相同，因此在实践中，最后两个hint常常合并在一起

转换算法是：

1. 调用`obj[Symbol.toPrimitive](hint)`如果这个方法存在
2. 否则，如果hint是`string`
   1. 尝试`obj.toString()`和`obj.valueOf()`，无论哪个存在
3. 否则，如果hint是`number`或者`default`
   1. 尝试`obj.valueOf()`和`obj.toString()`，无论哪个存在

在实践中，为了便于进行日志转换或调试，对于所有能够返回一种"可读性好"的对象的表达形式的转换，只实现以`obj.toString()`作为全能转换的方法就够了

## 5. 数据类型

### 5.1 原始类型的方法

> 其实就是对于基本类型,像number,string等类型,有方法调用.
>
> 一般都是对象里有定义方法,然后用点`.`调用方法.这边是基本类型也可以用`.`调用方法

JavaScript允许我们**像使用对象**一样**使用原始类型**(字符串,数字等). JavaScript还提供了这样的调用方法.这里主要讲调用的工作原理

来看看**原始类型**和**对象**之间的关键**区别**

一个原始值:

- 是原始类型中的一种值
- 在JavaScript中有7中原始类型:`string`, `number`, `bigint`, `boolean`, `symbol`, `null`, `undefined`

一个对象:

- 能够存储多个值作为属性
- 可以使用大括号`{}`创建对象,例如: `{name:"john",age:30}` .JavaScript中还有其他种类的对象,例如**函数就是对象**

#### 当做对象的原始类型

为了能像对象一样调用原始类型,JavaScript给出的解决方案(**原始类型能调用方法的工作原理**):

- 原始类型仍然是原始的.与预期相同,提供单个值
- JavaScript允许访问字符串,数字,布尔值和symbol 的**方法和属性**
- 为了使它们起作用,创建了提供额外功能的特殊"对象包装器",使用后即可被销毁

"对象包装器"对于每种原始类型都是不同的,它们被称为`String` ,`Number`, `Boolean`, `Symbol`.(注意:这里的首字母大写)因此,它们提供了不同的方法

例如:得到字符串的大小:str.length 属性. 大写化字符串: str.toUpperCase() 方法

**null/undefined没有任何方法**

​	它们没有对应的"对象包装器",也没有提供任何的方法

#### 总结

- 除`null` 和`undefined` 以外的原始类型都提供了许多有用的方法
- 从形式上讲,这些方法通过**临时对象**工作,但JavaScript引擎可以很好地调整,已在内部对其优化,因此调用它们并不需要太高的成本

### 5.2 数字类型(number)

主要介绍了数字的方法,例如`math`, `parseInt`, `toString`等

#### 编写数字的方法

- 通过在数字后附加"e",并制定零的数量来缩短数字:

  ```javascript
  let a = 1e3; // a=1000(3个零)
  ```

- 十六进制,二进制和八进制数字

  - 十六进制写法:`0x`+数字
  - 二进制写法: `0b`+数字
  - 八进制写法: `0o`+数字

  ```javascript
  let a = 0xff;       // 255,十六进制的255
  let b = 0b11111111; // 255,二进制形式的255,8个1
  let c = 0o377;      //255,十进制形式的255
  ```

#### toString(base)

方法`num.toString(base)`返回的是给定`base`进制数字系统中`num`的字符串表示形式

`base` 的范围可以是 `2 `到 `36 `,默认是 `10`

常见的base取值

- **base = 16** 用于十六进制颜色,字符编码等,数字可以是 `0..9`或`A..F`
- **base = 2** 主要用于调试按位操作,数字可以是`0` 和`1`
- **base = 36** 是最大进制,数字可以是 `0..9`或 `A..Z ` 

```javascript
let num = 255;
console.log(num.toString(16)); // ff
console.log(num.toString(2)); // 11111111 (8个1)
```

**使用两个点来调用一个方法**

`1234..toString(2)` 中的**两个点**是 **正确的**.如果我们想直接在一个数字上调用一个方法,比如上面例子的`toString()`方法,那么我们需要在它后面放置两个点`..`

因为如果放置一个点,会被认为是小数部分.放置两个点,JavaScript就知道小数部分为空,现在使用该方法

也可以写成 `(1234).toString(2)`

#### 数字舍入方法

`Math.floor`  向下舍入: `3.1`变成`3`, `-1.1`变成`-2`

`Math.ceil`    向上舍入: `3.1`变成` 4` ,`-1.1`变成`-1`

`Math.round`  四舍五入: `3.1`变成 `3`, `3.6` 变成`4`

`Math.trunc` 移除小数点的所有内容而没有舍入: `3.1`变成`3`, `-1.1` 变成`-1`

**数字舍入到小数点后`n`位:**

1. 乘除法

   如要把数字舍入到小数点后两位,可以先乘以100,再舍入,再除回

   ```javascript
   let num = 1.23456;
   console.log(Math.floor(num*100)/100); // 1.23456 -> 123.456 -> 123 -> 1.23
   ```

2. 使用函数`toFixed(n)`,将数字舍入到小数点`n`位,并以**字符串形式**返回结果.注意是字符串结果

   ```javascript
   let num = 12.34;
   console.log(num.toFixed(1)); // "12.3"
   ```

   `toFixed(n) `是四舍五入

   `toFixed(n)`的结果是一个字符串,如果小数部分比所需的短,则在结尾添加零

   ```javascript
   let num = 12.34;
   console.log(num.toFixed(5)); // "12.34000"
   ```

   将字符串转成数字: 使用一元加号 或者 `Number()`调用.  `+ num.toFixed(5)`。

#### 检测数字类型
`isFinite` 和 `isNaN`

- isNaN 将其参数转换成数字,然后测试它是否为: `NaN`

  ```javascript
  console.log(isNaN(NaN));  // true
  console.log(isNaN("str")); // true
  ```

- isFinite(value) 将其参数转换成数字,如果是常规数字,则返回`true`

  ```javascript
  alert(isFinite("15")); //true
  alert(isFinite("str")); //false
  ```

#### parseInt和parseFloat

使用加号`+`或`Number()`的数字转换是严格的.如果一个值不完全是一个数字,就会失败:

```javascript
alert(+"100px"); //NaN
```

所以当我们需要从字符串中读取数字,直到无法读取为止,使用`parseInt` 返回一个整数,而`parseFloat`返回一个浮点数

```javascript
alert(parseInt("100px")); //100
alert(parseInt("a123")); // NaN,第一个符号停止了读取
```

`parseInt(str,radix)` radix是可选参数,表示数字系统的基数

```javascript
alert(parseInt('0xff',16)); // 255  以16进制读字符串
alert(parseInt('ff',16)); // 255  没有0x 仍然有效
```

#### 其他内置Math函数

- `Math.random()` 返回一个从0到1的随机数(不包括1)
- `Math.max(a,b,c)` / `Math.min(a,b,c)` 从任意数量的参数中返回最大/最小值
- `Math.pow(n,power)` 返回`n` 的给定(power)次幂

#### 总结

要写很多零的数字:
- 将`"e"` 和 0的数量附加到数字后,就像:`123e6`与`123`后面6个0相同
- `"e"`后面的负数 将使数字除以 1 后面接着给定数量的零的数字.例如: `123e-6` 表示`0.000123`

对于不同的数字系统

- 可以直接在十六进制(0x),八进制(0o),二进制(0b)系统中写入数字
- `parseInt(str,base)`将字符串`str` 解析为在给定的`base` 数字系统中的整数
- `num.toString(base)` 将数字转换为在给定的 `base` 数字系统中的字符串

要将`12pt` 和 `100px` 之类的值转换为数字:

- 使用`parseInt/parseFloat` 进行"软"转换,它会从字符串中读取数字,然后返回在发送error前可以读取到的值

小数:

- 使用`Math.floor` , `Math.ceil`, `Math.trunc` , `Math.round` 或 `num.toFixed(precision)`进行舍入
- 请确保记住 使用小数 时 会损失精度

### 5.3 字符串（string）

####  字符串长度

`length`属性表示字符串长度

`length` 是一个属性。`str.length` 是一个数字属性，而不是函数。后面不需要添加括号

#### 访问字符

要获取在`pos`位置的一个字符，可以使用方括号`[pos]`或者调用` str.charAt(pos)` 方法.第一个字符从**零位置**开始.

```javascript
let str = "hello";

// 第一个字符
alert( str[0] ); // h
alert( str.charAt(0) ); // h

// 最后一个字符
alert( str[str.length-1] ); //o
```

方括号取数有点像数组, 根据下标取值

`[pos]`和`str.charAt(pos)`的区别: 如果没有找到字符,`[]`返回`undefined` 而 `charAt` 返回一个空字符串

**遍历字符串**

使用`for..of`遍历字符串

```javascript
for(let char of "hello"){
  alert(char); // h,e,l,l,o 
}
```

#### 字符串是不可改变的

字符串不能被修改,如果想要修改字符串,就新建一个字符串

```javascript
let str = "hi";

str = 'H' + str[1]; //替换字符串

alert( str ); //hi
```

#### 改变大小写

`toLowerCase()`  所有字符串变小写

`toUpperCase()`  所有字符串变大写

```JavaScript
alert( "hello".toUpperCase() ); // HELLO
alert( "HELLO".toLowerCase() ); // hello
```

要想是某个字符变小写/大写

```javascript
alert( 'Hello'[0].toLowerCase() );// h
```

#### 查找字符串

在字符串中查找子字符串

1. **str.indexOf**

   方法: `str.indexOf(substr,pos)`

   它从给定位置`pos`开始,在`str`中查找`substr`.如果没有找到,则返回`-1`,否则返回匹配成功的位置

   ```javascript
   let str = "hello word";
   
   alert( str.indexOf('o',2)) //4 表示从第2个位置开始找
   ```

   如果想找到一个字符出现在字符串中的所有位置,可以用循环

   ```javascript
   let str = "google google";
   let target = "g";
   
   let pos = -1;
   let arr = [];
   while((pos = str.indexOf(target,pos+1)) != -1){
     arr.push(pos);
   }
   console.log(pos);// [ 0, 3, 7, 10 ]
   ```

2. **str.lastIndexOf**

   `str.lastIndexOf(substr,pos)`

   和indexOf()类似,只不过它是从字符串的末尾开始搜索到开头

3. **按位(bitwise) NOT技巧**

   不会,过

4. **includes, startsWith, endsWith**

   `str.includes(substr,pos)` 查看某字符是否在字符串中,返回true/false. 可以用作比较**两个字符串重复**

   ```javascript
let str1 = "hello google";
   let str2 = "hello word";
   let arr = []
   for (let char of str2) {
       let resBoolean = str1.includes(char); // 查看str2中的字符是否在str1中
       if (resBoolean) {
           arr.push(char) // 在str1 中,放到数组中
       }
   }
   console.log(arr.length,arr); // 7 [ 'h', 'e', 'l', 'l', 'o', ' ', 'o' ] 两个字符串一共有7个重复字符
   ```
   
   `str.startsWith(substr)`  查看字符串是否 以substr 开头 ,返回true/false
   
   `str.endsWith(substr)`  查看字符串是否 以substr 结尾,返回 true/false

#### 获取子字符串

JavaScript中有三种获取字符串的方法: `substring`, `substr`,`slice`

- ` str.slice(start,end)` 返回字符串从 `start` 到(但不包括)`end`的部分.如果没有`end`,会默认到末尾

  `start/end`可以是负数,它们的意思是 **起始位置**从 **字符串结尾计算**

- `str.substring(start,end)` 返回字符串在`start `和 `end`**之间**的部分,和slice一样
- `str.substr(start,length)` 返回字符串从`start` 开始的给定`length` 的部分

| 方法                    | 选择方式……                                            | 负值参数            |
| :---------------------- | :---------------------------------------------------- | :------------------ |
| `slice(start, end)`     | 从 `start` 到 `end`（不含 `end`）                     | 允许                |
| `substring(start, end)` | `start` 与 `end` 之间（包括 `start`，但不包括 `end`） | 负值代表 `0`        |
| `substr(start, length)` | 从 `start` 开始获取长为 `length` 的字符串             | 允许 `start` 为负数 |

#### 总结

- 有 3 种类型的引号. 反引号允许字符串跨越多行并可以使用`${..}`在字符串嵌入表达式
- JavaScript中的字符串使用的是 UTF-16 编码
- 我们可以使用像 `\n` 这样的特殊字符或通过使用 `\u..`来操作它们的 Unicode进行字符插入
- 获取字符时,使用`[]`
- 获取子字符串, 使用 `slice`或`substring`
- 字符串的大/小写转换,使用:`toLowerCase/toUpperCase`
- 查找子字符串时,使用 `indexOf` 或 `includes/startsWith/endsWith`进行简单检查
- 根据语言比较字符串时使用`localeCompare` .否则将按字符代码进行比较

还有几种有用的字符串方法

- `str.trim()`   删除字符串前后的空格
- `str.repeat(n)`  重复字符串`n` 次

### 5.4 数组

#### 声明

创建一个空数组有两种语法:

```javascript
let arr = new Array();
let arr = [];
```

第二种方式更常用,可以在[]里添加初始元素:

```javascript
let fruits = ["Apple","orange","bannana"];
```

数组元素从**0**开始编号

**数组的增删改查**

1. 获取元素

   我们可以通过方括号中的数字获取元素:

   ```javascript
   alert(fruits[2]); // bannana
   ```

2. 修改元素

   ```javascript
   fruits[2] = "pear"; //现在变成["Apple","orange","pear"]
   ```

3. 增加元素

   ```javascript
   fruits[3] = "beach"; //现在变成["Apple","orange","pear","beach"]
   ```

4. 删除元素

   ```javascript
   splice方法/slice方法
   ```

**​以逗号结尾​**

数组就像对象一样,可以以 **逗号**结尾:

```javascript
let fruits = [
  "apple",
  "orange",
]
```

因为每一行都是相似的,所以这种以"逗号结尾"的方式使得 插入/移除项变得更加简单.

#### pop/push,shift/unshift方法

- pop/push 是栈的 **后进先出** 特性 在末端操作

- shift/unshift 是队列  **先进先出** 特性 在首端操作
- JavaScript中的数组 既可以用作队列,也可以用作栈,它们允许你 从首端/末端 来添加/删除元素
- 这在计算机科学中,允许这样的操作 的数据结构被称为 **双端队列(deque)**

push/unshift 可以一次添加多个元素

```javascript
fruits.push("1","2");
fruits.unshift("1","2");
```

#### 性能

`pop/push`方法运行比较快 ,`shift/unshift`方法运行比较慢

因为shift/unshift 从首端删除/增加数据后,后面的数据也要往前移/往后移,所以会慢

#### 循环

数组的循环有三种:

- `for()`,常用的

- `for...of` 遍历数组,获得是元素值

  ```javascript
  let arr = ["aa","bb","cc"];
  
  //遍历数组元素
  for(let num of arr){
    alert(num); 
  }
  ```

- `for..in` 遍历数组,获得是下标值

  但是不推荐使用,因为for..in 是**对象**的方法,只不过数组是特殊的对象,也可以用

  for..in 循环会遍历所有属性,不仅是数字属性,也会遍历 非数字的属性和方法.这些是我们不需要的.for..in会把它们遍历出来,会导致问题

  for..in 只适合普通对象, 用于数组,速度也会慢到10-100倍

#### length

当我们修改数组的时候,`length`属性会自动更新.准确地来说,它实际上不是数组元素的个数 ,而是 **最大的数字索引值加一**

```javascript
let arr = [];
arr[233] = "11"; 
alert(arr.length);//234; 直接创建了234个空间的数组
```

`length`属性是 **可写** 的

如果我们减少length,数组就会被阶段

```javascript
let arr = [1,2,3,4,5];

arr.length = 2; // 截断到只剩 2 个 元素
alert(arr); // [1,2]
```

清空数组的最简单方法:`arr.length = 0 `

#### toString

数组也有自己的`toString` 方法的实现,会返回以 逗号 隔开的 元素列表

`String(arr)` 或者直接加 数字

例如

```javascript
let arr =  [1,2,3];
alert(String(arr) === '1,2,3'); // true
```

直接加数字:

```javascript
alert( [] + 1); //"1"
alert( [1] + 1); // "11"
alert( [1,2] + 1);// "1,21"
```

数组没有`Symbol.toPrimitive`,也没有`valueOf` .它们只能执行 `toString` 进行转换,所以 `[]` 就变成了 一个空字符串,`[1]` 变成了 `"1"`, `[1,2]` 变成了`"1,2"`

当`"+"` 运算符把一些项加到字符串后面时,加号后面的项也会被转为字符串. 这也是最简单的转换字符串方法

```javascript
let a = 1;
let b = a + ""; //"1"
```

#### 总结

数组是一种特殊的对象,适用于存储和管理有序的数据项

- 声明

  ```js
  // 方括号(常见用法)
  let arr = [item1,item2..];
  //new Array(极其少见)
  let arr = new Array(item1,item2..);
  ```

  调用`new Array(number)`会创建一个给定长度的数组,但不含有任何项

- `length`属性是数组的长度,准确地说,它是数组的最后一个数字索引值加一,它是由数组方法 自动调整

- 如果我们手动缩短`length` 那么数组就会被截断

我们可以通过下列操作以 双端队列 的方法 来使用数组

- `push(...items)` 在末端添加 `items` 项。
- `pop()` 从末端移除并返回该元素。
- `shift()` 从首端移除并返回该元素。
- `unshift(...items)` 从首端添加 `items` 项。

遍历数组的元素:

- `for (let i=0; i<arr.length; i++)` — 运行得最快，可兼容旧版本浏览器。
- `for (let item of arr)` — 现代语法，只能访问 items。
- `for (let i in arr)` — 永远不要用这个。

### 5.5 数组方法

#### 添加/移除数组元素

- **arr.splice(str)**

  arr.splice(str)方法可以说是处理数组的瑞士军刀。它可以做所有事情：添加，删除和插入元素。

  语法是：

  ```javascript
  arr.splice(index[, deleteCount, elem1, ..., elemN])
  ```

  从 `index` 开始：删除 `deleteCount` 个元素并在当前位置插入 `elem1, ..., elemN`。最后**返回已删除元素的数组。**

  ```javascript
  //删除
  let arr = ["I", "study", "JavaScript"];
  arr.splice(1, 1); // 从索引 1 开始删除 1 个元素
  alert( arr ); // ["I", "JavaScript"]
  //删除替换
  let arr = ["I", "study", "JavaScript", "right", "now"];
  arr.splice(0, 3, "Let's", "dance");
  alert( arr ) // now ["Let's", "dance", "right", "now"]
  ```

  在这里我们可以看到 `splice` **返回了已删除元素的数组**：

  ```javascript
  let arr = ["I", "study", "JavaScript", "right", "now"];
  
  // 删除前两个元素
  let removed = arr.splice(0, 2);
  
  alert( removed ); // "I", "study" <-- 被从数组中删除了的元素
  ```

  我们可以将 `deleteCount` 设置为 `0`，`splice` 方法就能够插入元素而不用删除任何元素：

  **允许负向索引**

  在这里和其他数组方法中，负向索引都是被允许的。它们从数组末尾计算位置

- **slice**

  语法是：

  ```javascript
  arr.slice([start], [end])
  ```

  **它会返回一个新数组**，将所有从索引 `start` 到 `end`（不包括 `end`）的数组项复制到一个新的数组。`start` 和 `end` 都可以是负数，在这种情况下，从末尾计算索引。

  > 它和字符串的 `str.slice` 方法有点像，就是把子字符串替换成子数组。

- **concat**

  arr.concat**创建一个新数组**，其中包含来自于其他数组和其他项的值。

  语法：

  ```javascript
  arr.concat(arg1, arg2...)
  ```

  它接受任意数量的参数 —— 数组或值都可以。

  结果是一个包含来自于 `arr`，然后是 `arg1`，`arg2` 的元素的新数组。

  如果参数 `argN` 是一个**数组**，那么其中的**所有元素都会被复制**。否则，将复制参数本身。

  如果**类似数组的对象**具有 `Symbol.isConcatSpreadable` 属性，那么它就会被 `concat` 当作一个数组来处理：此对象中的元素将被添加：

  ```javascript
  let arr = [1, 2];
  
  let arrayLike = {
    0: "something",
    1: "else",
    [Symbol.isConcatSpreadable]: true,
    length: 2
  };
  
  alert( arr.concat(arrayLike) ); // 1,2,something,else
  ```

#### 遍历：forEach

arr.forEach方法允许为数组的每个元素都运行一个函数。

语法：

```javascript
arr.forEach(function(item, index, array) {
  // ... do something with item
});
```

该函数的结果（如果它有返回）会被抛弃和忽略。

用法:

```javascript
let arr = [11,12,21,22];
let sum = 0;
arr.forEach(item => sum += item);
console.log(sum);
```

#### 在数组中搜索

- **indexOf/lastIndexOf 和 includes**

  arr.indexOf、arr.lastIndexOf和 arr.includes方法与**字符串**操作具有**相同的语法**，并且作用基本上也与字符串的方法相同，只不过这里是对数组元素而不是字符进行操作：

  - `arr.indexOf(item, from)` 从索引 `from` 开始搜索 `item`，如果找到则返回索引，否则返回 `-1`。
  - `arr.lastIndexOf(item, from)` —— 和上面相同，只是从右向左搜索。
  - `arr.includes(item, from)` —— 从索引 `from` 开始搜索 `item`，如果找到则返回 `true`（译注：如果没找到，则返回 `false`）。

  如果我们想检查是否包含某个元素，并且不想知道确切的索引，那么 `arr.includes` 是首选。

- **find 和 findIndex**

  找到具有特定条件的对象:arr.find()

  语法如下：

  ```javascript
  let result = arr.find(function(item, index, array) {
    // 如果返回 true，则返回 item 并停止迭代
    // 对于 falsy 则返回 undefined
  });
  ```

  依次对数组中的每个元素调用该函数：

  - `item` 是元素。
  - `index` 是它的索引。
  - `array` 是数组本身。

  如果它返回 `true`，则搜索停止，并返回 `item`。如果没有搜索到，则返回 `undefined`。**返回元素本身**

  例如，我们有一个存储用户的数组，每个用户都有 `id` 和 `name` 字段。让我们找到 `id == 1` 的那个用户：

  ```javascript
  let users = [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"}
  ];
  
  let user = users.find(item => item.id == 1);
  
  alert(user.name); // John
  ```

  注意在这个例子中，我们传给了 `find` 一个单参数函数 `item => item.id == 1`。这很典型，并且 `find` 方法的其他参数很少使用。

  arr.findIndex方法（与 `arr.find` 方法）基本上是一样的，但它**返回找到元素的索引**，而不是元素本身。并且在未找到任何内容时返回 `-1`。

- **filter**

  `find` 方法搜索的是使函数返回 `true` 的第一个（单个）元素。

   `filter` 返回的是所有匹配元素组成的数组：

  ```javascript
  let results = arr.filter(function(item, index, array) {
    // 如果 true item 被 push 到 results，迭代继续
    // 如果什么都没找到，则返回空数组
  });
  ```

  例如：

  ```javascript
  let users = [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"}
  ];
  
  // 返回前两个用户的数组
  let someUsers = users.filter(item => item.id < 3);
  
  alert(someUsers.length); // 2
  ```

#### 转换数组

- **map**

  arr.map方法是最有用和经常使用的方法之一。

  它对数组的每个元素都调用函数，**并返回结果数组**。

  语法：

  ```javascript
  let result = arr.map(function(item, index, array) {
    // 返回新值而不是当前元素
  })
  ```

  例如，在这里我们将每个元素转换为它的字符串长度：

  ```javascript
  let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
  alert(lengths); // 5,7,6
  ```

- **sort(fn)**

  arr.sort方法对数组进行 **原位（in-place）** 排序，更改元素的顺序。(译注：原位是指在此数组内，而非生成一个新数组。)

  它还返回排序后的数组，但是返回值通常会被忽略，因为修改了 `arr` 本身。**修改原数组**

  **这些元素默认情况下被按字符串进行排序。**对于字符串，按照词典顺序进行排序

  `arr.sort(fn)` 方法实现了通用的排序算法.它将遍历数组，使用提供的函数比较其元素并对其重新排序，我们所需要的就是提供执行比较的函数 `fn`。

  **比较函数可以返回任何数字**

  实际上，比较函数只需要返回一个正数表示“大于”，一个负数表示“小于”。**正数a,b交换,负数不交换**

  通过这个原理我们可以编写更短的函数：

  ```javascript
  let arr = [ 1, 2, 15 ];
  
  arr.sort(function(a, b) { return a - b; });
  
  alert(arr);  // 1, 2, 15
  ```

  这里使用箭头函数会更加简洁：

  ```javascript
  arr.sort( (a, b) => a - b );
  ```

- **reverse**

  arr.reverse方法用于颠倒 `arr` 中元素的顺序。

  例如：

  ```javascript
  let arr = [1, 2, 3, 4, 5];
  arr.reverse();
  
  alert( arr ); // 5,4,3,2,1
  ```

  它也会返回颠倒后的数组 `arr`。 **修改原数组**

- **split 和 join**

  str.split(delim)方法可以做到。它通过给定的分隔符 `delim` 将字符串分割成一个数组。**字符串转数组**

  arr.join(glue) 与 `split` 相反。它会在它们之间创建一串由 `glue` 粘合的 `arr` 项。**数组转字符串**

  ```javascript
  // 字符串转数组
  let str = "test";
  alert( str.split('') ); // t,e,s,t
  // 数组转字符串
  let arr = ['Bilbo', 'Gandalf', 'Nazgul'];
  let str = arr.join(';'); // 使用分号 ; 将数组粘合成字符串
  alert( str ); // Bilbo;Gandalf;Nazgul
  ```

- **reduce/reduceRight**

  当我们需要**遍历一个数组**时 —— 我们可以使用 `forEach`，`for` 或 `for..of`。

  当我们需要**遍历并返回每个元素的数据**时 —— 我们可以使用 `map`。

  [arr.reduce](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) 方法和 [arr.reduceRight](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight) 方法和上面的种类差不多，但稍微复杂一点。它们用于根据数组计算单个值。

  语法是：
  
  ```javascript
  let value = arr.reduce(function(accumulator, item, index, array) {
    // ...
}, [initial]);
  ```

  该函数一个接一个地应用于所有数组元素，并将其结果“搬运（carry on）”到下一个调用。

  参数：
  
  - `accumulator` —— 是上一个函数调用的结果，第一次等于 `initial`（如果提供了 `initial` 的话）。
  - `item` —— 当前的数组元素。
- `index` —— 当前索引。
  - `arr` —— 数组本身。

  应用函数时，上一个函数调用的结果将作为第一个参数传递给下一个函数。

  因此，第一个参数本质上是累加器，用于存储所有先前执行的组合结果。最后，它成为 `reduce` 的结果。

  在这里，我们通过一行代码得到一个数组的总和：
  
  ```javascript
  let arr = [1, 2, 3, 4, 5];
  
  let result = arr.reduce((sum, current) => sum + current, 0);
  
  ```

alert(result); // 15
  ```
  
  reduceRight和reduce方法的功能一样，只是**遍历为从右到左**。

#### Array.isArray

数组是基于对象的，不构成单独的语言类型。

所以 `typeof` 不能帮助从数组中区分出普通对象.但是数组经常被使用，因此有一种特殊的方法用于判断：`Array.isArray(value)`。如果 `value` 是一个数组，则返回 `true`；否则返回 `false`。

​```javascript
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
  ```

#### 总结

数组方法备忘单：

- 添加/删除元素：
  - `push(...items)` —— 向尾端添加元素，
  - `pop()` —— 从尾端提取一个元素，
  - `shift()` —— 从首端提取一个元素，
  - `unshift(...items)` —— 向首端添加元素，
  - `splice(pos, deleteCount, ...items)` —— 从 `index` 开始删除 `deleteCount` 个元素，并在当前位置插入 `items`。
  - `slice(start, end)` —— 创建一个新数组，将从位置 `start` 到位置 `end`（但不包括 `end`）的元素复制进去。
  - `concat(...items)` —— 返回一个新数组：复制当前数组的所有元素，并向其中添加 `items`。如果 `items` 中的任意一项是一个数组，那么就取其元素。
- 搜索元素：
  - `indexOf/lastIndexOf(item, pos)` —— 从位置 `pos` 开始搜索 `item`，搜索到则返回该项的索引，否则返回 `-1`。
  - `includes(value)` —— 如果数组有 `value`，则返回 `true`，否则返回 `false`。
  - `find/filter(func)` —— 通过 `func` 过滤元素，返回使 `func` 返回 `true` 的第一个值/所有值。
  - `findIndex` 和 `find` 类似，但返回索引而不是值。
- 遍历元素：
  - `forEach(func)` —— 对每个元素都调用 `func`，不返回任何内容。
- 转换数组：
  - `map(func)` —— 根据对每个元素调用 `func` 的结果创建一个新数组。
  - `sort(func)` —— 对数组进行原位（in-place）排序，然后返回它。
  - `reverse()` —— 原位（in-place）反转数组，然后返回它。
  - `split/join` —— 将字符串转换为数组并返回。
  - `reduce(func, initial)` —— 通过对每个元素调用 `func` 计算数组上的单个值，并在调用之间传递中间结果。
- 其他：
  - `Array.isArray(arr)` 检查 `arr` 是否是一个数组。

请注意，`sort`，`reverse` 和 `splice` 方法修改的是数组本身。

这些是最常用的方法，它们覆盖 99％ 的用例。但是还有其他几个：

- `arr.some(fn)/arr.every(fn)`检查数组。

  与 `map` 类似，对数组的每个元素调用函数 `fn`。如果任何/所有结果为 `true`，则返回 `true`，否则返回 `false`。

- `arr.fill(value, start, end)`—— 从索引 `start` 到 `end`，用重复的 `value` 填充数组。

- `arr.copyWithin(target, start, end)`—— 将从位置 `start` 到 `end` 的所有元素复制到 **自身** 的 `target` 位置（覆盖现有元素）。

### 5.6 Iterable object（可迭代对象）(不太懂)

**可迭代（Iterable）** 对象是数组的泛化。这个概念是说任何对象都可以被定制为可在 `for..of` 循环中使用的对象。

数组是可迭代的。但不仅仅是数组。很多其他内建对象也都是可迭代的。例如字符串也是可迭代的

#### 可迭代（iterable）和类数组（array-like）

- **Iterable** 如上所述，是实现了 `Symbol.iterator` 方法的对象。
  - 人话就是:能用for .. of 的 都是迭代的
- **Array-like** 是有索引和 `length` 属性的对象，所以它们看起来很像数组。

例如，字符串即是可迭代的（`for..of` 对它们有效），又是类数组的（它们有数值索引和 `length` 属性）。

下面这个对象则是类数组的

```javascript
let arrayLike = { // 有索引和 length 属性 => 类数组对象
  0: "Hello",
  1: "World",
  length: 2
};
```

可迭代对象和类数组对象通常都 **不是数组**，它们没有 `push` 和 `pop` 等方法。

#### Array.from

可以让 类数组 /可迭代  转换为 数组 

有一个全局方法 [Array.from](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/from) 可以接受一个可迭代或类数组的值，并从中获取一个“真正的”数组。然后我们就可以对其调用数组方法了。

`Array.from` 的完整语法允许我们提供一个可选的“映射（mapping）”函数：

```javascript
Array.from(obj[, mapFn, thisArg])
```

可选的第二个参数 `mapFn` 可以是一个函数，该函数会在对象中的元素被添加到数组前，被应用于每个元素，此外 `thisArg` 允许我们为该函数设置 `this`。

现在我们用 `Array.from` 将一个字符串转换为单个字符的数组：

```javascript
let str = '𝒳😂';

// 将 str 拆分为字符数组
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

与 `str.split` 方法不同，它依赖于字符串的可迭代特性。

#### 总结

有索引属性和 `length` 属性的对象被称为 **类数组对象**。这种对象可能还具有其他属性和方法，但是没有数组的内建方法。

`Array.from(obj[, mapFn, thisArg])` 将可迭代对象或类数组对象 `obj` 转化为真正的数组 `Array`，然后我们就可以对它应用数组的方法。可选参数 `mapFn` 和 `thisArg` 允许我们将函数应用到每个元素。

### 5.7 Map and Set（映射和集合）

我们已经了解了以下复杂的数据结构：

- 存储带键的数据（keyed）集合的对象。
- 存储有序集合的数组。

但这还不足以应对现实情况。这就是为什么存在 `Map` 和 `Set`。

#### Map

Map是一个带键的数据项的集合，就像一个 `Object` 一样。 但是它们最大的差别是 `Map` 允许任何类型的键key

对象的key 是字符串,而map的key 可以是字符串 也可以是 数字等

它的方法和属性如下：

- `new Map()` —— 创建 map。
- `map.set(key, value)` —— 根据键存储值。
- `map.get(key)` —— 根据键来返回值，如果 `map` 中不存在对应的 `key`，则返回 `undefined`。
- `map.has(key)` —— 如果 `key` 存在则返回 `true`，否则返回 `false`。
- `map.delete(key)` —— 删除指定键的值。
- `map.clear()` —— 清空 map。
- `map.size` —— 返回当前元素个数。

map访问数据不是像字符串一样用[],而是用get方法 .map.get(key)

`map[key]` **不是使用** `Map` **的正确方式 **  我们应该使用 `map` 方法：`set` 和 `get` 等。

**Map 还可以使用对象作为键。**使用对象作为键是 `Map` 最值得注意和重要的功能之一。

```js
let john = { name: "John" };

// 存储每个用户的来访次数
let visitsCountMap = new Map();

// john 是 Map 中的键
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

>  **`Map` 是怎么比较键的？**

`Map` 使用 SameValueZero 算法来比较键是否相等。它和严格等于 `===` 差不多，但区别是 `NaN` 被看成是等于 `NaN`。所以 `NaN` 也可以被用作键。

这个算法不能被改变或者自定义。

> **链式调用**

每一次 `map.set` 调用都会返回 map 本身，所以我们可以进行“链式”调用：

```javascript
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```

跟数组不一样,数组的push和unshift都是返回数组的长度.map是返回map本身

#### Map 迭代

如果要在 `map` 里使用循环，可以使用以下三个方法：

- `map.keys()` —— 遍历并返回所有的键（returns an iterable for keys），
- `map.values()` —— 遍历并返回所有的值（returns an iterable for values），
- `map.entries()` —— 遍历并返回所有的实体（returns an iterable for entries）`[key, value]`，`for..of` 在默认情况下使用的就是这个。

例如：

```javascript
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// 遍历所有的键（vegetables）
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// 遍历所有的值（amounts）
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// 遍历所有的实体 [key, value]
for (let entry of recipeMap) { // 与 recipeMap.entries() 相同
  alert(entry); // cucumber,500 (and so on)
}
```

>  **使用插入顺序**

迭代的顺序与插入值的顺序相同。与普通的 `Object` 不同，`Map` **保留了此顺序**。

除此之外，`Map` 有内置的 `forEach` 方法，与 `Array` 类似：

```javascript
// 对每个键值对 (key, value) 运行 forEach 函数
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```

#### map和对象互换

- 对象转map: `Object.entries(obj)`

  如果我们想从一个已有的普通对象（plain object）来创建一个 `Map`，那么我们可以使用内建方法  Object.entries(obj),该返回对象的键/值对数组，该数组格式完全按照 `Map` 所需的格式。

  所以可以像下面这样从一个对象创建一个 Map：

  ```javascript
  let obj = {
    name: "John",
    age: 30
  };
  
  let map = new Map(Object.entries(obj));
  
  alert( map.get('name') ); // John
  ```

  这里，`Object.entries` 返回键/值对数组：`[ ["name","John"], ["age", 30] ]`。这就是 `Map` 所需要的格式。

- map转对象:`Object.fromEntries`

  `Object.fromEntries` 方法的作用是相反的：给定一个具有 `[key, value]` 键值对的数组，它会根据给定数组创建一个对象：

  ```javascript
  let prices = Object.fromEntries([
    ['banana', 1],
    ['orange', 2],
    ['meat', 4]
  ]);
  
  // 现在 prices = { banana: 1, orange: 2, meat: 4 }
  
  alert(prices.orange); // 2
  ```

  我们可以使用 `Object.fromEntries` 从 `Map` 得到一个普通对象（plain object）。

#### Set

`Set` 是一个特殊的类型集合 —— “值的集合”（没有键），它的每一个值只能出现一次。

set没有取的方法

它的主要方法如下：

- `new Set(iterable)` —— 创建一个 `set`，如果提供了一个 `iterable` 对象（**通常是数组**），将会从数组里面复制值到 `set` 中。
- `set.add(value)` —— 添加一个值，返回 set 本身
- `set.delete(value)` —— 删除值，如果 `value` 在这个方法调用的时候存在则返回 `true` ，否则返回 `false`。
- `set.has(value)` —— 如果 `value` 在 set 中，返回 `true`，否则返回 `false`。
- `set.clear()` —— 清空 set。
- `set.size` —— 返回元素个数。

它的主要特点是，重复使用同一个值调用 `set.add(value)` 并不会发生什么改变。这就是 `Set` 里面的每一个值只出现一次的原因。

####  Set 迭代（iteration）

我们可以使用 `for..of` 或 `forEach` 来遍历 Set：

```javascript
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// 与 forEach 相同：
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

#### 总结

`Map` —— 是一个带键的数据项的集合。

方法和属性如下：

- `new Map([iterable])` —— 创建 map，可选择带有 `[key,value]` 对的 `iterable`（例如数组）来进行初始化。
- `map.set(key, value)` —— 根据键存储值。
- `map.get(key)` —— 根据键来返回值，如果 `map` 中不存在对应的 `key`，则返回 `undefined`。
- `map.has(key)` —— 如果 `key` 存在则返回 `true`，否则返回 `false`。
- `map.delete(key)` —— 删除指定键的值。
- `map.clear()` —— 清空 map 。
- `map.size` —— 返回当前元素个数。

与普通对象 `Object` 的不同点：

- 任何键、对象都可以作为键。
- 有其他的便捷方法，如 `size` 属性。

`Set` —— 是一组唯一值的集合。

方法和属性：

- `new Set([iterable])` —— 创建 set，可选择带有 `iterable`（例如数组）来进行初始化。
- `set.add(value)` —— 添加一个值（如果 `value` 存在则不做任何修改），返回 set 本身。
- `set.delete(value)` —— 删除值，如果 `value` 在这个方法调用的时候存在则返回 `true` ，否则返回 `false`。
- `set.has(value)` —— 如果 `value` 在 set 中，返回 `true`，否则返回 `false`。
- `set.clear()` —— 清空 set。
- `set.size` —— 元素的个数。

在 `Map` 和 `Set` 中迭代总是按照值插入的顺序进行的，所以我们不能说这些集合是无序的，但是我们不能对元素进行重新排序，也不能直接按其编号来获取元素。

### 5.9 Object.keys，values，entries

map遍历方法有`map.keys()`,`map.values()` `map.entries()` 方法

同样的,对象Object也有相同的方法,但是和map的不太一样

对于普通对象，下列这些方法是可用的：

- Object.keys(obj )—— 返回一个包含该对象所有的键的数组。
- Object.values(obj)—— 返回一个包含该对象所有的值的数组。
- Object.entries(obj)—— 返回一个包含该对象所有 [key, value] 键值对的数组。

|          | Map          | Object                                  |
| :------- | :----------- | --------------------------------------- |
| 调用语法 | `map.keys()` | `Object.keys(obj)`，而不是 `obj.keys()` |
| 返回值   | 可迭代项     | “真正的”数组                            |

第一个区别是，对于对象我们使用的调用语法是 `Object.keys(obj)`，而不是 `obj.keys()`。

为什么会这样？主要原因是灵活性。请记住，在 JavaScript 中，对象是所有复杂结构的基础。因此，我们可能有一个自己创建的对象，比如 `data`，并实现了它自己的 `data.values()` 方法。同时，我们依然可以对它调用 `Object.values(data)` 方法。

第二个区别是 `Object.*` 方法返回的是“真正的”数组对象，而不只是一个可迭代项。这主要是历史原因。

举个例子：

```javascript
let user = {
  name: "John",
  age: 30
};
```

- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

#### 转换对象

对象缺少数组存在的许多方法，例如 `map` 和 `filter` 等。

> 对象 -> 数组 -> 对象

如果我们想应用它们，那么我们可以使用 `Object.entries`，然后使用 `Object.fromEntries`：

1. 使用 `Object.entries(obj)` 从 `obj` 获取由键/值对组成的数组。
2. 对该数组使用数组方法，例如 `map`。
3. 对结果数组使用 `Object.fromEntries(array)` 方法，将结果转回成对象。

例如，我们有一个带有价格的对象，并想将它们加倍：

```javascript
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = Object.fromEntries(
  // 转换为数组，之后使用 map 方法，然后通过 fromEntries 再转回到对象
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);

alert(doublePrices.meat); // 8
```

### 5.10 解构赋值

**解构赋值** 是一种特殊的语法，它使我们可以将数组或对象“拆包”为到一系列变量中，因为有时候使用变量更加方便。解构操作对那些具有很多参数和默认值等的函数也很奏效。

#### 数组解构

下面是一个将数组解构到变量中的例子：

```javascript
// 我们有一个存放了名字和姓氏的数组
let arr = ["Ilya", "Kantor"]

// 解构赋值
// sets firstName = arr[0]
// and surname = arr[1]
let [firstName, surname] = arr;

alert(firstName); // Ilya
alert(surname);  // Kantor
```

当与 `split` 函数（或其他返回值是数组的函数）结合使用时，看起来就更优雅了：

```javascript
let [firstName, surname] = "Ilya Kantor".split(' ');
```

> **“解构”并不意味着“破坏”**

这种语法叫做“解构赋值”，因为它通过将结构中的各元素复制到变量中来达到“解构”的目的。但数组本身是没有被修改的。

> **忽略使用逗号的元素**

数组中不想要的元素也可以通过添加额外的逗号来把它丢弃：

```javascript
// 不需要第二个元素
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert( title ); // Consul
```

在上面的代码中，数组的第二个元素被跳过了，第三个元素被赋值给了 `title` 变量，数组中剩下的元素也都被跳过了（因为在这没有对应给它们的变量）。

> **等号右侧可以是任何可迭代对象**

实际上，我们可以将其与任何可迭代对象一起使用，而不仅限于数组：

```javascript
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```

> **赋值给等号左侧的任何内容**

我们可以在等号左侧使用任何“可以被赋值的”东西。

例如，一个对象的属性：

```javascript
let user = {};
[user.name, user.surname] = "Ilya Kantor".split(' ');

alert(user.name); // Ilya
```

> **与 .entries() 方法进行循环操作**

我们可以将 .entries() 方法与解构语法一同使用，来遍历一个对象的“键—值”对：

```javascript
let user = {
  name: "John",
  age: 30
};

// 循环遍历键—值对  
// Object.entries(user)是数组[[],[]]格式
for (let [key, value] of Object.entries(user)) {
  alert(`${key}:${value}`); // name:John, then age:30
}
```

> **交换变量值的技巧**

再也不用temp作为中间值交换了

一个用于交换变量值的典型技巧：

```javascript
let guest = "Jane";
let admin = "Pete";

// 交换值：让 guest=Pete, admin=Jane
[guest, admin] = [admin, guest];

console.log(guest,admin); // Pete Jane（成功交换！）

```

##### 剩余的'...'

如果我们不只是要获得第一个值，还要将后续的所有元素都收集起来 — 我们可以使用三个点 `"..."` 来再加一个参数来接收“剩余的”元素：

```javascript
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar

// 请注意，`rest` 的类型是数组
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
```

`rest` 的值就是数组中**剩下的元素组成**的**数组**。不一定要使用变量名 `rest`，我们也可以使用其他的变量名，只要确保它前面有三个点，并且在解构赋值的最后一个参数位置上就行了。

##### 默认值

如果赋值语句中，变量的数量多于数组中实际元素的数量，赋值不会报错。未赋值的变量被认为是 `undefined`：

```javascript
let [firstName, surname] = [];

alert(firstName); // undefined
alert(surname); // undefined
```

如果我们想要一个“默认”值给未赋值的变量，我们可以使用 `=` 来提供：

```javascript
// 默认值
let [name = "Guest", surname = "Anonymous"] = ["Julius"];

alert(name);    // Julius（来自数组的值）
alert(surname); // Anonymous（默认值被使用了）
```

#### 对象解构

解构赋值同样适用于对象。

左边的值 是 要和 对象中的键值 相同. 而且左边的顺序可以随便,只要右边有就行

基本语法是：

```javascript
let {var1, var2} = {var1:…, var2:…}
```

在等号右侧有一个已经存在的对象，我们想把它拆开到变量中。等号左侧包含了对象**相应属性**的一个“模式（pattern）”。在简单的情况下，等号左侧的就是 `{...}` 中的变量名列表。

如果我们想把一个属性赋值给另一个名字的变量，比如把 `options.width` 属性赋值给变量 `w`，那么我们可以使用**冒号**来指定：

```javascript
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

冒号表示“什么值：赋值给谁”。上面的例子中，属性 `width` 被赋值给了 `w`，属性 `height` 被赋值给了 `h`，属性 `title` 被赋值给了同名变量。

我们还可以将冒号和等号结合起来：

```javascript
let options = {
  title: "Menu"
};

let {width: w = 100, height: h = 200, title} = options;

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

##### 剩余模式(pattern) "..."

如果对象拥有的属性数量比我们提供的变量数量还多，该怎么办？我们可以只取其中的某一些属性，然后把“剩余的”赋值到其他地方吗？

我们可以使用剩余模式（pattern），就像我们对数组那样看起来就像这样：

```javascript
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

// title = 名为 title 的属性
// rest = 存有剩余属性的对象
let {title, ...rest} = options;

// 现在 title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```

#### 嵌套解构

如果一个对象或数组**嵌套了其他的对象和数组**，我们可以在等号左侧使用更复杂的模式（pattern）来提取更深层的数据。

在下面的代码中，`options` 的属性 `size` 是另一个对象，属性 `items` 是另一个数组。赋值语句中等号左侧的模式（pattern）具有相同的结构以从中提取值：

```javascript
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};

// 为了清晰起见，解构赋值语句被写成多行的形式
let {
  size: { // 把 size 赋值到这里
    width,
    height
  },
  items: [item1, item2], // 把 items 赋值到这里
  title = "Menu" // 在对象中不存在（使用默认值）
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

#### 智能函数参数

有时，一个函数有很多参数，其中大部分的参数都是可选的。对用户界面来说更是如此。想象一个创建菜单的函数。它可能具有宽度参数，高度参数，标题参数和项目列表等。

我们可以把**所有参数**当作一个**对象**来传递，然后函数马上把这个对象解构成多个变量：

```javascript
// 我们传递一个对象给函数
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ……然后函数马上把对象展开成变量
// 形参 是一个 对象
function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
  // title, items – 提取于 options，
  // width, height – 使用默认值
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options); // 实参是 options 这个对象
```

#### 总结

- 解构赋值可以立即将一个对象或数组映射到多个变量上。

- 解构对象的完整语法：

  ```javascript
  let {prop : varName = default, ...rest} = object
  ```

  这表示属性 `prop` 会被赋值给变量 `varName`，如果没有这个属性的话，就会使用默认值 `default`。

  没有对应映射的对象属性会被复制到 `rest` 对象。

- 解构数组的完整语法：

  ```javascript
  let [item1 = default, item2, ...rest] = array
  ```

  数组的第一个元素被赋值给 `item1`，第二个元素被赋值给 `item2`，剩下的所有元素被复制到另一个数组 `rest`。

- 从嵌套数组/对象中提取数据也是可以的，此时等号左侧必须和等号右侧有相同的结构。

### 5.11 日期和时间

新的**内建对象**：日期（Date）。该对象存储日期和时间，并提供了日期/时间的管理方法。

#### 创建

创建一个新的 `Date` 对象，只需要调用 `new Date()`，在调用时可以带有下面这些参数之一：

- `new Date()`

  不带参数 —— 创建一个表示当前日期和时间的 `Date` 对象：

  ```js
  let now = new Date();
  alert( now ); // 显示当前的日期/时间
  ```

  **new Date(milliseconds)**  milliseconds是整数参数,被称为**时间戳.**它是自 1970-01-01 00:00:00 以来经过的毫秒数

  这是一种日期的轻量级数字表示形式。我们通常使用 `new Date(timestamp)` 通过时间戳来创建日期，并可以使用 `date.getTime()` 将现有的 `Date` 对象转化为时间戳
  
  **new Date(datestring)**
  
  如果只有一个参数，并且是**字符串**，那么它会被自动解析。该算法与 `Date.parse` 所使用的算法相同
  
  **new Date(year, month, date, hours, minutes, seconds, ms)**
  
  使用当前时区中的给定组件创建日期。只有前两个参数是必须的。
  
  - `year` 必须是四位数：`2013` 是合法的，`98` 是不合法的。
  - `month` 计数从 `0`（一月）开始，到 `11`（十二月）结束。
  - `date` 是当月的具体某一天，如果缺失，则为默认值 `1`。
  - 如果 `hours/minutes/seconds/ms` 缺失，则均为默认值 `0`。
  
  例如：
  
  ```javascript
  new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
  new Date(2011, 0, 1); // 同样，时分秒等均为默认值 0
  ```

#### 访问日期组件

从 `Date` 对象中访问年、月等信息有多种方式：

- **getFullYear()**

  获取年份（4 位数）

- **getMonth()**

  获取月份，**从 0 到 11**。

- **getDate()**

  获取当月的具体日期，从 1 到 31，这个方法名称可能看起来有些令人疑惑。

- **getHours()**，**getMinutes()**，**getSeconds()**，**getMilliseconds()**

  获取相应的时间组件。

- **getDay()**

  获取一周中的第几天，从 `0`（星期日）到 `6`（星期六）。第一天始终是星期日，在某些国家可能不是这样的习惯，但是这不能被改变。

- **getTime()**

  返回日期的**时间戳** —— 从 1970-1-1 00:00:00 UTC+0 开始到现在所经过的毫秒数。

- **getTimezoneOffset()**

  返回 UTC 与本地时区之间的时差，以分钟为单位：

  ```javascript
  // 如果你在时区 UTC-1，输出 60
  // 如果你在时区 UTC+3，输出 -180
  alert( new Date().getTimezoneOffset() );
  ```

#### 设置日期组件

下列方法可以设置日期/时间组件：

- **setFullYear(year, [month], [date])**
- **setMonth(month, [date])**
- **setDate(date)**
- **setHours(hour, [min], [sec], [ms])**
- **setMinutes(min, [sec], [ms])**
- **setSeconds(sec, [ms])**
- **setMilliseconds(ms)**
- **setTime(milliseconds)**（使用自 1970-01-01 00:00:00 UTC+0 以来的毫秒数来设置整个日期）

我们可以看到，有些方法可以一次性设置多个组件，比如 `setHours`。未提及的组件不会被修改。

举个例子：

```javascript
let today = new Date();

today.setHours(0);
alert(today); // 日期依然是今天，但是小时数被改为了 0

today.setHours(0, 0, 0, 0);
alert(today); // 日期依然是今天，时间为 00:00:00。
```

#### 日期转化为数字，日期差值

当 `Date` 对象被转化为数字时，得到的是对应的时间戳，与使用 `date.getTime()` 的结果相同：

```javascript
let date = new Date();
alert(+date); // 以毫秒为单位的数值，与使用 date.getTime() 的结果相同
```

有一个重要的副作用：日期可以相减，相减的结果是以毫秒为单位时间差。

#### Date.now()

如果我们仅仅想要测量时间间隔，我们不需要 `Date` 对象。

有一个特殊的方法 `Date.now()`，它会返回当前的时间戳。

它相当于 `new Date().getTime()`，但它不会创建中间的 `Date` 对象。因此它更快，而且不会对垃圾处理造成额外的压力。

这种方法很多时候因为方便，又或是因性能方面的考虑而被采用，例如使用 JavaScript 编写游戏或其他的特殊应用场景。

因此这样做可能会更好：

```javascript
let start = Date.now(); // 从 1 Jan 1970 至今的时间戳

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = Date.now(); // 完成

alert( `The loop took ${end - start} ms` ); // 相减的是时间戳，而不是日期
```

#### Date.parse(str)

**Date.parse(str)**方法可以从一个**字符串**中读取日期。

字符串的格式应该为：`YYYY-MM-DDTHH:mm:ss.sssZ`，其中：

- `YYYY-MM-DD` —— 日期：年-月-日。
- 字符 `"T"` 是一个分隔符。
- `HH:mm:ss.sss` —— 时间：小时，分钟，秒，毫秒。
- 可选字符 `'Z'` 为 `+-hh:mm` 格式的时区。单个字符 `Z` 代表 UTC+0 时区。

简短形式也是可以的，比如 `YYYY-MM-DD` 或 `YYYY-MM`，甚至可以是 `YYYY`。

`Date.parse(str)` 调用会解析给定格式的字符串，并返回时间戳（自 1970-01-01 00:00:00 起所经过的毫秒数）。如果给定字符串的格式不正确，则返回 `NaN`。

举个例子：

```javascript
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (时间戳)
```

#### 总结

- 在 JavaScript 中，日期和时间使用 [Date](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象来表示。我们不能只创建日期，或者只创建时间，`Date` 对象总是同时创建两者。
- 月份从 0 开始计数（对，一月是 0）。
- 一周中的某一天 `getDay()` 同样从 0 开始计算（0 代表星期日）。
- 当设置了超出范围的组件时，`Date` 会进行自我校准。这一点对于日/月/小时的加减很有用。
- 日期可以相减，得到的是以毫秒表示的两者的差值。因为当 `Date` 被转换为数字时，`Date` 对象会被转换为时间戳。
- 使用 `Date.now()` 可以更快地获取当前时间的时间戳。

### 5.12 JSON方法,toJSON

假设我们有一个复杂的对象，我们希望将其转换为字符串，以通过网络发送，或者只是为了在日志中输出它。

#### JSON.stringify

JSON（JavaScript Object Notation）是表示值和对象的通用格式。在 [RFC 4627](http://tools.ietf.org/html/rfc4627) 标准中有对其的描述。最初它是为 JavaScript 而创建的，但许多其他编程语言也有用于处理它的库。因此，当客户端使用 JavaScript 而服务器端是使用 Ruby/PHP/Java 等语言编写的时，使用 JSON 可以很容易地进行数据交换。

JavaScript 提供了如下方法：

- `JSON.stringify` 将对象转换为 JSON。
- `JSON.parse` 将 JSON 转换回对象。

方法 `JSON.stringify(student)` 接收对象并将其转换为字符串。

得到的 `json` 字符串是一个被称为 **JSON 编码（JSON-encoded）** 或 **序列化（serialized）** 或 **字符串化（stringified）** 或 **编组化（marshalled）** 的对象。我们现在已经准备好通过有线发送它或将其放入普通数据存储。

请注意，JSON 编码的对象与对象字面量有几个重要的区别：

- 字符串使用**双引号**。JSON 中没有单引号或反引号。所以 `'John'` 被转换为 `"John"`。
- 对象**属性名称**也是**双引号**的。这是强制性的。所以 `age:30` 被转换成 `"age":30`。

`JSON.stringify` 也可以应用于**原始（primitive）数据类型**。

JSON 支持以下数据类型：

- Objects `{ ... }`
- Arrays `[ ... ]`
- Primitives：
  - strings，
  - numbers，
  - boolean values `true/false`，
  - `null`。

JSON 是语言无关的纯数据规范，因此一些特定于 JavaScript 的对象属性会被 `JSON.stringify` 跳过。

即：

- 函数属性（方法）。
- Symbol 类型的属性。
- 存储 `undefined` 的属性。

#### 排除和转换：replacer

`JSON.stringify` 的完整语法是：

```javascript
let json = JSON.stringify(value[, replacer, space])
```

- value

  要编码的值。

- replacer

  要编码的属性数组或映射函数 `function(key, value)`。

- space

  用于格式化的空格数量

大部分情况，`JSON.stringify` 仅与第一个参数一起使用。但是，如果我们需要微调替换过程，比如过滤掉循环引用，我们可以使用 `JSON.stringify` 的第二个参数。

#### 格式化：space

`JSON.stringify(value, replacer, spaces)` 的第三个参数是用于优化格式的空格数量。

以前，所有字符串化的对象都没有缩进和额外的空格。如果我们想通过网络发送一个对象，那就没什么问题。`space` 参数专门用于调整出更美观的输出。

这里的 `space = 2` 告诉 JavaScript 在多行中显示嵌套的对象，对象内部缩紧 2 个空格：

```javascript
let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};

alert(JSON.stringify(user, null, 2));
/* 两个空格的缩进：
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* 对于 JSON.stringify(user, null, 4) 的结果会有更多缩进：
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/
```

`spaces` 参数仅用于日志记录和美化输出。

#### 自定义 “toJSON”

像 `toString` 进行字符串转换，对象也可以提供 `toJSON` 方法来进行 JSON 转换。如果可用，`JSON.stringify` 会自动调用它。

现在让我们为对象 `room` 添加一个自定义的 `toJSON`：

```javascript
let room = {
  number: 23,
  toJSON() {
    return this.number;
  }
};

let meetup = {
  title: "Conference",
  room
};

alert( JSON.stringify(room) ); // 23

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
    "room": 23
  }
*/
```

正如我们所看到的，`toJSON` 既可以用于直接调用 `JSON.stringify(room)` 也可以用于当 `room` 嵌套在另一个编码对象中时。

#### JSON.parse

要解码 JSON 字符串，我们需要另一个方法 **JSON.parse**

语法：

```javascript
let value = JSON.parse(str, [reviver]);
```

- str

  要解析的 JSON 字符串。

- reviver

  可选的函数 function(key,value)，该函数将为每个 `(key, value)` 对调用，并可以对值进行转换。

例如：

```javascript
// 字符串化数组
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1
```

对于嵌套对象：

```javascript
let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

let user = JSON.parse(userData);

alert( user.friends[1] ); // 1
```

#### 总结

- JSON 是一种数据格式，具有自己的独立标准和大多数编程语言的库。
- JSON 支持 object，array，string，number，boolean 和 `null`。
- JavaScript 提供序列化（serialize）成 JSON 的方法 JSON.stringify和解析 JSON 的方法 JSON.parse
- 这两种方法都支持用于智能读/写的转换函数。
- 如果一个对象具有 `toJSON`，那么它会被 `JSON.stringify` 调用。