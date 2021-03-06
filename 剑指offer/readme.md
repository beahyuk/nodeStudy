
# 剑指offer（JavaScript版本）

## 0. 算法题目&解析

算法解析：<https://www.cnblogs.com/wuguanglin/category/1178569.html>

LeetCode网址：<https://leetcode-cn.com/>

LeetCod剑指offer题库：https://leetcode-cn.com/problemset/lcof/

牛客网剑指offer题库：https://www.nowcoder.com/ta/coding-interviews

[20,25,26,31,33,40,46,48,51,52]

### 树结构测试

```javascript
function getNode() {
    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }
    let node = new TreeNode("3");
    let node1 = new TreeNode("9");
    let node2 = new TreeNode("20");
    let node3 = new TreeNode("15");
    let node4 = new TreeNode("7");
    node.left = node1;
    node.right = node2;
    node2.left = node3;
    node2.right = node4;
    return node;
}
let node = getNode();
let res = levelOrder(node);
console.log(res);
```

### 链表结构测试

```javascript
function getNode() {
    function ListNode(val) {
        this.val = val;
        this.next = null;
    }
    let node = new ListNode("1");
    let node1 = new ListNode("1");
    let node2 = new ListNode("2");
    node.next = node1;
    node1.next = node2;
    return node
}
// 化为string 更方面看结果
function getString(head) {
    let arr = [];
    let curr = head;
    while (curr) {
        arr.push(curr.val);
        curr = curr.next;
    }
    return arr;
}
let headTest = getNode();
let delNode = deleteDuplicates(headTest);
let res = getString(delNode);
console.log(res);
```




## 1. 数组查找
### 题目描述

在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数

### 解析

因为数组是行递增，列递增，找到数组最左下角的数a进行判断，如果大于a，就往右走，col++。如果小于a，就往上找，row--

### 代码

```javascript
let array = [
    [1, 2, 3, 4, 5],
    [11, 12, 13, 14, 15],
    [21, 22, 23, 24, 25],
    [31, 32, 33, 34, 35]
];

function find(array, target) {
    let rowlen = array.length,
        collen = array[0].length;
    let row = rowlen - 1,
        col = 0;
    if (rowlen === 0 && collen === 0) {
        return -1
    }
    while (row >= 0 && col <= collen - 1) {
        if (target > array[row][col]) {
            col++;
        } else if (target < array[row][col]) {
            row--;
        } else return [row, col, array[row][col]]
    }
    return false
}

console.log(find(array, 23))
```



### 二分法查找数据

```javascript
let array = [1,3,2,7,4]; //乱序
//递增排序，二分法只适合递增数组
array.sort((a,b)=>a-b);
let end= array.length-1,
    start = 0;
let result = fn(array,2,start,end)
console.log(result);

function fn(array,target,start,end){
    if (start>end){
        return -1
    };
    let mid = parseInt((start+end)/2);
    if(target < array[mid]){
        end = mid-1;
        return fn(array,target,start,end);
    }else if(target > array[mid]){
        start = mid+1;
        return fn(array,target,start,end);
    }else{
        return mid
    };
};

```

## 2. 替换空格（简单）

### 题目描述

请实现一个函数，将一个字符串中的空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。

### 解析

利用正则表达式 将空格转成%20

### 代码

```javascript
var replaceSpace = function(s) {
    return s.replace(/ /g, "%20");
    // \s 是匹配任何空白字符，包括空格，制表符，换页符等等
    // return s.replace(/\s/g, "%20");

};

let str = "we are happy";
console.log(replaceSpace(str))
```

## 3. 从尾到头打印链表（简单）

### 题目描述

输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

### 解析

逆序输出链表，可以利用数组的unshift方法，输出放在数组头部

然后让指针指向下一个

### 代码

```javascript
function reverPrint(head1) {
    let res = [];
    let pNode = head1;
    while (pNode !== null) {
        res.unshift(pNode.val);
        pNode = pNode.next;
    }
    return res
}
```

## 4.重建二叉树

### 题目描述

输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回

### 解析

先根据前序的第一个是根节点，然后在中序中 以根节点为中心，一分为二，再对左右分别进行递归查找

### 代码

```javascript
    /**
     * Definition for a binary tree node.
     * function TreeNode(val) {
     *     this.val = val;
     *     this.left = this.right = null;
     * }
     */
    // preorder:前序，中左右
    // inorder：中序，左中右
    /**
     * @param {number[]} preorder
     * @param {number[]} inorder
     * @return {TreeNode}
     */
    var buildTree = function(preorder, inorder) {
        if (preorder.length == 0 || inorder.length == 0) {
            return null
        }

        // 找到根位置，（0，根位置）是左边树，（根位置，末尾）是右边树
        const index = inorder.indexOf(preorder[0]);
        let left = inorder.slice(0, index),
            right = inorder.slice(index + 1);
        return {   // 根据数的结构,返回对象
            val: preorder[0],
            left: buildTree(preorder.slice(1, index + 1), left);
            right: buildTree(preorder.slice(index + 1), right)
        }
    };
```



## 5.用两个栈实现队列

### 题目描述

用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )

### 解析

栈的特性是：后入先出。根据题目提示，使用 2 个栈即可。一个栈inStack用来存储插入队列的数据，一个栈outStack用来从队列中取出数据。

算法分为入队和出队过程。

入队过程：将元素放入 inStack 中。

出队过程：

outStack 不为空：弹出元素
outStack 为空：将 inStack 元素依次弹出，放入到 outStack 中（在数据转移过程中，顺序已经从后入先出变成了先入先出）
时间复杂度是 O(N)，空间复杂度是 O(N)。

### 代码

```javascript
var CQueue = function() {
    this.instack = [];
    this.outstack = []
};

CQueue.prototype.appendTail = function(value) {
    this.instack.push(value)
};

CQueue.prototype.deleteHead = function() {
    const { instack, outstack } = this;
    if (outstack.length) {
        return outstack.pop()
    } else {
        while (!instack.length) {
            outstack.push(instack.pop())
        }
        return outstack.pop() || -1
    }
}
```

## 6.旋转数组中的最小数字

### 题目描述

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输入旋转数组的最小元素。例如，数组[3,4,5,1,2]为[1,2,3,4,5]的一个旋转，该数组的最小值为1

### 解析

**原数组递增排序，**那么该数组的所有片段都是递增排列，第一个不符合递增排列的元素就是旋转截断点，也就是最小值点，如果没有，就返回第一个元素

对数组进行遍历，因为原数组是递增的，所以如果找到比arr[0]小的，返回这个小的数，否则就返回第一个元素

### 代码

```javascript
let arr = [3, 4, 5, 1, 2];
/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function(numbers) {
    if (numbers.length === 0) return 0
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] < numbers[0]) {
            return numbers[i]
        }
    }
    return numbers[0]
}
console.log(minArray(arr))
```

## 7.斐波那契数 - 7.22

### 题目描述

斐波那契数，通常用 F(n) 表示，形成的序列称为斐波那契数列。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：F(0) = 0,   F(1) = 1
F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
给定 N，计算 F(N)。

首几个斐波那契数是：（从第二个开始是前两个数的和）

0,1,1,2,3,5,13,21,34

### 解析

由于斐波那契数，从第二个开始是前两个数的和，除了第0个和 第一个。

第一反应是用递归，但是递归算法时间复杂度大

采用动态规划，把每一个值都存储起来，最后返回最后一个值，就是F（N）

### 代码

```javascript
var fn = function(N){
    let arr = [0,1,1]; //现规定前三个数
    for(let i = 3; i <= N; i++){
        arr[i]=arr[i-1]+arr[i-2]
    };
    return arr[N]  // 返回最后一个值
}
console.log(fn(5))
```

## 8.跳台阶 - 7.23

### 题目描述

一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法

### 解析

- n=1时，有1种跳法
- n=2时，有2种跳法
- n=3时，有3种跳法
- n=4时，有5种跳法
- n=5时，有8种跳法
- ……

因为青蛙只能跳1阶或2阶台阶，假设一共有n级台阶，第一阶有两种跳法

- 第一个跳了1阶，剩下的是f（n-1）种跳法
- 第一个跳了2阶，剩下的是f（n-2）种跳法

那n级台阶一共有 f(n)=f(n-1)+f(n-2) 种跳法。类似于斐波那契数列

### 代码

```javascript
/**
 * @param {number} N
 * @return {number}
 */
var fib = function(N) {
    let arr = [0, 1,2]; // 这里和斐波那契数列不同
    for (let i = 3; i <= N; i++) {
        arr[i] = arr[i - 1] + arr[i - 2]
    }
    return arr[N];
};
console.log(fib(7))
```

## 9.变态跳台阶 - 7.24

### 题目描述

一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。

### 解析

由第八题知道，f(n) = f(n-1)+f(n-2)

这次青蛙可以一次跳上n级，则

① f(n)=f(n-1)+f(n-2)+...+f(1)

② f(n-1) = f(n-2)+f(n-3)+...+f(1)

①-②得出 f(n) = 2*f(n-1)的推导公式

### 代码

```javascript
/**
 * @param {number} N
 * @return {number}
 */
var fib = function(N) {
    let arr = [0, 1, 2]; // 这里和斐波那契数列不同
    for (let i = 3; i <= N; i++) {
        arr[i] = 2 * arr[i - 1]  //这里和第八题不一样
    }
    return arr[N];
};
console.log(fib(7))
```

## 10.矩形覆盖 - 7.25

### 题目描述

我们可以用2\*1的小矩形横着或者竖着去覆盖更大的矩形。请问用n个2\*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？

### 解析

- n=0 时，有0种方法

- n=1 时，有1种方法
- n=2 时，有2种方法
- n=3 时，有3种方法
- ……类似于斐波那契数列

当有2*n的时候，第一种是竖着排，那剩下的是f(n-1),第一种是横着排，那剩下的是f(n-2).那么一共有f(n)=f(n-1)+f(n-2)

当横着排的时候，第一行占据了两列，第二行前两列没有被排，但是排的方法其实已经被固定了，也是横着排。如果还不清楚的话，看博客园的图解

### 代码

```javascript
/**
 * @param {number} N
 * @return {number}
 */
var fib = function(N) {
    let arr = [0, 1, 2]; // 这里和斐波那契数列不同
    for (let i = 3; i <= N; i++) {
        arr[i] = arr[i - 2] + arr[i - 1]
    }
    return arr[N];
};
console.log(fib(7))
```

## 11.二进制中1的个数 - 7.26

### 题目描述

请实现一个函数，输入一个整数，输出该数二进制表示中 1 的个数。例如，把 9 表示成二进制是 1001，有 2 位是 1。因此，如果输入 9，则该函数输出 2。

### 解析

要求是输出该数二进制中1的个数，就先把整数转成二进制数，然后看有几个1

- 利用toString（2）的方法转为二进制
- 用正则表达式，str.match(/1/g),匹配出所有1的字符串的数组
- 返回的是数组的长度或者0

### 代码

````javascript
var hammingWeight = function(n){
    let str = n.toString(2).match(/1/g);
    return str?str.length:0
}
let res = hammingWeight(9);
console.log(res);
// 2
//法二：法一通不过牛客网
function NumberOf1(n)
{
    let res=0;
    while(n){
      n=n&(n-1);
      res ++
    }
    return res
} 
````

### 补充：toString()用法

**toString(base)**

方法`num.toString(base) ` 返回在给定`base`进制数字系统中`num`的字符串表示形式

举个例子：

```javascript
let num = 255;

console.log(num.toString(16));//ff
console.log(num.toString(2)); // 11111111
```

`base`的范围可以从`2`到`36`。默认情况下是10。

常见的用例如下：

- **base = 16** 用于十六进制颜色，字符编码等，数字可以是`0..9`或`A..F`
- **base = 2** 主要用于调试按位操作，数字可以是`0`或`1`
- **base = 36** 是最大进制，数字可以是`0..9`或`A..Z`。所有拉丁字母都被用于了表示数字，对于`36`进制来说，一个有趣且有用的例子是，当我们需要将一个较长的数字标识符转换成较短的时候，例如做一个短的URL。可以简单地使用基数为`36`的数字系统表示

## 12.数值的整数次方 - 7.27

### 题目描述

给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。

保证base和exponent不同时为0

### 解析

用js库自带的Math方法，Math.pow(n,power)

### 代码

```javascript
function power(base, exponent) {
    let res = Math.pow(base, exponent);
    return res;
}
let result = power(2, 2);
console.log(result)
```

### 补充：Math.pow(n,power)

**Math.pow(n,power)**

返回`n`的给定（power）次幂

```javascript
console.log(Math.pow(2,10)); // 2 的 10 次幂 = 1024
```

## 13.调整数组顺序使奇数位于偶数前面 - 7.27

### 题目描述

输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数位于数组的前半部分，所有偶数位于数组的后半部分。

```
输入：nums = [1,2,3,4]
输出：[1,3,2,4] 
// 保持相对位置不变，例如1在3之前，奇数放前面后也是1在3之前
```

### 解析

首先判断奇数是` i%2 !==0`

先定义两个数组，奇数数组和偶数数组，然后把它们拼接

对数组进行遍历，如果`i%2 !==0`则是奇数，push给奇数数组，否则给偶数数组

### 代码

```javascript
const exchange = function (nums){
    const odd = []; // 奇数数组
    const arr = []; // 偶数数组
    nums.forEach(item => {
        item%2 ? odd.push(item) : arr.push(item);
    })
    return  odd.concat(arr)
}
```

## 14.链表中倒数第k个节点 - 7.28

### 题目描述

输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。例如，一个链表有6个节点，从头节点开始，它们的值依次是1、2、3、4、5、6。这个链表的倒数第3个节点是值为4的节点。

**示例：**

```
给定一个链表: 1->2->3->4->5, 和 k = 2.

返回链表 4->5.
```

### 解析

看到要求输出倒数第k个节点，而且是链表，想办法转成 **栈** 储存的空间

- 用指针head一个一个push到定义的空栈中，这样倒数第k个节点变成正数第k个
- 如果k不为0，则栈一个个pop弹出，直到k为0，进不去循环，返回k=1的时候弹出的值

该算法无法运行，因为是链表，不知道怎么传参head 。而且head.next也不会

8.2补充：看了coderwhy老师的数据结构，知道了怎么做

8.16补充:更简单的方法,利用第三题,从尾到头打印链表

### 代码

```javascript
var getKthFromEnd = function (head,k){
    const stack =[];
    const res = [];
    // 如果head不为空，就push到栈
    while(head){
        stack.push(head);
        head = head.next;
    };
    whie(k>0){
        res = stack.pop();
        k--
    };
    return res
}

// 更简单的方法,利用第三题,从尾到头打印链表
var getKthFromEnd = function(head,k){
  let current = head;
 	let arr = [];
  while(current){
    arr.unshift(current);
    current = current.next;
  }
  return arr[k-1]
}
```

## 15.翻转链表 - 7.28

### 题目描述

定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

### 解析

不懂，终究还是不懂链表。考试的时候最讨厌反转链表了

至少需要三个指针pPre（指向前一个结点）、pCurrent（指向当前的结点，在代码中就是pHead）、pNext（指向后一个结点）。

--8.2：其实不用想的把节点移到前面，就把箭头都改方向就好了。

- 先定义一个temp指针 存current.next的节点，不然会找不到current.next节点，会丢失
- 将current.next 指向pre，若是第一个，则pre=null
- pre=current，将pre往后移一个
- current = temp 相当于 current也往后移一个

遇到链表 问题 想到画图

### 代码

```javascript
var reverseList = function(head) {
    let pre = null;
    let temp = null;
    let current = head
    while (current !== null) {
        temp = current.next;
        current.next = pre; // 完成current当前指针的反转
        pre = current;
        current = temp;
    }
    return pre
};
```

## 16.合并两个排序的链表 - 7.29 

### 题目描述

输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。

### 解析

有两种方法：

- 方法一：新建一个链表c，然后AB 分别比较，谁小放到c中，然后c.next = merge(小的next，大的) 进行递归。直到A或B为空
- 方法二：不新建链表，直接在A或B中进行比较排序

这里使用的是方法一

### 代码

```javascript
var merge = function(pHead1, pHead2) {
    let pHead3 = null;
    if (pHead1 === null) { return pHead2 };
    if (pHead2 === null) { return pHead1 };
    if (pHead1.val < pHead2.val) {
        pHead3 = pHead1;
        pHead3.next = merge(pHead1.next, pHead2);
    } else {
        pHead3 = pHead2;
        pHead3.next = merge(pHead1, pHead2.next);
    }
    return pHead3
}
```

## 17.树的子结构 - 7.29 （不懂）

### 题目描述

输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)

B是A的子结构， 即 A中有出现和B相同的结构和节点值。

**示例 1：**

```
输入：A = [1,2,3], B = [3,1]
输出：false
```

```
输入: A = [8,8,7,9,2,null,null,null,null,4,7], B=[8,9,2]
输出: true
```

### 解析

看到树想到递归，先找A中是否有B的跟节点，然后递归

设计两个函数：

isSubStructure 的职能：判断 B 是否是 A 的子结构。是，返回 true；否则，尝试 A 的左右子树
isSubTree 的职能：封装“判断 B 是否是 A 的子结构”的具体逻辑。

### 代码

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
var isSubStructure = function(A, B) {
    if (!A || !B) {
        return false
    };
    return (
        isSubTree(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)
    )
};

var isSubTree = function(pRoot1, pRoot2) {
     if (!pRoot2) {    // 一定要先判断子树的节点是否是空节点,是的话返回true
        return true    // 否则就是坑,要是先判断A的节点是否是空节点,返回true,看例2就能明白
    }
    if (!pRoot1) {
        return false
    }
   
    if (pRoot1.val !== pRoot2.val) {
        return false
    }
    return  isSubTree(pRoot1.left, pRoot2.left) && isSubTree(pRoot1.right, pRoot2.right)
    
}
```

## 18.二叉树的镜像 - 7.30

### 题目描述

请完成一个函数，输入一个二叉树，该函数输出它的镜像。

**示例 1：**

```
输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]
```

### 解析

用递归，一直到叶子节点,让叶子节点交换,返回的是



 ![树镜像](E:\前端学习\nodeStudy\剑指offer\题目+解析.assets\树镜像.png)

### 代码

```javascript
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Mirror(root) {
    // write code here
    if (!root) return false;
    Mirror(root.left);
    Mirror(root.right);
    [root.left, root.right] = [root.right, root.left]; // 左右节点交换
    return root
}
```

## 19. 顺时针打印矩阵 - 7.30

### 题目描述

输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

**示例 1：**

```
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]
```

### 解析

自己在纸上画画，先考虑外围走一圈的情况。

总结下来 还挺简单的，就是自己思考比较久，而且没考虑pop和shift方法

### 代码

```javascript
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    let newArr = [];
    let flag = true;

    while (matrix.length) {
        // 从左到右
        if (flag) {
            // 第一层
            newArr = newArr.concat(matrix.shift());
            // matrix.length-1 这里是个坑，注意
            // "现在"的第一层到最后第一层的末尾
            for (let i = 0; i < matrix.length - 1; i++) {
                matrix[i].length && newArr.push(matrix[i].pop());
            }
        } else {
            // 从右到左
            // 最后一层
            newArr = newArr.concat(matrix.pop().reverse());
            // 现在matrix.length-1 这里也是坑
            // 现在的最后一层到第一层的开端
            for (let i = matrix.length - 1; i > 0; i--) {
                matrix[i].length && newArr.push(matrix[i].shift());
            }
        }
        flag = !flag;
    }
    return newArr;
};
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
console.log(spiralOrder(matrix));
```

### 注意点：坑

一开始const = matrix.length，想方便一点定义行数，但由于原数组在不断地pop和shift 第一行和最后一行被拿出去，所以length是不断变化的，就算用let也不可以，-- 用let应该可以，说不定是代码边界没处理好。

当把第一层shift后，注意 原数组的第二行是现在的第一行，matrix.length也减一了

同理 最后一层pop后，原来的倒数第二层成为倒数第一层

自己想的思路一样，但是弹出第一层和最后一层没想到用pop和shift方法，还傻傻的用arr[0] 和a[lentg-1]

## 20. 包含min函数的栈 - 7.31

### 题目描述

定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。

### 解析

其实这个题并不难，只不过 是第一次写数据结构。

push方法，stack是直接push，minStack是要比较一下的，minStack最顶上的值和要插入的数据x对比，如果data >= x，则push（x）。这里有个坑，之前我是data > x没有等于情况，报错了

top方法，是取栈的最上面的数据。

### 代码

```javascript
var Minstack = function() {
    this.dataStack = [];
    this.minStack = []; //辅助栈
}
Minstack.prototype.push = function(x) {
    const length = this.minStack.length;
    this.dataStack.push(x);
    if (length) {
        this.minStack[length - 1] >= x && this.minStack.push(x);
    } else {
        this.minStack.push(x);
    }
}
Minstack.prototype.pop = function() {
    if (this.minStack[this.minStack.length - 1] === this.dataStack[this.dataStack.length - 1]) {
        this.minStack.pop();
    }
    this.dataStack.pop();
}
Minstack.prototype.top = function() {
    const length = this.dataStack.length;
    if (length) return this.dataStack[length - 1];
    else return null
}
Minstack.prototype.min = function() {
    const length = this.minStack.length
    if (length) return this.minStack[length - 1];
    else return null;
}
```

### 补充：stack[stack.length - 1]

JavaScript是根据数组来实现堆和栈的，在数组末端添加数据push 

调用`stack.push(data)` 和`stack[length] = data`是一样的

访问栈的最顶端，也可以像数组一样 `top = stack[length-1]`

但是由于栈是后进先出 LIFO 特点，所以数据只能在 **栈的顶端** 添加或者删除

## 21. 栈的压入、弹出序列 - 8.2

### 题目描述

输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如，序列 {1,2,3,4,5} 是某栈的压栈序列，序列 {4,5,3,2,1} 是该压栈序列对应的一个弹出序列，但 {4,3,5,1,2} 就不可能是该压栈序列的弹出序列。

```
输入：pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
输出：false
解释：1 不能在 2 之前弹出。
```

### 解析

​    辅助栈，每入栈一个，栈顶和poped对比，相等则出栈，判断最后辅助栈是否为空 

例子：[1,2,3,4,5] [4,5,3,2,1]

| 必须操作 | 临时栈    | 可选操作                    | 原因                               |
| -------- | --------- | --------------------------- | ---------------------------------- |
| push(1)  | [1]       | 不执行                      | 4 != 1                             |
| push(2)  | [1,2]     | 不执行                      | 4 !=2                              |
| push(3)  | [1,2,3]   | 不执行                      | 4 !=3                              |
| push(4)  | [1,2,3,4] | pop(4)                      | 4 == 4 5!=3                        |
| push(5)  | [1,2,3,5] | pop(5),pop(3),pop(2),pop(1) | 最后了，依次弹出临时栈中剩余的元素 |

### 代码

```javascript
/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
var validateStackSequences = function(pushed, popped) {
   const stack = [];
    let index = 0;
    // 如果出栈序列和进栈序列长度为0，返回true；长度不同，返回false
    if (pushed.length === 0 && popped.length === 0) return true
    if (pushed.length !== popped.length) return false
    for (let i = 0; i < pushed.length; i++) {
        stack.push(pushed[i])
        while (stack.length !== 0 && stack[stack.length - 1] === popped[index]) {
            stack.pop();
            index += 1;
        }
    }
    return stack.length === 0;
};
```

### 补充

由于今天和外国人吵了一架，吃了哑巴亏，心里难受，没有脑子琢磨这道算法题了

8.2：早上补了，也看懂了

## 22.从上到下打印二叉树 - 8.2 

### 题目描述

从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。

例如:
给定二叉树: [3,9,20,null,null,15,7],

```
    3
   / \
  9  20
    /  \
   15   7返回：
```

```
[3,9,20,15,7]
```

### 解析

从上到下打印二叉树,首先想到层次遍历

层次遍历需要使用一个队列来存储有用的节点,算法思路

- 将root放入队列
- 取出队首元素,将val放入返回的数组中
- 检查队首元素的子节点,若不为空,则将子节点放入队列
- 检查队列是否为空,为空,结束并返回数组;不为空,回到第二步

时间复杂度和空间复杂度是O(N)

### 代码

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var levelOrder = function(root) {
    const queue = [];
    const res = [];
    if (root === null) {
        return res;
    }

    queue.push(root);
    while (queue.length) {
        const pRoot = queue.shift();
        if (pRoot.left !== null) {
            queue.push(pRoot.left);
        }
        if (pRoot.right !== null) {
            queue.push(pRoot.right);
        }
        res.push(pRoot.val);
    }
    return res;
};
```

### 补充

又是树，还是有点晕---已解决

## 23. 二叉搜索树的后序遍历序列 -8.3

### 题目描述

输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历结果。如果是则返回 true，否则返回 false。假设输入的数组的任意两个数字都互不相同。

```
     5
    / \
   2   6
  / \
 1   3
```

```
输入: [1,3,2,6,5]
输出: true
```

```
输入: [1,6,3,2,5]
输出: false
```

### 解析

后序遍历是：左右中

二叉搜索树的特点是：左 < 中 < 右 值

根据这一特点，数组的最后一个是根节点root

然后在数组中对数组进行遍历 找到比root大的 第一个值index，从index到length-1-1 都是右子树

对右子树进行遍历，查看是否存在比root小的值，若 存在 return false

返回左右子树的遍历，左子树：postorder.slice(0, index)   右子树：postorder.slice(index, length - 1)

### 代码

```javascript
var VerifySquenceOfBST = function(sequence) {
    if (sequence.length == 0) return false;

    return sequenceVerfiy(sequence, 0, sequence.length - 1);
}

function sequenceVerfiy(sequence, start, end) {
    // 1.边界判断，若数组中只有一个，或没有，返回true
    if (start >= end) return true;
    let flag = start;
    let root = sequence[end];
    // 2. 找左右节点的分界点，比根节点大的第一个数就是右子树的开始
    while (flag <= end && sequence[flag] < root) {
        flag++;
    }
    // 3.右子树进行判断，若小于根节点返回false
    for (let i = flag; i < end; i++) {
        if (sequence[i] < root) {
            return false
        }
    }
    // 4.对左右字树分别进行判断
    let left = sequenceVerfiy(sequence, start, flag - 1);
    let right = sequenceVerfiy(sequence, flag, end - 1);
    // 5.如果都为true 返回true
    return left && right
}
```

### 补充

牛客网不通过

[4,8,6,12,16,14,10] 不通过，我返回的是true，牛客网是false

## 24. 二叉树中和为某一值的路径 - 8.10

### 题目描述

输入一棵二叉树和一个整数，打印出二叉树中节点值的和为输入整数的所有路径。从树的根节点开始往下一直到叶节点所经过的节点形成一条路径。

给定如下二叉树，以及目标和 `sum = 22`，

         			5
             / \
            4   8
           /   / \
          11  13  4
         /  \    / \
        7    2  5   1
返回
```
[
   [5,4,11,2],
   [5,8,4,5]
]
```

### 解析

看到这个题目,首先要知道是要遍历二叉树的,然后将遍历结果加起来,与 sum比较,到了叶子节点还不满足的话,回溯pop().

算法思路:

- 第一步:每次来到新节点,将节点 放入当前保存的路径
- 第二步:检查节点是否是叶节点:
  - 是:将路径list 放入到listAll里
  - 不是:继续遍历左子树和右子树

上面整个过程就是先序遍历,但在遍历的过程中,动态地维护了当前路径与总和的信息

### 代码

```javascript
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
    let list = [];
    let listAll = [];
    return findPathNode(root, sum, list, listAll);
};

function findPathNode(root, sum, list, listAll) {
    if (root) {
        let diff = sum - root.val;
        // 单个节点要做的事
        list.push(root.val);
        if (root.left == null && root.right == null && diff == 0) {
            listAll.push(Array.of(...list));
        }
        // 左右子节点递归调用
        findPathNode(root.left, diff, list, listAll);
        findPathNode(root.right, diff, list, listAll);
        list.pop(); // 回溯先序遍历一条路径结束，不符合条件时，将最后一个数弹出如5,4,4,7-->5,4,4
    }
    return listAll
}

```



## 25. 复杂链表的复制 - 8.4 (再看看)

### 题目描述

输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针指向任意一个节点），返回结果为复制后复杂链表的head。（注意，输出结果中请不要返回参数中的节点引用，否则判题程序会直接返回空）

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e1.png)

```
输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]
```

### 解析

看到特殊指针，想到 用哈希 存储

用一个哈希表表示映射关系：键是原节点，值是复制的节点。

整体算法流程是：

第一次遍历，复制每个节点和 next 指针，并且保存“原节点-复制节点”的映射关系
第二次遍历，通过哈希表获得节点对应的复制节点，更新 random 指针

### 代码

```javascript
/*function RandomListNode(x){
    this.label = x;
    this.next = null;
    this.random = null;
}*/
function RandomListNode(x) {
  this.label = x;
  this.next = null;
  this.random = null;
}
function Clone(pHead)
{
    // write code here
    if(!pHead){
        return null
    }
  
    const map = new Map();
   // 1.定义新的头结点，并且保持原节点-复制节点的映射关系
    let node = pHead;
    let  newHead = new RandomListNode(pHead.label);
    let newNode = newHead;
    map.set(node,newNode);
    
  // 2.第一次遍历：复制每个节点和next指针，并且保存“原节点-复制节点”的映射关系
    while(node.next){
        // 这里每一个都new Node 是深拷贝，单独开辟内存空间
        newNode.next = new RandomListNode(node.next.label);
        node = node.next;
        newNode=newNode.next;
        map.set(node,newNode)
    }
  
	// 3. 第二次遍历：通过哈希表获得节点对应的复制节点，更新random指针
    newNode = newHead;
    node = pHead;
    while(newNode){
        newNode.random = map.get(node.random);
        newNode = newNode.next;
        node = node.next
    }
    return newHead
}
```

## 26.  二叉搜索树与双向链表 - 8.10

### 题目描述

输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的循环双向链表。要求不能创建任何新的节点，只能调整树中节点指针的指向。

### 解析

要把树变成链表,还是有序链表,因为是二叉搜索树,所以用中序遍历

- 定义pLast,指向当前链表的最后一个
- 中序遍历:左子树遍历,当前节点的处理,右子树遍历.最后返回pLast
- phead 是靠phead=pLast 一直往左找,找到pHead.left ==null,则该节点就是头结点
- 返回头结点

### 代码

```javascript
var treeToDoublyList = function(root) {
  if(!root) return null;
  let pLast = null;
  pLast = inOrder(root,pLast);
  let phead = pLast;
  while(phead && phead.left){
    phead = phead.left;
  }
  // 形成环状
  phead.left = pLast;
  pLast.right = phead;
  return phead;
}

function inOrder(node,pLast){
  if(!node) return null;
  // 左子树遍历
  if(node.left){
    pLast = inOrder(node.left,pLast);
  }
  
  // 当前节点处理
  node.left = pLast; //先让新节点指向最后一个节点.不然就坑了
  if(pLast){
    pLast.right = node
  }
  pLast = node;
  
  // 右子树遍历
  if(node.right){
    pLast = inOrder(node.right,pLast);
  }
  return pLast;
}
```



## 27. 字符串的排列 -8.4 

### 题目描述

输入一个字符串，打印出该字符串中字符的所有排列。

你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。

```
输入：s = "abc"
输出：["abc","acb","bac","bca","cab","cba"]
```

### 解析

和24 有点像

使用回溯法，回溯法用法：<https://cloud.tencent.com/developer/article/1589839>

用一个额外数组记录元素是否被使用过了

画了流程图，要记住关键点：就是不断嵌套嵌套，不断返回上一层，然后执行上一层没做完的操作。

<img src="题目+解析.assets/字符串的排列示意图.png" alt="字符串的排列示意图" style="zoom: 67%;" />

### 代码

```javascript
/**
 * @param {string} s
 * @return {string[]}
 */
var permutation = function(s) {
    var res = new Set();
    var path = [];
    var visited = [];
    let arr = s.split('')
    dfsHelper(arr, path, res, visited);
    return Array.from(res);
};

function dfsHelper(arr, path, res, visited) {
    if (arr.length === path.length) {
        res.add(path.join(''));
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        if (visited[i]) {
            continue
        }
        visited[i] = true;
        path.push(arr[i]);
        dfsHelper(arr, path, res, visited);// arr一直不变,用来作比较,是选择列表
        path.pop();
        visited[i] = false;
    }
}
```

### 补充

回溯算法的套路：

```javascript
result = [];
function backtrack(路径，选择列表){
  if(满足条件){
    result.add(路径)；
    return result;
  }
  
  for 选择 in 选择列表:
  	做选择
    backtrack(路径，选择列表)
  	撤销选择
}
```

要理解 中间递归 的return后，会去进行上次还没执行的 撤销选择 操作

## 28. 数组中出现次数超过一半的数 - 8.5

### 题目描述

数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

示例 1:

```
输入: [1, 2, 3, 2, 2, 2, 5, 4, 2]
输出: 2
```

### 解析

看到要求查看出现的次数，应该想到新增一个对象，或者数组，存储每个数出现的次数。综合来说，对象更适合，数组没法带数，只能带次数，不方便

新增一个对象，key-value值，key是数组中的数字，value是出现的次数，然后如果数是第一次出现，让它的value值为1，` countObj[v] = 1`,第二次出现的时候，判断value是否为空，不为空就value值++

然后用let..in遍历，查看value值超过长度的一半时，返回该key值

### 代码

```javascript
function MoreThanHalfNum_Solution(numbers) {
    // write code here
    if (numbers.length == null) return 0;
    let countObj = {};
    for (let i = 0; i < numbers.length; i++) {
        let v = numbers[i];
        if (countObj[v]) {
            countObj[v]++;
        } else {
            countObj[v] = 1;
        }
    }

    for (let key in countObj) {
        if (countObj[key] > numbers.length / 2) {
            return key;
        }
    }
    return 0
}
let arr = [1, 2, 3, 2, 2, 2, 5, 4, 2];
let res = MoreThanHalfNum_Solution(arr)
console.log(res);
```

### 补充

**判断一个数组中的数字出现多少次**

也可以用该算法

## 29. 最小的K个数 - 8.5

### 题目描述

设计一个算法，找出数组中最小的k个数。以任意顺序返回这k个数均可

```
输入： arr = [1,3,5,7,2,4,6,8], k = 4
输出： [1,2,3,4]
```

### 解析

最小的k个数 说明得先给数组排序，然后输出前k个值

排序有多种，今天花了一个多小时研究快速排序都没成功。

先直接简单的sort吧。

### 代码

```javascript
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var smallestK = function(arr, k) {
       arr.sort(function(a,b){return a - b});
        if(k > arr.length){
            return []
        }else{
            return arr.splice(0,k)
        }
};
```

### 补充

改进算法，使用快速排序完成数组的排序

## 30. 连续子数组的最大和 - 8.6

### 题目描述

输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。

要求时间复杂度为O(n)。

```
输入: nums = [-2,1,-3,4,-1,2,1,-5,4]
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
```

### 解析

这种要求连续的，想到到动态规划，存储当前的max 以及 最后的sumMax

### 代码

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    if (!nums.length) return 0;
    let sum = nums[0];
    let maxSum = nums[0];
    // 因为sum和maxSum都是取第一个数，所以循环从1开始
    for (let i = 1; i < nums.length; i++) {
        let cur = nums[i]
        sum = Math.max(sum + cur, cur);
        maxSum = Math.max(sum, maxSum);
    }
    return maxSum;
};
```

### 补充

如果能输出这个序列就更好了

-已解决,通过列举 得到了规律

定义四个指针，两个指向sum，两个指向maxSum，初始四个指针都是0，因为sum和maxSum的初始也都是arr[0]

**sum** = Math.max（max+cur,cur）

- 如果sum = max+cur ,则sum的end指针往前走一步，end++
- 如果sum = cur，则sum的两个指针重新赋值，都等于i，start=end=i

**maxSum** = Math.max（max，maxSum）

- 如果maxSum = max，则 maxSum的两个指针 都等于 sum的指针，套用sum的指针
- 如果maxSum = maxSum，则不变。

```javascript
var maxSubStr = function(nums) {
    if (!nums.length) return 0;
    let sum = nums[0];
    let maxSum = nums[0];
    let start = 0,
        end = 0;
    let first = 0,
        last = 0;

    // 因为sum和maxSum都是取第一个数，所以循环从1开始
    for (let i = 1; i < nums.length; i++) {
        let cur = nums[i]
        if (sum + cur > cur) {
            sum = sum + cur
            end++
        } else {
            sum = cur
            start = i;
            end = i;
        };
        if (sum >= maxSum) {
            maxSum = sum
            first = start;
            last = end;
        }
    }
    return { maxSum: maxSum, subArr: nums.slice(first, last + 1) };
};
let arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
let res = maxSubStr(arr);
console.log(res);//{ maxSum: 6, subArr: [ 4, -1, 2, 1 ] }
```

## 31. 1~n整数中1出现的次数 - 8.6（不太懂）

### 题目描述

输入一个整数 n ，求1～n这n个整数的十进制表示中1出现的次数。

例如，输入12，1～12这些整数中包含1 的数字有1、10、11和12，1一共出现了5次。

```
输入：n = 13
输出：6
```

### 解析

因为题目描述中写到要求时间复杂度为O(n)，所以想到能否遍历输入数字的每一位来得到答案。按照这个思路进行思考，发现了每一位可能为1的个数是有一定的规律，按照规律遍历所有数位上的数，将每一位上能取到的1的个数相加，即可得到最终结果。

所发现的规律如下：
每一位上的数字有三种可能：大于1，等于1，小于1。

1.当给出的n中某一位上的数字大于1时
如果倒数第x位上的数字大于1，则该位置上的数为1的情况有(preNum+1)·(10^(x-1))种，比如n=32514,正数第2位，也就是倒数第4位的数字为2，大于1，此时该位置为1的情况有4·1000种，即(01000~01999) + (11000~11999) + (21000~21999) + (31000~31999)。再如正数第1位，也就是倒数第5位的数字为3，大于1，此时该位置上为1的情况有(0+1)·10000种,即10000~19999。
总结该规律，即当给出的n中某一位(倒数第x位)上的数字为大于1时，该位置上为1的情况有(preNum+1)·(10^(x-1))种，其中preNum为该位数字前面的所有数字组成的数字。根据此规律，倒数第三位上的数字为5，大于1，其前面的数字为32，因此该位置上为1的可能情况有(32+1)·100种。
2.当给出的n中某一位上的数字等于1时
如果倒数第x位上的数字等于1，则该位置上的数为1的情况有preNum·(10^(x-1))+postNum+1种，其中postNum为该位数字之后的所有数字所组成的数字。比如n=31567，正数第2位，也就是倒数第4位的数字为1，此时该位置为1的情况有3·1000+568种，即(01000~01999) + (11000~11999) + (21000~21999) + (31000~31567)。再比如14，第一位上的数字等于1，该位上数字为1的可能的情况有5种，即10，11，12，13，14。
3.当给出的n中某一位上的数字小于1时
如果倒数第x位上的数字小于1，则该位置上的数为1的情况有preNum·(10^(x-1))种。比如n=30567，正数第2位，也就是倒数第4位的数字为0，此时该位置为1的情况有3·1000种，即(01000~01999) + (11000~11999) + (21000~21999)。

找到上述规律，遍历数字n中每一位数字，将每个数位上的可以为1的个数相加，即可得到最终结果。

### 代码

```javascript
/**
 * @param {number} n
 * @return {number}
 */
function countDigitOne(n) {
    //处理输入数字n，将其每一位按照从高位到低位放入数组arr
    let arr = String(n).split('');
    let len = arr.length
        //初始化参数
    let sumOfOne = 0; //记录1的个数
    let preNum = 0; //记录当前处理数位的之前的数字
    let postNum = 0; //记录当前处理数位之后的数字
    //初始化postNum
    for (let i = 1; i < len; i++) {
        postNum = postNum * 10 + arr[i] * 1;
    }
    //遍历所有数位
    for (let i = 0; i < len; i++) {
        if (arr[i] > 1) { //当前数位上的数字大于1的情况
            sumOfOne = sumOfOne + (preNum + 1) * Math.pow(10, len - 1 - i);
        } else if (arr[i] == 1) { //当前数位上的数字等于1的情况
            sumOfOne = sumOfOne + preNum * Math.pow(10, len - 1 - i) + postNum + 1;
        } else { //当前数位上的数字小于1的情况
            sumOfOne = sumOfOne + preNum * Math.pow(10, len - 1 - i);
        }
        if (i < len - 1) { //更新preNum和postNum，用于下一位数字的遍历
            preNum = preNum * 10 + arr[i] * 1;
            postNum = postNum - arr[i + 1] * Math.pow(10, len - 2 - i);
        }
    }
    return sumOfOne;
}
let result = countDigitOne(13);
console.log(result);
```

### 补充

还要再缕缕思路

## 32. 把数组排成最小的数 - 8.7

### 题目描述

输入一个非负整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。

```
输入: [3,30,34,5,9]
输出: "3033459"
```

### 解析

这个题看了别人的解析后才明白

主要是定义新的排序规则，也就是把前一个数和后一个数拼接起来的数A，然后再与后一个数和前一个数拼接起来的数B比较字典序。A大放前面，否则B大放前面

解题思路：

- 用a+b 与b+a 换成字符串来比较大小排序
- 将结果数组转换成字符串
- 完成

![数组排成最小数](E:\前端学习\nodeStudy\剑指offer\题目+解析.assets\数组排成最小数.png)

### 代码

```javascript
/**
 * @param {number[]} nums
 * @return {string}
 */
var minNumber = function(nums) {
    let res = nums.sort((a, b) => ('' + a + b) - ('' + b + a)).join('')
    return res
};
let arr = [3, 32, 321];
let result = minNumber(arr);
console.log(result);//321323
```

### 补充 - sort(fn)

**sort方法使用**

arr.sort方法对数组进行 **原位（in-place）** 排序，更改元素的顺序。（原位是指 在 此数组内，而非生成一个新数组）

它还返回排序后的数组，但是返回值通常会被忽略，因为修改了`arr`本身

语法：直接使用sort(),一般来说排的不符合要求，因为它按照字典序排序，例如：

```javascript
let arr = [1,2,15];
// 该方法重新排列arr的内容
arr.sort();

console.log(arr) //1,15,2
```

因为 **这些元素默认情况下被按字符串进行排序**

就是所有元素都被转换为字符串，然后比较。对于字符串，按照词典顺序进行排序。字符编码排序

所以要使用我们自己的排序顺序，需要提供一个函数作为`arr.sort()` 的参数

用法：`arr.sort(fn)`

`arr.sort(fn)` 方法实现了通用的排序算法。内部的工作原理大多情况下胫骨快速排序算法优化的。它将遍历数组，使用提供的函数比较其元素对其重新排序，我们所需要的就是提供执行比较的函数`fn`

**比较函数可以返回任何数字**

实际上，比较函数只需要返回一个正数表示“大于”，一个负数表示“小于”。

**实现原理**

- 每一次拿出数组中的当前项和后一项，每一次这样的操作都会让传递的匿名函数执行一次，不仅执行，而且还给这个匿名函数传递了两个实参：
  - a    -> 本次拿出的当前项
  - b   ->  本次拿出的后一项
- 在匿名函数中，如果我return的结果 
  - 结果 > 0，让a和b交换位置
  - 结果<=0    a和b的位置不变

通过这个原理我们可以编写更短的函数

```javascript
// 从小到大
let arr = [1, 23, 14];
arr.sort(function(a, b) {
    return a - b;
})
console.log(arr);

// 从大到小
let arr = [1, 23, 14];
arr.sort(function(a, b) {
    return b - a;
})
console.log(arr); //[ 23, 14, 1 ]
```

箭头函数：

```javascript
arr.sort((a,b)=>  a-b);
```

**面试题**：把一个数组随机打乱

```javascript
arr.sort(function(){
  // 每一次返回一个随机创建的大于零或小于零的数即可
  return Math.round(Math.random() * (10) - 5);
})
```

- Math.round() 是四舍五入函数
- Math.random() 是生成随机数，这个数在 0-1 之间

## 33. 丑数 - 8.7(不太理解)

### 题目描述

我们把只包含质因子 2、3 和 5 的数称作丑数（Ugly Number）。求按从小到大的顺序的第 n 个丑数。

```
输入: n = 10
输出: 12
解释: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前 10 个丑数。
```

### 解析

使用动态规划

因为丑数只包含质因数2,3,5，所以对于下一个丑数来说，一定是前面某个丑数乘3，乘4,或乘5所得

准备三个指针p2，p3，p5，它们指向的数只能乘2,3和5。在循环过程中，每次选取`2*res[p2]`,`3*res[p3]`,`5*res[p5]` 这三个数中结果最小的数，并且将对应的指针向前移动。有效循环是n次，当循环结束后，res数组中就按从小到大的顺序保存了丑数

--不太理解，怎么想到 选取最小的数

### 代码

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
    let res = [];
    let p2 = 0,
        p3 = 0,
        p5 = 0;
    res[0] = 1;
    for (let i = 1; i < n; i++) {
        res[i] = Math.min(res[p2] * 2, res[p3] * 3, res[p5] * 5);
        if (res[i] === res[p2] * 2) p2++;
        if (res[i] === res[p3] * 3) p3++;
        if (res[i] === res[p5] * 5) p5++;
    }
    return res.pop()
};
```

## 34. 第一个只出现一次的字符 - 8.8

### 题目描述

在一个字符串(0<=字符串长度<=10000，全部由字母组成)中找到第一个只出现一次的字符,并返回它的位置, 如果没有则返回 -1（需要区分大小写）.（从0开始计数）

```
s = "abaccdeff"
返回 "1"

s = "" 
返回 -1
```

### 解析

这个题目有点像之前28，求数组中出现次数超过一半的数。

同理，建立一个对象，然后把每个字符出现的次数给记录下来，像这样

```shell
let str = "google"
{ g: 2, o: 2, l: 1, e: 1 }
```

- 因为题目给的是字符串，所以要用split给转成数组
- 而且最后返回的是位置，需要用`str.indexOf()` 的方法

### 代码

```javascript
function FirstNotRepeatingChar(str) {
    // write code here
    const countObj = {};
    if (str.length === 0) return -1; //-1 表示没找到。不能使用0,0也是下标之一
    const arr = str.split('');
    for (let i = 0; i < arr.length; i++) {
        let v = arr[i];
        if (countObj[v]) {
            countObj[v]++;
        } else {
            countObj[v] = 1;
        }
    }
    console.log(countObj);
    for (let key in countObj) {
        if (countObj[key] === 1) {
            let firstChar = str.indexOf(key)
            return firstChar;
        }
    }
    return -1;
}
let str = "google";
let res = FirstNotRepeatingChar(str);
console.log(res);
```

### 补充 - str.indexOf()

**查找子字符串**

在字符串中查找子字符串有很多方法

**str.indexOf(substr,pos)**  它从给定位置`pos`开始，在`str`中查找`substr`，如果没有找到，则返回`-1`，否则返回匹配成功的位置。一般来说 找到第一个满足条件的就返回，如果想找全部，用循环，详细见下面

```javascript
let str = "google";
console.log(str.indexOf("l")); // 4
console.log(str.indexOf("g")); // 0,虽然后面也出现了"g",但是优先找到返回第一个
```

可选的第二个参数允许我们从 给定的起始位置开始检索

例如`"g"` 第一次出现的是`0` 查询下一个存在位置时，我们从`1`开始检索

```javascript
let str = "google";
console.log(str.indexOf("g",1)); //3
```

如果我们要找出同一个字符的所有位置，可以在一个循环中使用`indexOf`。每一次新的调用都发生在上一次匹配位置之后

```javascript
let str ="google google";
let target = "g";
let pos =0;
let arr =[];
while(true){
  let foundPos = str.indexOf(target,pos);
  if(foundPos == -1) break; //字符串中没有该字符了，退出循环
  arr.push(foundPos);
  pos = foundPos +1; //继续从下一个位置查找
}
console.log(arr);
//[ 0, 3, 7, 10 ]

```

`str.indexOf()` 是从头到尾查找的。如果我们想要从尾到头的查找，可以使用`str.lastIndexOf()`

`str.lastIndexOf(substr,pos)` 它是从字符串的末尾开始搜索到开头

它会以相反的顺序列出这些事件

## 35. 数组中的逆序对 - 8.8

### 题目描述

在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。

```
输入: [7,5,6,4]
输出: 5
```

### 解析

首先想到是暴力搜索方法,但是超时了

看LeetCode的解析,发现用归并排序做,在每一次的归并中比较大小,顺便加逆序对数

以[7,5,6,4]来说,先分解,然后合并的时候,添加逆序对数

![归并排序](E:\前端学习\nodeStudy\剑指offer\题目+解析.assets\归并排序-1596895818772.png)

### 代码

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums) {
    let res = { count: 0 }
    mergeSort(nums, res);
    return res.count
};

function mergeSort(arr, res) {
    if (arr.length < 2) return arr;
    let len = arr.length;
    let mid = Math.floor(len / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid, len);
    return merge(mergeSort(left, res), mergeSort(right, res), res);
}

function merge(left, right, res) {
    let arrSort = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            arrSort.push(left.shift()) // 一定要记住:第二次遍历的时候,left[0]是原来第二个数和右边第一个比
        } else {
            // 归并排序唯一添加的一行代码
            // 如果是添加右边数组的元素,证明左边剩余元素都能和(右边添加的数)组成逆序对
            // 例如[3,5,7] ,[1,2] 遍历到1的时候,左边的[3,5,7]都能和1组成逆序对
            res.count += left.length;
            arrSort.push(right.shift()) // 第二次遍历的时候,右边第二个1再和3比较,则再加左边的长度
        }
    }
    // 循环结束后,left为空,则把剩余的right加入.或者 right为空,把left加入
    // console.log(arrSort);
    return arrSort.concat(left, right)
}

let arrTest = [7, 5, 6, 4];
let result = reversePairs(arrTest);
console.log(result);
```

## 36. 两个链表中的第一个公共节点 - 8.2

### 题目描述

输入两个链表，找出它们的第一个公共节点。

如下面的两个链表**：**

[<img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_statement.png" alt="img" style="zoom:50%;" />](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_statement.png)

在节点 c1 开始相交。

**示例 2：**

[<img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_example_2.png" alt="img" style="zoom:50%;" />](https://assets.leetcode.com/uploads/2018/12/13/160_example_2.png)



### 解析

看到两个不一样的链表求 共同节点，先想到使用 双指针，一起next 找第一个节点

- 遍历得到两个链表的长度，以及长度差 diff
- 将长指针 plong指向较长链表，短指针 pshort指向较短链表
- plong向前移动 diff 个距离
- plong 和 pshort同时向前移动，每次移动一个距离。若存在公共节点，那么它们一定会遇上。

### 代码

```javascript
var getIntersectionNode = function(headA, headB) {
    const lengthA = getLength(headA);
    const lengthB = getLength(headB);
    // 创建快慢指针
    let plong = null;
    let pshort = null;
    let diff = 0;
    if (lengthA > lengthB) {
        diff = lengthA - lengthB;
        plong = headA;
        pshort = headB;
    } else {
        diff = lengthB - lengthA;
        plong = headB;
        pshort = headA;
    }
    // 1.让长的指针走到 和短的一样位置
    while (diff) {
        plong = plong.next;
        diff--;
    }
    // 2.让长链表的指针和短链表指针一起走，直到遇到第一个公共节点
    while (plong) {
        if (plong === pshort) {
            return plong;
        }
        plong = plong.next;
        pshort = pshort.next
    }
    return null;
};
// 获得链表的长度
var getLength = function(head) {
    let cur = head;
    let length = 0;
    while (cur) {
        cur = cur.next;
        length += 1;
    }
    return length
}
```

### 补充

其实不太明白 为什么要先 走到 长链表 diff的位置

如果长链表和短链表从头就开始相等了呢

long = [1,2,3,4,5,6,7]  short = [1,2,3,4,5]

这种情况下 怎么办呢？

## 37. 数字在排序数组中出现的次数 - 8.10

### 题目描述

统计一个数字在排序数组中出现的次数。

```
输入: nums = [5,7,7,8,8,10], target = 8
输出: 2
```

```
输入: nums = [5,7,7,8,8,10], target = 6
输出: 0
```

### 解析

一开始想用正则来匹配出现的次数,但是相当于循环了,时间复杂度高.放弃

也不可以用哈希存储,遍历 时间复杂度高

因为**数组是有序的**,利用有序这点来查找数字就容易了.可以想到二分查找

关键的点是 找到该数字后,怎么二分查找,因为数字的次数相当于 数组

- 找到该数字的起始点start
- 找到该数字的终点end
- 最后再返回start - end +1

### 代码

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    if (!nums.length) return 0;
    let start = getStart(nums, target);
    let end = getEnd(nums, target);
    return start <= end && start != -1 ? end - start + 1 : 0;
};

function getStart(nums, target) {
    let [left, right] = [0, nums.length - 1];
    let start = -1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            start = mid;
            right = mid - 1; // 向左二分查找
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return start
}

function getEnd(nums, target) {
    let [left, right] = [0, nums.length - 1];
    let end = -1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            end = mid;
            left = mid + 1; //向右二分查找
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return end;
}

let arr = [1, 2, 3, 3, 3, 3, 4, 5]
let target = 3;
let res = search(arr, target);
console.log(res);
```

### 补充 - 正则变量

```javascript
let v = "bl";
// 使用正则构造函数 来添加变量
let reg = new RegExp("^\\d+"+v+"$","g"); // reg为 /^\d+bl$/g
```

```javascript
function isMatch(s,p){
  p = '^'+p+'$';
  var re = new RegExp(p);
  return re.test(s);
}
```



## 38. 二叉树的深度 - 8.10

### 题目描述

输入一棵二叉树的根节点，求该树的深度。从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度。

### 解析

求树的深度, 比较左右子树哪个深,最后加上自己的深度

求左右子树的深度,用递归

一开始没理解叶子节点返回的数是多少.--已理解,叶子节点左遍历返回的是0,右遍历返回的是0.最后返回的是0+1=1;

### 代码

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if(!root) return 0;
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    return Math.max(leftDepth,rightDepth)+1;
};
```

## 39. 平衡二叉树 - 8.10

### 题目描述

输入一棵二叉树，判断该二叉树是否是平衡二叉树。

### 解析

正常想法是,跟上一题一样,求出左右子树高度后,比较高度差,高度差<1就是平衡二叉树,否则false

但是每一次都要进行比较,从下比较,下面如果不满足条件的,就没必要再去上面比较

**改进方法**:可以在比高度差的时候,如果高度差>1 就返回-1,否则返回树的高度

并且当左子树高度为-1时,就没必要去求右子树的高度了,直接return,一路返回到最上层了

### 代码

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    return treeDepth(root) !== -1;
};
function treeDepth(root){
    if(!root) return 0;
    const leftDepth = treeDepth(root.left);
    if(leftDepth == -1) return -1;
    const rightDepth = treeDepth(root.right);
    if(rightDepth == -1) return -1;
    return Math.abs(leftDepth-rightDepth)>1 ? -1:Math.max(leftDepth,rightDepth)+1
}

```

## 40. 数组中只出现一次的数字 - 8.11(不太懂)

### 题目描述

一个整型数组 nums 里除两个数字之外，其他数字都出现了两次。请写程序找出这两个只出现一次的数字。要求时间复杂度是O(n)，空间复杂度是O(1)。

```
输入：nums = [4,1,4,6]
输出：[1,6] 或 [6,1]
```

### 解析

看到只出现一次的数字,想到用哈希存储,但是这个方法空间复杂度为O(n),不符合题目要求

使用位运算符,下面补充几个位运算符的基础

这题的主要思路:把数字分为两组,每组都包含一个只出现一次的数字

如何分为两组?

因为两个数字是不相等的,所以二者的 二进制至少有一位不同 (记为 不同位) ,根据这个不同位,可以将数组分成两类:

- 这个不同位上是1
- 这个不同位上是0

这样就可以分为两组.

这里是通过相反数 进行 **与运算**来获取最低位的1,通过这个1将数组分为两组

这里使用mask记录了两个**只出现一次的数字**的**异或结果,**因此只需要对其中一组进行 与diff 的 **与运算**,可获得其中一位只出现一次的数,记为**num1**.再通过mask ^ num1,可获得第二个只出现一次的数字,记为num2

### 代码

```javascript
var singleNumbers = function(nums){
  // 定义一个mask,表示两个只出现一次的数字的异或
  // 因为出现了两次的数字的异或为0,也就不会被记录在mask中
  let mask = 0;
  for(let num of nums){
    mask ^=num;
  }
  // 获取到mask后,此时的任务就是找到其中只出现一次的数字,记为num1
  // 将mask 与 num1 进行异或计算,就能获得num2
  
  // 异或结果的某一位是1,表示当前位的运算数字一个是1,一个是0
  // 即找到了不同的一位,进行分组
  // 获取最低位的1 记为diff
  let diff = mask & -mask;
  let num1 = 0;
  for(let num of nums){
    // 若num和diff的 与运算结果为1,则说明这些num是一组的
    // 与此同时,与运算结果为0,表示另外一组
    // 原因是:异或为1,表示运算数是分别是 0/1
    if(num & diff){
      num1 ^= num
    }
  }
  let num2 = mask ^ num1;
  return [num1,num2]
}
```

### 补充 -位运算符

| 运算符 | 表示       | 规则                                                         |
| ------ | ---------- | ------------------------------------------------------------ |
| ^      | 异或       | 1. 任何数和本身异或 为0 <br/>2. 任何数和0 异或为本身<br>3. 异或满足交换律 |
| &      | 按位与运算 | 每一位为1 返回1,否则0<br>例如 2 & 1 -> 0010 & 0001 = 0000 -> 2&1 =0 |
| \|     | 按位或运算 | 每一位只要有1,就返回1,否则0<br>例如 2&1 -> 0010 \| 0001 = 0011 -> 2\|1 =3 |
| ~      | 取反       | 每个位上都取反<br>例如 ~2  0010 -> 1101  2 ->13              |
| <<     | 左移       | 将该二进制数右边添加 几个0.<br>例如2<<1,0010右边添加1个0,变成:0000 0100 ,变成4了<br>左移一位的结果是原值乘2,左移两位的结果是原值乘4 |
| \>>    | 右移       | 和左移一样,只不过是在左边加0<br>右移一位的结果是原值除2,右移两位的结果是原值除4.<br>注意除了后是没有小数位的,都是取整 |

## 41. 和为S的连续正数序列 - 8.11

### 题目描述

输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。

序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。

```
输入：target = 9
输出：[[2,3,4],[4,5]]
```

### 解析

注意题目要求是正整数 而且还是连续的正整数序列.

使用滑动窗口法

- 滑动窗口,左开右闭区间
- 滑动窗口最重要的性质:窗口的左边界和右边界只能向右移动

根据LeetCode解题答案中,能发现 数组的最后一个数

如果target是偶数,则lastnumber= target/2

如果target是奇数,则lastnumber = Math.ceil(target/2)  向上填充

知道了数组是从[1 ,2,...lastnumber]后 ,可以进行窗口滑动了

- 如果sum>target,就把 temp数组的第一个删掉,并且sum-temp[0]
- 如果等于,就把temp push到res数组中

### 代码

```javascript
/**
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function(target) {
    let temp = [];
    let resArr = [];
    let sum = 0;
    let lastNumber = target % 2 == 0 ? target / 2 : Math.floor(target / 2) + 1;
    for (let i = 1; i <= lastNumber; i++) {
        temp.push(i);
        sum += i;
        while (sum > target) {
            sum -= temp[0];
            temp.shift();
        }
        if (sum === target) {
            temp.length >= 2 && resArr.push([...temp]);
        }
    }
    return resArr
}
let targetTest = 9;
let res = findContinuousSequence(targetTest);
console.log(res);
```

## 42. 和为S的字符串 - 8.12

### 题目描述

输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得它们的和正好是s。如果有多对数字的和等于s，则输出两个数的乘积最小的。

```
输入：nums = [2,7,11,15], target = 9
输出：[2,7] 
```

### 解析

递增排序的数组求和,可以使用双指针,一头一尾相加,如果大于target,头指针往前走++,如果小于target,尾指针--,直到等于target,把结果push到res数组中

输出乘积最小的一对,可以是最先得到的数组

**相距最远，乘积最小。**

**![和为s的数组](E:\前端学习\nodeStudy\剑指offer\题目+解析.assets\和为s的数组.png)**

### 代码

```javascript
/* * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let start = 0;
    let end = nums.length - 1;
    let res = [];
    while (start < end) {
        let sum = nums[start] + nums[end];
        if (sum > target) {
            end--;
        } else if (sum < target) {
            start++;
        } else {
            res.push(nums[start], nums[end])
            break;
        }
    }
    return res
};
let arr = [2, 3, 11, 15];
let targetTest = 9;
let res = twoSum(arr, targetTest);
console.log(res);
```

## 43. 左旋转字符串 - 8.12

### 题目描述

字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。

```
输入: s = "abcdefg", k = 2
输出: "cdefgab"
```

### 解析

很简单,就是用slice方法,把前面的截取然后加到后面就行了

字符串也有slice方法.用法和数组的slice相似

### 代码

```javascript
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function(s, n) {
    if (s == null || s.length == 0) return '';
    return s.slice(n) + s.slice(0, n)
};
let str = "abcdefg";
let n = 2;
let res = reverseLeftWords(str, n);
console.log(res);
```

## 44. 单词翻转序列 - 8.12

### 题目描述

牛客最近来了一个新员工Fish，每天早晨总是会拿着一本英文杂志，写些句子在本子上。同事Cat对Fish写的内容颇感兴趣，有一天他向Fish借来翻看，但却读不懂它的意思。例如，“student. a am I”。后来才意识到，这家伙原来把句子单词的顺序翻转了，正确的句子应该是“I am a student.”。Cat对一一的翻转这些单词顺序可不在行，你能帮助他么？

### 解析

字符串先转成数组,再反转,再数组转成字符串

这中间有注意的点:split是以空格为分隔.join是以空格为连接.中间都有空格的.

### 代码

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    return s.split(' ').reverse().join(' ')
};
let str = "student. a am I";
let res = reverseWords(str);
console.log(res);
```

## 45. 扑克牌顺子 - 8.12

### 题目描述

从扑克牌中随机抽5张牌，判断是不是一个顺子，即这5张牌是不是连续的。2～10为数字本身，A为1，J为11，Q为12，K为13，而大、小王为 0 ，可以看成任意数字。A 不能视为 14。

```
输入: [0,0,1,2,5]
输出: True
```

### 解析

判断一个数组是不是连续数组,根据连续数组前后相差1的特性和 0 是万能特性 来做

因为是抽5张牌,所以像[2,3,4,5,6] 一头一尾相减为4 

最后比较 0的个数 和 相差数 如果0 的个数>= 相差数,返回true,0来弥补空缺的数,否则返回false

### 代码

```javascript
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isStraight = function(nums) {
    if (nums.length == 0 || nums.length > 5) return false;
    let zeroNum = 0,
        diff = 0;
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] == 0) {
            zeroNum++;
        } else {
            if (nums[i] == nums[i + 1]) {
                return false;
            } else {
                diff += nums[i + 1] - nums[i] - 1; // 查看中间差几个数
            }
        }
    }
    return diff <= zeroNum ? true : false;
};
let arr = [9, 10, 4, 0, 9];
let res = isStraight(arr);
console.log(res); // false
```

## 46. 孩子们的游戏 - 8.13 (不懂)

### 题目描述

每年六一儿童节,牛客都会准备一些小礼物去看望孤儿院的小朋友,今年亦是如此。HF作为牛客的资深元老,自然也准备了一些小游戏。其中,有个游戏是这样的:首先,让小朋友们围成一个大圈。然后,他随机指定一个数m,让编号为0的小朋友开始报数。每次喊到m-1的那个小朋友要出列唱首歌,然后可以在礼品箱中任意的挑选礼物,并且不再回到圈中,**从他的下一个小朋友开始,继续0...m-1报数**....这样下去....直到剩下最后一个小朋友,可以不用表演,并且拿到牛客名贵的“名侦探柯南”典藏版(名额有限哦!!^_^)。请你试着想下,哪个小朋友会得到这份礼品呢？(注：小朋友的编号是从0到n-1)

如果没有小朋友，请返回-1

例如，0、1、2、3、4这5个数字组成一个圆圈，从数字0开始每次删除第3个数字，则删除的前4个数字依次是2、0、4、1，因此最后剩下的数字是3。

```
输入: n = 5, m = 3
输出: 3
```

### 解析

LeetCode里叫圈圈中最后一个数字

这个题目注意 删掉第m-1数后,继续从第m个报数

根据解析,有两个方法,一是数组,二是约瑟夫环

两个都没看懂,第一个是不理解怎么想到 `delIndex = (delIndex+k)%child.length`删除下标的

第二个是完全不理解

### 代码

```javascript
/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var lastRemaining = function(n, m) {
    if (n == 0 || m == 0) return -1;
    let child = [];
    let delIndex = 0;
    for (let i = 0; i < n; i++) {
        child[i] = i;
    }
    while (child.length > 1) {
        const k = m - 1;
        delIndex = (delIndex + k) % child.length; //这一步 点睛之笔
        child.splice(delIndex, 1);
    }
    return child[0];
};
let num = 5,
    target = 3;
let res = lastRemaining(num, target);
console.log(res);
```

## 47. 求1+2+3+...+n - 8-13

### 题目描述

求 `1+2+...+n` ，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。

### 解析

看到累加,想到数组的`reduce`方法 `arr.reduce((sum,current)=>sum+current,0)`

但是看到解析后,可以用递归做,用&& 逻辑短语句做终止语句

### 代码

```javascript
var sumNums = function(n) {
    return n > 1 ? n && sumNums(n - 1) + n : 1
};
let num = 3;
let res = sumNums(num);
console.log(res);
```

## 48. 不用加减乘除做加法 - 8.13 (不懂)

### 题目描述

写一个函数，求两个整数之和，要求在函数体内不得使用 “+”、“-”、“*”、“/” 四则运算符号。

```
输入: a = 1, b = 1
输出: 2
```

### 解析

不用加号,关于数学计算,用位运算

看代码推算出来的,可是想不通怎么会想到 用这种位运算来递归

### 代码

```javascript
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var add = function(a, b) {
    if (a == 0) return b;
    if (b == 0) return a;
    return add((a ^ b), (a & b) << 1);//左移1= 乘以2
};
let a = 2,
    b = 2;
let res = add(a, b);
console.log(res);
```



## 49. 把字符串转换成整数 - 8.13

### 题目描述

将一个字符串转换成一个整数，要求不能使用字符串转换整数的库函数。 数值为0或者字符串不是一个合法的数值则返回0

输入描述:

​	输入一个字符串,包括数字字母符号,可以为空

输出描述:

​	如果是合法的数值表达则返回该数字，否则返回0

### 解析

题目看不懂 的话,可以看LeetCode上的,详细的解释了题目.就是把字符串转成整数,但不能用库

使用正则,下面是规则

- `^` 匹配输入字符串的开始位置,除非在方括号表达式中使用

  当该符号在方括号表达式中使用时,表示不接受该方括号表达式中的字符集合

  要匹配`^`字符本身,请使用转义`\^`

- `?` 匹配前面的子表达式零次或一次,或指明一个非贪婪限定符,要匹配`?`字符,请使用`\?`

- `|` 指明两项之间的一个选择

- `+` 匹配前面的子表达式 一次或多次 ,要匹配 `+` 字符,请使用`\+`

### 代码

```javascript
var strToInt = function(str) {
    let res = str.match(/^\s*[+-]?\d+/);
    if (!res) return 0;

    res = str.match(/^\s*[+-]?\d+/)[0].trim();
    if (res >= Math.pow(2, 31)) {
        return Math.pow(2, 31) - 1;
    } else if (res <= Math.pow(-2, 31)) {
        return Math.pow(-2, 31);
    } else {
        return res;
    }
}
let s = "-91283472332";
let res = strToInt(s);
console.log(res);
```

### 补充 - 正则

| 字符 | 描述                                         |
| ---- | -------------------------------------------- |
| \s   | 匹配任何空白字符,包括空格,制表符,换页符等等  |
| \d   | 匹配一个数字字符,等价于[0-9]                 |
| \D   | 匹配一个非数字字符,等价于\[^ 0-9]            |
| \w   | 匹配字母,数字,下划线.等价于'[A-Za-z0-9]'     |
| \W   | 匹配非字母,数字,下划线.等价于'\[^A-Za-z0-9]' |

| 特殊字符 | 描述                                                        |
| -------- | ----------------------------------------------------------- |
| *        | 匹配前面的子表达式零次或多次                                |
| ?        | 匹配前面的子表达式零次或一次,或指明一个非贪婪限定符         |
| +        | 匹配前面的子表达式一次或多次                                |
| ^        | 匹配输入字符串的开始位置                                    |
| $        | 匹配输入字符串的结尾位置                                    |
| \|       | 指明两项之间的一个选择.                                     |
| ()       | 标记一个子表达式的开始和结束位置.子表达式可以获取供以后使用 |

| 限定符 | 描述                                               |
| ------ | -------------------------------------------------- |
| {n}    | n是一个非负整数.匹配确定的n次                      |
| {n,}   | n是一个非负整数.至少匹配n次                        |
| {n,m}  | m和n都是非负整数,其中n<=m,最少匹配n次且最多匹配m次 |

## 50. 数组中重复的数字 - 8.14

### 题目描述

在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

```
输入：
[2, 3, 1, 0, 2, 5, 3]
输出：2 或 3 
```

### 解析

第一反应用哈希存储,出现数字次数的就用哈希存储.但是这题要简单点,不用哈希.浪费额外空间

用set集合的特性,忽略重复元素,遍历数组中元素,若长度未增加,则输出当前元素

### 代码

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
    let s = new Set();
    for (let num of nums) {
        let curLen = s.size;
        s.add(num);
        if (s.size == curLen) {
            return num
        }
    }
};
let arr = [2, 3, 1, 0, 2, 5, 3];
let res = findRepeatNumber(arr);
console.log(res);
```

## 51. 构建乘积数组 - 8.14

### 题目描述

给定一个数组 A[0,1,…,n-1]，请构建一个数组 B[0,1,…,n-1]，其中 B 中的元素 B[i]=A[0]×A[1]×…×A[i-1]×A[i+1]×…×A[n-1]。不能使用除法。

```
输入: [1,2,3,4,5]
输出: [120,60,40,30,24]
```

### 解析

数组B是 数组A index的累乘但不乘A[i]

所以可以用两个循环,左边乘然后右边乘

### 代码

```javascript
/**
 * @param {number[]} a
 * @return {number[]}
 */
var constructArr = function(a) {
    // 先乘这个数的左边,再乘这个数的右边,最后相乘,避免当前数
    let b = [];
    let len = a.length;
    // p代表前i个a[i]的乘积
    for (let i = 0, p = 1; i < len; i++) {
        b[i] = p;
        p *= a[i];
    }
    // p代表后i个a[i]的乘积
    for (let i = len - 1, p = 1; i >= 0; i--) {
        b[i] *= p;
        p *= a[i];
    }
    return b
};
let arr = [1, 2, 3, 4, 5];
let res = constructArr(arr);
console.log(res);
```

## 52. 正则表达式匹配 - 8.15 (困难,过):man_playing_handball: 

### 题目描述

请实现一个函数用来匹配包含'. '和'*'的正则表达式。模式中的字符'.'表示任意一个字符，而'*'表示它前面的字符可以出现任意次（含0次）。在本题中，匹配是指字符串的所有字符匹配整个模式。例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但与"aa.a"和"ab*a"均不匹配。

### 解析

LeetCode和牛客标注困难模式.先过. 这是第一个困难模式的题目	

字母 + 星号的组合在匹配的过程中，本质上只会有两种情况：

1. 匹配 ss 末尾的一个字符，将该字符扔掉，而该组合还可以继续进行匹配；

2. 不匹配字符，将该组合扔掉，不再进行匹配。

   对应的状态转移方程为：match->true
   dp\[i][j] = dp\[i][j] || dp\[i-1][j];
   dp\[i][j] = dp\[i-1][j-1];

### 代码

```javascript
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    let m = s.length;
    let n = p.length;
    let dp = Array.from({length: m+1},x=>new Array(n+1).fill(false));
    dp[0][0] = true;
    for(let i = 0; i <= m;i++) {
        for(let j = 1; j <= n; j++) {
            if(p[j-1] === "*") {
                dp[i][j] = dp[i][j-2];
                if(match(s,p,i,j-1)) {
                    dp[i][j] = dp[i][j] || dp[i-1][j];
                }
            } else {
                if(match(s,p,i,j)) {
                    dp[i][j] = dp[i-1][j-1];
                }
            }
        }
    }
    return dp[m][n];
};
const match = (s,p,i,j)=> {
    if(i === 0) return false;
    if(p[j-1] === '.') return true;
    return s[i-1] === p[j-1];
}

```

## 53. 表示数值的字符串 - 8.15

### 题目描述

请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。例如，字符串"+100"、"5e2"、"-123"、"3.1416"、"-1E-16"、"0123"都表示数值，但"12e"、"1a3.14"、"1.2.3"、"+-5"及"12e+5.4"都不是。

### 解析

看到字符串,想到正则

`+` 一次或多次 ,不可缺少 `*` 零次或多次 `?` 零次或一次

第二个方法是用`isNaN `判断是否是数值.不是数值返回true,是数值返回false

### 代码

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function(s) {
    let result = s.match(/\s*[+-]?((\d+(\.\d*)?)|\.\d+)([eE][+-]?\d+)?\s*/g);
    return result[0] === s
};
var isNumber = function(s) {
    s = s.trim();
    if (!s) return false;
    return !isNaN(s)
}
let str = "+100 5e2 -123 3.12 -1E-16 0123";
let str1 = "0 12e 1a3.14 1.2.2 +-4 12e+5.2"
let arr = str1.split(' ');
for (let i = 0; i < arr.length; i++) {
    let res = isNumber(arr[i]);
    console.log(res);
}
```

## 54 .字符流中第一个不重复的数字 - 8.16 (34题比较)

### 题目描述

请实现一个函数用来找出字符流中第一个只出现一次的字符。例如，当从字符流中只读出前两个字符"go"时，第一个只出现一次的字符是"g"。当从该字符流中读出前六个字符“google"时，第一个只出现一次的字符是"l"。

### 解析

简单,用两种方式

- 哈希存储,返回countObj(key) ==1 的值,跟上面题目相似
- 利用indexOf和lastIndexOf 得到不重复的值

总感觉不对,这题和34题太像了.

### 代码

```javascript
/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function(s) {
    if (!s) return " "
    let arr = s.split('');
    let res = arr.filter((v, index, arr) => arr.indexOf(v) === arr.lastIndexOf(v))[0]
    return res ? res : " "
};
let str = 'abaccdeff';
let res = firstUniqChar(str);
console.log(res); //b
```



## 55. 链表中环的入口节点 - 8.3

### 题目描述

给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出null。

### 解析

1. 判断链表中是否有环，使用快慢指针，如果有环的话，则快指针一定会追上慢指针,快指针一定等于慢指针

   ```javascript
      let pSlow = pSlow.next;
     let  pFast = pFast.next.next;
   ```

2. 找到连接点

   有定理：碰撞点p到连接点的距离=头节点到连接点的距离，因此，分别从碰撞点、头节点相同速度开始走，相遇的那个点就是连接点。

画图一步一步做，就能清楚看到这个定理是真的

记得刚开始的fast 和slow 都是**指向head**

判定条件是 fast !==  null && fast.next !==null，否则会出现越界错误

### 代码

```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function EntryNodeOfLoop(pHead)
{
    // write code here
  let pFast= pHead;
  let pSlow = pHead;
  while(pFast !==null&&pFast.next!==null){
      pSlow = pSlow.next;
      pFast = pFast.next.next;
      if(pFast === pSlow){
        let p = pHead;
        while(p!==pSlow){
          p = p.next;
          pSlow = pSlow.next;
        }
        return p
      }
    }
    return null   
}
```

## 56 .删除链表中重复的节点 - 8.16

### 题目描述

给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

### 解析

简单,画图就可以知道

<img src="E:\前端学习\nodeStudy\剑指offer\题目+解析.assets\删除链表重复节点.png" alt="删除链表重复节点" style="zoom: 80%;" />

### 代码

```javascript
var deleteDuplicates = function(head) {
    let current = head;
    let temp = current.next;
    while (temp && current) {
        if (temp.val == current.val) {
            current.next = temp.next;
            temp = temp.next;
        } else {
            current = temp;
            temp = current.next;
        }
    }
    return head;
};
```

## 57. 二叉树的下一个节点 - 8.16

### 题目描述

给定一个二叉树和其中的一个结点，请找出中序遍历顺序的下一个结点并且返回。注意，树中的结点不仅包含左右子结点，同时包含指向父结点的指针。

### 解析

LeetCode没有找到这个题目

方法一:暴力寻找,先中序遍历 得到数组,然后比较节点的值,输出它的next

方法二: 给节点分类,然后根据不同情况返回下一个值

1.如果一个节点**有右子树**,那么它的下一个节点就是它的右子树的最左子节点.[2 3 6]

2.如果**没有右子树**,分为两种情况

 \- 如果节点是它父节点的**左子节点**,那么下一个节点就是它的父节点,类似[1]

 \- 如果一个节点**既没有右子树**,并且它还是父节点的**右子节点**,那么需要沿着父节点

 的指针一直往上遍历,知道找到一个是它父节点的左子节点的节点,类似\[4][5]

<img src="E:\前端学习\nodeStudy\剑指offer\题目+解析.assets\二叉树的下一个节点-1597582808653.png" alt="二叉树的下一个节点" style="zoom: 67%;" />

### 代码

```javascript
/*function TreeLinkNode(x){
    this.val = x;
    this.left = null;
    this.right = null;
    this.next = null;
}*/
function GetNext(pNode) {
    // write code here
    if (!pNode) return null;

    // 第一种:有右子节点
    if (pNode.right) {
        pNode = pNode.right;
        while (pNode.left) { // 如果右孩子有左节点,就一直找到最左节点
            pNode = pNode.left;
        }
        return pNode;
    }

    // 第二种:没有右子节点
    while (pNode.next) {
        if (pNode == pNode.next.right) { //如果是父节点的左节点,下一个节点是父节点
            return pNode.next;
        }
        pNode = pNode.next; // 否则一直往上找,直到父是左节点
    }

    // 第三种: 尾节点
    return null
}
```



## 58. 对称的二叉树 - 8.16

### 题目描述

请实现一个函数，用来判断一颗二叉树是不是对称的。注意，如果一个二叉树同此二叉树的镜像是同样的，定义其为对称的。

### 解析

看是不是对称,主要看镜像是否相同

```js
return root1.val == root2.val && getMirror(root1.left, root2.right) && getMirror(root1.right, root2.left)
```

### 代码

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    if (!root) return true;
    return getMirror(root, root)
};

function getMirror(root1, root2) {
    // 如果都为null 对称
    if (!root1 && !root2) return true;
    // 只要其中一个为null,另一个不为 不对称
    if (!root1 || !root2) return false;

    // 判断根节点
    // 判断root1的左树 和 root2的右树
    // 判断root1的右树 和 root2的左树
    return root1.val == root2.val && getMirror(root1.left, root2.right) && getMirror(root1.right, root2.left)
}
```

## 59. 按之字形顺序打印二叉树 - 8.17

### 题目描述

请实现一个函数按照之字形打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右至左的顺序打印，第三行按照从左到右的顺序打印，其他行以此类推。

### 解析

这题和22题相似, 但是这个的奇数层是从右到左 打印出来的

中间代码相似 

关键的点在于 定义leve层是个数组,arr[level] = [];然后对level进行奇偶判断,对奇数进行reverse翻转

### 代码

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (!root) return [];
    let queue = [];
    queue.push(root);
    let level = 0;
    let arr = [];
    while (queue.length) {
        arr[level] = []; //第level的遍历结果

        let levelNum = queue.length; // 第level层的节点数量
        while (levelNum--) {
            let pRoot = queue.shift();
            if (pRoot.left) {
                queue.push(pRoot.left);
            }
            if (pRoot.right) {
                queue.push(pRoot.right);
            }
            arr[level].push(pRoot.val) // 将当前节点的值push到arr[level]
        }
        if (level % 2 !== 0) {
            arr[level].reverse(); // 翻转level
        }
        level++; // 再遍历下一个层
    }
    return arr
};

```

## 60. 把二叉树打印成多行 - 8.18

### 题目描述

从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。

### 解析

这题比59还简单,就是省去了对level层数的判断

### 代码

```javascript
var levelOrder = function(root) {
    let queue = [];
    let arr = [];
    let level = 0;
    if (!root) return [];
    queue.push(root);
    while (queue.length) {
        arr[level] = [];
        let levelNum = queue.length;
        while (levelNum--) {
            let pRoot = queue.shift();
            if (pRoot.left) {
                queue.push(pRoot.left);
            }
            if (pRoot.right) {
                queue.push(pRoot.right);
            }
            arr[level].push(pRoot.val);
        }
        level++;
    }
    return arr;
};
```

## 61. 序列化二叉树 - 8.18

### 题目描述

请实现两个函数，分别用来序列化和反序列化二叉树

### 解析

第一个跟22相似,但是本题要求 输出的是字符串

**序列化二叉树**

- 初始化字符串res
- 初始化队列 queue ,将root放入队列
- 检查队列是否为空:
  - 队列不为空:取出队首节点,如果节点为null,那么res 更新为 res+"null,"; 如果节点不是null,那么res更新为 res+val, 并且将节点的左右节点 依次加入queue,继续循环
  - 队列为空,结束循环
- 返回 "["+res+"]"

**反序列化二叉树**

- 去掉字符串res前后的`[`和`]`,并将其按照`,` 逗号切分得到数组nodes
- 初始化队列queue,放入nodes 的第一个值对应的节点,nodes 弹出的第一个值
- 检查队列是否为空:
  - 队列不为空,从queue取出队首元素.从nodes取出第一个值和第二个值,依次处理,继续循环
  - 队列为空,结束循环
- 返回根节点

**反序列化函数的设计关键是:数组nodes 取出元素的顺序和原二叉树层序遍历的顺序是对应的**

### 代码

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    let queue = [];
    let res = "";
    if (!root) return "[]";
    queue.push(root);
    while (queue.length) {
        let pRoot = queue.shift();
        if (pRoot) {
            queue.push(pRoot.left); // 不能对左右做判断是否存在,否则报错
            queue.push(pRoot.right);// 跟22题 这里不一样
            res += `${pRoot.val},` //逗号不能丢
        } else {
            res += "null,"; // 逗号不能丢
        }
    }
    res = res.substring(0, res.length - 1);
    return `[${res}]`;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    if (data.length <= 2) return null;
    let nodes = data.substring(1, data.length - 1).split(',');
    let root = new TreeNode(parseInt(nodes[0]));
    nodes.shift();
    let queue = [];
    queue.push(root);

    while (queue.length) {
        let node = queue.shift();
        const leftVal = nodes.shift();
        if (leftVal !== "null") {
            node.left = new TreeNode(leftVal);
            queue.push(node.left);
        }
        const rightVal = nodes.shift();
        if (rightVal !== "null") {
            node.right = new TreeNode(rightVal);
            queue.push(node.right);
        }
    }
    return root
};


/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
```

## 62. 二叉搜索树的第K个节点 - 8.19

### 题目描述

给定一棵二叉搜索树，请找出其中的第k小的结点。例如， （5，3，7，2，4，6，8）  中，按结点数值大小顺序第三小结点的值为4。

### 解析

中序遍历 出的数组 是从小到大的.到时输出a[k-1]就可以了

### 代码

```javascript
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargest = function(root, k) {
    let res = inOrder(root);
    console.log(res);
    return res[k - 1]
};
let res = []; // 放外面,不然只有第一个值

function inOrder(root) {
    if (!root) return;
    inOrder(root.left);
    res.push(root.val);
    inOrder(root.right);
    return res
}
```

## 63. 数据流中的中位数 - 8.20

### 题目描述

如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。我们使用Insert()方法读取数据流，使用GetMedian()方法获取当前读取数据的中位数。

````
 输入：
["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]
[[],[1],[2],[],[3],[]]
输出：[null,null,null,1.50000,null,2.00000]
````

### 解析

一开始还以为很简单,但是LeetCode上标困难,牛客网标 中等.看到例子才知道 原来是这样的中位数

关键是 数组有序

这里使用的是 插入的时候保持数组一直有序

### 代码

```javascript
/**
 * initialize your data structure here.
 */
var MedianFinder = function() {
    this.array = [];
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    this.array.push(num);
    for(let i = this.array.length -2 ; this.array[i]>num;i--){
        [this.array[i],this.array[i+1]] = [this.array[i+1],this.array[i]];
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    if(this.array.length & 1===1){
        return this.array[(this.array.length - 1) /2];
    } 
    return (this.array[this.array.length / 2] + this.array[this.array.length / 2 -1]) /2;
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
```

## 64. 滑动窗口中的最大值 - 8.22

### 题目描述

给定一个数组 `nums` 和滑动窗口的大小 `k`，请找出所有滑动窗口里的最大值。

示例:

````
输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
输出: [3,3,5,5,6,7] 
解释: 
  滑动窗口的位置                最大值

---------------               -----

[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
````

### 解析

就挺简单的.窗口长度定为3,然后不断往前走,不断提取最大值

### 代码

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    let length = nums.length;
    let res = [];
    let max = 0;
    let temp = []; // 窗口临时双端队列
    if (!length) return [];
    for (let i = 0; i < length; i++) {
        if (temp.length < k) {
            temp.push(nums[i]);
        }
        if (temp.length == k) {
            max = Math.max(...temp); // 取出最大值
            res.push(max);
            temp.shift();
        }
    }
    return res;
};
let arr = [1, 3, -1, -3, 5, 3, 6, 7];
let kTemp = 3;
let res = maxSlidingWindow(arr, kTemp);
console.log(res);
```

## 65. 矩阵中的路径 - 8.22

### 题目描述

请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一格开始，每一步可以在矩阵中向左、右、上、下移动一格。如果一条路径经过了矩阵的某一格，那么该路径不能再次进入该格子。

```
输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
输出：true

输入：board = [["a","b"],["c","d"]], word = "abcd"
输出：false
```

### 解析

典型的dfs算法, 回溯法.和27字符串的排列相似

第一步先遍历一遍board,找到第一个适合的位置

然后再使用isHasPath递归,因为要寻找路径,要记录一下路径,防止每次递归都会回到之前的路径

### 代码

```javascript
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    let cols = board[0].length;
    let rows = board.length;

    let index = 0;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            //找到初始位置点,开始进行遍历
            if (isHasPath(col, row, cols, rows, board, word, index)) return true 
        }
    }
    return false
};

function isHasPath(col, row, cols, rows, board, word, index) {
    // 不符合条件的
    // 一定要先判断行的数 再判断 列的数
    //  当前行数是大于等于 总行数时,返回false
    if (row < 0 || row >= rows || col < 0 || col > cols || board[row][col] !== word[index]) return false;
    if (index == word.length - 1) return true; // 字符串全遍历完成
    var temp = board[row][col]; // 记录当前值
    board[row][col] = '-'; // 锁上,防止又被访问到
    let res =
        isHasPath(col - 1, row, cols, rows, board, word, index + 1) ||
        isHasPath(col + 1, row, cols, rows, board, word, index + 1) ||
        isHasPath(col, row - 1, cols, rows, board, word, index + 1) ||
        isHasPath(col, row + 1, cols, rows, board, word, index + 1);

    board[row][col] = temp; // 撤销选择
    return res // 没找到
}
// let arr = [
//     ["A", "B", "C", "E"],
//     ["S", "F", "C", "S"],
//     ["A", "D", "E", "E"]
// ];
// let str = "ABCCED"
let arr = [
    ["a", "b"],
    ["c", "d"]
];
let str = "abcd";
let res = exist(arr, str);
console.log(res);//false
```

## 66. 机器人的运动范围 - 8.22

### 题目描述

地上有一个m行和n列的方格。一个机器人从坐标0,0的格子开始移动，每一次只能向左，右，上，下四个方向移动一格，但是不能进入行坐标和列坐标的数位之和大于k的格子。 例如，当k为18时，机器人能够进入方格（35,37），因为3+5+3+7 = 18。但是，它不能进入方格（35,38），因为3+5+3+8 = 19。请问该机器人能够达到多少个格子？

**示例 1：**

```
输入：m = 2, n = 3, k = 1
输出：3
```

### 解析

这题和65题矩阵中的路径差不多 ,都是利用回溯法.只不过条件判断不同

需要定义一个数组hasVisited,来记录当前点是否访问过.count来记录能达到的格子数

如果没有访问过,而且它的坐标数和 == k,就count++,并标识已访问过,继续遍历它的上下左右点

### 代码

```javascript
/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */

var movingCount = function(m, n, k) {
    let count = 0;
    const hasVisited = new Array(m);
    for (let i = 0; i < m; i++) {
        hasVisited[i] = new Array(n).fill(false);
    }

    function dfs(i, j) {
        // 边界直接返回
        if (i < 0 || j < 0 || i >= m || j >= n) return;
        // 坐标求和
        const sum = (i + '' + j).split('').reduce((a, b) => +a + +b);
        // 当该点还没走过 和满足不大于k 时,继续执行
        if (sum <= k && !hasVisited[i][j]) {
            count++;
            // 标识该点已经走过
            hasVisited[i][j] = true;
            // 当前的继续,上下左右 走
            dfs(i + 1, j);
            dfs(i - 1, j);
            dfs(i, j + 1);
            dfs(i, j - 1);
        }
    }
    dfs(0, 0);
    return count;
};
```

