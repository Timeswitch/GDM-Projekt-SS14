define(
        "controller/MainController",
        ["inc/Controller",
         "jquery",],
        function(Controller, $, ColorGame){
            function MainController(engine, target){
                Controller.call(this, engine, target);
            }
            
            MainController.prototype = Object.create(Controller.prototype);
            MainController.prototype.constructor = MainController;
            
            MainController.prototype.init = function(){
                var self = this;
                $('body > div').click(function(){
                    self.engine.loadScene('screens/MixGame.htm', function(){},{image: 'home.svg'});
                });
            };
            
            return MainController;
        }
);