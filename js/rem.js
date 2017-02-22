(function(win,doc){
    var docEl = doc.documentElement;
    var refreshRem =function (){
        var w =docEl.getBoundingClientRect().width || 320;
        var fs = w/750 * 40;
        // fs = fs > 40 ? 40:fs;//限制最大宽度640
        docEl.style.fontSize = fs+'px';
        window.fontSize = fs;
    },refreshRemId;
    win.addEventListener('resize', function() {
        clearTimeout(refreshRemId);
        refreshRemId = setTimeout(refreshRem, 100);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(refreshRemId);
            refreshRemId = setTimeout(refreshRem, 100);
        }
    }, false);
    refreshRem();
})(window, document);
