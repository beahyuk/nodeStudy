export function getMap1() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    // canvas2 = document.getElementById('canvas2');
    // ctx2 = canvas2.getContext('2d');
    let pre_alpha = ctx.globalAlpha;
    // ctx.globalAlpha = 0.3;

    let grid_cols = 30;
    let grid_rows = 16;
    let cell_height = canvas.height / grid_rows;
    let cell_width = canvas.width / grid_cols;
    let cell_pix = cell_height;

    // ctx.fillStyle = '#F5F5F5';
    // ctx.fillRect(0, 0, cwidth, cheight);

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";
    ctx.font = "36pt Arial";
    //结束边框描绘
    ctx.beginPath();
    //准备画横线
    for (let col = 0; col <= grid_cols; col++) {
        let x = col * cell_width;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }
    //准备画竖线
    for (let row = 0; row <= grid_rows; row++) {
        let y = row * cell_height;
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }



    ctx.fillStyle = "#d1cfd2"; //填充颜色
    ctx.fillRect(0 * cell_pix, 0 * cell_pix, 30 * cell_pix, 1 * cell_pix);
    ctx.fillRect(0 * cell_pix, 2 * cell_pix, 1 * cell_pix, 10 * cell_pix);
    ctx.fillRect(29 * cell_pix, 1 * cell_pix, 1 * cell_pix, 15 * cell_pix);
    ctx.fillRect(0 * cell_pix * cell_pix, 15 * cell_pix, 2 * cell_pix, 1 * cell_pix);
    ctx.fillRect(3 * cell_pix, 15 * cell_pix, 1 * cell_pix, 1 * cell_pix);
    ctx.fillRect(6 * cell_pix, 15 * cell_pix, 1 * cell_pix, 1 * cell_pix);
    ctx.fillRect(8 * cell_pix, 15 * cell_pix, 7 * cell_pix, 1 * cell_pix);
    ctx.fillRect(16 * cell_pix, 15 * cell_pix, 1 * cell_pix, 1 * cell_pix);
    ctx.fillRect(18 * cell_pix, 15 * cell_pix, 1 * cell_pix, 1 * cell_pix);
    ctx.fillRect(0 * cell_pix, 12 * cell_pix, 1 * cell_pix, 1 * cell_pix);
    ctx.fillRect(0 * cell_pix, 14 * cell_pix, 1 * cell_pix, 1 * cell_pix);
    ctx.fillRect(12 * cell_pix, 2 * cell_pix, 3 * cell_pix, 10 * cell_pix);
    ctx.fillRect(1 * cell_pix, 10 * cell_pix, 5 * cell_pix, 2 * cell_pix);


    //上墙
    ctx.fillRect(0 * cell_pix, 1 * cell_pix, 10 * cell_pix, 1 * cell_pix);

    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(19 * cell_pix, 0 * cell_pix, 1 * cell_pix, 1 * cell_pix);








    //海报区
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "rgb(158,183,214)";

    ctx.fillRect(7 * cell_pix, 3 * cell_pix, 2 * cell_pix, 7 * cell_pix);
    ctx.globalAlpha = pre_alpha;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(7 * cell_pix, 3 * cell_pix, 2 * cell_pix, 7 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("海报区", 7 * cell_pix, 7 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";







    //分会场A
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.fillRect(1 * cell_pix, 2 * cell_pix, 5 * cell_pix, 2 * cell_pix);
    ctx.globalAlpha = pre_alpha;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(1 * cell_pix, 2 * cell_pix, 5 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("分会场A", 2 * cell_pix, 3.5 * cell_pix, 5 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";


    //分会场B
    ctx.globalAlpha = 0.3;
    ctx.fillRect(1 * cell_pix, 4 * cell_pix, 5 * cell_pix, 2 * cell_pix);
    ctx.globalAlpha = pre_alpha;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(1 * cell_pix, 4 * cell_pix, 5 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("分会场B", 2 * cell_pix, 5.5 * cell_pix, 5 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //分会场C
    ctx.globalAlpha = 0.3;
    ctx.fillRect(1 * cell_pix, 6 * cell_pix, 5 * cell_pix, 2 * cell_pix);
    ctx.globalAlpha = pre_alpha;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(1 * cell_pix, 6 * cell_pix, 5 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("分会场C", 2 * cell_pix, 7.5 * cell_pix, 5 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //分会场D
    ctx.globalAlpha = 0.3;
    ctx.fillRect(1 * cell_pix, 8 * cell_pix, 5 * cell_pix, 2 * cell_pix);
    ctx.globalAlpha = pre_alpha;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(1 * cell_pix, 8 * cell_pix, 5 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("分会场D", 2 * cell_pix, 9.5 * cell_pix, 5 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //签到处
    ctx.globalAlpha = 0.3;
    ctx.fillRect(2 * cell_pix, 12 * cell_pix, 4 * cell_pix, 2 * cell_pix);
    ctx.globalAlpha = pre_alpha;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(2 * cell_pix, 12 * cell_pix, 4 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("签到处", 2.8 * cell_pix, 13.3 * cell_pix, 4 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //厕所1
    ctx.globalAlpha = 0.3;
    ctx.fillRect(10 * cell_pix, 4 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx.globalAlpha = pre_alpha;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(10 * cell_pix, 4 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("厕所1", 10 * cell_pix, 5.5 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //room1
    ctx.globalAlpha = 0.3;
    ctx.fillRect(10 * cell_pix, 6 * cell_pix, 2 * cell_pix, 4 * cell_pix);
    ctx.globalAlpha = pre_alpha;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(10 * cell_pix, 6 * cell_pix, 2 * cell_pix, 4 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("room1", 10 * cell_pix, 8.5 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //room2
    ctx.globalAlpha = 0.3;
    ctx.fillRect(10 * cell_pix, 10 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx.globalAlpha = pre_alpha;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(10 * cell_pix, 10 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("room2", 10 * cell_pix, 11.5 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //展厅
    ctx.globalAlpha = 0.3;
    ctx.fillRect(15 * cell_pix, 2 * cell_pix, 4 * cell_pix, 10 * cell_pix);
    ctx.globalAlpha = pre_alpha;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(15 * cell_pix, 2 * cell_pix, 4 * cell_pix, 10 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("展厅", 16 * cell_pix, 7.5 * cell_pix, 4 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //主会场
    ctx.globalAlpha = 0.3;
    ctx.fillRect(19 * cell_pix, 2 * cell_pix, 10 * cell_pix, 10 * cell_pix);
    ctx.globalAlpha = pre_alpha;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(19 * cell_pix, 2 * cell_pix, 10 * cell_pix, 10 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("主会场", 22.5 * cell_pix, 7.5 * cell_pix, 4 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //服务台
    ctx.globalAlpha = 0.3;
    ctx.fillRect(19 * cell_pix, 14 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx.globalAlpha = pre_alpha;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(19 * cell_pix, 14 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("服务台", 19 * cell_pix, 15.5 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //room3
    ctx.globalAlpha = 0.3;
    ctx.fillRect(21 * cell_pix, 14 * cell_pix, 4 * cell_pix, 2 * cell_pix);
    ctx.globalAlpha = pre_alpha;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(21 * cell_pix, 14 * cell_pix, 4 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("room3", 22 * cell_pix, 15.5 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //room4
    ctx.globalAlpha = 0.3;
    ctx.fillRect(25 * cell_pix, 14 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx.globalAlpha = pre_alpha;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(25 * cell_pix, 14 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("room4", 25 * cell_pix, 15.5 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //厕所2
    ctx.globalAlpha = 0.3;
    ctx.fillRect(27 * cell_pix, 14 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx.globalAlpha = pre_alpha;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(27 * cell_pix, 14 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("厕所2", 27 * cell_pix, 15.5 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //扶梯
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "rgb(254,183,67)";
    ctx.fillRect(10 * cell_pix, 1 * cell_pix, 2 * cell_pix, 1 * cell_pix);
    ctx.globalAlpha = pre_alpha;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(10 * cell_pix, 1 * cell_pix, 2 * cell_pix, 1 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("扶梯", 10.2 * cell_pix, 1.8 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(254,183,67)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //扶梯
    ctx.globalAlpha = 0.3;
    ctx.fillRect(10 * cell_pix, 14 * cell_pix, 2 * cell_pix, 1 * cell_pix);
    ctx.globalAlpha = pre_alpha;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(10 * cell_pix, 14 * cell_pix, 2 * cell_pix, 1 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("扶梯", 10.2 * cell_pix, 14.8 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(254,183,67)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";



    ctx.stroke();
    //上箭头
    ctx.globalAlpha = 0.3;
    drawArrow(ctx, 2.5 * cell_pix, 16 * cell_pix, 2.5 * cell_pix, 15 * cell_pix, 20, 0.3 * cell_pix, 10, '#FEB743');
    drawArrow(ctx, 4.5 * cell_pix, 16 * cell_pix, 4.5 * cell_pix, 15 * cell_pix, 20, 0.3 * cell_pix, 10, '#FEB743');
    drawArrow(ctx, 7.5 * cell_pix, 16 * cell_pix, 7.5 * cell_pix, 15 * cell_pix, 20, 0.3 * cell_pix, 10, '#FEB743');

    drawArrow(ctx, 19.5 * cell_pix, 1.3 * cell_pix, 19.5 * cell_pix, 0.3 * cell_pix, 20, 0.3 * cell_pix, 10, '#FEB743');

    //下箭头
    drawArrow(ctx, 5.5 * cell_pix, 14.7 * cell_pix, 5.5 * cell_pix, 15.7 * cell_pix, 20, 0.3 * cell_pix, 10, '#FEB743');
    drawArrow(ctx, 15.5 * cell_pix, 14.7 * cell_pix, 15.5 * cell_pix, 15.7 * cell_pix, 20, 0.3 * cell_pix, 10, '#FEB743');
    drawArrow(ctx, 17.5 * cell_pix, 14.7 * cell_pix, 17.5 * cell_pix, 15.7 * cell_pix, 20, 0.3 * cell_pix, 10, '#FEB743');


    //右箭头
    drawArrow(ctx, 0 * cell_pix, 13.5 * cell_pix, 1 * cell_pix, 13.5 * cell_pix, 20, 0.3 * cell_pix, 10, '#FEB743');

    ctx.globalAlpha = pre_alpha;
}