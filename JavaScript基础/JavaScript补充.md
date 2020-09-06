# js补充

## 闭包

开发者通常应该都知道“闭包”这个通用的编程术语。

[闭包](https://en.wikipedia.org/wiki/Closure_(computer_programming)) 是指内部函数总是可以访问其所在的外部函数中声明的变量和参数，即使在其外部函数被返回（寿命终结）了之后。在某些编程语言中，这是不可能的，或者应该以特殊的方式编写函数来实现。但是如上所述，在 JavaScript 中，所有函数都是天生闭包的（只有一个例外，将在 ["new Function" 语法](https://zh.javascript.info/new-function) 中讲到）。

也就是说：JavaScript 中的函数会自动通过隐藏的 `[[Environment]]` 属性记住创建它们的位置，所以它们都可以访问外部变量。

在面试时，前端开发者通常会被问到“**什么是闭包**？”,从三方面回答

1. 闭包的定义
2. 解释为什么JavaScript的所有函数都是闭包,词法环境
3. 可能的关于[[Environment]] 属性和词法环境原理的技术细节

- 闭包是指内部函数能访问到其所在的外部函数中的参数和变量

- 所有的JavaScript函数都是闭包的,因为函数在创建时,会有个隐藏的environment属性,该属性保存了 对创建该函数的词法环境的引用.也就是说,函数会通过environment属性记住创建它们的位置.在函数调用时,会创建一个新的词法环境,包含该函数的内部变量和参数,它的外部词法环境的引用是获取于该函数的 environment属性.因此所有的函数都可以访问到**外部变量**.所以说所有的JavaScript的函数都是闭包

  (能引用外部变量,就是闭包函数)

## this,call/apply/bind

### 参考文章

- 函数调用的方式和this的丢失:<https://www.jianshu.com/p/a3af18991e82>
  - 写的很清楚,普通函数,构造函数,方法,call/apply
- call/apply/bind的区别:<https://www.cnblogs.com/starry-skys/p/11901677.html>
  - call和apply是理解调用该函数,bind是返回一个新函数,需要额外调用
  - call携带的参数是列表,可以用spread语句,可迭代的对象
  - apply携带的参数 是类数组对象

###  函数调用以及this指向

**函数的几种调用方式以及他们的this指向**

1. 普通函数调用  内部的`this` 指向全局对象 window(浏览器是window)
2. 构造函数调用  内部的`this ` 指向新创建的对象
3. 对象的方法调用 内部的`this`指向调用的对象本身
4. 通过call 或者 apply 方式调用(函数上下文), `this` 指向的是当前的上下文对象

**普通函数的调用**

```js
// 1.普通函数的this 指向全局
function getThis(){
  console.log(this);
}
getThis() //Object [global] {..} (node环境)
```

**对象方法调用**

```js
// 2.对象方法的this
let obj = {
  name:"lily",
  sayHi(){
    console.log(this.name);
  }
}
// 2.1 调用对象里的方法
obj.sayHi(); //lily
// 2.2 将方法赋给函数,sayhello就是普通函数,这就会导致this的丢失
let sayhello = obj.sayHi;
sayhello(); //undefined(name是undefined)
```

**`this` 的丢失:**

注意,当把对象方法 赋给 一个值后,类似于函数表达式,这个时候就丢失this了,再调用,就相当于调用的是全局对象

```js
// 2.3 对象方法的使用方法
var obj = {
  foo: function () { 
    console.log(this.bar) 
  },
  bar: 1
};

var foo = obj.foo;
var bar = 2;

obj.foo() // 1
foo() // 2 (node环境下是undefined,浏览器中是2)
```



**构造函数调用**

```js
// 3.构造函数的this
function GetThis(name,age){
  this.name = name;
  this.age = age
  console.log("构造函数",this); 
}

let newGetThis = new GetThis('lily',13);
console.log(newGetThis);//GetThis { name: 'lily', age: 13 }
let test1= new GetThis('Ming',11);
console.log(test1);//GetThis { name: 'Ming', age: 11 }

/**这是构造函数的打印结果
 * 每个对象的构造函数在new的时候就把this指向了新对象 
构造函数 GetThis { name: 'lily', age: 13 }
GetThis { name: 'lily', age: 13 }
构造函数 GetThis { name: 'Ming', age: 11 }
GetThis { name: 'Ming', age: 11 }
*/
```

**call/apply/bind**

```js
// 1 普通函数 call 上下文环境
function testThis(){
  console.log(this.name);
}
let user = {
  name:"lily"
}
testThis.call(user);//lily

// 2.普通函数 bind 绑定环境
function testThis(){
  console.log(this.name);
}
let user = {
  name:"lily"
}
let newFunc = testThis.bind(user);//返回的是一个新函数
newFunc();//lily
```

### this的指向

在函数执行时，this 总是指向调用该函数的对象。要判断 this 的指向，其实就是判断 this 所在的函数属于谁。

遇到this,一定要记得这句: **函数执行时,this总是指向调用该函数的对象** (即: 判断this所在的函数属于谁)

1. 函数有所属对象,则指向所属对象 . 就是对象中的方法
2. 函数没有所属对象,则指向全局对象(window或global). 就是 普通函数
3. 使用构造器new一个对象时,this就指向新对象. 就是构造函数
4. apply, call, bind 改变了 this 的指向

除了上述四种外,还有原型继承,箭头函数也会有this指向

箭头函数没有this,它是借用外部词法环境中的this

## 全局对象

### 参考文章

- JavaScript关于全局对象: <https://www.cnblogs.com/echo-dauntless/p/9737451.html>

### 理解全局对象

全局对象(global object)在javascript中有着重要的用途：全局对象的属性是全局定义的符号。什么意思呢？意思就是全局对象预定义了全局的属性、函数、对象、构造函数以便你开发使用。

比如说：

1.全局属性：比如undefined、Infinity以及NaN。
2.全局对象：比如Math、JSON和Number
3.全局函数：比如isNaN()、isFinite()、parseInt()和eval()等。
4.全局构造器(constructor)，也即全局类。比如Date()、RegExp()、String()、Object()和Array()等。

js运行时内置了一个Global对象

这个Global对象跟运行环境有关。在浏览器运行环境中。Global就是window对象。
在nodejs中。Global对象是global对象。

当你在浏览器环境中，直接使用一个未经定义的变量，
例如foo=123;那么foo这个变量自动声明为全局变量。变量引用自动挂载到了Global对象，即window对象上。

全局对象提供可在任何地方使用的变量和函数,在浏览器中,是window,nodejs中是global

### **全局变量**

任何函数之外声明的变量,都被称为 **全局** 变量

全局变量在任意函数都是可见的(除非被局部变量覆盖)

减少全局变量的使用是一种很好的做法,现代的代码几乎甚至没有全局变量.大多数变量存在于它们的函数中.

### 问题

- 问题一 : 函数声明的时候,创建它的词法环境是全局对象吗.
  - 要看在哪个作用域,如果是全局作用域,就是的
  - 函数声明的初始化会被立即完成,当创建了一个词法环境时,函数声明会立即变为即用型函数