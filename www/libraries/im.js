
var im = function(im) {

    im.shuffle = function(array) {
        if (array == null) return;
        var i = array.length, j, temp;
        if (i == 0) return array;
        while(--i) {
            j = Math.floor(Math.random()*(i+1));
            temp=array[i];
            temp=array[i];
            array[i]=array[j];
            array[j]=temp;
        }
        return array;
    }

    im.domSwipe =function (obj) {
        if (obj == null) return;
        var swipeDistance = 5;
        var swipeTime = 100;
        var swipeTimeout;
        var swipeX;
        var swipeY;
        obj.addEventListener("mousedown", function(e) {
            var startX = e.clientX;
            var startY = e.clientY;
            swipeTimeout = setTimeout(function() {
                var newX = mouseX;
                var newY = mouseY;
                var diffX = Math.abs(newX-startX);
                var diffY = Math.abs(newY-startY);
                if (diffX < swipeDistance && diffY < swipeDistance) return;
                var e = new Event("swipe");
                if (diffX > diffY) {
                    // console.log("swiping in X");
                    e.swipeX = (newX-startX>1) ? 1 : -1;
                    e.swipeY = 0;
                } else {
                    // console.log("swiping in Y");
                    e.swipeX = 0
                    e.swipeY = (newY-startY>1) ? 1 : -1;
                }
                move.dispatchEvent(e);

            }, swipeTime);

            var moveUp = move.addEventListener("mouseup", function(){
                clearInterval(swipeTimeout);
                move.removeEventListener("mouseup", moveUp);
            });

        });

        // no way to get position of mouse unless from an event
        var mouseX;
        var mouseY;
        document.addEventListener('mousemove', mouseUpdate);
        document.addEventListener('mouseenter', mouseUpdate);
        function mouseUpdate(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }

    }

    im.swipe = function (obj) {

        if (obj == null) return;
        if (obj.getStage == null) return;
        var stage = obj.getStage();

        var swipeDistance = 5;
        var swipeTime = 100;

        obj.on("mousedown", function(){
            var startX = stage.mouseX;
            var startY = stage.mouseY;
            var swipeTimeout = setTimeout(function() {
                var newX = stage.mouseX;
                var newY = stage.mouseY;
                // console.log(newX - startX);
                // console.log(newY - startY);
                var diffX = Math.abs(newX-startX);
                var diffY = Math.abs(newY-startY);
                if (diffX < swipeDistance && diffY < swipeDistance) return;
                var e = new createjs.Event("swipe");
                if (diffX > diffY) {
                    // console.log("swiping in X");
                    e.swipeX = (newX-startX>1) ? 1 : -1;
                    e.swipeY = 0;
                } else {
                    // console.log("swiping in Y");
                    e.swipeX = 0
                    e.swipeY = (newY-startY>1) ? 1 : -1;
                }
                obj.dispatchEvent(e);
                // obj.dispatchEvent("swipe");
            }, swipeTime);
            var up = obj.on("pressup", function() {
                clearTimeout(swipeTimeout);
                obj.off("pressup", up);
            });
        });

    }

    return im;
}(im || {});
