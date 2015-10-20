(function () {

    cheet('U U D D L R L R b a', function () {
        $('#gameCanvas').show();
    });

    cheet('esc', function () {
        $('#gameCanvas').hide();
        $('#profileImg').attr("src","../img/me.jpg");
    });

    cheet('i d d q d', function () {
        $('#profileImg').attr("src","../img/god-mode.png");
    });

})();