function scrollFloor() {
    var options = {
        floorsAttr: $('[data-type]'),  //楼层属性
        floorsClass: '.floor',         //楼层样式
        floorsName: 'floor',          //楼层name名
        linkBox: '.float-window',         //楼层导航div
        linkName: '.float-btn',         //楼层class
        linkActive: 'current',         //楼层导航选中样式
        linkClass: 'float-btn',                   //楼层导航样式
        times: 500,                      //滚动时间
        titleAttr:'data-title'
    };

    var floorLength = function () {
        return options.floorsAttr.length;
    };
    var addLink = function () {  //初始化添加楼层链接
        var floors = options.floorsAttr;
        var daname = options.floorsName;
        var dtext, _this = this;
        for (var i = 0; i < floorLength(); i++) {
            var ind = daname + (i + 1);
            dtext = floors.eq(i).attr(options.titleAttr);
            var alist = '<a name="' + ind + '" class="' + options.linkClass + '">' + dtext + '</a>';
            $(alist).appendTo(options.linkBox);
        }
        $(options.linkBox).find(options.linkName).eq(0).addClass(options.linkActive);
    };
    var change_class = function () {  //隐藏楼层导航，滚动到一定位置显示并且对应的楼层添加样式
        var scrollTop = $(document).scrollTop();
        var _this = this;
        if ((scrollTop + $(window).height()) < (options.floorsAttr.eq(0).offset().top)) {
            $(options.linkBox).slideUp();
        }
        options.floorsAttr.each(function (i) {
            var currentItem = $(this);
            var topCount = window.innerHeight - $(".footer").height();
            // console.log(window.innerHeight,$(".pub-head").height(),$(".footer").height());
            var offsetTop = currentItem.offset().top + topCount;
            if ((scrollTop + $(window).height()) > offsetTop) {//此处的200视具体情况自行设定，因为如果不减去一个数值，在刚好滚动到一个div的边缘时，菜单的选中状态会出错，比如，页面刚好滚动到第一个div的底部的时候，页面已经显示出第二个div，而菜单中还是第一个选项处于选中状态
                $(options.linkBox).find(options.linkName).eq(i).addClass(options.linkActive).siblings().removeClass(options.linkActive);
                $(options.linkBox).slideDown();
            }
        });
    };

    var href_floor= function () {
        var _t=this;
        $( options.linkBox).find(options.linkName).click(function () {
            $(window).off("scroll", change_class);
            var _this = $(this);
            _this.addClass(options.linkActive).siblings().removeClass(options.linkActive);
            var topCount = window.innerHeight - $(".footer").height();
            var offtop=options.floorsAttr.eq(_this.index()).offset().top - $(".pub-head").height();
            $("html,body").animate({scrollTop: offtop}, options.times, function () {
                $(window).on("scroll", change_class);
            });
        })
    };

    $(window).scroll(change_class);
    addLink();
    href_floor();
}

scrollFloor();