//module pattern
var mobile = function(mobile){

  console.log("hi");

  mobile.swipe = function(obj){
    console.log(obj); //console.log will help us to know if this is hooked up properly

    //swipe needs to be atleast 10pixels in 100ms time
    var distance = 10;
    var time = 100 //ms;

    //create x & y for mousemove to find x&y position different from mousedown
    var mouseX;
    var mouseY;

    //capture the mousedown
    obj.addEventListener("mousedown", function(e){
      console.log(e.clientX, e.clientY) //e.clientX= capturing mousedown X location form top of screen. pageX = top of document.

      var startX = e.stageX;
      var startY = e.stageY;

      //why did we add mousemove to a variable? because we need to clear the mousedown eventlistener and it works best when assigned to a variable or giving a name to a function
      //we are defining it inside mousedown. everytime theres a mousedown there will be mousedown. Slows down app
      var moveEvent = document.addEventListener("mousemove", getMouse)

      function getMouse(e){
        //get the new mouseX & mouseY
        mouseX = e.clientX; //this is not the endX- it is the constant x
        mouseY = e.clientY;
        //console.log(mouseX);
      }

      //checking to see if we moved 10pixels in 100ms
      var swipeTimeout = setTimeout(function(){

        var diffX = mouseX - startX;
        var diffY = mouseY - startY;

        document.removeEventListener("mousedown", getMouse) //variable name
        //double check to that you removedEventListener -mouseX console.log should disappear after couple of seconds

        console.log(diffX, diffY);
        var swipeX = 0;
        var swipeY = 0;

        //if you swipe more X vs Y
        if (Math.abs(diffX) > Math.abs(diffY)){
          //if swiping left
          if(diffX < -distance){
            swipeX = -1;
          }
          //if swiping right
          if(diffX > distance){
            swipeX = 1;
          }
        } else{
          //if swiping up
          if(diffY < -distance){
            swipeY = -1;
          }
          //if swiping down
          if(diffY > distance){
            swipeY = 1;
          }
        }

        //custom event object
        //so that this var e will be available from the outside. another file
        var e = new Event("swipe");
        e.swipeX = swipeX;
        e.swipeY = swipeY;
        obj.dispatchEvent(e );


      }, time);
    })

  }
  return mobile;
}(mobile || {})
