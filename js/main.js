
//Main Script

var debug = true; //Regelt Debugausgabe

require([
	"libs/jquery-2.1.1.min",
	"libs/svg",
	"inc/Engine"],
	function(jq,svg,Engine){ 

            var game = new Engine();
            game.init();
    
});

