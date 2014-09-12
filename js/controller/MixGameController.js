define(
        "controller/MixGameController",
        ["inc/Controller",
         "jquery",
         "inc/ColorGame"],
        function(Controller, $, ColorGame){
            function MixGame(engine, target){
                Controller.call(this, engine, target);
                this.cg = new ColorGame($('#canvas'),$('#toolbar'),engine);
            }
            
            MixGame.prototype = Object.create(Controller.prototype);
            MixGame.prototype.constructor = MixGame;
            
            MixGame.prototype.init = function(){
                
                this.cg.init();
                this.cg.load('Ball.svg');
            };
            
            return MixGame;
        }
);