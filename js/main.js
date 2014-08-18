
//Main Script

var debug = true; //Regelt Debugausgabe

require([
            "inc/Engine"
        ],
	function(Engine){ 
            
            var game = new Engine();
            
            game.init(function(){
                alert("success!");
            });
    
});

