define(
        "controller/MainController",
        ["inc/Controller",
         "jquery",
         "inc/ColorGame"],
        function(Controller, $, ColorGame){
            function MainController(engine, target){
                Controller.call(this, engine, target);
                this.cg = new ColorGame($('#canvas'),$('#toolbar'));
            }
            
            MainController.prototype = Object.create(Controller.prototype);
            MainController.prototype.constructor = MainController;
            
            MainController.prototype.init = function(){
                
                console.log("WebApp: " + window.navigator.standalone + "\nMobile: " + window.mobile);
                $(window).resize(function(){console.log($(window).width()/$(window).height());});
                this.cg.$toolbar.html("<h1>hi!</h1>");
                console.log(this.cg);
            };
            
            return MainController;
        }
);