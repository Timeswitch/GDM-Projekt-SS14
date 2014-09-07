define(
        "controller/MainController",
        ["inc/Controller",
         "jquery",
         "inc/ColorGame"],
        function(Controller, $, ColorGame){
            function MainController(engine, target){
                Controller.call(this, engine, target);
                this.cg = new ColorGame($('#canvas'),$('#toolbar'),engine);
            }
            
            MainController.prototype = Object.create(Controller.prototype);
            MainController.prototype.constructor = MainController;
            
            MainController.prototype.init = function(){
                
                this.cg.init();
                this.cg.load('Ball.svg');
            };
            
            return MainController;
        }
);