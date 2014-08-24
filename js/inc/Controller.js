define(
        "inc/Controller",
        [],
        function() {

            function Controller(engine, target) {
                this.engine = engine;
                this.target = target;
            }

            Controller.prototype.init = function() {
                return;
            };

            Controller.prototype.isController = function() {
                return true;
            };

            return Controller;
        }
);