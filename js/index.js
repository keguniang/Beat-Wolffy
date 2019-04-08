$(function () {
    //监听游戏规则按钮
    $('.rules').click(function () {
        $('.rule').fadeIn(500);
    });
//    监听规则关闭按钮
    $('.rule>a').click(function () {
        $('.rule').fadeOut(500);
    });
//    监听开始按钮点击隐藏
    $('.start').click(function () {
        $(this).fadeOut(500);
    //    调用处理进度条的方法
        progessHandler();
    //    调用处理灰太狼动画的方法
        startWolfAnimation();
    });

    //监听重新开始按钮
    $('.restart').click(function () {
        $('.mask').fadeOut(500);
        //进度条应该重新开始减少
        progessHandler();
        // 调用处理灰太狼动画的方法
        startWolfAnimation();
    });

    //定义一个专门处理进度条的方法
    function progessHandler() {
    //    重新设置进度条的宽度
        $('.progress').css({
            width: 180
        });
    //    开启定时器
        var timer = setInterval(function () {
        //    拿到进度条的宽度
            var progressWith = $('.progress').width();
            //减少当前的宽度
            progressWith-=1;
            //判断游戏是否结束
            if (progressWith <= 0){
                //关闭计时器
                clearInterval(timer);
                $('.mask').fadeIn(500);
                //停止灰太狼动画
                stopWolfAnimation();
            }
        //    重新给进度条赋值
            $('.progress').css({
                width : progressWith
            });

        },100);
    }

    var wolfTimer;
    // 灰太狼动画的方法
    function startWolfAnimation(){
        // 1.定义两个数组保存所有灰太狼和小灰灰的图片
        var wolf_1=['./img/h0.png','./img/h1.png','./img/h2.png','./img/h3.png','./img/h4.png','./img/h5.png','./img/h6.png','./img/h7.png','./img/h8.png','./img/h9.png'];
        var wolf_2=['./img/x0.png','./img/x1.png','./img/x2.png','./img/x3.png','./img/x4.png','./img/x5.png','./img/x6.png','./img/x7.png','./img/x8.png','./img/x9.png'];
        // 2.定义一个数组保存所有可能出现的位置,8个位置
        var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];
    //    3.创建一个图片
        var $wolfImage = $('<img src="" class="wolfImage">');
    //    随机获取图片的位置
        var posIndex = Math.round(Math.random()*8);
    //    4.设置图片显示的位置
        $wolfImage.css({
            position : 'absolute',
            left : arrPos[posIndex].left,
            top : arrPos[posIndex].top
        });
    //    随机获取数组类型
        var wolfType = Math.round(Math.random())==0?wolf_1 : wolf_2;
    //    5.设置图片的内容
    //    变成全局变量，在规则里边使用
        window.wolfIndex = 0;
        window.wolfIndexEnd = 5;
        wolfTimer = setInterval(function () {
            $wolfImage.attr('src',wolfType[wolfIndex]);
            wolfIndex++;
            if(wolfIndex>wolfIndexEnd ){
                $wolfImage.remove();
                clearInterval(wolfTimer);
                startWolfAnimation();
            }
        },300)

    //    6.将图片添加到界面上
        $('.container').append($wolfImage);
    //    7.调用处理游戏规则的方法
        gameRules($wolfImage);
    }

    //停止灰太狼动画
    function stopWolfAnimation(){
        $('.wolfImage').remove();
        clearInterval(wolfTimer);
    }

    //    7.调用处理游戏规则的方法
    function gameRules($wolfImage){
        //one()只能点击一次
        $wolfImage.one("click",function () {
            // 修改索引
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;

            // 拿到当前点击图片的地址
            var $src = $(this).attr("src");
            // 根据图片地址判断是否是灰太狼
            var flag = $src.indexOf("h") >= 0;
            // 根据点击的图片类型增减分数
            if(flag){
                // +10
                $(".score").text(parseInt($(".score").text()) + 10);
            }else{
                // -10
                $(".score").text(parseInt($(".score").text()) - 10);
            }
        });
    }
});