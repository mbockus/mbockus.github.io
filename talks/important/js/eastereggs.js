(function(){

cheet('? ? ? ? ? ? ? ? b a', function () { alert('Voilà!'); });

cheet('i d d q d', function () {
    alert('god mode enabled');
});

cheet('o n e a t a t i m e', {
    next: function (str, key, num, seq) {
        console.log('key pressed: ' + key);
        console.log('progress: ' + num / seq.length);
        console.log('seq: ' + seq.join(' '));
    },

    fail: function () {
        console.log('sequence failed');
    },

    done: function () {
        console.log('+30 lives ;)');
    }
});

})();