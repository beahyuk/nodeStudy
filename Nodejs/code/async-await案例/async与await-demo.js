// 1.基本使用
async function fn1() {
    // 原先的promise使用
    // new Promise((resolve, reject) => {
    //     // 如果出错，就执行reject回调函数，或者throw err
    //     if (err) {
    //         reject("err");
    //         // throw err;
    //     } else {
    //         // 如果成功，就会执行resolve回调函数,把异步函数里的结果放在resolve里
    //         setTimeout(() => {
    //             let time = "2020-07-14";
    //             resolve(time)
    //         }, 1000);
    //     };
    // });
    // name 是 获得后面promise的resolve的结果
    let name = await new Promise(resolve => {
        // await是等待后面promise的异步函数执行后的结果，然后赋值给name
        // 这里的异步函数是setTimeout，name得到的是LindaG
        setTimeout(() => {
            let Pname = "lindaG";
            resolve(Pname);
        }, 1000);
    });
    // gender 是 获得后面promise的resolve的结果
    let gender = await new Promise(resolve => {
        resolve("male")
    });
    console.log(name, gender);
};

// 2.promise调用前一个 promise的结果
async function fn2() {
    let name = await new Promise(resolve => {
        setTimeout(() => {
            let Pname = "u-dragon";
            resolve(Pname)
        }, 2000);
    })

    let gender = await new Promise(resolve => {
        setTimeout(() => {
            // 调用前面promise的结果name，如果name是符合的，那么返回性别；否则，返回"unknow"
            if (name === "dragon") {
                let sex = "male";
                resolve(sex)
            } else {
                resolve("unknow")
            }
        }, 1000);
    });
    console.log(gender)
};
// 3.async/await 可以好Promise.all 一起使用
// 需要同时等待多个promise时，我们可以使用promise.all把它们包装起来，然后使用await：
async function fn3() {
    let results = await Promise.all([
        new Promise(resolve => {
            setTimeout(() => {
                let Pname = "lindaG";
                resolve(Pname);
            }, 1000);
        }),
        new Promise(resolve => {
            setTimeout(() => {
                let gender = "male";
                resolve(gender)
            }, 2000);
        })
    ])
    console.log(results);
};
// fn3();