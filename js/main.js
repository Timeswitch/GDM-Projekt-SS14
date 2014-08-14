
//Main Script

require([
	"libs/external/jquery-2.1.1.min",
	"js/inc/engine.js"],  //Warum braucht man für jQuery einen anderen relativen Pfad?
	function(){ 

    var game = new Engine();
    game.init();
    
});

