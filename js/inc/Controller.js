define(
        "inc/Controller",
        [],
        function() {

            function Controller(engine, target) {
                this.engine = engine;
                this.target = target;
                this.parameters = {};
            }

            Controller.prototype.init = function() {
                return;
            };
            
            Controller.prototype.setParameters = function(params){
                if(typeof(params) !== 'undefined'){
                    this.parameters = params;
                }
            };

            Controller.prototype.isController = function() {
                return true;
            };

            return Controller;
        }
);