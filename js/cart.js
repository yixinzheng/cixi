//统计选中结算个数
function countCheck(){
    var i = 0;
    $(".car-chk").each(function () {
        if($(this).hasClass("active")){
            i++;
        }
    });
    $(".car-sub").val("结算("+i+")");
}
//统计选中删除个数
function countDel(){
    var i = 0;
    $(".car-chk").each(function () {
        if($(this).hasClass("active")){
            i++;
        }
    });
    $(".car-delete").val("删除("+i+")");
}
var totalPrice = 0;//定义总价全局变量
//限制数量
function checkCount(num) {
    if(num<1){
        num = 1;
        $(".pub-toast").html("亲，不能再少了哦！");
        $(".pub-toast").show();
        setTimeout(function () {
            $(".pub-toast").hide();
        },2000);
    }
    if(num>4){
        num = 4;
        $(".pub-toast").html("亲，不能更多了哦！");
        $(".pub-toast").show();
        setTimeout(function () {
            $(".pub-toast").hide();
        },2000);
    }
    return num;
}
$(function () {
    //全选操作
    $(".cart-chk").on("click",function () {
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $(".car-all-chk").each(function () {
                $(this).addClass("active");
            });
            $(".car-chk").each(function () {
                $(this).addClass("active");
            });
            //计算总价，选中加价
            var allPrice = 0;
            $(".car-box").each(function () {
                var price = parseFloat($(this).find(".single-price").text());
                var num = parseFloat($(this).find(".car-number").text());
                allPrice = add(allPrice,price*num);//解决js浮点型相加减问题
                totalPrice = allPrice;
                $(".total-price").html(totalPrice);
            });
            //全选ajax
            $("#cart-chk").val(1);
        }else{
            $(this).removeClass('active');
            $(".car-all-chk").each(function () {
                $(this).removeClass("active");
            });
            $(".car-chk").each(function () {
                $(this).removeClass("active");
            });
            totalPrice = 0;
            $(".total-price").html(totalPrice);
            //取消全选ajax
            $("#cart-chk").val(0);
        }
        countCheck();
        countDel();
    });
    //单个店铺全选操作
    $(".car-all-chk").on("click",function () {
        var totalCount = 0;
        if(!$(this).hasClass('active')){
            $(this).addClass("active");
            $(this).parent().siblings(".car-box").each(function () {
                //判断是否已选中
                if(!$(this).find(".car-chk").hasClass("active")){
                    //计算总价，选中加价
                    var price = parseFloat($(this).find(".single-price").text());
                    var num = parseFloat($(this).find(".car-number").text());
                    totalPrice = add(totalPrice,price*num);
                    $(".total-price").html(totalPrice);
                }
                $(this).find(".car-chk").addClass("active");
            });
            //全选
            $(".car-store-box").each(function () {
                if($(this).find(".car-all-chk").hasClass("active")){
                    totalCount++;
                }
            });
            if(totalCount == $(".car-store-box").length){
                $(".cart-chk").addClass("active");//全选
            }
        }else{
            $(this).removeClass("active");
            $(".cart-chk").removeClass("active");
            $(this).parent().siblings(".car-box").each(function () {
                $(this).find(".car-chk").removeClass("active");
                //计算总价，取消选中减价
                var price = parseFloat($(this).find(".single-price").text());
                var num = parseFloat($(this).find(".car-number").text());
                totalPrice = add(totalPrice,-price*num);
                $(".total-price").html(totalPrice);
            });
        }
        countCheck();
        countDel();
    });
    //单选操作
    $(".car-chk").on("click",function () {
        var count = 0; //单个店铺全选：计算相邻元素已选个数，达到个数则全选，反之取消全选
        var totalCount = 0; //全选：计算相邻元素已选个数，达到个数则全选，反之取消全选
        if(!$(this).hasClass('active')){
            $(this).addClass("active");
            //单个店铺全选
            $(this).parent().siblings(".car-box").each(function () {
                if($(this).find(".car-chk").hasClass("active")){
                    count++;
                }
            });
            if(count == $(this).parent().siblings(".car-box").length){
                $(this).parent().siblings(".car-store-box").find(".car-all-chk").addClass("active");//全选
            }
            //全选
            $(".car-box").each(function () {
                if($(this).find(".car-chk").hasClass("active")){
                    totalCount++;
                }
            });
            if(totalCount == $(".car-box").length){
                $(".cart-chk").addClass("active");//全选
            }
            //计算总价，选中加价
            var price = parseFloat($(this).siblings(".single-price").text());
            var num = parseFloat($(this).siblings(".car-menu").find(".car-number").text());
            totalPrice = add(totalPrice,price*num);
            $(".total-price").html(totalPrice);
        }else{
            //取消当前选中并且取消当前店铺全选
            $(this).removeClass("active");
            $(this).parent().siblings(".car-store-box").find(".car-all-chk").removeClass("active");
            $(".cart-chk").removeClass("active");
            //计算总价，取消选中减价
            var price = parseFloat($(this).siblings(".single-price").text());
            var num = parseFloat($(this).siblings(".car-menu").find(".car-number").text());
            totalPrice = add(totalPrice,-price*num);
            $(".total-price").html(totalPrice);
        }
        countCheck();
        countDel();
    });
    //单个编辑操作
    $(".car-edit").on("click",function (){
        $(this).hide().siblings(".car-ok").show();//隐藏编辑 显示完成按钮
        $(this).parent().siblings(".car-box").each(function () {
            $(this).find(".car-menu").hide();//隐藏产品信息 全体编辑 以及显示单个编辑
            $(this).find(".car-all").hide();
            $(this).find(".car-single").show();
        });
    });
    //单个完成操作
    $(".car-ok").on("click",function (){
        $(this).hide().siblings(".car-edit").show();//隐藏完成 显示编辑按钮
        $(this).parent().siblings(".car-box").each(function () {
            $(this).find(".car-menu").show();//显示产品信息 隐藏全体编辑 单个编辑
            $(this).find(".car-do").hide();
        });
    });
    //全部编辑操作
    $(".car-compile").on("click",function (){
        $(this).hide().siblings(".car-complete").show();//隐藏编辑 显示完成按钮
        $(".car-box").each(function () {
            $(this).find(".car-menu").hide();//隐藏产品信息 单个编辑 以及显示全体编辑框
            $(this).find(".car-single").hide();
            $(this).find(".car-all").show();
        });
        $(".car-edit").each(function () {//隐藏单个编辑按钮
            $(this).hide();
        });
        $(".car-ok").each(function () {//隐藏单个完成按钮
            $(this).hide();
        });
        $(".car-commit").hide();//隐藏结算 显示删除
        $(".car-remove").show();
    });
    //全部完成操作
    $(".car-complete").on("click",function (){
        $(this).hide().siblings(".car-compile").show();
        $(".car-box").each(function () {
            $(this).find(".car-menu").show();//显示产品信息 隐藏全体编辑 单个编辑
            $(this).find(".car-do").hide();
        });
        $(".car-edit").each(function () {
            $(this).show();
        });
        $(".car-remove").hide();//隐藏删除 显示结算
        $(".car-commit").show();
    });
    //减少数量
    $(".car-minus").on("click",function () {
        var num = parseInt($(this).siblings(".car-num").val());
        num = num - 1;
        var newNum = checkCount(num);
        $(this).siblings(".car-num").val(newNum);
    });
    //增加数量
    $(".car-plus").on("click",function () {
        var num = parseInt($(this).siblings(".car-num").val());
        num = num + 1;
        var newNum = checkCount(num);
        $(this).siblings(".car-num").val(newNum);
    });
    //限制输入只能为数字
    $(".car-num").on("change",function (e) {
        var num = e.target.value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'');
        var newNum = checkCount(num);
        $(this).val(newNum);
    });
    //单个删除操作
    $(".single-delete").on("click",function () {
        $(".car-del").show();//确认弹窗
    });
    $(".del-correct").on("click",function () {
//            $(this).parents(".car-box").remove();//移除该宝贝所在的DOM节点 ajax
        $(".car-del").hide();
    });
    //全部删除操作
    $(".car-delete").on("click",function () {
        $(".car-delall").show();//确认弹窗
    });
    $(".delall-correct").on("click",function () {
//            $(this).parents(".car-box").remove();//移除该宝贝所在的DOM节点 ajax
        $(".car-delall").hide();
    });
    //清空失效宝贝
    $(".lose-btn").on("click",function () {
        $(".car-empty").show();//确认弹窗
    });
    $(".empty-correct").on("click",function () {
//            $(".lose-container").remove();//清空失效宝贝所在的DOM节点 ajax
        $(".car-empty").hide();
    });
    //编辑sku
    $(".car-sku-href").on("click",function () {
        $(this).parents(".car-do").siblings(".view-toast").show();
    });
    //选择sku
    $(".sku-btn").on("click",function () {
        if(!$(this).hasClass("sku-disabled")){
            $(this).addClass("active").siblings().removeClass("active");
            var i = $(this).index();
            $(this).siblings("input").val(i);
        }
    });
    //关闭编辑sku
    $(".view-exit").on("click",function () {
        $(".view-toast").hide();
    });
    //关闭编辑sku
    $(".view-cancel").on("click",function () {
        $(".view-toast").hide();
    });
});