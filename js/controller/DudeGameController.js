define(
        "controller/DudeGameController",
        ["controller/MixGameController",
        "inc/DudeGame"],
        function(MixGameController,DudeGame) {
            
            function DudeGameController(engine, target){
                MixGameController.call(this, engine, target);
                this.cg = new DudeGame($('#canvas'),$('#toolbar'),engine);
            }
            
            DudeGameController.prototype = Object.create(MixGameController.prototype);
            DudeGameController.prototype.constructor = DudeGameController;
            
            DudeGameController.prototype.init = function(){
                
                this.cg.init();
                
                this.cg.load();
                
            };
            
            return DudeGameController;
});

