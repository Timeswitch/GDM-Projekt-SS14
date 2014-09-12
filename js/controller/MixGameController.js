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
                
                if(typeof(this.parameters.image) !== 'undefined' && this.parameters.image != null){
                    this.cg.load(this.parameters.image);
                }
                
            };
            
            return MixGame;
        }
);