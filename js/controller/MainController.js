define(
        "controller/MainController",
        ["inc/Controller"],
        function(Controller){
            function MainController(engine, target){
                Controller.call(this, engine, target);
                
            }
            
            MainController.prototype = Object.create(Controller.prototype);
            MainController.prototype.constructor = MainController;
            
            MainController.prototype.init = function(){
                console.log("MainController");
            };
            
            return MainController;
        }
);