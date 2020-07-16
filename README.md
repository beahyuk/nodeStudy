# node.js 学习
## code文件
 code文件夹里是关于node学习时的代码
 手敲代码

## node学习.md
node学习.md是关于node的上课笔记

## git语句

### 1. git创建分支

1）切换到基础分支，如主干

```
git checkout master
```

2）创建并切换到新分支

```
git checkout -b panda
```

git branch 可以看到已经在panda分支上

3）更新分支代码并提交

```
git add *
git commit -m "init panda"
git push origin panda
```

4）在git代码管理界面就可以看到panda分支了，成功

### 2. git合并分支

1）从panda分支切换到master下

```
git checkout master
```

2）因为是合作开发项目，这时远程仓库中的内容有可能已经发生了变化，所以我们需要将远程仓库中的内容和本地分支中的内容进行合并

```
git pull origin master
```

3）接下来要做的是将panda分支合并到master上

```
git merge panda
```

4）查看分支中内容提交的状态

```
git status
```

5）有冲突的话，通过IDE解决冲突；

6）解决冲突后，将冲突文件提交暂存区

```
git add 冲突文件 或
git add .  //提交所有文件
```

7）提交merge之后的结果

```
git commit -m "注释"
```

5）最后一步，我们把修改的内容提交到主分支上

```
git push origin master
```

如果你感觉合并后的内容有问题，可以通过撤销合并恢复到以前状态

```
git reset --hard HEAD
```

代码已经提交，撤销的方法是

```
git reset --hard ORIG_HEAD
```

## 算法刷题

[剑指offer-JavaScript版本](https://github.com/piggerCoder/nowcoder-sword-offer)

[算法面试大全](https://github.com/14glwu/FEInterviewBox)

[刷题总结](<https://www.cnblogs.com/wuguanglin/p/SummaryOfJSDoAlgorithmProblem.html>)

