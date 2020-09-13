let timer = 0;
let startTime = 0;
// let cvs = document.getElementById("canvas");
// let ctx = cvs.getContext("2d");
let points = []; //已经运动过的数据
let animatePoint = {
    x: 0,
    y: 0,
}; //当前运动点位置
let nextPointIndex = 1; //下一个运动点的index

//开始运动
// init(routes);

function init(routes) {
    animatePoint = {
        x: 0,
        y: 0,
    };
    nextPointIndex = 1;
    ctx.clearRect(0, 0, cvs.clientWidth, cvs.clientHeight);
    if (routes.length > 0) {
        points.push({
            x: routes[0].x,
            y: routes[0].y,
        });
        animatePoint = {
            x: routes[0].x,
            y: routes[0].y,
        };

        drawPoint(routes[0].x, routes[0].y);
    }

    if (routes.length > 1) {
        // this.startTimer();
        startTimer();
    }
}

function startTimer() {
    startTime = new Date().getTime();
    if (routes.length > 1) {
        // this.clearTimer();
        // this.animate();
        clearTimer();
        animate();
    }
}

function clearTimer() {
    window.cancelAnimationFrame(timer);
}

function animate() {
    timer = window.requestAnimationFrame(animate);
    startMove();
}

function startMove() {
    let targetDistance = Math.sqrt(
        Math.pow(routes[nextPointIndex - 1].x - routes[nextPointIndex].x, 2) +
        Math.pow(routes[nextPointIndex - 1].y - routes[nextPointIndex].y, 2)
    );

    let currentDistance = Math.sqrt(
        Math.pow(routes[nextPointIndex - 1].x - animatePoint.x, 2) +
        Math.pow(routes[nextPointIndex - 1].y - animatePoint.y, 2)
    );

    if (currentDistance >= targetDistance) {
        //利用运动距离与目标距离, 判断运动的点是否超过下一个目标点, 超过了就重置下一个点
        startTime = new Date().getTime();

        points[nextPointIndex] = {
            x: routes[nextPointIndex].x,
            y: routes[nextPointIndex].y,
        };

        animatePoint = {
            x: routes[nextPointIndex].x,
            y: routes[nextPointIndex].y,
        };

        nextPointIndex++;

        clearTimer();
        if (nextPointIndex <= routes.length - 1) {
            setTimeout(() => {
                startTimer();
            }, 500);
        }

        //重绘
        ctx.clearRect(0, 0, cvs.clientWidth, cvs.clientHeight);
        drawPolygon(points);
        drawPoint(animatePoint.x, animatePoint.y, "yellow");
        return;
    }

    if (nextPointIndex > routes.length - 1) {
        //轨迹运动结束后, 关闭timer
        clearTimer();

        animatePoint = {
            x: routes[routes.length - 1].x,
            y: routes[routes.length - 1].y,
        };
    } else {
        let speed = 0.25;

        let deltaTime = new Date().getTime() - startTime;
        let deltaDistance = deltaTime * speed;
        let rate = deltaDistance / targetDistance;
        let x =
            routes[nextPointIndex - 1].x +
            (routes[nextPointIndex].x - routes[nextPointIndex - 1].x) * rate;
        let y =
            routes[nextPointIndex - 1].y +
            (routes[nextPointIndex].y - routes[nextPointIndex - 1].y) * rate;

        animatePoint.x = x;
        animatePoint.y = y;

        //重绘, 将animatePoint设为轨迹的下一个点, 以达到动态的效果
        points[nextPointIndex] = {
            x: animatePoint.x,
            y: animatePoint.y,
        };
        ctx.clearRect(0, 0, cvs.clientWidth, cvs.clientHeight);
        drawPolygon(points);
        drawPoint(animatePoint.x, animatePoint.y, "yellow");
    }
}

function drawPoint(x, y, color) {
    //绘制点
    ctx.fillStyle = color || "#1DEFFF";
    ctx.strokeStyle = "#fff";
    if (!color) {
        ctx.shadowColor = "#FFF";
        ctx.shadowBlur = 10;
    }

    ctx.beginPath();
    ctx.arc(x, y, 5, Math.PI * 2, 0, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

function drawPolygon(points) {
    //绘制轨迹
    ctx.clearRect(0, 0, cvs.clientWidth, cvs.clientHeight);

    ctx.strokeStyle = "#1DEFFF";
    ctx.shadowColor = "#1DEFFF";
    ctx.shadowBlur = 10;
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    let i = 1,
        len = points.length;
    for (; i < len; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    let j = 0;
    for (; j < len - 1; j++) {
        drawPoint(points[j].x, points[j].y);
    }
}
class GetOneRoad {
    constructor(ctx, cvs, routes) {
        this.ctx = ctx;
        this.cvs = cvs;
        this.routes = routes;
    }
}
GetOneRoad.prototype.init = init
export { GetOneRoad }