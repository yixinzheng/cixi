//点击小标签替换出做出相应的内容替换*注意确保内没有标签
function navcon(divnav, navcss, divcon) {
    $(divnav).click(function () {
        var i = $(this).index();
        $(this).addClass(navcss).siblings().removeClass(navcss);
        $(divcon).eq(i).show().siblings(divcon).hide();
    })
}
//hint
function showHint() {
    $('.hint').show();
    setTimeout(function () {
        $('.hint').hide();
    },2000);
}
//toast
function showToast() {
    $('.pub-toast').show();
    setTimeout(function () {
        $('.pub-toast').hide(500);
    },2000);
}
//checkphone
function checkPhone(phone){
    if(!(/^1[34578]\d{9}$/.test(phone))){
        $('.hint').html('请填写正确的手机号码！');
        showHint();
    }
}
//checkboxSubmit
function checkBoxSubmit(obj,classN){
    $('body').on('click',obj,function(){
        if($(this).find('input[type="checkbox"]').prop('checked')){
            $(this).siblings().find('input[type="checkbox"]').prop('checked',false);
            $(this).siblings().find('i').removeClass(classN);
            $(this).find('i').addClass(classN);
        }else{
            $(this).find('i').removeClass(classN);
            $(this).siblings().find('i').removeClass(classN);
        }
    })
}
//判断输入字符数
function limitword(inputarea,outputarea,count)
{
    var curLength=$(inputarea).val().length;
    if(curLength>count)
    {
        var num=$(inputarea).val().substr(0,count);
        $(inputarea).val(num);
        alert("超过字数限制，多余的字将被截断！");
    }
    else
    {
        $(outputarea).text($(inputarea).val().length);
    }
}

//商品分类
function floor(){
    var floors=$('[data-type]');
    var daname,dtext;
    for(var i=0;i<floors.length;i++){
        daname=floors.eq(0).attr("data-type");
        var ind=daname+(i+1);
        dtext=floors.eq(i).text();
        floors.eq(i).attr('name',daname+(i+1));
        var alist= '<div class="float-btn" name="'+ind+'">'+dtext+'</div>';

        $(alist).appendTo(".float-window");
        $('.float-btn').eq(0).addClass('current');
    }
    var back= '<div class="float-back"></div>';
    $(back).appendTo(".float-window");
}
//优化js浮点型加减的bug
function add(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
}
function mul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

$(function () {
    $(".backtop").click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 300);
        return false;
    });
    $('.data-inp-box').on('click',function(e){
        var _this=$(this);
        _this.find('ul').toggle();
        _this.find('i').toggleClass('arrow-down-gray');
        _this.find('i').toggleClass('arrow-up-gray');
        _this.find('ul li').on('click',function(evt){
            var e = window.event || evt;
            if ( e.stopPropagation ){ //如果提供了事件对象，则这是一个非IE浏览器
                e.stopPropagation();//阻止冒泡事件，防止外层点击触发的影响
            }else{
//兼容IE的方式来取消事件冒泡
                window.event.cancelBubble = true;
            }
            var txt= $.trim($(this).text());
            _this.find('.data-inp-input').html(txt);
            _this.find('i').toggleClass('arrow-up-gray');
            _this.find('i').toggleClass('arrow-down-gray');
            var sortid = $(this).attr('rel');
            $('#sort-type').val(sortid);
            _this.find('ul').hide();
        });
    });
    $(document).on("click",function(evt){
        var obj=$(evt.target).parents(".data-inp-box");
        obj.siblings().find('.select-ul').hide();
        if(obj.length==0)
        {
            obj.find('.select-ul').hide();
        }
    });
    $(".nav-search").on("click",function () {
       $(".search-box").show();
        $(".index-show").hide();
    });
    $(".search-back").on("click",function () {
        $(".search-box").hide();
        $(".index-show").show();
    });
    //取消操作
    $(".overlay-cancel").on("click",function () {
        $(".index-overlay").hide();
    });
    $(".toggle-pwd").on("click",function () {
        var type = $(this).siblings('input').attr("type");
        if(type =="password"){
            $(this).siblings('input').attr("type","text");
            $(this).removeClass("open");
        }else{
            $(this).siblings('input').attr("type","password");
            $(this).addClass("open");
        }
    });
    $(".addr-toggle").on("click",function () {
       $(this).toggleClass('active');
    });
    $(".addr-set").on("click",function () {
        $(this).addClass('active');
        $(this).parents(".addr-con").siblings().find(".addr-set").removeClass('active');
    });
    $(".apply-sort").on("click",function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });
    $('.upload-remove').on("click",function () {
        $(this).parent().remove();
    });

});